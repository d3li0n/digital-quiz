"use server";
import data from '@/public/quizzesList.json';

export async function GET() {
  return Response.json({ data: data });
}
