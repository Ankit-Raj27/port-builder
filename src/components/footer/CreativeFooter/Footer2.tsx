import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react"

export default function ContactFooter() {
  return (
    <div >

      <footer className="bg-black text-white">
        <div className="container px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-400 mb-8">For collaborations, commissions, or inquiries, please reach out.</p>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Name"
                      className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Subject"
                    className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Message"
                    className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 min-h-[120px]"
                  />
                </div>
                <Button className="w-full" size="lg">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Contact Information</h2>
                <ul className="space-y-4 mb-12">
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <span>
                      123 Atelier Street, Fashion District
                      <br />
                      New York, NY 10001
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+1 (212) 555-0123</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>studio@yourname.com</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">Follow</h3>
                <div className="flex gap-4">
                  <Link href="#" className="hover:text-primary transition-colors">
                    <Instagram className="h-6 w-6" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                  <Link href="#" className="hover:text-primary transition-colors">
                    <Twitter className="h-6 w-6" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                  <Link href="#" className="hover:text-primary transition-colors">
                    <Linkedin className="h-6 w-6" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </div>

                <div className="mt-12 text-sm text-gray-500">
                  <p>© {new Date().getFullYear()} Studio Name. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
