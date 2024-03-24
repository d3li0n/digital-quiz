"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import Link from "next/link"
import { LoaderIcon } from 'lucide-react';

interface Quiz {
  title: string;
  shortDescription: string;
  gradient: string;
}

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api').then((response) => {
      setQuizzes(response.data.data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
    })
  }, []);

  if (loading) {
    return <LoaderIcon className="animate-spin mx-auto w-1/5" />
  } else {
    return quizzes && (
      <>
        <h2 className="text-2xl font-bold mb-12">Available Quizzes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {quizzes.map((quiz: Quiz, index) => (
            <Card key={index} style={{ background: `linear-gradient(135deg, ${quiz.gradient})` }} className="text-white">
              <CardHeader className="h-[150px]">
                <CardTitle>{quiz.title}</CardTitle>
                <CardDescription>{quiz.shortDescription}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href={`/quiz/${index + 1}`} className="border hover:bg-white hover:text-black rounded-lg px-2 py-1 text-white">
                  Start Quiz
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </>
    );
  }
}
