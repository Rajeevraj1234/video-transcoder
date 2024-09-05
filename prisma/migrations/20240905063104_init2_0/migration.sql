/*
  Warnings:

  - You are about to drop the column `originlName` on the `Video_metadata` table. All the data in the column will be lost.
  - Added the required column `originalName` to the `Video_metadata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video_metadata" DROP COLUMN "originlName",
ADD COLUMN     "originalName" TEXT NOT NULL;
