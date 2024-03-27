"use server"

import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: { qid?: string } }) {
  const quiz = await prisma.quiz.findMany({
    select: {
      id: true,
      title: true,
      shortDescription: true,
      gradient: true,
      questions: {
        select: {
          id: true,
          title: true,
          video_url: true,
          image_url: true,
          answers: {
            select: {
              id: true,
              answer: true,
              isCorrect: true
            }
          }
        }
      }
    },
    where: {
      published: false,
      id: parseInt(params.qid || '0'),
    }
  });

  return Response.json({ data: quiz });
}
