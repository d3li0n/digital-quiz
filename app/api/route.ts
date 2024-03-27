"use server";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

const getQuizzes = async (published: boolean) => {
  return await prisma.quiz.findMany({
    where: {
      published: published
    },
    select: {
      id: true,
      title: true,
      shortDescription: true,
      gradient: true
    }
  });
}

export async function GET(req: NextRequest) {
  const param = req.nextUrl.searchParams.get('published');
  const quizzes = await getQuizzes(param === null ? true : false);

  return Response.json({ data: quizzes });
}
