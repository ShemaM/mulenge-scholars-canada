import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Absolute top z-index, sticky or fixed based on your component */}
      <Navbar />

      {/* flex-1 forces the main content to push the footer to the bottom 
        even if the page content is shorter than the viewport height. 
      */}
      <main className="flex-1 flex flex-col w-full">
        {children}
      </main>

      <Footer />
    </>
  )
}