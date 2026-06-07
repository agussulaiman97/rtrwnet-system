/*
  Warnings:

  - You are about to drop the column `package` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `month` to the `Billing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packageId` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Billing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "month" TEXT NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'UNPAID',
    "paidAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Billing_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Billing" ("amount", "createdAt", "customerId", "dueDate", "id", "paidAt", "status") SELECT "amount", "createdAt", "customerId", "dueDate", "id", "paidAt", "status" FROM "Billing";
DROP TABLE "Billing";
ALTER TABLE "new_Billing" RENAME TO "Billing";
CREATE TABLE "new_Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "packageId" INTEGER NOT NULL,
    "bill" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Customer_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Customer" ("address", "bill", "createdAt", "id", "name", "phone", "status", "updatedAt") SELECT "address", "bill", "createdAt", "id", "name", "phone", "status", "updatedAt" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
