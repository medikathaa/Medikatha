import 'dotenv/config';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import pg from 'pg';

const { Pool } = pg;
const dataDirectory = path.resolve('server', 'data');
const databasePath = path.join(dataDirectory, 'store.json');
const connectionString = process.env.DATABASE_URL || '';

let postgresPool = null;
let activeDriver = connectionString ? 'postgres' : 'json';

function ensureStore() {
  mkdirSync(dataDirectory, { recursive: true });

  if (!existsSync(databasePath)) {
    writeFileSync(
      databasePath,
      JSON.stringify(
        {
          counters: {
            asset: 0,
            certificate: 0,
          },
          assets: [],
          certificates: [],
        },
        null,
        2,
      ),
      'utf8',
    );
  }
}

function loadStore() {
  ensureStore();
  return JSON.parse(readFileSync(databasePath, 'utf8'));
}

function saveStore(store) {
  writeFileSync(databasePath, JSON.stringify(store, null, 2), 'utf8');
}

function now() {
  return new Date().toISOString();
}

function normalizeAssetRow(row) {
  return {
    ...row,
    id: Number(row.id),
    is_default: Number(row.is_default),
  };
}

function normalizeCertificateRow(row) {
  return {
    ...row,
    id: Number(row.id),
    left_logo_asset_id: row.left_logo_asset_id == null ? null : Number(row.left_logo_asset_id),
    corner_logo_asset_id: row.corner_logo_asset_id == null ? null : Number(row.corner_logo_asset_id),
    signature_asset_id: row.signature_asset_id == null ? null : Number(row.signature_asset_id),
  };
}

