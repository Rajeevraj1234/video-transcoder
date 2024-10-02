/*
  Warnings:

  - Made the column `url360` on table `Transcoded_video_metadata` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url480` on table `Transcoded_video_metadata` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url720` on table `Transcoded_video_metadata` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url1080` on table `Transcoded_video_metadata` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Transcoded_video_metadata" ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "url360" SET NOT NULL,
ALTER COLUMN "url480" SET NOT NULL,
ALTER COLUMN "url720" SET NOT NULL,
ALTER COLUMN "url1080" SET NOT NULL;

-- AlterTable
ALTER TABLE "Video_metadata" ALTER COLUMN "createdAt" DROP DEFAULT;
