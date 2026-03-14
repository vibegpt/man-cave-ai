'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            ManCaveAI
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/man-cave-ideas" className="text-gray-700 hover:text-gray-900">
              Ideas
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900">
              Contact
            </Link>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open menu</span>
            <div className="w-6 h-6 flex flex-col justify-around">
              <span className="w-full h-0.5 bg-gray-700"></span>
              <span className="w-full h-0.5 bg-gray-700"></span>
              <span className="w-full h-0.5 bg-gray-700"></span>
            </div>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Link href="/" className="block py-2 text-gray-700">Home</Link>
            <Link href="/man-cave-ideas" className="block py-2 text-gray-700">Ideas</Link>
            <Link href="/about" className="block py-2 text-gray-700">About</Link>
            <Link href="/contact" className="block py-2 text-gray-700">Contact</Link>
          </div>
        )}
      </div>
    </header>
  )
}
