/*
  Warnings:

  - A unique constraint covering the columns `[lastMsgSentId]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `conversation` ADD COLUMN `lastMsgSentId` INTEGER NULL;

-- AlterTable
ALTER TABLE `message` ALTER COLUMN `createdAt` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `Conversation_lastMsgSentId_key` ON `Conversation`(`lastMsgSentId`);

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_lastMsgSentId_fkey` FOREIGN KEY (`lastMsgSentId`) REFERENCES `Message`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
