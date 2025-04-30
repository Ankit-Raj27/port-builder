"use client"
import type React from "react"
import { Navbar } from "@/components/navbars/Navbar"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import Footer from "@/components/common/Footer"
import LoadingPage from "@/components/common/Loading"
import { useUser } from "@clerk/nextjs"
import { Carousel, Card } from "@/components/ui/apple-card-carousel"

type Template = {
  id: string
  name: string
  description: string
  category: string
  navbar: string
  hero: string
  experience: string
  project: string
  footer: string
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Modern Portfolio",
    title: "A simple portfolio for tech developers.",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "UI/UX Portfolio",
    title: "An intriguing portfolio to showcase your designing potential.",
    src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Artist Portfolio",
    title: "A curated page for highlighting your best works.",
    src: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=3300&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <DummyContent />,
  },
  {
    category: "Business Portfolio",
    title: "A landing page portfolio for your new venture.",
    src: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <DummyContent />,
  },
];

const templates: Template[] = [
  {
    id: "Modern",
    name: "Modern Portfolio",
    description: "A sleek, minimal portfolio.",
    category: "Personal",
    navbar: "Navbar1",
    hero: "Hero1",
    experience: "Experience1",
    project: "Project1",
    footer: "Footer1",
  },
  {
    id: "Creative",
    name: "Creative Portfolio",
    description: "A stylish and colorful template.",
    category: "Creative",
    navbar: "Navbar2",
    hero: "Hero2",
    experience: "Experience2",
    project: "Project2",
    footer: "Footer2",
  },
  {
    id: "Business",
    name: "Business Portfolio",
    description: "A professional portfolio.",
    category: "Business",
    navbar: "Navbar3",
    hero: "Hero3",
    experience: "Experience3",
    project: "Project3",
    footer: "Footer3",
  },
]

const categories = ["All", "Personal", "Business", "Creative"]

const Templates: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("All")

  const { isSignedIn, isLoaded } = useUser()
  

  useEffect(() => {

  }, [isLoaded, isSignedIn, router])

  if (!isLoaded) {
    return <LoadingPage />
  }
  const handleSelectTemplate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string): void => {
    if (!isSignedIn) {
      e.preventDefault();
      router.push("/sign-in");
      return;
    }
    setIsLoading(true);
    router.push(`/template/${id}`);
  }
  

  const filteredTemplates =
    selectedCategory === "All"
      ? templates
      : templates.filter((template) => template.category === selectedCategory)

  // Create card components array for the carousel
  const cardItems = data.map((card, index) => (
    <Card key={card.title} card={card} index={index} />
  ));

  return (
    <>
      <Navbar />
      <div className=" bg-gradient-to-tr from-[#202020] via-[#000] to-[#383838]  text-white">
        {isLoading && <LoadingPage />}
        <div className="p-6 md:p-10 max-w-7xl mx-auto  ">
          <h2 className="text-3xl font-bold mb-8 text-center md:text-left">
            Choose a Template
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-4  py-2 rounded-md border text-sm font-medium transition-colors ${selectedCategory === category
                  ? "bg-slate-500 text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                  }`}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                className="group flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Browser Frame */}
                <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-md bg-white">
                  {/* Browser Top Bar */}
                  <div className="h-6 bg-gray-100 border-b border-gray-200 flex items-center px-2">
                    <div className="flex space-x-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                    </div>
                  </div>

                  {/* Template Preview */}
                  <div className="relative h-[220px] overflow-hidden">
                    <Image
                      src={`/images/template/${template.name}.png`}
                      alt={template.name}
                      fill
                      className="object-cover"
                    />

                    {/* Hover Overlay with Buttons */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                      <motion.button
                        className="bg-white text-black px-6 py-2 rounded-full flex items-center gap-2 font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => handleSelectTemplate(e,template.id)}
                      >
                        <Eye size={16} />
                        View Details
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">{template.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {template.category} Store
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Featured Templates Carousel Section */}
          <div className="py-8 text-white">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <h2 className="text-3xl font-bold mb-8 text-center">Featured Templates</h2>
              <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-12">
                Explore our curated selection of premium templates designed for different needs
              </p>

            </div>
          </div>
              <Carousel items={cardItems} />
        </div>



        <Footer />
      </div>
    </>
  )
}

export default Templates