'use server'
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { quizId } = await req.json();

  const quiz = await prisma.quiz.findUnique({
    where: {
      id: parseInt(quizId),
      published: false
    }
  });

  if (!quiz) {
    return Response.json({ message: "Quiz not found." }, { status: 404 });
  }

  await prisma.vote.create({
    data: {
      quiz: {
        connect: {
          id: quiz.id
        }
      }
    }
  });

  const votes = await prisma.vote.count({
    where: {
      quizId: quiz.id
    }
  });

  if (votes >= 10) {
    await prisma.quiz.update({
      where: {
        id: quiz.id
      },
      data: {
        published: true
      }
    });
  }

  return Response.json({ message: "Vote submitted successfully." });
}

