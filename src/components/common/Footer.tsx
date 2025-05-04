import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-tr from-[#1a1a1a] via-[#000] to-[#1a1a1a] text-gray-300 py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-y-8 text-center md:text-left">
        {/* Left side - Logo and brand info */}
        <div className="mb-8 md:mb-0 flex flex-col items-center md:items-start">
          <div className="flex items-center justify-center md:justify-start">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
            />
            <h2 className="text-white text-xl font-bold ml-2">PortBuilder</h2>
          </div>

          <div className="mt-4 text-sm text-gray-400">
            <p>
              A product by{' '}
              <Link href="#" className="text-blue-400 hover:text-blue-300">
                Switchengeek
              </Link>
            </p>
            <p className="mt-1">
              Building in public at{' '}
              <Link href="#" className="text-blue-400 hover:text-blue-300">
                @github
              </Link>
            </p>
          </div>
        </div>

        {/* Right side - Navigation links */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3   gap-8 text-center md:text-left">
          <div className="space-y-4 sm:grid-cols-1 ml-6">
            <Link href="/pricing" className="block text-gray-300 hover:text-white">
              Pricing
            </Link>
            <Link href="/template" className="block text-gray-300 hover:text-white">
              Templates
            </Link>
            <Link href="/categories" className="block text-gray-300 hover:text-white">
              Help Centre
            </Link>
          </div>

          <div className="space-y-4 col-span-2 sm:grid-cols-1 sm:text-center md:col-span-1">
            <Link href="/documentation" className="block text-gray-300 hover:text-white">
              Documentation
            </Link>
            <Link href="/template/template1" className="block text-gray-300 hover:text-white">
              Personal
            </Link>
            <Link href="/template/template2" className="block text-gray-300 hover:text-white">
              Business
            </Link>
            <Link href="/template/template3" className="block text-gray-300 hover:text-white">
              Creative
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-800 text-sm text-gray-500 text-center">
        <p>© {new Date().getFullYear()} PortBuilder. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
