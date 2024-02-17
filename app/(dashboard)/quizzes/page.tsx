"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import Link from "next/link"

interface Quiz {
  title: string;
  shortDescription: string;
  gradient: string
}

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get('/api').then((response) => {
      setQuizzes(response.data.data);
    });
  }, []);


  // Function to select a random gradient
  const selectRandomGradient = (gradient: string) => {
    return `linear-gradient(135deg, ${gradient})`;
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-12">Available Quizzes</h2>
      <div className="grid grid-cols-4 gap-4">
        {quizzes.map((quiz: Quiz, index) => (
          <Card key={index} style={{ background: selectRandomGradient(quiz.gradient) }} className="text-white">
            <CardHeader className="h-[150px]">
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>{quiz.shortDescription}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href={`/quiz/${index + 1}`} className="bg-blue-500 rounded-lg px-2 py-1 text-white">
                Start Quiz
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
