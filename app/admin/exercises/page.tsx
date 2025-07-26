import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function AdminExercises() {
  const exercises = await prisma.exercise.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: {
          templateRefs: true,
          setLogs: true,
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Exercise Management
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            Add Exercise
          </button>
          <Link
            href="/admin"
            className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Exercises Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {exercise.name}
                </h3>
                <div className="flex space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-900 text-sm">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900 text-sm">
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Category:</span>
                  <span className="text-gray-900">{exercise.category || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Muscle Group:</span>
                  <span className="text-gray-900">{exercise.muscleGroup || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Equipment:</span>
                  <span className="text-gray-900">{exercise.equipment || 'N/A'}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Used in templates:</span>
                  <span className="text-gray-900">{exercise._count.templateRefs}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total sets logged:</span>
                  <span className="text-gray-900">{exercise._count.setLogs}</span>
                </div>
              </div>

              {exercise.videoUrl && (
                <div className="mt-4">
                  <a
                    href={exercise.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-900 text-sm"
                  >
                    View Video →
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {exercises.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No exercises</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new exercise.</p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Add Exercise
            </button>
          </div>
        </div>
      )}
    </div>
  );
}