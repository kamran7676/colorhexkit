"use client";

import { Github, Mail, Coffee } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border dark:border-white/5 backdrop-blur-sm bg-background/50 dark:bg-stone-950">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* LOGO + DESCRIPTION */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/colorhexkit-logo.svg"
                alt="ColorHexKit Logo"
                width={37}
                height={37}
                className="rounded-lg object-contain"
                priority
              />
              <span className="font-bold text-lg text-foreground dark:text-white font-clash-grotesk">
                ColorHexKit
              </span>
            </div>
            <p className="text-sm text-muted-foreground dark:text-white/60 leading-relaxed">
              Made for designers and visual creators, ColorHexKit helps you explore inspiring colors and effortlessly create beautiful, balanced palettes for any project.
            </p>
          </div>

          {/* TOOLS */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground dark:text-white">
              Tools
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-white/60">
              <li>
                <Link
                  href="/picker"
                  className="hover:text-foreground dark:hover:text-white transition-colors"
                >
                  Color Picker
                </Link>
              </li>
              <li>
                <Link
                  href="/palettes"
                  className="hover:text-foreground dark:hover:text-white transition-colors"
                >
                  Palette Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/contrast-checker"
                  className="hover:text-foreground dark:hover:text-white transition-colors"
                >
                  Contrast Checker
                </Link>
              </li>
              <li>
                <Link
                  href="/coming-soon"
                  className="hover:text-foreground dark:hover:text-white transition-colors"
                >
                  Color Converter
                </Link>
              </li>
              <li>
                <Link
                  href="/gradients"
                  className="hover:text-foreground dark:hover:text-white transition-colors"
                >
                  Gradient Maker
                </Link>
              </li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground dark:text-white">
              Resources
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-white/60">
              <li>
                <Link
                  href="/about"
                  className="hover:text-foreground dark:hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-foreground dark:hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/coming-soon"
                  className="hover:text-foreground dark:hover:text-white transition-colors"
                >
                  API Reference
                </Link>
              </li> */}
              <li>
                <Link
                  href="/terms"
                  className="hover:text-foreground dark:hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* CONNECT */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground dark:text-white">
              Connect
            </h3>
            <div className="flex gap-3">
              {[
                { icon: Github, href: "https://github.com/kamran7676/colorhexkit" },
                { icon: Mail, href: "mailto:kamranameer76@gmail.com" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 rounded-full border border-border dark:border-white/10 flex items-center justify-center bg-muted/40 dark:bg-white/5 hover:bg-muted/70 dark:hover:bg-white/10 transition-all hover:scale-110"
                >
                  <Icon className="w-5 h-5 text-muted-foreground dark:text-white/60" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col  justify-between items-center">
          <p className="text-neutral-400 text-sm mb-4 md:mb-0 font-satoshi">
            &copy; {new Date().getFullYear()} ColorHexKit. All rights reserved.{" "}
          </p>
          <p className="text-neutral-400 text-sm flex items-center font-satoshi">
            Made by{" "}
            <Coffee className="w-4 h-4 mx-1 text-[#fcda03]" />
            <a
              href="https://github.com/kamran7676"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground dark:text-white hover:none active:no-underline transition-colors"
            >
              Kamran Ameer
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
