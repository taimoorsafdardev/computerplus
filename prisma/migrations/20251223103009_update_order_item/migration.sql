/*
  Warnings:

  - You are about to drop the column `price` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `productImage` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "price",
ADD COLUMN     "discount" TEXT,
ADD COLUMN     "discountPrice" TEXT,
ADD COLUMN     "productImage" TEXT NOT NULL,
ADD COLUMN     "productName" TEXT NOT NULL,
ADD COLUMN     "total" TEXT NOT NULL,
ADD COLUMN     "unitPrice" TEXT NOT NULL,
ALTER COLUMN "productId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
