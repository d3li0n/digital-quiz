import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="m-auto text-center w-1/2">
        <h1 className="text-2xl font-bold my-3">From Developers of the Project</h1>
        <p className="my-4">
          The goal of this project is to help you learn how to use digital tools by using an interactive, hands-on approach.
          Our team has created quizzes to help you learn about digital environment and how to stay safe online.
        </p>
        <Link className={buttonVariants({ variant: "outline" })} href={'/quizzes'} >Start Playing</Link>
      </div>
    </div>
  )
}
