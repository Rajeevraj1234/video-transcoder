/*
  Warnings:

  - You are about to drop the column `Updatedname` on the `Video_metadata` table. All the data in the column will be lost.
  - Added the required column `updatedName` to the `Video_metadata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video_metadata" DROP COLUMN "Updatedname",
ADD COLUMN     "updatedName" TEXT NOT NULL;
