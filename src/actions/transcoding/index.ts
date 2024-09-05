import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { spawn } from "child_process";
import { prisma } from "@/lib/db/index";

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
  const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileKey}`;

  return { url, fileKey };
}

export default async function TranscodeVideo(
  file: fileType,
  option: string,
  userId: string,
) {
  try {
    console.log(file);
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

    const inputUrl = `s3://${process.env.AWS_S3_BUCKET_NAME}/${fileKey}`; //s3 url for the downloading of the video
    const outputKey360p = `${fileKey.split(".")[0]}_360p.mp4`;
    const outputKey480p = `${fileKey.split(".")[0]}_480p.mp4`;
    const outputKey720p = `${fileKey.split(".")[0]}_720p.mp4`;

    const dockerCmd = `sudo docker run --rm -e INPUT_URL=${inputUrl} -e OPTION=${option} -e FILE_KEY=${fileKey} -e OUTPUT_KEY_360P=${outputKey360p} -e OUTPUT_KEY_480P=${outputKey480p} -e OUTPUT_KEY_720P=${outputKey720p} -e AWS_S3_BUCKET_NAME=${process.env.AWS_S3_BUCKET_NAME} -e AWS_ACCESS_KEY_ID=${process.env.AWS_S3_ACCESS_KEY_ID} -e AWS_SECRET_ACCESS_KEY=${process.env.AWS_S3_SECRET_ACCESS_KEY} transcoding-docker-file`;

    console.log("Docker container started ==================> ");

    await new Promise<void>((resolve, reject) => {
      //return the promsis till the video it transcoding and being uploaded to s3
      const process = spawn(dockerCmd, { shell: true });

      process.on("close", (code) => {
        console.log("Code is:", code);
        if (code === 0) {
          console.log("code is resolved");
          resolve();
        } else {
          reject(new Error(`Transcoding failed with code ${code}`));
        }
      });
    });

    console.log("Docker container ended ===================> ");
    let transcoded_res;
    let response;
    console.log("options is:", option);
    if (option === "SUB") {
      const subtitledUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileKey}`;
      response = {
        success: true,
        urls: { subtitledUrl },
      };
    } else {
      //docker url files
      const url360p = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${outputKey360p}`;
      const url480p = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${outputKey480p}`;
      const url720p = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${outputKey720p}`;

      transcoded_res = await prisma.transcoded_video_metadata.create({
        data: {
          videoId: res.id,
          url360: url360p,
          userId: userId,
          url480: url480p,
          url720: url720p,
          videoType:
            option === "TRANS" ? "TRANSCODED" : "TRANSCODED_AND_SUBTITLED",
          createdAt: new Date(),
        },
      });
      response = {
        success: true,
        urls: {
          url360p,
          url480p,
          url720p,
        },
      };
    }
    if (response) {
      return response;
    } else {
      return {
        success: false,
        error: "trancoding failed due to some server error",
      };
    }
  } catch (error) {
    console.error(error);
    return { error: error, status: 500 };
  }
}
