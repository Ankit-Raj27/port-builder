"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

export default function LoadingPage() {
    const [loadingText, setLoadingText] = useState("Loading")

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingText((prev) => {
                if (prev === "Loading...") { return "Loading" }
                if (prev === "Loading..") { return "Loading..." }
                if (prev === "Loading.") { return "Loading.." }
                return "Loading."
            })
        }, 500)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
            <div className="relative">
                {/* Main rotating circle - simplified to a single color */}
                <div className="relative flex items-center justify-center w-32 h-32">
                    <div className="absolute w-full h-full rounded-full border-4 border-t-gray-300 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                    <div className="absolute w-24 h-24 rounded-full border-4 border-t-gray-200 border-r-transparent border-b-transparent border-l-transparent animate-spin-slow"></div>

                    {/* Inner circle with icon */}
                    <div className="flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-sm z-10">
                        <Loader2 className="w-8 h-8 text-gray-500 dark:text-gray-400 animate-spin" />
                    </div>
                </div>
            </div>

            {/* Loading text */}
            <div className="mt-8 text-xl font-medium text-gray-700 dark:text-gray-200">{loadingText}</div>

            {/* Simplified dots */}
            <div className="flex gap-3 mt-6">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"
                        style={{
                            animation: `bounce 1.4s infinite ${i * 0.12}s`,
                        }}
                    ></div>
                ))}
            </div>
        </div>
    )
}
