"use server";

import { prisma } from "@/lib/db/index";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { fileKey, videoId, userId, resolutions } = await request.json();
    if (fileKey) {
      const outputKey360p = `${fileKey.split(".")[0]}_360p.mp4`;
      const outputKey480p = `${fileKey.split(".")[0]}_480p.mp4`;
      const outputKey720p = `${fileKey.split(".")[0]}_720p.mp4`;
      const outputKey1080p = `${fileKey.split(".")[0]}_1080p.mp4`;

      const url360p = `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${outputKey360p}`;
      const url480p = `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${outputKey480p}`;
      const url720p = `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${outputKey720p}`;
      const url1080p = `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${outputKey720p}`;

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
