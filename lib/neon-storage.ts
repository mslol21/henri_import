import 'server-only';
import { randomUUID } from 'node:crypto';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const extensions: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/gif': 'gif',
};

export async function uploadImageToNeon(file: File): Promise<string> {
  const endpoint = process.env.NEON_STORAGE_ENDPOINT;
  const accessKeyId = process.env.NEON_STORAGE_ACCESS_KEY_ID;
  const secretAccessKey = process.env.NEON_STORAGE_SECRET_ACCESS_KEY;
  const region = process.env.NEON_STORAGE_REGION || 'us-east-2';

  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error('Armazenamento Neon não configurado.');
  }

  const ext = extensions[file.type];
  if (!ext || file.size === 0 || file.size > 8 * 1024 * 1024) {
    throw new Error('Arquivo inválido. Envie uma imagem de até 8 MB.');
  }

  const key = `henri/${Date.now()}-${randomUUID()}.${ext}`;
  const client = new S3Client({
    endpoint,
    region,
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true,
    requestChecksumCalculation: 'WHEN_REQUIRED',
  });

  await client.send(new PutObjectCommand({
    Bucket: 'products',
    Key: key,
    Body: Buffer.from(await file.arrayBuffer()),
    ContentType: file.type,
    CacheControl: 'public, max-age=31536000, immutable',
  }));

  return `${endpoint.replace(/\/$/, '')}/products/${key}`;
}
