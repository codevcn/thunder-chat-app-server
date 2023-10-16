/*
  Warnings:

  - You are about to drop the column `birtday` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `birtday`,
    ADD COLUMN `birthday` DATE NULL;
