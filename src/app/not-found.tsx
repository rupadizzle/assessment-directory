import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <p className="text-6xl font-bold text-blue-600 mb-4">404</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-3">
        Page Not Found
      </h1>
      <p className="text-gray-500 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Try
        one of these instead:
      </p>
      <div className="grid sm:grid-cols-2 gap-3 text-left mb-8">
        <Link
          href="/adhd-assessment/"
          className="bg-white rounded-xl border border-gray-200/60 p-4 hover:shadow-md hover:border-blue-200 transition-all"
        >
          <p className="font-medium text-gray-900 text-sm">ADHD Assessments</p>
          <p className="text-xs text-gray-500 mt-1">
            Find private ADHD clinics near you
          </p>
        </Link>
        <Link
          href="/autism-assessment/"
          className="bg-white rounded-xl border border-gray-200/60 p-4 hover:shadow-md hover:border-purple-200 transition-all"
        >
          <p className="font-medium text-gray-900 text-sm">
            Autism Assessments
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Find private autism clinics near you
          </p>
        </Link>
        <Link
          href="/tools/"
          className="bg-white rounded-xl border border-gray-200/60 p-4 hover:shadow-md hover:border-blue-200 transition-all"
        >
          <p className="font-medium text-gray-900 text-sm">Free Tools</p>
          <p className="text-xs text-gray-500 mt-1">
            Screening quizzes, letters and calculators
          </p>
        </Link>
        <Link
          href="/guides/"
          className="bg-white rounded-xl border border-gray-200/60 p-4 hover:shadow-md hover:border-blue-200 transition-all"
        >
          <p className="font-medium text-gray-900 text-sm">Guides</p>
          <p className="text-xs text-gray-500 mt-1">
            Costs, waiting times and how assessments work
          </p>
        </Link>
      </div>
      <Link
        href="/"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
      >
        Back to Homepage
      </Link>
    </div>
  );
}
