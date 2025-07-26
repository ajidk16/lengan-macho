import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function AdminAnalytics() {
  // Get analytics data
  const [
    totalUsers,
    totalWorkouts,
    totalExercises,
    totalBadges,
    recentActivity,
    userGrowth,
    popularExercises,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.workoutSession.count(),
    prisma.exercise.count(),
    prisma.badge.count(),
    prisma.workoutSession.findMany({
      take: 10,
      orderBy: { startTime: 'desc' },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    }),
    prisma.user.groupBy({
      by: ['createdAt'],
      _count: true,
      orderBy: { createdAt: 'desc' },
      take: 30,
    }),
    prisma.exercise.findMany({
      include: {
        _count: {
          select: { setLogs: true },
        },
      },
      orderBy: {
        setLogs: { _count: 'desc' },
      },
      take: 5,
    }),
  ]);

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Analytics Dashboard
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            href="/admin"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">U</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Users
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {totalUsers}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">W</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Workouts
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {totalWorkouts}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">E</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Exercises
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {totalExercises}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">B</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Badges
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {totalBadges}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Recent Workout Activity
            </h3>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.user.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(activity.startTime).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {activity.volumeKg ? `${activity.volumeKg}kg` : 'No volume'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Exercises */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Most Popular Exercises
            </h3>
            <div className="space-y-3">
              {popularExercises.map((exercise, index) => (
                <div key={exercise.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500 w-6">
                      #{index + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-900 ml-2">
                      {exercise.name}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {exercise._count.setLogs} sets
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* User Growth Chart Placeholder */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            User Growth (Last 30 Days)
          </h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">
              Chart visualization would go here
              <br />
              <span className="text-sm">
                Total new users: {userGrowth.length}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}