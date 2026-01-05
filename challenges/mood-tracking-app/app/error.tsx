"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { VerySad } from "@/components/icons/moods/colored/very-sad"

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string }
}) {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <VerySad />
        </div>
        
        <h1 className="mb-4 text-2xl font-semibold text-neutral-900">
          Something went wrong
        </h1>
        
        <p className="mb-8 text-neutral-600">
          We encountered an unexpected error. Please try again.
        </p>
        
        <Button asChild>
        <Link
          href="/"
        >
          Try Again
        </Link>
        </Button>
      </div>
    </div>
  )
}
