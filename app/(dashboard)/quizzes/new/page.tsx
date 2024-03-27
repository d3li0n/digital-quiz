'use client';

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  quizTitle: z.string().min(5, {
    message: "Quiz title must be at least 5 characters.",
  }),
  quizShortDescription: z.string().min(5, {
    message: "Short description must be at least 5 characters.",
  }),
})

export default function NewQuizPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quizTitle: "",
      quizShortDescription: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Submit the form
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
              <div className='my-3'/>
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
              <div className='my-3'/>

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </CardHeader>
    </Card>
  )
}
