/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Artist_label_key" ON "Artist"("label");
