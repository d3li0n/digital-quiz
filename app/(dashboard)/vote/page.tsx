"use client"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Quiz } from '@/common/types';
import Link from "next/link";

export default function VotePage() {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("/api", { params: { published: false } }).then((response) => {
      setQuizzes(response.data.data);
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
    })
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Community Quizzes</h1>
      <p className="my-2">
        This page functions as a voting platform for quizzes created by the community. Quizzes that are approved by the community will be published on the main page.
        The quiz must get a minimum of 10 votes to be published.
      </p>

      {isLoading ? <LoaderIcon className="animate-spin mx-auto w-1/5" /> : (
        <div className="my-5">
          {quizzes.length === 0 ? <p className="font-semibold">No quizzes available for voting.</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {quizzes.map((quiz : Quiz, index) => (
                <Card key={index} style={{ background: `linear-gradient(135deg, ${quiz.gradient})` }} className="text-white">
                  <CardHeader className="h-[150px]">
                    <CardTitle>{quiz.title}</CardTitle>
                    <CardDescription>{quiz.shortDescription}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link className="border hover:bg-white hover:text-black rounded-lg px-2 py-1 text-white" href={`/vote/${quiz.id}/view`}>
                      View Quiz
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
