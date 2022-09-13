/*
  Warnings:

  - You are about to drop the column `product_id` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `History` table. All the data in the column will be lost.
  - Added the required column `productId` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" DROP COLUMN "product_id",
DROP COLUMN "user_id",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
