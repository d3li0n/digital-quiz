import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { FaGithub } from "react-icons/fa6"

export default function QuizzesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <nav className="bg-white">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-dark">Digital Quiz</span>
          </a>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              <li>
                <Link href="/quizzes" className="block p-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent">
                  Quizzes
                </Link>
              </li>
              <li>
                <Link href="/quizzes/new" className="block p-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent">
                  Add Quiz
                </Link>
              </li>
              <li>
                <Link href="/vote" className="block p-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent">
                  Vote
                </Link>
              </li>
              <li>
                <Link href="https://github.com/d3li0n/digital-quiz" className="text-white bg-black focus:outline-none font-medium rounded-lg text-sm p-3 text-center flex items-center">
                  <span className="mr-2"><FaGithub /></span>
                  <span>View on GitHub</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="sm:max-w-[264px] md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="block md:hidden focus:outline-none">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="border-none bg-white">
                <Link href="/" className="flex items-center gap-1">
                  <p className="text-[26px] font-extrabold text-dark">Digital Quiz</p>
                </Link>
                <SheetClose asChild>
                  <ul className="font-medium flex flex-col md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                    <li>
                      <Link href="/quizzes" className="block p-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent">
                        Quizzes
                      </Link>
                    </li>
                    <li>
                      <Link href="/quizzes/new" className="block p-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent">
                        Add Quiz
                      </Link>
                    </li>
                    <li>
                      <Link href="/vote" className="block p-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent">
                        Vote
                      </Link>
                    </li>
                    <li>
                      <Link href="https://github.com/d3li0n/digital-quiz" className="block p-3 text-white bg-black rounded-lg">

                        View on GitHub
                      </Link>
                    </li>
                  </ul>
                </SheetClose>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <div className="m-auto w-5/6 md:w-3/4 mt-8">
        {children}
      </div>
    </>
  )
}
