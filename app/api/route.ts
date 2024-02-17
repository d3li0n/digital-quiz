"use server";

import { NextResponse } from "next/server";
import data from "@/public/quizzesList.json"

export async function GET() {
  return NextResponse.json({
    data: data
  });
}
