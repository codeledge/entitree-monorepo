-- CreateTable
CREATE TABLE "Artist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "wikidataId" TEXT,
    "ultimateGuitarId" TEXT,
    "wikipediaSlugEn" TEXT,
    "spotifyArtistId" TEXT,
    "appleArtistID" TEXT,
    "twitterUsername" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "artistLabel" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "lastedit" TEXT,
    "category" TEXT,
    "hits" INTEGER,
    "body" TEXT NOT NULL,
    "open" INTEGER,
    "artistId" INTEGER,
    CONSTRAINT "Chord_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Chord" ("artistLabel", "body", "category", "hits", "id", "lastedit", "open", "title") SELECT "artistLabel", "body", "category", "hits", "id", "lastedit", "open", "title" FROM "Chord";
DROP TABLE "Chord";
ALTER TABLE "new_Chord" RENAME TO "Chord";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
