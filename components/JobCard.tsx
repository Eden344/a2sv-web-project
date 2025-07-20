import React from 'react'

type Job = {
  title: string
  description: string
  company: string
  image: string
  about: {
    location: string
    posted_on: string
    deadline: string
  }
}

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <img
          src={job.image}
          alt="Company Logo"
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
          <p className="text-gray-500">{job.company}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>
      <div className="flex justify-between text-sm text-gray-600">
        <span>📍 {job.about.location}</span>
        <span>📅 {job.about.posted_on}</span>
      </div>
    </div>
  )
}
