/*
  Warnings:

  - You are about to drop the column `isAllyUser` on the `track_user_HK_or_NonHK` table. All the data in the column will be lost.
  - You are about to drop the column `isFriendOfCurbUser` on the `track_user_HK_or_NonHK` table. All the data in the column will be lost.
  - You are about to drop the column `isReferredByDavid` on the `track_user_HK_or_NonHK` table. All the data in the column will be lost.
  - You are about to drop the column `isReferredByJo` on the `track_user_HK_or_NonHK` table. All the data in the column will be lost.
  - You are about to drop the column `isReferredByKiran` on the `track_user_HK_or_NonHK` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `track_user_HK_or_NonHK` DROP COLUMN `isAllyUser`,
    DROP COLUMN `isFriendOfCurbUser`,
    DROP COLUMN `isReferredByDavid`,
    DROP COLUMN `isReferredByJo`,
    DROP COLUMN `isReferredByKiran`,
    ADD COLUMN `isCurbFriend` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isUsingFreeCurb` BOOLEAN NOT NULL DEFAULT false;
