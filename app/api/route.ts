"use server";
import prisma from "@/lib/prisma";

export async function GET() {
  const quizzes = await prisma.quiz.findMany({
    where: {
      published: true
    },
    select: {
      id: true,
      title: true,
      shortDescription: true,
      gradient: true
    }
  });

  return Response.json({ data: quizzes });
}
