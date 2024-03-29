"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Quiz } from "@/common/types";
import axios from "axios";
import { LoaderIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function VotePageView() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoted, setIsVoted] = useState(false);
  const { qid } = useParams();

  useEffect(() => {
    if (qid) {
      axios.get(`/api/quiz/${qid}`).then((response) => {
        setQuiz(response.data.data[0]);
        setIsLoading(false);
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [qid]);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (isVoted) {
      toast({
        title: "You have already voted for this quiz",
        className: "bg-red-500 text-white",
        duration: 1500
      });
      return;
    }

    await axios.post(`/api/vote`, {
      quizId: qid,
    }).then((response) => {
      toast({
        title: response.data.message,
        className: "bg-green-500 text-white",
        duration: 1500
      });
      setIsVoted(true);
    }).catch((error) => {
      toast({
        title: error.response.data.message,
        className: "bg-red-500 text-white",
        duration: 1500
      });
    });
  }

  return !isLoading ? (
    <>
      {!quiz ? <p className="font-semibold text-center">Quiz is not available or not found</p> : <>
        <Card className="bg-white">

          <CardHeader className="">
            <CardTitle>Quiz Title: {quiz?.title}</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">Description:</p>
            <p className="mt-2">{quiz?.shortDescription}</p>

            <p className="font-semibold mt-2">Questions:</p>
            <div className="mt-2">
              {quiz?.questions.map((question, index) => (
                <div key={index} className="p-2">
                  <p>{index + 1}. {question.title}</p>
                  <p className="mt-2">Image and Video:
                  </p>
                  <div className="space-x-4 md:flex space-y-5">
                    {question.image_url && (
                      <Image src={question.image_url} alt="Question Image" width={200} height={200} />
                    )}
                    {question.video_url && (
                      <iframe
                        src={question.video_url}
                        className="aspect-[16/8] rounded-lg shadow-lg"
                        title="Video before quiz"
                      />
                    )}
                  </div>
                  <div className="mt-5">
                    <h3 className="font-semibold">Available answers:</h3>
                    <div className="flex-none md:flex space-x-0 md:space-x-4 space-y-4 md:space-y-0 mt-2">
                      {question.answers.length == 0 ? <p>No answers available</p> : ''}
                      {question.answers.map((answer, index) => (
                        <div key={index} className={`p-1 rounded-md background text-white ${answer.isCorrect ? 'bg-green-600' : 'bg-red-600'}`}>
                          {answer.answer}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Button type="submit" className="bg-blue-500 text-white rounded-lg px-2 py-1" disabled={isVoted}>
                Support this quiz
              </Button>
            </form>
          </CardFooter>
        </Card>
      </>}
    </>
  ) : <LoaderIcon className="animate-spin mx-auto w-1/5" />
}
