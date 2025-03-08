-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pendente', 'em andamento', 'concluído');

-- CreateTable
CREATE TABLE "task" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "dataDaAtividade" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pendente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);
