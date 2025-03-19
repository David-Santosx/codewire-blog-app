/*
  Warnings:

  - You are about to drop the column `authorID` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `topic` on the `News` table. All the data in the column will be lost.
  - Added the required column `category` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isFeatured` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_News" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "source" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL,
    "subtitle" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_News" ("content", "createdAt", "id", "subtitle", "title") SELECT "content", "createdAt", "id", "subtitle", "title" FROM "News";
DROP TABLE "News";
ALTER TABLE "new_News" RENAME TO "News";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
