'use client'

import JobCard from '../components/JobCard'
import jobsData from '../data/jobs.json'

export default function Home() {
  const jobs = jobsData.job_postings

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Job Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </main>
  )
}
