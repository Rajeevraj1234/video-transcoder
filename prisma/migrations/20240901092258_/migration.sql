-- CreateTable
CREATE TABLE "Video_metadata" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transcoded_video_metadata" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transcoded_video_metadata_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Video_metadata" ADD CONSTRAINT "Video_metadata_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transcoded_video_metadata" ADD CONSTRAINT "Transcoded_video_metadata_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video_metadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;
