/*
  Warnings:

  - Added the required column `contact_id` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "contact_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "user_id" VARCHAR NOT NULL;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
