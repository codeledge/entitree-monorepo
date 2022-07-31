/*
  Warnings:

  - You are about to drop the column `artistLabel` on the `Chord` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "lastedit" TEXT,
    "category" TEXT,
    "hits" INTEGER,
    "body" TEXT NOT NULL,
    "open" INTEGER,
    "artistId" INTEGER,
    "wikidataId" TEXT,
    "duration" INTEGER,
    CONSTRAINT "Chord_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Chord" ("artistId", "body", "category", "duration", "hits", "id", "lastedit", "open", "title", "wikidataId") SELECT "artistId", "body", "category", "duration", "hits", "id", "lastedit", "open", "title", "wikidataId" FROM "Chord";
DROP TABLE "Chord";
ALTER TABLE "new_Chord" RENAME TO "Chord";
CREATE UNIQUE INDEX "Chord_wikidataId_key" ON "Chord"("wikidataId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
