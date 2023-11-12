/*
  Warnings:

  - A unique constraint covering the columns `[creatorId,recipientId]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Conversation_creatorId_recipientId_key` ON `Conversation`(`creatorId`, `recipientId`);
