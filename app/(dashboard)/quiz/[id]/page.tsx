"use client";

import { useEffect, useState } from "react"
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import Link from "next/link";

interface Question {
  title: string;
  video_url?: string;
  options?: string[];
  correct_option?: number;
  image_url?: string;
}

export default function Quiz() {
  const { id } = useParams();
  const { toast } = useToast();
  const [quiz, setQuiz] = useState(null) as [Question | null, (quiz: Question | null) => void];
  const [question, setQuestion] = useState(0);
  const [questionsLength, setQuestionsLength] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  useEffect(() => {
    axios.get(`/api/quiz/${id}/question/${question}`).then((response) => {
      setQuiz(response.data.question);
      setQuestionsLength(parseInt(response.data.numOfQuestions));

    }).catch((error) => {
      console.log(error);
    });
  }, [id, question]);

  const getQuestion = (questionId: number) => {
    axios.get(`/api/quiz/${id}/question/${questionId}`).then((response) => {
      setQuiz(response.data.question);
      setQuestion(questionId);
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleAnswer = (answer: number) => {
    if (answer === quiz?.correct_option) {
      setCorrectAnswers(correctAnswers + 1);
      toast({
        title: "Correct Answer",
        description: "You got it right!",
        className: "bg-green-500 text-white",
        duration: 1500
      });
    } else {
      setWrongAnswers(wrongAnswers + 1);
      toast({
        title: "Wrong Answer",
        description: "You got it wrong!",
        className: "bg-red-500 text-white",
        duration: 1500
      });
    }
  }

  return quiz && (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{quiz.title}</CardTitle>
        </CardHeader>

        <CardContent>
          {quiz.video_url && (
            <iframe src={quiz.video_url} className="w-full aspect-[16/8] rounded-lg shadow-lg" />
          )}

          {quiz.image_url && (
            <Image src={quiz.image_url} alt={quiz.title} width={500} height={500} className="rounded-lg shadow-lg mx-auto my-5" />
          )}

          {!quiz.video_url && (
            <div className="grid grid-rows-2 grid-flow-col gap-4">
              {quiz.options?.map((option, index) => (
                <Button key={index} className="block text-left border rounded-lg border-black" onClick={() => handleAnswer(index)}>
                  {option}
                </Button>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="space-x-4 justify-center">
          {question >= 1 && (
            <>
              <Button className="border rounded-lg border-black" onClick={() => getQuestion(question - 1)}>
                Previous Question
              </Button>
              <p>
                Question {question} of {questionsLength - 1}
              </p>
            </>
          )}

          <div>
            {question === 0 && (
              <Button className="border rounded-lg border-black" onClick={() => getQuestion(question + 1)}>
                Start Quiz
              </Button>
            )}
            {question !== 0 && question < questionsLength - 1 && (
              <Button className="border rounded-lg border-black">
                Next Question &gt;
              </Button>
            )}
            {question + 1 === questionsLength && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="border rounded-lg border-black" disabled={correctAnswers + wrongAnswers != questionsLength - 1}>
                    Complete Quiz
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Congrats on Completing this Quiz</DialogTitle>
                    <DialogDescription style={{ margin: "1.25rem 0" }} className="text-center">
                      <Image src="/cookie.jpg" alt="Cookie" width={200} height={200} className="mx-auto mb-5" />
                      You got <strong>{correctAnswers}</strong> correct and <strong>{wrongAnswers}</strong> wrong answers.
                    </DialogDescription>

                    <DialogFooter>
                      <Link href="/quizzes" className="border rounded-lg border-black p-1 mx-auto text-center w-1/2">
                        Go back to Quizzes
                      </Link>
                    </DialogFooter>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
