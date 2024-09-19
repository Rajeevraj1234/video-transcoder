import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { spawn } from "child_process";
import { prisma } from "@/lib/db/index";
import { NextResponse } from "next/server";

import RedisClient from "@/lib/redis/index";
const client = RedisClient.getInstance();

interface fileType {
  arrayBuffer():
    | WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>
    | PromiseLike<WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>>;
  size: number;
  type: string;
  name: string;
  lastModified: number;
}
const s3Client = new S3Client({
  //creating the s3 client to upload the video
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!, //! means string or undefined
  },
});

async function uploadFileToS3(
  file: Buffer,
  fileName: string,
): Promise<{ url: string; fileKey: string }> {
  const fileBuffer = file;
  const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";
  const mimeTypeMap: Record<string, string> = {
    mp4: "video/mp4",
    avi: "video/avi",
    mkv: "video/mkv",
    // Add other video formats as needed
  };

  const contentType = mimeTypeMap[fileExtension] || "application/octet-stream";

  // Add the folder path to the file key
  const folderPath = "video/";
  const newName = `${fileName.split(".")[0]}${Date.now()}.${fileExtension}`;
  const fileKey = `${folderPath}${newName}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: fileKey, //the file name which will be seen in the s3
    Body: fileBuffer, //here we send the file in the buffer
    ContentType: contentType,
  };

  const command = new PutObjectCommand(params);

  await s3Client.send(command); //this sends the request to s3 to save the file to s3

  // Construct the URL

  const url = `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${fileKey}`;

  return { url, fileKey };
}

export default async function TranscodeVideo(
  file: fileType,
  option: string,
  userId: string,
) {
  try {
    const buffer = Buffer.from(await file.arrayBuffer()); //convert binart file to buffer so that it will be esay to upload and manupulate the video
    const { url, fileKey } = await uploadFileToS3(buffer, file.name); //return the url and fileKey:name of the file
    const videoType = option === "SUB" ? "SUBTITLED" : "NORMAL";
    //upload the original video metadata to db
    const res = await prisma.video_metadata.create({
      data: {
        userId: userId,
        originalName: file.name,
        updatedName: fileKey,
        url: url,
        videoType: videoType,
        createdAt: new Date(),
      },
    });

    if (!fileKey) {
      return {
        error: "file not found",
        success: false,
      };
    }
    const redisDataToBeSend = {
      fileKey,
      userId,
      option,
      videoId: res.id,
    };

    // pushing data to redis
    await client.lPush("transcodingData", JSON.stringify(redisDataToBeSend));

    if (res) {
      return {
        success: true,
        url,
      };
    } else {
      return {
        success: true,
      };
    }
  } catch (error) {
    console.error(error);
    return { error: error, status: 500 };
  }
}
