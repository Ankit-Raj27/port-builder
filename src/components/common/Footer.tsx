import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="w-full py-12 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* For Creatives Column */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">For Creatives</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/photography-portfolio" className="text-gray-500 hover:text-gray-700">
                  Photography Portfolio
                </Link>
              </li>
              <li>
                <Link href="/students" className="text-gray-500 hover:text-gray-700">
                  Students
                </Link>
              </li>
            </ul>
          </div>

          {/* Highlights Column */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Highlights</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/templates" className="text-gray-500 hover:text-gray-700">
                  Portfolio Templates
                </Link>
              </li>
              <li>
                <Link href="/how-to-create" className="text-gray-500 hover:text-gray-700">
                  How to Create Your Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Column */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-500 hover:text-gray-700">
                  Get in Touch
                </Link>
              </li>
              {/* <li>
                <Link href="/blog" className="text-gray-500 hover:text-gray-700">
                  Blog
                </Link>
              </li> */}
              <li>
                <Link href="/privacy" className="text-gray-500 hover:text-gray-700">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-500 hover:text-gray-700">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          {/* Portfoliobox Column */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">PortBuilder</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="text-gray-500 hover:text-gray-700">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-500 hover:text-gray-700">
                  About
                </Link>
              </li>
  
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <Link href="/" className="mb-4 md:mb-0">
              <Image
                src="/logo.png"
                alt="PortBuilder Logo"
                width={150}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
