-- CreateTable
CREATE TABLE "ngos" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL,

    CONSTRAINT "ngos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incidents" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "ngoId" TEXT NOT NULL,

    CONSTRAINT "incidents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ngos_email_key" ON "ngos"("email");

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_ngoId_fkey" FOREIGN KEY ("ngoId") REFERENCES "ngos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
