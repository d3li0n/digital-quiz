-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "quizId" INTEGER NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
