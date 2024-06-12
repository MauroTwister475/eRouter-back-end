/*
  Warnings:

  - Added the required column `total` to the `totalStudents` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_totalStudents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "total" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "driverId" TEXT,
    CONSTRAINT "totalStudents_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_totalStudents" ("driverId", "id", "vehicleId") SELECT "driverId", "id", "vehicleId" FROM "totalStudents";
DROP TABLE "totalStudents";
ALTER TABLE "new_totalStudents" RENAME TO "totalStudents";
PRAGMA foreign_key_check("totalStudents");
PRAGMA foreign_keys=ON;
