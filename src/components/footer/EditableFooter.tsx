"use client"

import { useState, useEffect } from "react"
import { Github, Twitter, Linkedin, Instagram, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

interface FooterData {
    heading: string
    description: string
    email: string
    phone: string
    location: string
    socialLinks: {
        github: string
        twitter: string
        linkedin: string
        instagram: string
    }
}

export default function EditableFooter() {
    const defaultData: FooterData = {
        heading: "Let us Connect",
        description: "I am always open to discussing new projects, creative ideas, or opportunities.",
        email: "hello@example.com",
        phone: "+1 (123) 456-7890",
        location: "San Francisco, CA",
        socialLinks: {
            github: "https://github.com",
            twitter: "https://twitter.com",
            linkedin: "https://linkedin.com",
            instagram: "https://instagram.com"
        }
    }

    const [footerData, setFooterData] = useState<FooterData>(defaultData)
    const [tempData, setTempData] = useState<FooterData>(defaultData)

    useEffect(() => {
        const savedData = localStorage.getItem("footerData")
        if (savedData) {
            setFooterData(JSON.parse(savedData))
            setTempData(JSON.parse(savedData))
        }
    }, [])

    const handleTextChange = (key: keyof FooterData, value: string) => {
        setTempData({ ...tempData, [key]: value })
    }

    const handleSave = () => {
        setFooterData(tempData)
        localStorage.setItem("footerData", JSON.stringify(tempData))
        toast({ title: "Changes Saved", description: "Your footer has been updated." })
    }

    const handleReset = () => setTempData(footerData)

    const handleDownload = () => {
        const jsonData = JSON.stringify(tempData, null, 2)
        const blob = new Blob([jsonData], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "footer-data.json"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const uploadedData = JSON.parse(e.target?.result as string)
                setFooterData(uploadedData)
                setTempData(uploadedData)
                localStorage.setItem("footerData", JSON.stringify(uploadedData))
                toast({ title: "Data Restored", description: "Your footer has been updated." })
            } catch {
                toast({ title: "Upload Failed", description: "Invalid JSON file." })
            }
        }
        reader.readAsText(file)
    }

    return (
        <footer className="bg-black text-white p-10">
            <h2
                contentEditable
                suppressContentEditableWarning
                className="text-2xl font-bold outline-none border-b border-transparent focus:border-primary"
                onBlur={(e) => handleTextChange("heading", e.currentTarget.innerText)}
            >
                {tempData.heading}
            </h2>
            <p
                contentEditable
                suppressContentEditableWarning
                className="text-white/70 outline-none border-b border-transparent focus:border-primary"
                onBlur={(e) => handleTextChange("description", e.currentTarget.innerText)}
            >
                {tempData.description}
            </p>

            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleReset}>Reset</Button>
            <Button onClick={handleDownload}><Download /> Download</Button>
            <input type="file" accept="application/json" onChange={handleUpload} />
        </footer>
    )
}
