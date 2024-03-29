'use client';

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';

const formSchema = z.object({
  quizTitle: z.string().min(5, {
    message: "Quiz title must be at least 5 characters.",
  }),
  quizShortDescription: z.string().min(5, {
    message: "Short description must be at least 5 characters.",
  }),
  videoUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  questions: z.array(z.string()),
  answers: z.array(z.array(z.string()))
})

export default function NewQuizPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quizTitle: "",
      quizShortDescription: "",
      videoUrl: "",
      imageUrl: "",
      questions: Array(10).fill(''),
      answers: Array(10).fill(0).map(() => ["", "", "", ""]),
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { quizTitle, quizShortDescription, videoUrl, imageUrl, questions, answers } = values;

    if (!videoUrl && !imageUrl) {
      toast({
        title: 'Video or Image URL required',
        className: "bg-red-500 text-white",
        duration: 1500
      });
      return;
    }

    let numOfQuestions = 0

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].length > 0) {
        let numOfAnswers = 0;

        for(let j = 0; j < answers[i].length; j++) {
          if (answers[i][j].length === 0) continue;
          numOfAnswers++;
        }

        if (numOfAnswers < 2) {
          toast({
            title: `At least 2 answers required in Question ${i + 1}`,
            className: "bg-red-500 text-white",
            duration: 1500
          });
          return;
        }
        numOfQuestions++;
      }
    }

    if (numOfQuestions < 2) {
      toast({
        title: 'At least 2 questions required',
        className: "bg-red-500 text-white",
        duration: 1500
      });
      return;
    }

    let postBody = [];
    for (let questionIndex = 0; questionIndex < numOfQuestions; questionIndex++) {
      console.log(`Question ${questionIndex + 1}: ${questions[questionIndex]}`);

      let answersBody = [];

      for (let answerIndex = 0; answerIndex < answers[questionIndex].length; answerIndex++) {
        if (answers[questionIndex][answerIndex].length === 0) continue;

        answersBody.push({
          answer: answers[questionIndex][answerIndex],
          isCorrect: answerIndex === 0
        });
      }

      postBody.push({
        title: questions[questionIndex],
        answers: answersBody
      });
    }

    await axios.post('/api/quiz', {
      title: quizTitle,
      shortDescription: quizShortDescription,
      videoUrl,
      imageUrl,
      questions: postBody
    }).then((response) => {
      toast({
        title: response.data.data,
        className: "bg-green-500 text-white",
        duration: 1500
      });
    }).catch((_) => {
      toast({
        title: "An error occurred while submitting the quiz.",
        className: "bg-red-500 text-white",
        duration: 1500
      });
    });
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Create Quiz</CardTitle>
        <CardContent>
          <div>
            <div className="my-5 bg-yellow-300/40 p-5">
              <p className="ml-2 text-1xl">
                Your quiz will not be immediately published for public view.
                Other members of the community must review it and approve it by casting their vote.
              </p>
            </div>
          </div>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} method='POST'>
              <h2 className='font-semibold text-2xl'>General Information</h2>

              <div className='my-3' />
              <FormField
                control={form.control}
                name="quizTitle"
                render={({ field }) => (
                  <>
                    <FormLabel>Quiz Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Name of the quiz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </>
                )}
              />
              <div className='my-3' />
              <FormField
                control={form.control}
                name="quizShortDescription"
                render={({ field }) => (
                  <>
                    <FormLabel>Quiz Short Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Short description of the quiz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </>
                )}
              />

              <div className='my-3' />

              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <>
                    <FormLabel>Video URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Video URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </>
                )}
              />

              <div className='my-3' />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Image URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </>
                )}
              />

              <h2 className='font-semibold text-2xl'>Questions</h2>

              <div>
                <div className="my-5 bg-yellow-300/40 p-5">
                  <p className="ml-2 text-1xl">
                    Leave answer fields empty if you want to have less than 4 answers. First answer will be always marked as the correct one.
                  </p>
                </div>
              </div>

              <div className='my-3' />
              {Array.from({ length: 10 }).map((_, questionIndex) => (
                <div key={questionIndex} className='my-3'>
                  <FormLabel className='text-1xl'>{`Question ${questionIndex + 1}`}</FormLabel>
                  <Input placeholder="Question info" {...form.register(`questions.${questionIndex}`)} />

                  {Array.from({ length: 4 }).map((_, answerIndex) => (
                    <div key={answerIndex} className='ml-4 my-3' >
                      <FormLabel>{`Answer ${answerIndex + 1}`}</FormLabel>
                      <Input className={answerIndex + 1 === 1 ? 'border-2 border-emerald-500' : 'border-2 border-rose-500'} placeholder="Answer info" {...form.register(`answers.${questionIndex}.${answerIndex}`)} />
                    </div>
                  ))}
                </div>
              ))}
              <Button type="submit" className='block text-white bg-black'>Submit</Button>
            </form>
          </Form>
        </CardContent>
      </CardHeader>
    </Card>
  )
}
