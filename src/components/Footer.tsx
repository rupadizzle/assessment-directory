import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">AD</span>
              </div>
              <span className="font-semibold text-white text-lg tracking-tight">
                UK Assessment Directory
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Helping you find trusted private ADHD and Autism assessment clinics
              across the UK.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Assessments</h3>
            <ul className="space-y-2.5 text-sm">
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
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Guides</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/guides/"
                  className="hover:text-white transition-colors"
                >
                  All Guides
                </Link>
              </li>
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
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">For Clinics</h3>
            <ul className="space-y-2.5 text-sm">
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

            <h3 className="font-semibold text-white mb-4 mt-7 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/about/"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy/"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms/"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Medical disclaimer */}
        <div className="border-t border-gray-800/50 mt-10 pt-6">
          <p className="text-xs text-gray-500 leading-relaxed max-w-4xl">
            <strong className="text-gray-400">Medical Disclaimer:</strong> UK
            Assessment Directory is an informational service only and does not
            provide medical advice, diagnosis, or treatment. The information on
            this website should not be used as a substitute for professional
            medical advice. Always consult a qualified healthcare professional
            before making decisions about your health. We do not endorse or
            recommend any specific clinic. Paid listings are labelled as
            &ldquo;Featured&rdquo; or &ldquo;Premium&rdquo;. Clinic information
            is verified at the time of listing but may change — please confirm
            details directly with the clinic before booking.
          </p>
        </div>

        <div className="border-t border-gray-800/50 mt-5 pt-5 text-xs text-gray-500 flex flex-col sm:flex-row justify-between gap-4">
          <p>
            &copy; {new Date().getFullYear()} UK Assessment Directory. All
            rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy-policy/" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms/" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/about/" className="hover:text-white transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
