/*
  Warnings:

  - You are about to drop the column `name` on the `Transcoded_video_metadata` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Transcoded_video_metadata` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transcoded_video_metadata" DROP COLUMN "name",
DROP COLUMN "url",
ADD COLUMN     "url360" TEXT,
ADD COLUMN     "url480" TEXT,
ADD COLUMN     "url720" TEXT;