async function initializePostgres() {
  if (!connectionString) {
    activeDriver = 'json';
    return;
  }

  if (!postgresPool) {
    postgresPool = new Pool({
      connectionString,
      ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : undefined,
    });
  }

  await postgresPool.query(`
    CREATE TABLE IF NOT EXISTS assets (
      id BIGSERIAL PRIMARY KEY,
      kind TEXT NOT NULL,
      name TEXT NOT NULL,
      file_name TEXT NOT NULL,
      relative_path TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      data_url TEXT,
      is_default INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS certificates (
      id BIGSERIAL PRIMARY KEY,
      certificate_id TEXT NOT NULL UNIQUE,
      verify_token TEXT NOT NULL UNIQUE,
      recipient_name TEXT NOT NULL,
      certification_title TEXT NOT NULL,
      course_name TEXT NOT NULL,
      acknowledgement_line TEXT NOT NULL,
      completion_text TEXT NOT NULL,
      completion_summary TEXT NOT NULL,
      institution_name TEXT NOT NULL,
      classroom_hours TEXT NOT NULL,
      internship_hours TEXT NOT NULL,
      issuer_name TEXT NOT NULL,
      issuer_title TEXT NOT NULL,
      completion_date TEXT NOT NULL,
      badge_primary TEXT NOT NULL,
      badge_secondary TEXT NOT NULL,
      left_logo_asset_id BIGINT,
      corner_logo_asset_id BIGINT,
      signature_asset_id BIGINT,
      verification_url TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

export async function initializeDatabase() {
  if (connectionString) {
    await initializePostgres();
  } else {
    ensureStore();
  }
}

export function getDatabaseDriver() {
  return activeDriver;
}

export async function createAsset({
  kind,
  name,
  fileName,
  relativePath,
  mimeType,
  dataUrl,
  isDefault = 0,
}) {
  if (activeDriver === 'postgres') {
    const result = await postgresPool.query(
      `
        INSERT INTO assets (kind, name, file_name, relative_path, mime_type, data_url, is_default)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `,
      [kind, name, fileName, relativePath, mimeType, dataUrl, isDefault],
    );
    return normalizeAssetRow(result.rows[0]);
  }

  const store = loadStore();
  store.counters.asset += 1;

  const asset = {
    id: store.counters.asset,
    kind,
    name,
    file_name: fileName,
    relative_path: relativePath,
    mime_type: mimeType,
    data_url: dataUrl,
    is_default: isDefault,
    created_at: now(),
  };

  store.assets.push(asset);
  saveStore(store);
  return asset;
}

export async function getAssetById(id) {
  if (activeDriver === 'postgres') {
    const result = await postgresPool.query(`SELECT * FROM assets WHERE id = $1 LIMIT 1`, [id]);
    return result.rows[0] ? normalizeAssetRow(result.rows[0]) : null;
  }

  const store = loadStore();
  return store.assets.find((asset) => Number(asset.id) === Number(id)) || null;
}

export async function findAssetByName(kind, name) {
  if (activeDriver === 'postgres') {
    const result = await postgresPool.query(
      `SELECT * FROM assets WHERE kind = $1 AND name = $2 LIMIT 1`,
      [kind, name],
    );
    return result.rows[0] ? normalizeAssetRow(result.rows[0]) : null;
  }

  const store = loadStore();
  return store.assets.find((asset) => asset.kind === kind && asset.name === name) || null;
}

export async function listAssets() {
  if (activeDriver === 'postgres') {
    const result = await postgresPool.query(
      `SELECT * FROM assets ORDER BY is_default DESC, created_at DESC, id DESC`,
    );
    return result.rows.map(normalizeAssetRow);
  }

  const store = loadStore();
  return [...store.assets].sort((left, right) => {
    if (left.is_default !== right.is_default) {
      return right.is_default - left.is_default;
    }
    return right.id - left.id;
  });
}

export async function createCertificate(payload) {
  if (activeDriver === 'postgres') {
    const result = await postgresPool.query(
      `
        INSERT INTO certificates (
          certificate_id,
          verify_token,
          recipient_name,
          certification_title,
          course_name,
          acknowledgement_line,
          completion_text,
          completion_summary,
          institution_name,
          classroom_hours,
          internship_hours,
          issuer_name,
          issuer_title,
          completion_date,
          badge_primary,
          badge_secondary,
          left_logo_asset_id,
          corner_logo_asset_id,
          signature_asset_id,
          verification_url
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
        )
        RETURNING *
      `,
      [
        payload.certificateId,
        payload.verifyToken,
        payload.recipientName,
        payload.certificationTitle,
        payload.courseName,
        payload.acknowledgementLine,
        payload.completionText,
        payload.completionSummary,
        payload.institutionName,
        payload.classroomHours,
        payload.internshipHours,
        payload.issuerName,
        payload.issuerTitle,
        payload.completionDate,
        payload.badgePrimary,
        payload.badgeSecondary,
        payload.leftLogoAssetId ? Number(payload.leftLogoAssetId) : null,
        payload.cornerLogoAssetId ? Number(payload.cornerLogoAssetId) : null,
        payload.signatureAssetId ? Number(payload.signatureAssetId) : null,
        payload.verificationUrl,
      ],
    );
    return normalizeCertificateRow(result.rows[0]);
  }

  const store = loadStore();
  store.counters.certificate += 1;

  const certificate = {
    id: store.counters.certificate,
    certificate_id: payload.certificateId,
    verify_token: payload.verifyToken,
    recipient_name: payload.recipientName,
    certification_title: payload.certificationTitle,
    course_name: payload.courseName,
    acknowledgement_line: payload.acknowledgementLine,
    completion_text: payload.completionText,
    completion_summary: payload.completionSummary,
    institution_name: payload.institutionName,
    classroom_hours: payload.classroomHours,
    internship_hours: payload.internshipHours,
    issuer_name: payload.issuerName,
    issuer_title: payload.issuerTitle,
    completion_date: payload.completionDate,
    badge_primary: payload.badgePrimary,
    badge_secondary: payload.badgeSecondary,
    left_logo_asset_id: payload.leftLogoAssetId ? Number(payload.leftLogoAssetId) : null,
    corner_logo_asset_id: payload.cornerLogoAssetId ? Number(payload.cornerLogoAssetId) : null,
    signature_asset_id: payload.signatureAssetId ? Number(payload.signatureAssetId) : null,
    verification_url: payload.verificationUrl,
    created_at: now(),
  };

  store.certificates.push(certificate);
  saveStore(store);
  return certificate;
}

export async function getCertificateByCertificateId(certificateId) {
  if (activeDriver === 'postgres') {
    const result = await postgresPool.query(
      `SELECT * FROM certificates WHERE certificate_id = $1 LIMIT 1`,
      [certificateId],
    );
    return result.rows[0] ? normalizeCertificateRow(result.rows[0]) : null;
  }

  const store = loadStore();
  return (
    store.certificates.find((certificate) => certificate.certificate_id === certificateId) || null
  );
}

export async function getCertificateByToken(token) {
  if (activeDriver === 'postgres') {
    const result = await postgresPool.query(
      `SELECT * FROM certificates WHERE verify_token = $1 LIMIT 1`,
      [token],
    );
    return result.rows[0] ? normalizeCertificateRow(result.rows[0]) : null;
  }

  const store = loadStore();
  return store.certificates.find((certificate) => certificate.verify_token === token) || null;
}

export async function listRecentCertificates(limit = 8) {
  if (activeDriver === 'postgres') {
    const result = await postgresPool.query(
      `SELECT * FROM certificates ORDER BY created_at DESC, id DESC LIMIT $1`,
      [limit],
    );
    return result.rows.map(normalizeCertificateRow);
  }

  const store = loadStore();
  return [...store.certificates].sort((left, right) => right.id - left.id).slice(0, limit);
}
