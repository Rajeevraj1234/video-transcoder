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

    if (fileKey) {
      resolutions.foreach((resolution: string) => {
        switch (resolution) {
          case "360":
            url360p = `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${fileKey.split(".")[0]}_${resolution}p.mp4}`;
            break; // Exits the switch block
          case "480":
            url480p = `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${fileKey.split(".")[0]}_${resolution}p.mp4}`;
            break;
          case "720":
            url720p = `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${fileKey.split(".")[0]}_${resolution}p.mp4}`;
            break;
          case "1080":
            url1080p = `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${fileKey.split(".")[0]}_${resolution}p.mp4}`;
            break;
          default:
          // Code to run if no case matches
        }
      });

      const db_res = await prisma.transcoded_video_metadata.create({
        data: {
          videoId: videoId,
          userId: userId,
          url360: url360p,
          url480: url480p,
          url720: url720p,
          url1080: url1080p ?? null,
          videoType: "TRANSCODED",
          createdAt: new Date(),
        },
      });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
