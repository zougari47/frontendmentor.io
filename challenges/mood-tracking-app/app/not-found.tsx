"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Neutral } from "@/components/icons/moods/colored/neutral"

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div className="relative">
            <Neutral />
          </div>
        </div>
        
        <h1 className="mb-4 txt-preset-3 text-neutral-900">
              <span className="txt-preset-1 text-neutral-900 block">404</span>
          Page not found
        </h1>
        
        <p className="mb-8 txt-preset-6 text-neutral-600">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button asChild>
          <Link href="/dashboard">
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  )
}
