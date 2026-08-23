import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { v2 as cloudinary } from 'cloudinary'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

function s3Ready() {
  return Boolean(process.env.AWS_S3_BUCKET && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY)
}

function cloudinaryReady() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  )
}

export async function storeProductImage(file: File): Promise<string> {
  const bytes = Buffer.from(await file.arrayBuffer())
  const safe = file.name.replace(/[^\w.-]/g, '_')
  const key = `forja/${Date.now()}-${safe}`

  if (s3Ready()) {
    const region = process.env.AWS_S3_REGION || 'eu-west-1'
    const bucket = process.env.AWS_S3_BUCKET as string
    const client = new S3Client({ region })
    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: bytes,
        ContentType: file.type || 'application/octet-stream',
      }),
    )
    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`
  }

  if (cloudinaryReady()) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
    const data = `data:${file.type};base64,${bytes.toString('base64')}`
    const result = await cloudinary.uploader.upload(data, { folder: 'complete-e-commerce' })
    return result.secure_url
  }

  const dir = path.join(process.cwd(), 'public', 'uploads')
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, path.basename(key)), bytes)
  return `/uploads/${path.basename(key)}`
}
