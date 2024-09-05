/*
  Warnings:

  - You are about to drop the column `name` on the `Video_metadata` table. All the data in the column will be lost.
  - Added the required column `Updatedname` to the `Video_metadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isSubtitled` to the `Video_metadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originlName` to the `Video_metadata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video_metadata" DROP COLUMN "name",
ADD COLUMN     "Updatedname" TEXT NOT NULL,
ADD COLUMN     "isSubtitled" BOOLEAN NOT NULL,
ADD COLUMN     "originlName" TEXT NOT NULL;
