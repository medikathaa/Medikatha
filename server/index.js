import express from 'express';
import path from 'node:path';
import crypto from 'node:crypto';
import QRCode from 'qrcode';
import {
  createAsset,
  createCertificate,
  findAssetByName,
  getCertificateByCertificateId,
  getDatabaseDriver,
  getCertificateByToken,
  initializeDatabase,
  listAssets,
  listRecentCertificates,
} from './lib/database.js';
import {
  ensureStorageDirectories,
  storeAssetFile,
  storageDir,
  writeSeedSvg,
} from './lib/storage.js';
import { seedAssets } from './lib/defaults.js';

const app = express();
const port = Number(process.env.PORT || 4000);
const distDir = path.resolve('dist');

ensureStorageDirectories();

async function ensureDefaultAssets() {
  for (const asset of seedAssets) {
    const existing = await findAssetByName(asset.kind, asset.name);
    if (existing) {
      continue;
    }

    const stored = writeSeedSvg(asset);
    await createAsset({
      kind: asset.kind,
      name: asset.name,
      fileName: stored.fileName,
      relativePath: stored.relativePath,
      mimeType: stored.mimeType,
      isDefault: 1,
    });
  }
}

app.use(express.json({ limit: '12mb' }));
app.use('/media', express.static(storageDir));
app.use(express.static(distDir));

function certificateBaseUrl(request) {
  return process.env.PUBLIC_APP_URL || `${request.protocol}://${request.get('host')}`;
}

function toAssetResponse(asset) {
  return {
    ...asset,
    url: `/media/${asset.relative_path.replace(/\\/g, '/')}`,
  };
}

function hydrateCertificate(certificate, assets) {
  const verificationUrl = certificate.verification_url || certificate.verificationUrl;

  return {
    certificateId: certificate.certificate_id || certificate.certificateId,
    verifyToken: certificate.verify_token || certificate.verifyToken,
    recipientName: certificate.recipient_name || certificate.recipientName,
    certificationTitle: certificate.certification_title || certificate.certificationTitle,
    courseName: certificate.course_name || certificate.courseName,
    acknowledgementLine: certificate.acknowledgement_line || certificate.acknowledgementLine,
    completionText: certificate.completion_text || certificate.completionText,
    completionSummary: certificate.completion_summary || certificate.completionSummary,
    institutionName: certificate.institution_name || certificate.institutionName,
    classroomHours: certificate.classroom_hours || certificate.classroomHours,
    internshipHours: certificate.internship_hours || certificate.internshipHours,
    issuerName: certificate.issuer_name || certificate.issuerName,
    issuerTitle: certificate.issuer_title || certificate.issuerTitle,
    completionDate: certificate.completion_date || certificate.completionDate,
    badgePrimary: certificate.badge_primary || certificate.badgePrimary,
    badgeSecondary: certificate.badge_secondary || certificate.badgeSecondary,
    leftLogoAssetId: String(certificate.left_logo_asset_id || certificate.leftLogoAssetId || ''),
    cornerLogoAssetId: String(certificate.corner_logo_asset_id || certificate.cornerLogoAssetId || ''),
    signatureAssetId: String(certificate.signature_asset_id || certificate.signatureAssetId || ''),
    verificationUrl,
    assets,
  };
}

async function withQrCode(certificate) {
  const qrCodeDataUrl = await QRCode.toDataURL(certificate.verificationUrl, {
    width: 220,
    margin: 1,
    color: {
      dark: '#11243A',
      light: '#FFFFFF',
    },
  });

  return {
    ...certificate,
    qrCodeDataUrl,
  };
}

app.get('/api/bootstrap', async (_request, response) => {
  const assets = (await listAssets()).map(toAssetResponse);
  const recentCertificates = await Promise.all(
    (await listRecentCertificates()).map((certificate) =>
      withQrCode(hydrateCertificate(certificate, assets)),
    ),
  );
  const defaultLogos = assets.filter((asset) => asset.kind === 'logo');
  const defaultSignature = assets.find((asset) => asset.kind === 'signature');

  response.json({
    assets,
    certificates: recentCertificates,
    defaults: {
      leftLogoAssetId: defaultLogos[0]?.id ? String(defaultLogos[0].id) : '',
      cornerLogoAssetId: defaultLogos[1]?.id ? String(defaultLogos[1].id) : '',
      signatureAssetId: defaultSignature?.id ? String(defaultSignature.id) : '',
    },
  });
});

app.post('/api/assets', async (request, response) => {
  const { kind, name, dataUrl } = request.body || {};

  if (!['logo', 'signature'].includes(kind)) {
    return response.status(400).json({ error: 'Asset kind must be logo or signature.' });
  }

  if (!name || !dataUrl) {
    return response.status(400).json({ error: 'Please provide a name and image file.' });
  }

  try {
    const stored = storeAssetFile({ kind, name, dataUrl });
    const asset = await createAsset({
      kind,
      name,
      fileName: stored.fileName,
      relativePath: stored.relativePath,
      mimeType: stored.mimeType,
      isDefault: 0,
    });

    return response.status(201).json({
      asset: toAssetResponse(asset),
    });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

app.post('/api/certificates', async (request, response) => {
  const payload = request.body || {};

  const requiredFields = [
    'recipientName',
    'certificationTitle',
    'courseName',
    'acknowledgementLine',
    'completionText',
    'completionSummary',
    'institutionName',
    'classroomHours',
    'internshipHours',
    'issuerName',
    'issuerTitle',
    'completionDate',
  ];

  const missingField = requiredFields.find((field) => !String(payload[field] || '').trim());
  if (missingField) {
    return response.status(400).json({ error: `Missing required field: ${missingField}` });
  }

  const certificateId = `CERT-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const verifyToken = crypto.randomUUID().replace(/-/g, '');
  const verificationUrl = `${certificateBaseUrl(request)}/verify/${verifyToken}`;

  const stored = await createCertificate({
    ...payload,
    certificateId,
    verifyToken,
    verificationUrl,
  });

  const assets = (await listAssets()).map(toAssetResponse);
  const certificate = await withQrCode(hydrateCertificate(stored, assets));

  return response.status(201).json({ certificate });
});

app.get('/api/certificates/:certificateId', async (request, response) => {
  const stored = await getCertificateByCertificateId(request.params.certificateId);
  if (!stored) {
    return response.status(404).json({ error: 'Certificate not found.' });
  }

  const assets = (await listAssets()).map(toAssetResponse);
  const certificate = await withQrCode(hydrateCertificate(stored, assets));
  return response.json({ certificate });
});

app.get('/api/verify/:token', async (request, response) => {
  const stored = await getCertificateByToken(request.params.token);
  if (!stored) {
    return response.status(404).json({ error: 'This QR code does not match any issued certificate.' });
  }

  const assets = (await listAssets()).map(toAssetResponse);
  const certificate = await withQrCode(hydrateCertificate(stored, assets));
  return response.json({ certificate });
});

app.get(/.*/, (_request, response) => {
  response.sendFile(path.join(distDir, 'index.html'));
});

await initializeDatabase();
await ensureDefaultAssets();

app.listen(port, () => {
  console.log(
    `Medikatha web server running on http://localhost:${port} using ${getDatabaseDriver()} storage`,
  );
});
