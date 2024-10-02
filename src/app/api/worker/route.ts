"use server";
import { prisma } from "@/lib/db/index";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { fileKey, videoId, userId, resolutions } = await request.json();
    let url360p = "",
      url480p = "",
      url720p = "",
      url1080p = "";

    if (fileKey && resolutions && Array.isArray(resolutions)) {
      resolutions.forEach((resolution: string) => {
        const baseUrl = `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${fileKey.split(".")[0]}`;
        switch (resolution) {
          case "360":
            url360p = `${baseUrl}_360.mp4`;
            break;
          case "480":
            url480p = `${baseUrl}_480.mp4`;
            break;
          case "720":
            url720p = `${baseUrl}_720.mp4`;
            break;
          case "1080":
            url1080p = `${baseUrl}_1080.mp4`;
            break;
        }
      });

      const db_res = await prisma.transcoded_video_metadata.create({
        data: {
          videoId: videoId,
          userId: userId,
          url360: url360p,
          url480: url480p,
          url720: url720p,
          url1080: url1080p,
          videoType: "TRANSCODED",
          createdAt: new Date(),
        },
      });

      return NextResponse.json({ status: 200, data: db_res });
    } else {
      throw new Error("Invalid input data");
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
