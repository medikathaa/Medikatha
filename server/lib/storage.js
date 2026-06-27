import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export const rootDir = path.resolve();
export const storageDir = path.join(rootDir, 'server', 'storage');
export const logoDir = path.join(storageDir, 'logos');
export const signatureDir = path.join(storageDir, 'signatures');

export function ensureStorageDirectories() {
  mkdirSync(logoDir, { recursive: true });
  mkdirSync(signatureDir, { recursive: true });
}

function sanitizeBaseName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'asset';
}

function extensionFromMime(mimeType) {
  if (mimeType === 'image/png') {
    return 'png';
  }
  if (mimeType === 'image/jpeg') {
    return 'jpg';
  }
  if (mimeType === 'image/webp') {
    return 'webp';
  }
  if (mimeType === 'image/svg+xml') {
    return 'svg';
  }
  return 'bin';
}

export function parseDataUrl(dataUrl) {
  const match = dataUrl.match(/^data:(.+?);base64,(.+)$/);
  if (!match) {
    throw new Error('Unsupported file format. Please upload a valid image.');
  }

  return {
    mimeType: match[1],
    buffer: Buffer.from(match[2], 'base64'),
  };
}

export function storeAssetFile({ kind, name, dataUrl }) {
  const { mimeType, buffer } = parseDataUrl(dataUrl);
  if (!mimeType.startsWith('image/')) {
    throw new Error('Only image uploads are supported.');
  }

  const extension = extensionFromMime(mimeType);
  const fileName = `${sanitizeBaseName(name)}-${crypto.randomUUID().slice(0, 8)}.${extension}`;
  const directory = kind === 'signature' ? signatureDir : logoDir;
  const relativePath = `${kind === 'signature' ? 'signatures' : 'logos'}/${fileName}`;
  const absolutePath = path.join(directory, fileName);

  writeFileSync(absolutePath, buffer);

  return {
    mimeType,
    fileName,
    relativePath,
    dataUrl,
  };
}

export function writeSeedSvg({ kind, fileName, content }) {
  const directory = kind === 'signature' ? signatureDir : logoDir;
  const absolutePath = path.join(directory, fileName);
  const relativePath = `${kind === 'signature' ? 'signatures' : 'logos'}/${fileName}`;
  writeFileSync(absolutePath, content, 'utf8');
  
  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(content, 'utf8').toString('base64')}`;
  
  return {
    mimeType: 'image/svg+xml',
    fileName,
    relativePath,
    dataUrl,
  };
}
