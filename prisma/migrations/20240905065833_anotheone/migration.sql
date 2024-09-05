/*
  Warnings:

  - You are about to drop the column `isSubtitled` on the `Video_metadata` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Transcoded_video_metadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoType` to the `Transcoded_video_metadata` table without a default value. This is not possible if the table is not empty.
  - Made the column `url360` on table `Transcoded_video_metadata` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url480` on table `Transcoded_video_metadata` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url720` on table `Transcoded_video_metadata` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `videoType` to the `Video_metadata` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "videoType" AS ENUM ('NORMAL', 'TRANSCODED', 'SUBTITLED', 'TRANSCODED_AND_SUBTITLED');

-- AlterTable
ALTER TABLE "Transcoded_video_metadata" ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "videoType" "videoType" NOT NULL,
ALTER COLUMN "url360" SET NOT NULL,
ALTER COLUMN "url480" SET NOT NULL,
ALTER COLUMN "url720" SET NOT NULL;

-- AlterTable
ALTER TABLE "Video_metadata" DROP COLUMN "isSubtitled",
ADD COLUMN     "videoType" "videoType" NOT NULL;

-- AddForeignKey
ALTER TABLE "Transcoded_video_metadata" ADD CONSTRAINT "Transcoded_video_metadata_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
