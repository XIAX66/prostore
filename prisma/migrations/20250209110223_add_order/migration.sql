-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "order_userId_user_id_fk";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "orderItems_orderId_order_id_fk";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "orderItems_productId_product_id_fk";

-- AlterTable
ALTER TABLE "OrderItem" RENAME CONSTRAINT "orderItems_orderId_productId_pk" TO "orderitems_orderId_productId_pk";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
