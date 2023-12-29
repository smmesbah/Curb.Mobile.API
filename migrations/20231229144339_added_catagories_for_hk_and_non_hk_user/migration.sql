/*
  Warnings:

  - You are about to drop the column `referrelCodeUsed` on the `track_user_HK_or_NonHK` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `track_user_HK_or_NonHK_referrelCodeUsed_key` ON `track_user_HK_or_NonHK`;

-- AlterTable
ALTER TABLE `track_user_HK_or_NonHK` DROP COLUMN `referrelCodeUsed`,
    ADD COLUMN `isAllyUser` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isFriendOfCurbUser` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isNonHKUser` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isReferredByDavid` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isReferredByJo` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isReferredByKiran` BOOLEAN NOT NULL DEFAULT false;
