import { Navbar } from "@/components/navigation/navbar/page";
import { Download, Code, Globe, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/common/Footer";

export default function Home() {
  const features = [
    {
      icon: <Download className="w-8 h-8 text-black-400" />,
      title: "No Downloads",
    },
    {
      icon: <Code className="w-8 h-8 text-black-400" />,
      title: "No Coding",
    },
    {
      icon: <Globe className="w-8 h-8 text-black-400" />,
      title: "All in Browser",
    },
    {
      icon: <Wand2 className="w-8 h-8 text-black-400" />,
      title: "User-Friendly",
    },
  ];
  return (
    <div>
      <main className="container">
        <Navbar />
        {/* Welcome section */}
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
            <div className="w-full max-w-4xl mx-auto  text-center">
              <div className="flex justify-center gap-16 mb-12 mt-20">
                {features.map((feature, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="mb-4">
                      {feature.icon}
                    </div>
                    <p className="text-gray-600 text-sm">
                      {feature.title}
                    </p>
                  </div>
                ))}
              </div>
              <Button
                className="bg-black text-white px-8 py-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                Create Your Portfolio
              </Button>
            </div>
          </div>
        </section>


        {/* Template Section */}
        <section className="w-full py-16 bg-gray-100">
          <div className="mx-auto max-w-3xl text-center px-4 mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Choose the best templates for your portfolio website
            </h2>
            <p className="text-lg text-slate-600">
              Portfoliobox offers a wide variety of templates for creatives looking to make their portfolio. You can easily
              mix templates to create a digital portfolio that perfectly fits your needs.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-y-24 min-h-screen max-w-7xl mx-auto px-4">
            {/* First image section with grid */}
            <div className="grid grid-cols-2 gap-4 p-4">
              <Image src="/11.jpeg" width={240} height={240} alt="df" className="rounded-lg shadow-lg w-full h-full object-cover" />
              <Image src="/11.jpeg" width={240} height={240} alt="df" className="rounded-lg shadow-lg mt-12 object-cover" />
              <Image src="/11.jpeg" width={240} height={240} alt="df" className="rounded-lg shadow-lg w-full h-full object-cover" />
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Text and contact form</h2>
              <h3 className="text font-medium sm:text-2xl mt-2">Create web pages easily</h3>
              <p className="mt-2 max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed l:text-l/relaxed dark:text-gray-400">
                You can easily add text pages and contact forms to your portfolio. Choose from a variety of templates
                and customize each page to create the perfect design for your website.
              </p>
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Text and contact form</h2>
              <h3 className="text font-medium sm:text-2xl mt-2">Create web pages easily</h3>
              <p className="mt-2 max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed l:text-l/relaxed dark:text-gray-400">
                You can easily add text pages and contact forms to your portfolio. Choose from a variety of templates
                and customize each page to create the perfect design for your website.
              </p>
            </div>

            {/* Second image section with grid */}
            <div className="grid grid-cols-2 gap-4 p-4">
              <Image src="/11.jpeg" width={240} height={240} alt="df" className="rounded-lg shadow-lg w-full h-full object-cover" />
              <Image src="/11.jpeg" width={240} height={240} alt="df" className="rounded-lg shadow-lg w-full h-full object-cover" />
              <Image src="/11.jpeg" width={240} height={240} alt="df" className="rounded-lg shadow-lg w-full h-full object-cover" />
              <Image src="/11.jpeg" width={240} height={240} alt="df" className="rounded-lg shadow-lg w-full h-full object-cover" />
            </div>

            {/* Third image section with grid */}
            <div className=" gap-4">
              <Image src="/11.jpeg" width={400} height={400} alt="df" className="rounded-lg shadow-lg  object-cover" />
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Web Hosting</h2>
              <h3 className="text font-medium sm:text-2xl mt-2">Host your portfolio easily</h3>
              <p className="mt-2 max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed l:text-l/relaxed dark:text-gray-400">
                Say goodbye to hosting companies and domain settings. Create your portfolio in your browser, and PortBuilder will handle everything else.
              </p>
            </div>
          </div>
        </section>
        {/* Carousel Section  */}
        <section>

        </section>

        {/* CAT Section */}
        <section className="h-auto p-16 w-full bg-gradient-to-b from-blue-50 to-blue-400 flex flex-col items-center justify-center px-4">
          <div className="max-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-navy-900">
              <span className="block">Your vision. Your goals.</span>
              <span className="block">Your website.</span>
            </h1>
            <div>
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 py-6 text-lg font-medium bg-white text-navy-900 hover:bg-white/90"
              >
                <Link href="/get-started">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>
        {/* Footer Section */}
        <Footer />
      </main>

    </div>
  );
}
