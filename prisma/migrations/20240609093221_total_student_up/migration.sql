/*
  Warnings:

  - You are about to drop the column `driverId` on the `totalStudents` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleId` on the `totalStudents` table. All the data in the column will be lost.
  - You are about to alter the column `total` on the `totalStudents` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_totalStudents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "total" INTEGER NOT NULL
);
INSERT INTO "new_totalStudents" ("id", "total") SELECT "id", "total" FROM "totalStudents";
DROP TABLE "totalStudents";
ALTER TABLE "new_totalStudents" RENAME TO "totalStudents";
PRAGMA foreign_key_check("totalStudents");
PRAGMA foreign_keys=ON;
