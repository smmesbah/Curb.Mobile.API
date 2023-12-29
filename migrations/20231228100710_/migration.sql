/*
  Warnings:

  - A unique constraint covering the columns `[referrelCodeUsed]` on the table `track_user_HK_or_NonHK` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `track_user_HK_or_NonHK_referrelCodeUsed_key` ON `track_user_HK_or_NonHK`(`referrelCodeUsed`);
