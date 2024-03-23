import prisma from "@/lib/prisma";

const getQuestion = async (qid: string, id: number) => {
  try {
    const response = await prisma.quiz.findUnique({
      where: {
        id: parseInt(qid),
        published: true
      },
      select: {
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
      }
    });
    const question = response?.questions[id];
    return [question, response?.questions.length];
  } catch {
    return [null, 0];
  }
};


export async function GET(req: Request) {
  const { pathname } = new URL(req.url)
  const splitPathname = pathname.split('/');
  const qid = splitPathname[3];
  const id = splitPathname[5];

  const [question, questionsLength] = await getQuestion(qid as string, parseInt(id as string));

  return Response.json({ question, numOfQuestions: questionsLength });
}
