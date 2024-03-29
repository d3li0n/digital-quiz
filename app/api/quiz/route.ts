import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

const generateRandomGradient = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const hexRed = red.toString(16).padStart(2, '0');
  const hexGreen = green.toString(16).padStart(2, '0');
  const hexBlue = blue.toString(16).padStart(2, '0');

  return `#${hexRed}${hexGreen}${hexBlue}`;
}

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  const { title, shortDescription, videoUrl, imageUrl, questions } = requestBody;

  if (!videoUrl && !imageUrl) {
    return Response.json({ message: 'Video or Image URL required' }, { status: 400 });
  }

  const quiz = await prisma.quiz.create({
    data: {
      title: title,
      shortDescription: shortDescription,
      gradient: `${generateRandomGradient()}, ${generateRandomGradient()}`,
      published: false,
    }
  });

  await prisma.question.create({
    data: {
      quizId: quiz.id,
      title: title,
      video_url: videoUrl.length > 0 ? videoUrl : null,
      image_url: imageUrl.length > 0 ? imageUrl : null,
    }
  })

  for (let i = 0; i < questions.length; i++) {
    if (questions[i].length === 0) continue;

    const question = await prisma.question.create({
      data: {
        quizId: quiz.id,
        title: questions[i]['title'],
        video_url: null,
        image_url: null,
      }
    });

    questions[i].answers.forEach(async (answer: any) => {
      if (answer.length === 0) return;

      await prisma.answer.create({
        data: {
          questionId: question.id,
          answer: answer['answer'],
          isCorrect: answer['isCorrect'],
        }
      });
    });
  }

  return Response.json({ data: 'Quiz has been created' });
}
