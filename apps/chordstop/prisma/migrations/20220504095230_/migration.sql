/*
  Warnings:

  - A unique constraint covering the columns `[wikidataId]` on the table `Chord` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Chord" ADD COLUMN "duration" INTEGER;
ALTER TABLE "Chord" ADD COLUMN "wikidataId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Chord_wikidataId_key" ON "Chord"("wikidataId");
