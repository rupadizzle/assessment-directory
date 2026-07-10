"use client";

import { useState, useRef } from "react";

export default function RightToChooseLetter() {
  const [formData, setFormData] = useState({
    patientName: "",
    dateOfBirth: "",
    address: "",
    nhsNumber: "",
    gpName: "",
    gpSurgery: "",
    gpAddress: "",
    preferredProvider: "",
    additionalNotes: "",
  });
  const [showLetter, setShowLetter] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const requiredFields = ["patientName", "gpName", "gpSurgery"];
  const canGenerate = requiredFields.every(
    (f) => formData[f as keyof typeof formData].trim() !== ""
  );

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleGenerate = () => {
    if (canGenerate) {
      setShowLetter(true);
      setTimeout(() => {
        letterRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleCopy = async () => {
    if (letterRef.current) {
      const text = letterRef.current.innerText;
      try {
        await navigator.clipboard.writeText(text);
        alert("Letter copied to clipboard");
      } catch {
        const range = document.createRange();
        range.selectNodeContents(letterRef.current);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {!showLetter ? (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-2">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">What is Right to Choose?</p>
                <p>
                  Under the NHS Constitution (England), you have the legal right
                  to choose which provider carries out your first outpatient
                  appointment. This means your GP can refer you to an approved
                  private ADHD assessment provider, with the NHS funding the cost.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Your Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => handleChange("patientName", e.target.value)}
                  placeholder="e.g. John Smith"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                    placeholder="e.g. 15/03/1990"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    NHS Number
                  </label>
                  <input
                    type="text"
                    value={formData.nhsNumber}
                    onChange={(e) => handleChange("nhsNumber", e.target.value)}
                    placeholder="e.g. 123 456 7890"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="e.g. 10 High Street, London, SW1A 1AA"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">GP Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GP Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.gpName}
                  onChange={(e) => handleChange("gpName", e.target.value)}
                  placeholder="e.g. Dr Sarah Johnson"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GP Surgery Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.gpSurgery}
                  onChange={(e) => handleChange("gpSurgery", e.target.value)}
                  placeholder="e.g. Riverside Medical Centre"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GP Surgery Address
                </label>
                <input
                  type="text"
                  value={formData.gpAddress}
                  onChange={(e) => handleChange("gpAddress", e.target.value)}
                  placeholder="e.g. 25 Station Road, London, E1 6AN"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">
              Preferred Provider (Optional)
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Private Provider
                </label>
                <input
                  type="text"
                  value={formData.preferredProvider}
                  onChange={(e) =>
                    handleChange("preferredProvider", e.target.value)
                  }
                  placeholder="e.g. Psychiatry-UK, Clinical Partners"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  If you know which provider you&apos;d like to be referred to,
                  include their name here. The provider must be approved for NHS
                  Right to Choose referrals.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) =>
                    handleChange("additionalNotes", e.target.value)
                  }
                  placeholder="Any additional context about your symptoms or reasons for requesting this referral..."
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className={`px-8 py-3 rounded-xl font-medium text-sm transition-all ${
                canGenerate
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-sm hover:shadow-md"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              Generate My Letter
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center leading-relaxed">
            Your details are processed entirely in your browser. Nothing is
            stored or sent to any server.
          </p>
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy to Clipboard
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-50 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Letter
            </button>
            <button
              onClick={() => setShowLetter(false)}
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 px-4 py-2.5 text-sm transition-colors"
            >
              Edit Details
            </button>
          </div>

          <div
            ref={letterRef}
            className="bg-white rounded-xl border border-gray-200 p-8 sm:p-10 print:border-0 print:p-0 print:rounded-none"
          >
            <div className="space-y-6 text-sm text-gray-800 leading-relaxed">
              {formData.address && <p>{formData.address}</p>}
              <p>{today}</p>

              <div>
                <p>{formData.gpName}</p>
                <p>{formData.gpSurgery}</p>
                {formData.gpAddress && <p>{formData.gpAddress}</p>}
              </div>

              <p>Dear {formData.gpName},</p>

              <p>
                <strong>Re: Request for ADHD Assessment Referral Under NHS Right to Choose</strong>
              </p>

              {(formData.dateOfBirth || formData.nhsNumber) && (
                <p>
                  Patient: {formData.patientName}
                  {formData.dateOfBirth && <>, DOB: {formData.dateOfBirth}</>}
                  {formData.nhsNumber && <>, NHS No: {formData.nhsNumber}</>}
                </p>
              )}

              <p>
                I am writing to request a referral for an ADHD assessment under
                my legal Right to Choose, as set out in the NHS Constitution for
                England (Section 3a) and the NHS Long Term Plan.
              </p>

              <p>
                Under the Right to Choose, patients are entitled to choose any
                qualified provider that has a contract with an NHS commissioner
                for their first outpatient appointment. This right is supported
                by NHS England guidance and has been confirmed in writing by the
                Secretary of State for Health and Social Care.
              </p>

              <p>
                I have been experiencing symptoms that I believe may be
                consistent with ADHD, including difficulties with concentration,
                organisation, time management, and/or impulse control. These
                symptoms have been affecting my daily life and I would like to be
                assessed by a qualified professional.
              </p>

              {formData.additionalNotes && (
                <p>{formData.additionalNotes}</p>
              )}

              <p>
                I understand that the current NHS waiting time for an ADHD
                assessment in our area may be considerable. I would therefore
                like to exercise my Right to Choose and request a referral to
                {formData.preferredProvider
                  ? ` ${formData.preferredProvider}, which is`
                  : " a provider that is"}{" "}
                approved for NHS Right to Choose ADHD assessments.
              </p>

              <p>
                For reference, NHS England has published guidance confirming that
                the Right to Choose applies to ADHD assessment services. The
                relevant guidance can be found on the NHS England website. The
                referring GP practice is responsible for making the referral, and
                the cost is covered by NHS commissioning arrangements — there is
                no cost to the patient or the GP practice.
              </p>

              <p>
                I would be grateful if you could process this referral at your
                earliest convenience. If you have any questions about the Right
                to Choose process, I am happy to discuss this further or to
                provide additional information.
              </p>

              <p>Thank you for your time and support.</p>

              <p>Yours sincerely,</p>

              <p>{formData.patientName}</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 leading-relaxed">
              <span className="font-medium">Note:</span> This letter template is
              for guidance only. The Right to Choose currently applies in England
              for ADHD assessments. It does not apply to autism assessments, nor
              does it apply in Scotland, Wales, or Northern Ireland which have
              separate NHS systems. We recommend checking with your GP or ICB for
              the latest guidance in your area.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
