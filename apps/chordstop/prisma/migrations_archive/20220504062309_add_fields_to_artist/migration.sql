/*
  Warnings:

  - Made the column `wikidataId` on table `Artist` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Artist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "wikidataId" TEXT NOT NULL,
    "ultimateGuitarId" TEXT,
    "wikipediaSlugEn" TEXT,
    "spotifyArtistId" TEXT,
    "appleArtistID" TEXT,
    "twitterUsername" TEXT,
    "imageCommons" TEXT
);
INSERT INTO "new_Artist" ("appleArtistID", "id", "label", "spotifyArtistId", "twitterUsername", "ultimateGuitarId", "wikidataId", "wikipediaSlugEn") SELECT "appleArtistID", "id", "label", "spotifyArtistId", "twitterUsername", "ultimateGuitarId", "wikidataId", "wikipediaSlugEn" FROM "Artist";
DROP TABLE "Artist";
ALTER TABLE "new_Artist" RENAME TO "Artist";
CREATE UNIQUE INDEX "Artist_label_key" ON "Artist"("label");
CREATE UNIQUE INDEX "Artist_wikidataId_key" ON "Artist"("wikidataId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
