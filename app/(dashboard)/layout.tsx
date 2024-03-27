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
        </div>
      </nav>

      <div className="m-auto w-5/6 md:w-3/4 mt-8">
        {children}
      </div>
    </>
  )
}
