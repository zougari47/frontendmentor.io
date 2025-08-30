export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="pt-1000">
      <img src="/logo.svg" alt="logo" className="mb-400 mx-auto block" />
      {children}
    </main>
  )
}
