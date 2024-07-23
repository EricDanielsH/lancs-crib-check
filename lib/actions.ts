"use server";

import { auth } from "@/auth";
import Media from "@/lib/models/media";
import { connectMongoDB } from "@/lib/mongodb";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const s3 = new S3Client({
  region: process.env.MY_AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY!,
  },
});

const acceptedTypes = ["image/jpeg", "image/png", "image/webp"];
const maxFileSize = 1024 * 1024 * 10; // 10MB

export async function getSignedURL(
  type: string,
  size: number,
  checksum: string,
) {
  const session = await auth();
  console.log("actinos", session);

  if (!session) {
    return { error: { message: "Not authenticated" } };
  }

  if (!acceptedTypes.includes(type)) {
    return { error: { message: "Invalid file type" } };
  }

  if (size > maxFileSize) {
    return { error: { message: "File too large" } };
  }

  // Ensure userId is a string or handle the case where it's undefined
  const userId = session?.user?.id ?? "";

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.MY_AWS_BUCKET_NAME!,
    Key: generateFileName(),
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
    Metadata: {
      userId: userId,
    },
  });

  const signedUrl = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 60,
  });

  await connectMongoDB();
  const newMedia = await Media.create({
    userId: userId,
    url: signedUrl.split("?")[0],
    type: type,
  });

  return {
    success: {
      url: signedUrl,
      mediaId: newMedia._id.toString(),
      mediaUrl: newMedia.url,
    },
  };
}
