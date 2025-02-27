
import ProjectCard from "./components/project-card"

export default function Home() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold">Hello there! I&apos;m John</h1>
          <span className="text-4xl">👋</span>
        </div>
        <p className="mt-4 text-lg text-muted-foreground">
          I&apos;m a full-stack developer that loves building products and web apps that can impact millions of lives
        </p>
        <p className="mt-2 text-lg text-muted-foreground">
          I&apos;m a senior software engineer with 7 years of experience building scalable web apps that are performance
          optimized and good looking.
        </p>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-semibold">What I&apos;ve been working on</h2>
        <ProjectCard />
      </div>
    </div>
  )
}

