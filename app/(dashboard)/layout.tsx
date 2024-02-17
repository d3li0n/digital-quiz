export default function QuizzesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="m-auto w-3/4 mt-20">
      {children}
    </div>
  )
}
