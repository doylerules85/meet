'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="w-full flex justify-between items-center">
        <Link
          href="/"
          className="text-foreground text-2xl font-bold hover:text-accent-foreground transition-colors font-sans uppercase tracking-wider"
        >
          Teach Teach
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop navigation */}
      <ul className="hidden md:flex flex-nowrap whitespace-nowrap gap-4 text-accent-foreground">
        <li>
          <Link href="/blog" className="hover:underline transition-colors uppercase tracking-wide">
            Blog
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="hover:underline transition-colors uppercase tracking-wide"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            href={`/auth/sign-up`}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-transparent transition-colors uppercase tracking-wide border border-foreground"
          >
            Sign Up
          </Link>
        </li>
      </ul>

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <ul className="md:hidden w-full flex flex-col gap-4 text-accent-foreground animate-in slide-in-from-top">
          <li>
            <Link
              href="/blog"
              className="block py-2 hover:underline transition-colors uppercase tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block py-2 hover:underline transition-colors uppercase tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/auth/login"
              className="block py-2 hover:underline transition-colors uppercase tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              href={`/auth/sign-up`}
              className="block w-full text-center bg-light-green text-primary-foreground px-4 py-2 rounded-md hover:bg-transparent transition-colors uppercase tracking-wide border border-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
