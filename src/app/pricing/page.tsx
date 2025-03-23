import { Check } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from '@/components/navbars/Navbar'
import Footer from '@/components/common/Footer'

export default function PricingPage() {
    return (
        <>
        <Navbar />
            <section className="py-24 px-4 md:px-6 lg:py-32 bg-background">

                <div className="container mx-auto max-w-6xl">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Need custom portfolio websites ?
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-emerald-500">
                            We have got you covered
                        </h3>
                        <p className="text-muted-foreground text-lg max-w-3xl mx-auto mt-6">
                            Choose from various custom components to complete website tailored to your needs. Simple pricing, no hidden fees.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">

                        {/* Free Tier */}
                        <Card className="border-2 flex flex-col">
                            <CardHeader>
                                <CardTitle className="text-emerald-500">Existing Components</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="mb-4">
                                    <p className="text-5xl font-bold">Free</p>
                                </div>
                                <p className="text-muted-foreground">
                                    All the components that are freely available on the website are free to use.
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">Get Started</Button>
                            </CardFooter>
                        </Card>


                        {/* Pages Tier - Featured */}
                        <Card className="border-2 border-primary bg-primary text-primary-foreground flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle>Pages</CardTitle>
                                    <Badge variant="secondary" className="bg-primary-foreground text-primary">Popular</Badge>
                                </div>
                                <CardDescription className="text-primary-foreground/80">pause or cancel anytime</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="mb-4">
                                    <p className="text-5xl font-bold">$6995<span className="text-xl font-normal opacity-80">/mo</span></p>
                                </div>
                                <p className="text-primary-foreground/80">
                                    Best for early-stage startups and businesses that need a marketing site and ongoing developmental work.
                                </p>
                                <ul className="mt-6 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <Check className="h-4 w-4" />
                                        <span>Everything in Custom Components</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-4 w-4" />
                                        <span>Full page designs</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-4 w-4" />
                                        <span>SEO optimization</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-4 w-4" />
                                        <span>Ongoing support</span>
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button variant="secondary" className="w-full">Get Started</Button>
                            </CardFooter>
                        </Card>


                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
