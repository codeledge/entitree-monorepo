-- CreateTable
CREATE TABLE "Chord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "artist" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "lastedit" TEXT,
    "category" TEXT,
    "hits" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "open" INTEGER
);
