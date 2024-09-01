"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { spawn } from "child_process";
import { prisma } from "@/lib/db/index";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth";

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
  fileName: string
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
  const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileKey}`;

  return { url, fileKey };
}

export async function POST(request: any) {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);
    
    const formData = await request.formData();
    const file = formData.get("file"); //get the file form the form data

    const buffer = Buffer.from(await file.arrayBuffer()); //convert binart file to buffer so that it will be esay to upload and manupulate the video

    const { url, fileKey } = await uploadFileToS3(buffer, file.name); //return the url and fileKey:name of the file
    const res = prisma.video_metadata.create({
      data: {
        userId: "heheheh",
        name: fileKey,
        url: url,
        createdAt: Date.now() + "",
      },
    });
    console.log(res);
    if (!fileKey) {
      return NextResponse.json(
        { error: "fail to get the fileKey internal error." },
        { status: 400 }
      );
    }

    const inputUrl = `s3://${process.env.AWS_S3_BUCKET_NAME}/${fileKey}`; //s3 url for the downloading of the video
    const outputKey360p = `${fileKey.split(".")[0]}_360p.mp4`;
    const outputKey480p = `${fileKey.split(".")[0]}_480p.mp4`;
    const outputKey720p = `${fileKey.split(".")[0]}_720p.mp4`;

    const dockerCmd = `sudo docker run --rm -e INPUT_URL=${inputUrl} -e OUTPUT_KEY_360P=${outputKey360p} -e OUTPUT_KEY_480P=${outputKey480p} -e OUTPUT_KEY_720P=${outputKey720p} -e AWS_S3_BUCKET_NAME=${process.env.AWS_S3_BUCKET_NAME} -e AWS_ACCESS_KEY_ID=${process.env.AWS_S3_ACCESS_KEY_ID} -e AWS_SECRET_ACCESS_KEY=${process.env.AWS_S3_SECRET_ACCESS_KEY} transcoding-docker-file`;

    console.log("Docker container started ==================> ");

    await new Promise<void>((resolve, reject) => {
      //return the promsis till the video it transcoding and being uploaded to s3
      const process = spawn(dockerCmd, { shell: true });

      process.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Transcoding failed with code ${code}`));
        }
      });
    });

    console.log("Docker container ended ===================> ");

    //docker url files
    const originalUrl = url;
    const url360p = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${outputKey360p}`;
    const url480p = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${outputKey480p}`;
    const url720p = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${outputKey720p}`;

    return NextResponse.json({
      success: true,
      urls: {
        url360p,
        url480p,
        url720p,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
