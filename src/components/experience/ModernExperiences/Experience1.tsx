"use client"

import { CalendarIcon, GraduationCap, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EditableText } from "@/components/common/EditableText"
import usePortfolioStore from "@/components/store/usePortfolioStore"

interface ExperienceProps {
  isEditable?: boolean
}

export default function Experience1({ isEditable = true }: ExperienceProps) {
  const { experienceContent, updateExperienceContent } = usePortfolioStore()
  const { title = "Experience & Education", items = [] } = experienceContent || {}

  const handleUpdateItem = (id: number, key: string, val: string) => {
    const newItems = items.map(item => item.id === id ? { ...item, [key]: val } : item)
    updateExperienceContent({ items: newItems })
  }

  return (
    <section id="experience" className="bg-muted py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-12 space-y-4 px-4 md:px-6">
          {isEditable ? (
            <EditableText 
              value={title} 
              onChange={(val) => updateExperienceContent({ title: val })} 
              tag="h2"
              className="text-3xl font-bold tracking-tighter sm:text-4xl"
            />
          ) : (
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{title}</h2>
          )}
          <p className="max-w-[700px] text-muted-foreground">My professional journey and educational background</p>
        </div>

        <Tabs defaultValue="work" className="w-full">
          <TabsList className="mb-8 w-full justify-start sm:w-auto px-4 md:px-6">
            <TabsTrigger value="work" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Work Experience
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Education
            </TabsTrigger>
          </TabsList>

          <TabsContent value="work" className="mt-0 space-y-6 px-4 md:px-6">
            {items.map((job) => (
              <Card key={job.id} className={cn("overflow-hidden")}>
                <CardHeader>
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div>
                      {isEditable ? (
                        <EditableText 
                          value={job.role} 
                          onChange={(val) => handleUpdateItem(job.id, 'role', val)} 
                          tag="h3"
                          className="text-xl font-bold"
                        />
                      ) : (
                        <h3 className="text-xl font-bold">{job.role}</h3>
                      )}
                      <CardDescription>
                         {isEditable ? (
                           <EditableText 
                              value={job.company} 
                              onChange={(val) => handleUpdateItem(job.id, 'company', val)} 
                              tag="span"
                          />
                         ) : (
                           <span>{job.company}</span>
                         )}
                      </CardDescription>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {isEditable ? (
                        <EditableText 
                          value={job.duration} 
                          onChange={(val) => handleUpdateItem(job.id, 'duration', val)} 
                          tag="span"
                        />
                      ) : (
                        <span>{job.duration}</span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                   {isEditable ? (
                      <EditableText 
                        value={job.description} 
                        onChange={(val) => handleUpdateItem(job.id, 'description', val)} 
                        tag="p"
                        className="mb-4"
                      />
                   ) : (
                     <p className="mb-4">{job.description}</p>
                   )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="education" className="mt-0 space-y-6 px-4 md:px-6">
             <div className="text-muted-foreground italic text-sm">Education section edits coming soon...</div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
