import { Navbar } from "@/components/navigation/navbar/page";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main className="container">
        <Navbar />
        <section className="max-w-[1200px] mx-auto px-4 py-20 md:py-22">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight">
              Welcome to the Port-Builder!
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-[600px]">
              Our enterprise solution offers advanced site management,
              highly-efficient portfolio site creation, and the customization
              options you require.
            </p>
            <div>
              <Link href="/sign-up">
                <button className="inline-flex h-12 items-center justify-center rounded-full bg-black px-8 text-sm font-medium text-white hover:bg-gray-800 transition-colors">
                  Create an account!
                </button>
              </Link>
              <Link href="/sign-in">
                <button className="inline-flex ml-4 h-12 items-center justify-center rounded-full bg-black px-8 text-sm font-medium text-white hover:bg-gray-800 transition-colors">
                  Already have an account?
                </button> 
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
