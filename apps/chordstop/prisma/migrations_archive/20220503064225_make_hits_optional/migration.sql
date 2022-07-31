-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "artist" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "lastedit" TEXT,
    "category" TEXT,
    "hits" INTEGER,
    "body" TEXT NOT NULL,
    "open" INTEGER
);
INSERT INTO "new_Chord" ("artist", "body", "category", "hits", "id", "lastedit", "open", "title") SELECT "artist", "body", "category", "hits", "id", "lastedit", "open", "title" FROM "Chord";
DROP TABLE "Chord";
ALTER TABLE "new_Chord" RENAME TO "Chord";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
