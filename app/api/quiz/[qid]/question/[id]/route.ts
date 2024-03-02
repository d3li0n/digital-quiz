import fs from 'fs';
import path from 'path';

const getQuestion = (qid: string, id: number) => {
  try {
    const quizQuestions = fs.readFileSync(path.join(process.cwd(), 'public', 'quizzes', `${qid}.json`), 'utf-8');
    const quiz = JSON.parse(quizQuestions);
    const question = quiz;

    return [question[id], quiz.length];
  } catch {
    return [null, 0];
  }
};


export async function GET(req: Request) {
  const { pathname } = new URL(req.url)
  const splitPathname = pathname.split('/');
  const qid = splitPathname[3];
  const id = splitPathname[5];

  const [question, questionsLength] = getQuestion(qid as string, parseInt(id as string));

  return Response.json({ question, numOfQuestions: questionsLength });
}
