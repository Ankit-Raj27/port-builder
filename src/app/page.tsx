import { Navbar } from "@/components/navigation/navbar/page";

export default function Home() {
  return (
    <div>
      <main className="container">
        <Navbar />
        <h1 className="mt-8 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to the App
        </h1>
      </main>
    </div>
  );
}
