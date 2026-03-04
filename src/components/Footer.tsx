import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AD</span>
              </div>
              <span className="font-semibold text-white text-lg">
                UK Assessment Directory
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Helping you find trusted private ADHD and Autism assessment clinics
              across the UK.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Assessments</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/adhd-assessment/"
                  className="hover:text-white transition-colors"
                >
                  ADHD Assessment
                </Link>
              </li>
              <li>
                <Link
                  href="/autism-assessment/"
                  className="hover:text-white transition-colors"
                >
                  Autism Assessment
                </Link>
              </li>
              <li>
                <Link
                  href="/adhd-assessment/london/"
                  className="hover:text-white transition-colors"
                >
                  ADHD Assessment London
                </Link>
              </li>
              <li>
                <Link
                  href="/autism-assessment/manchester/"
                  className="hover:text-white transition-colors"
                >
                  Autism Assessment Manchester
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Guides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/guides/how-much-does-private-adhd-assessment-cost/"
                  className="hover:text-white transition-colors"
                >
                  ADHD Assessment Cost
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/private-vs-nhs-adhd-assessment/"
                  className="hover:text-white transition-colors"
                >
                  Private vs NHS
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/right-to-choose-adhd/"
                  className="hover:text-white transition-colors"
                >
                  Right to Choose
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/signs-of-autism-in-adults/"
                  className="hover:text-white transition-colors"
                >
                  Signs of Autism in Adults
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">For Clinics</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/list-your-clinic/"
                  className="hover:text-white transition-colors"
                >
                  List Your Clinic
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing/"
                  className="hover:text-white transition-colors"
                >
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-500 flex flex-col sm:flex-row justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} UK Assessment Directory. All rights reserved.</p>
          <p>
            This directory is for informational purposes only and does not
            constitute medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
