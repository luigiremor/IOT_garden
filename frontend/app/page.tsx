import { Suspense } from 'react'
import { Metadata } from 'next'
import Dashboard from '@/components/Dashboard'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata: Metadata = {
  title: 'Urban Garden IoT Dashboard',
  description: 'Monitor and control your urban garden with IoT sensors',
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen mx-auto">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <h1 className="text-lg font-semibold">Urban Garden IoT Dashboard</h1>
      </header>
      <main className="flex-1 p-4 lg:p-6">
        <Suspense fallback={<DashboardSkeleton />}>
          <Dashboard />
        </Suspense>
      </main>
      <footer className="py-4 px-4 lg:px-6 border-t">
        <p className="text-sm text-center text-gray-500">
          © 2024 Urban Garden IoT. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-[250px]" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[200px]" />
        ))}
      </div>
      <Skeleton className="h-[300px]" />
      <Skeleton className="h-[200px]" />
    </div>
  )
}

