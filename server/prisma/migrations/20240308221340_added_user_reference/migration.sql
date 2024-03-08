/*
  Warnings:

  - Added the required column `uid` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "uid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
