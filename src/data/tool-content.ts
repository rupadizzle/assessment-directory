// Server-rendered supporting content for each interactive tool page.
// Rendered by src/components/ToolSeoContent.tsx along with FAQPage and
// BreadcrumbList structured data. Keep answers factual and UK-specific —
// this is YMYL content.

export interface ToolContent {
  name: string;
  aboutTitle: string;
  paragraphs: string[];
  faqs: { question: string; answer: string }[];
  related: string[];
}

export const TOOL_CONTENT: Record<string, ToolContent> = {
  "adhd-screening": {
    name: "ADHD Screening Quiz",
    aboutTitle: "About the ADHD Self-Screening Quiz",
    paragraphs: [
      "This quiz uses Part A of the Adult ADHD Self-Report Scale (ASRS-v1.1), a six-question screener developed by the World Health Organisation with researchers at Harvard Medical School and New York University. It is the same questionnaire many UK clinics and NHS services use as a first step before a full diagnostic assessment.",
      "The six questions cover the symptoms found to be most predictive of adult ADHD: difficulty finishing tasks, getting organised, remembering appointments, avoiding effortful work, fidgeting, and feeling driven by a motor. Four or more answers in the shaded scoring range is considered a positive screen — a signal that your symptoms are consistent with ADHD and worth discussing with a clinician.",
      "A positive screen is not a diagnosis. Only a qualified clinician — usually a psychiatrist, specialist nurse or clinical psychologist — can diagnose ADHD after a structured assessment covering your symptoms, childhood history and their impact across different areas of your life. If you screen positive, sensible next steps are talking to your GP, asking about a Right to Choose referral (England only), or comparing private assessment clinics.",
    ],
    faqs: [
      {
        question: "How accurate is the ASRS-v1.1 screening quiz?",
        answer:
          "In validation studies, the six-question ASRS Part A correctly classified around 68% of people, with high sensitivity — it rarely misses true ADHD. But it also produces false positives, because anxiety, depression, sleep problems and stress can cause similar scores. Treat a positive result as a reason to seek a proper assessment, not as a diagnosis.",
      },
      {
        question: "I scored positive — what should I do next?",
        answer:
          "Book a GP appointment and bring your result with you. In England you can ask for a Right to Choose referral to an NHS-funded provider with a much shorter wait than your local service. Alternatively, you can book a private assessment directly — typical UK costs are £495 to £1,500 for adults.",
      },
      {
        question: "Can this quiz diagnose ADHD?",
        answer:
          "No. ADHD can only be diagnosed by a qualified clinician after a full assessment, which typically includes a structured interview about your current symptoms, evidence of symptoms in childhood, and how they affect your work, relationships and daily life. A screening quiz simply indicates whether a full assessment is worth pursuing.",
      },
      {
        question: "Is my quiz result stored anywhere?",
        answer:
          "No. Your answers are processed entirely in your browser and are never sent to our servers or stored. If you want to keep your result, note down your score before leaving the page — it can be useful to show your GP.",
      },
    ],
    related: ["adhd-in-women", "adhd-vs-anxiety", "gp-script"],
  },

  "autism-screening": {
    name: "Autism Screening Quiz",
    aboutTitle: "About the AQ-10 Autism Screening Quiz",
    paragraphs: [
      "This quiz is based on the AQ-10, a ten-question version of the Autism Spectrum Quotient developed at the Autism Research Centre, University of Cambridge. It is the screening tool NICE recommends UK GPs use when deciding whether to refer an adult for an autism assessment, so your result speaks the same language your doctor uses.",
      "The questions cover social communication, attention to detail, imagination and tolerance of change. A score of 6 or more out of 10 is the NICE threshold at which a referral for a full diagnostic assessment should be considered.",
      "Many autistic adults — particularly women and people who mask heavily — score below threshold on brief screeners while still being autistic, so a low score does not rule autism out. Equally, a high score is not a diagnosis. A full assessment, usually involving a detailed developmental interview and tools such as the ADOS-2, is the only way to get a definitive answer.",
    ],
    faqs: [
      {
        question: "What does my AQ-10 score mean?",
        answer:
          "A score of 6 or more suggests you have a significant number of autistic traits and that a full diagnostic assessment is worth considering — this is the threshold NICE sets for GP referral. A score below 6 makes autism less likely but does not exclude it, particularly if you consciously camouflage your traits.",
      },
      {
        question: "How do I get an autism assessment in the UK?",
        answer:
          "Ask your GP for a referral to an autism assessment service. NHS waits are commonly two to five years. In England, the Right to Choose lets your GP refer you to an NHS-commissioned independent provider with a shorter wait. Private adult autism assessments typically cost £1,200 to £3,000.",
      },
      {
        question: "Can adults be diagnosed with autism?",
        answer:
          "Yes. Many people — especially women, and anyone who grew up before autism was well understood — reach adulthood undiagnosed. Adult diagnosis is increasingly common, and a formal diagnosis can unlock workplace adjustments, university support and, for some people, a better understanding of their whole life history.",
      },
      {
        question: "Could my traits be ADHD rather than autism?",
        answer:
          "They can overlap — difficulties with attention, social exhaustion and sensory sensitivity occur in both, and an estimated 30–50% of autistic people also have ADHD. Many UK clinics offer combined assessments. If you are unsure, our ADHD screening quiz and sensory profile tool can help you see which pattern fits better before you seek assessment.",
      },
    ],
    related: ["masking-quiz", "sensory-profile", "adhd-screening"],
  },

  "nhs-wait-times": {
    name: "NHS Wait Times",
    aboutTitle: "About NHS ADHD & Autism Waiting Times",
    paragraphs: [
      "NHS waiting times for adult ADHD and autism assessments vary enormously depending on where you live. Some areas assess within months; in others the published wait exceeds five years, and several services have closed their lists to new adult referrals entirely. This tool shows the estimated wait for your local Integrated Care Board (ICB) area so you know what you are facing before you decide how to proceed.",
      "Demand for assessments has risen sharply — referrals for adult ADHD assessment have grown severalfold since 2020 — while assessment capacity has not kept pace. That mismatch, not clinical complexity, is the main driver of long waits.",
      "If your local wait is long, you have options. In England, the Right to Choose gives you a legal right to be referred to an NHS-commissioned independent provider, often reducing the wait to weeks at no cost to you. Alternatively, private assessment is available UK-wide, typically costing £495–£1,500 for ADHD and £1,200–£3,000 for autism.",
    ],
    faqs: [
      {
        question: "Why are NHS waits for ADHD and autism assessment so long?",
        answer:
          "Referrals have risen far faster than assessment capacity. Greater awareness, reduced stigma and better recognition of ADHD and autism in adults and women have driven demand up severalfold since 2020, while many NHS services still have small specialist teams. The result is queues measured in years in many areas.",
      },
      {
        question: "How accurate are these wait time figures?",
        answer:
          "They are estimates compiled from published ICB and provider data and should be treated as indicative. Actual waits change month to month and can differ between ADHD and autism pathways within the same area. Your GP or the service itself can give you the current figure for a specific referral.",
      },
      {
        question: "Can I skip the NHS waiting list?",
        answer:
          "In England, yes — the Right to Choose lets your GP refer you to an NHS-commissioned independent provider such as those with waits of weeks rather than years, fully NHS-funded. In Scotland, Wales and Northern Ireland, Right to Choose does not apply, but you can still self-fund a private assessment at any time.",
      },
      {
        question: "Will I lose my NHS place if I go private?",
        answer:
          "No. Having a private assessment does not remove you from an NHS waiting list — you can stay on the list while you pursue a private diagnosis. Many people get assessed privately, start treatment, and later transfer their ongoing care back to the NHS via a shared care agreement with their GP.",
      },
    ],
    related: ["right-to-choose-letter", "waiting-list-tracker", "cost-calculator"],
  },

  "cost-calculator": {
    name: "Cost Calculator",
    aboutTitle: "About Private Assessment Costs in the UK",
    paragraphs: [
      "Private ADHD assessments for adults typically cost £495 to £1,500 in the UK, while adult autism assessments range from £1,200 to £3,000. Children's assessments usually sit at the higher end because they involve school observation and parent interviews. This calculator helps you estimate the full cost for your situation — not just the headline assessment fee.",
      "The assessment itself is only part of the picture. If you are diagnosed with ADHD and want medication, you will usually pay for a titration period (dose-finding), typically £150–£500 across several follow-up appointments, plus private prescription costs of £50–£150 per month until your GP agrees to a shared care arrangement. Some clinics bundle these costs; others charge separately — always ask before booking.",
      "If you live in England, remember that the Right to Choose route can make the entire pathway free: your GP refers you to an NHS-commissioned independent provider, and the NHS pays for assessment, titration and prescribing. The trade-off is usually a somewhat longer wait than paying privately.",
    ],
    faqs: [
      {
        question: "Why do private assessment prices vary so much?",
        answer:
          "Prices reflect the assessor's seniority (consultant psychiatrist versus specialist nurse), the assessment length and tools used (a QbTest or ADOS-2 adds cost), the report's depth, and whether follow-up appointments are bundled. A cheap headline price with expensive mandatory follow-ups can cost more overall than a comprehensive package.",
      },
      {
        question: "What hidden costs should I watch out for?",
        answer:
          "The most common are titration fees (£150–£500), private prescriptions (£50–£150 a month), extra reports or letters (£50–£150 each), and annual reviews required to keep prescribing. Ask every clinic for their full pathway cost through to a shared care agreement, not just the assessment fee.",
      },
      {
        question: "Can I get the cost covered by the NHS?",
        answer:
          "In England, yes — via Right to Choose. Your GP refers you to an NHS-commissioned independent provider and the NHS funds assessment, titration and prescribing. Some private health insurance policies also cover assessments, though many exclude ADHD and autism as pre-existing or developmental conditions — check your policy wording.",
      },
      {
        question: "Do clinics offer payment plans?",
        answer:
          "Many do. Instalment plans spreading the fee over 3–12 months are increasingly common, and some clinics offer reduced rates for students or people on low incomes. Our clinic listings show pricing for each provider so you can compare before enquiring.",
      },
    ],
    related: ["adhd-tax-calculator", "clinic-comparison", "right-to-choose-letter"],
  },

  "right-to-choose-letter": {
    name: "Right to Choose Letter",
    aboutTitle: "About the Right to Choose",
    paragraphs: [
      "The Right to Choose is a legal right under the NHS Constitution in England. When your GP refers you to a consultant-led service — including ADHD and autism assessment — you are entitled to choose any provider in England that holds an NHS contract for that service, including independent providers whose waits are often weeks rather than years. The NHS pays; it costs you nothing.",
      "In practice, many patients and even some GPs are unfamiliar with the process, which is where a clear written request helps. This generator produces a letter you can hand to or email your GP practice, naming your chosen provider and citing the relevant guidance, so the referral can be made without back-and-forth.",
      "Right to Choose applies in England only, to adults registered with an English GP, and the referral must come from your GP. It does not apply if you are already on a waiting list with another provider for the same assessment — though you can usually ask to switch.",
    ],
    faqs: [
      {
        question: "Can my GP refuse a Right to Choose referral?",
        answer:
          "A GP can decline to refer you at all if they do not believe an assessment is clinically appropriate — that is a clinical judgement. But if they agree a referral is warranted, they cannot refuse your choice of an NHS-commissioned provider: the legal right to choose belongs to you. If a practice refuses on funding grounds, ask them to put the refusal in writing and contact your ICB's patient services team.",
      },
      {
        question: "Which providers can I choose?",
        answer:
          "Any provider in England holding an NHS contract for the service you need. For adult ADHD, well-known Right to Choose providers include several large online psychiatry services; waits vary from a few weeks to several months and change over time, so check current waits before naming a provider in your letter.",
      },
      {
        question: "Does Right to Choose cover medication and titration?",
        answer:
          "Yes. If the provider diagnoses ADHD and recommends medication, titration is included in the NHS-funded pathway. Once you are stable on a dose, the provider will ask your GP to take over prescribing under a shared care agreement — the same arrangement used after an NHS clinic assessment.",
      },
      {
        question: "I live in Scotland, Wales or Northern Ireland — can I use this?",
        answer:
          "No — Right to Choose is England-only. In the devolved nations you can ask about local pathways and waiting time targets, request an out-of-area referral in some circumstances, or self-fund a private assessment. A private diagnosis is still valid UK-wide.",
      },
    ],
    related: ["gp-script", "nhs-wait-times", "shared-care-letter"],
  },

  "gp-script": {
    name: "GP Appointment Script",
    aboutTitle: "About Talking to Your GP",
    paragraphs: [
      "A GP appointment lasts about ten minutes, and what you say in it largely determines whether you leave with a referral. GPs need specific things to justify a referral: concrete examples of your symptoms, evidence they have been present a long time, and a clear picture of how they impair your work, studies, relationships or health. Vague statements like \"I think I might have ADHD\" are easy to deflect; specific, structured evidence is not.",
      "This tool builds a short script from your answers — your main symptoms, how long you have had them, and their real-world impact — so you can say the important things clearly even if you are nervous, get side-tracked, or freeze under pressure (all common with ADHD).",
      "Bring supporting material if you have it: a positive ASRS or AQ-10 screening result, examples from school reports, or notes from family. If you live in England and want a faster assessment, mention Right to Choose by name and, ideally, the provider you would like to be referred to.",
    ],
    faqs: [
      {
        question: "What should I say to my GP about ADHD or autism?",
        answer:
          "Lead with impact, not labels: describe two or three specific, recent situations where your symptoms caused real problems — missed deadlines, disciplinary issues, burnout, relationship strain. Then add history (symptoms since childhood or as long as you can remember) and what you have already tried. Finish with a clear ask: a referral for assessment.",
      },
      {
        question: "What if my GP dismisses my concerns?",
        answer:
          "Ask them to record your request and their reasons in your notes, then ask what evidence would change their mind. You are entitled to a second opinion from another GP at the same practice. A completed screening questionnaire and written symptom examples make dismissal much harder — bring them to a follow-up appointment.",
      },
      {
        question: "Do I need to see my GP before a private assessment?",
        answer:
          "No — you can book a private assessment directly without a referral in most cases. But involving your GP early still pays off: they hold your medical history, and you will need their cooperation later for a shared care agreement if you want NHS prescribing after a private ADHD diagnosis.",
      },
      {
        question: "Should I mention Right to Choose in the appointment?",
        answer:
          "Yes, if you are in England and want a faster NHS-funded assessment. Name the scheme, name your preferred NHS-commissioned provider, and bring a printed Right to Choose request letter. GPs process these routinely once the paperwork is in front of them — our letter generator produces one in a couple of minutes.",
      },
    ],
    related: ["right-to-choose-letter", "evidence-builder", "adhd-screening"],
  },

  "adhd-in-women": {
    name: "ADHD in Women Quiz",
    aboutTitle: "About ADHD in Women",
    paragraphs: [
      "ADHD in women and girls is systematically underdiagnosed. Boys are diagnosed far more often in childhood, yet by adulthood the gender gap narrows dramatically — meaning a generation of women grew up with unrecognised ADHD. The main reason is presentation: women are more likely to have the inattentive form, whose daydreaming, disorganisation and mental overwhelm are less disruptive in a classroom than hyperactivity, and therefore less likely to be flagged.",
      "Women also mask more: perfectionism, over-preparation, people-pleasing and working twice as hard behind the scenes can hide the struggle for decades, at the cost of chronic exhaustion, anxiety and burnout. Many women are first diagnosed after their child receives a diagnosis, or when coping strategies collapse under the load of career and family demands.",
      "Hormones matter too. Oestrogen affects dopamine signalling, so ADHD symptoms often worsen premenstrually, after childbirth and during perimenopause — and many women report their symptoms were dismissed as anxiety, depression or 'just hormones'. This screening quiz asks about the traits and life patterns most characteristic of ADHD as it presents in women.",
    ],
    faqs: [
      {
        question: "Why was my ADHD missed when I was younger?",
        answer:
          "Diagnostic criteria and teacher expectations were built around hyperactive young boys. Inattentive symptoms — quiet distractibility, disorganisation, forgetfulness — rarely disrupt a classroom, so bright girls who scraped by with last-minute effort were labelled dreamy or lazy instead of being assessed. High intelligence and heavy masking hide it further.",
      },
      {
        question: "How is ADHD different in women?",
        answer:
          "The core condition is the same, but women more often have inattentive presentation, more internalised symptoms (racing thoughts, emotional overwhelm, shame), more masking, and more co-occurring anxiety and depression — which frequently get diagnosed instead of the underlying ADHD. Symptoms also commonly fluctuate with the menstrual cycle and worsen in perimenopause.",
      },
      {
        question: "Is this quiz different from the standard ADHD screener?",
        answer:
          "Yes. The standard ASRS asks about classic DSM symptoms. This quiz additionally covers patterns common in women — masking, burnout cycles, hormonal symptom shifts, and internalised coping — that standard screeners can miss. For the strongest case to bring to a clinician, take both.",
      },
      {
        question: "Will an assessor take ADHD in women seriously?",
        answer:
          "Good assessors are well aware of the female presentation, and awareness has improved substantially in recent years. When choosing a clinic, it is reasonable to ask whether their clinicians have experience assessing women. Bring concrete lifetime examples — school reports and family recollections help show the pattern started in childhood, which the diagnosis requires.",
      },
    ],
    related: ["adhd-screening", "masking-quiz", "adhd-vs-anxiety"],
  },

  "assessment-prep": {
    name: "Assessment Prep Checklist",
    aboutTitle: "About Preparing for Your Assessment",
    paragraphs: [
      "A diagnostic assessment is only as good as the information it is based on, and much of that information comes from you. Preparing properly — gathering documents, examples and informant input in advance — makes the difference between a smooth, accurate assessment and one where you leave thinking of everything you forgot to say.",
      "For ADHD, assessors need evidence that symptoms existed in childhood (before age 12) and occur in more than one setting. Old school reports are gold: comments like \"easily distracted\", \"doesn't finish work\" or \"talks constantly\" are exactly what clinicians look for. A parent, sibling or long-term partner who can complete an informant questionnaire or join part of the appointment strengthens the picture further.",
      "For autism assessments, a developmental history is central, so a parent or someone who knew you as a young child is even more valuable. Either way, most clinics send questionnaires to complete beforehand — doing them carefully and returning them on time keeps your assessment date on track. This checklist walks you through everything to gather.",
    ],
    faqs: [
      {
        question: "What documents should I bring to an ADHD or autism assessment?",
        answer:
          "School reports if you can get them, any previous mental health assessments or diagnoses, a list of current medications, your completed pre-assessment questionnaires, and written notes of specific symptom examples from work and home. For autism assessments, anything documenting early childhood — health visitor records, parents' recollections — is especially useful.",
      },
      {
        question: "What if I can't get my school reports or a parent's input?",
        answer:
          "You can still be assessed. Clinicians regularly diagnose adults with no childhood documentation, using your own recollections, other informants (siblings, old friends, partners), and the overall clinical picture. Tell the clinic in advance so they can plan the assessment accordingly — do not let missing paperwork stop you from booking.",
      },
      {
        question: "How long does an assessment take?",
        answer:
          "Adult ADHD assessments typically take 1.5 to 3 hours, sometimes split across two appointments, plus questionnaires beforehand. Autism assessments are usually longer — often two or more sessions covering a clinical interview and a structured observation such as the ADOS-2, plus a developmental interview with someone who knew you as a child.",
      },
      {
        question: "Should I stop masking during the assessment?",
        answer:
          "Be as honest and unfiltered as you can. Assessors know adults arrive with decades of compensation strategies, but the assessment works best when you describe what things actually cost you — the hours of preparation, the recovery time, the systems holding your life together — rather than the polished surface you normally present.",
      },
    ],
    related: ["evidence-builder", "assessment-types", "clinic-comparison"],
  },

  "evidence-builder": {
    name: "Evidence Builder",
    aboutTitle: "About Building Your Symptom Evidence",
    paragraphs: [
      "Both ADHD and autism diagnoses rest on evidence that traits have been present long-term and affect you across different settings — not just a bad few months at work. Assessors must establish this history, and the patients who get the most accurate assessments are usually the ones who arrive with organised, concrete examples rather than trying to recall a lifetime of moments on the spot.",
      "For ADHD, the diagnostic criteria require several symptoms present before age 12 and impairment in at least two settings, such as work and home. For autism, traits must trace back to early childhood. That is why assessors ask about school days, early friendships and family life — and why written examples gathered in advance are so valuable.",
      "This tool prompts you through each symptom area and life period, helping you record specific incidents, patterns and third-party observations. The result is a structured document you can review before your assessment, hand to your clinician, or use to complete pre-assessment questionnaires accurately.",
    ],
    faqs: [
      {
        question: "Why do assessors need childhood evidence?",
        answer:
          "ADHD and autism are neurodevelopmental conditions — present from early life by definition. Adult-onset attention or social difficulties point to something else (stress, depression, trauma, sleep disorders), so clinicians must establish the lifelong pattern to diagnose correctly. Childhood evidence is what separates the two.",
      },
      {
        question: "What counts as good evidence?",
        answer:
          "Specific beats general. \"I lost three jobs in two years after missed deadlines\" beats \"I'm disorganised\". School report quotes, disciplinary records, a partner's observations, patterns like chronic lateness or abandoned projects — anything concrete, dated and attributable. Aim for two or three strong examples per symptom area rather than an exhaustive list.",
      },
      {
        question: "Can I exaggerate to make sure I get diagnosed?",
        answer:
          "Don't. Assessors are trained to spot inflated reporting, and an inaccurate picture leads to wrong diagnoses and wrong treatment — which can harm you. Honest, specific evidence of real impairment is more convincing than dramatised symptoms, and if your difficulties turn out to have a different cause, you want to know that.",
      },
      {
        question: "Is my evidence saved on your servers?",
        answer:
          "No. Everything you type stays in your browser. Export or copy your notes before closing the page if you want to keep them — we recommend saving a copy to bring to your assessment.",
      },
    ],
    related: ["assessment-prep", "gp-script", "adhd-screening"],
  },

  "medication-comparison": {
    name: "Medication Comparison",
    aboutTitle: "About ADHD Medication in the UK",
    paragraphs: [
      "Five medications are licensed for ADHD in the UK: the stimulants methylphenidate (Ritalin, Concerta XL, Equasym, Medikinet) and lisdexamfetamine (Elvanse), plus dexamfetamine, and the non-stimulants atomoxetine and guanfacine. NICE guidance recommends lisdexamfetamine or methylphenidate as first-line treatment for adults, with non-stimulants used when stimulants are unsuitable or poorly tolerated.",
      "Stimulants work quickly — often noticeably within an hour — and their effects wear off the same day, which allows flexible dosing but means daily consistency matters. Non-stimulants build up over weeks and provide steadier 24-hour coverage. Around 70–80% of people respond well to at least one stimulant, though finding the right medication and dose (titration) typically takes several weeks to a few months.",
      "This comparison tool summarises durations, common side effects and practical differences between the UK options. It is general information, not medical advice: prescribing decisions depend on your health history, other medications and personal response, and belong in a conversation with your prescriber.",
    ],
    faqs: [
      {
        question: "What is titration and how long does it take?",
        answer:
          "Titration is the supervised process of finding your effective dose: you start low, increase stepwise every week or two, and track symptoms and side effects with regular reviews. Most people complete it in one to three months. Private clinics typically charge £150–£500 for the titration period; under NHS or Right to Choose care it is free.",
      },
      {
        question: "What are the common side effects of ADHD medication?",
        answer:
          "For stimulants: reduced appetite, sleep difficulty, dry mouth, headaches and a small rise in heart rate and blood pressure — usually mild and often settling within weeks. Atomoxetine can cause nausea and fatigue early on. Prescribers monitor blood pressure and weight at reviews. Serious side effects are rare but always report chest pain or mood changes promptly.",
      },
      {
        question: "Can my GP prescribe ADHD medication after a private diagnosis?",
        answer:
          "Not immediately. ADHD medication must be initiated by a specialist. After titration stabilises your dose, your specialist asks your GP to take over routine prescribing under a shared care agreement. Most GPs accept; some decline, in which case you continue with private prescriptions or ask about NHS pathways. Our shared care letter tool can help with the request.",
      },
      {
        question: "Are stimulants addictive?",
        answer:
          "At prescribed doses under medical supervision, the evidence does not show meaningful addiction risk — and treating ADHD is associated with reduced rates of substance misuse compared with leaving it untreated. Stimulants are controlled drugs, so prescriptions are monitored, limited to 30 days' supply, and require regular reviews.",
      },
    ],
    related: ["shared-care-letter", "post-diagnosis-plan", "cost-calculator"],
  },

  "shared-care-letter": {
    name: "Shared Care Letter",
    aboutTitle: "About Shared Care Agreements",
    paragraphs: [
      "A shared care agreement is an arrangement where a specialist (your ADHD clinic) and your GP share responsibility for your medication: the specialist handles diagnosis, titration and annual reviews, while your GP issues routine monthly prescriptions on the NHS. It is the standard mechanism that turns an expensive private prescription (£50–£150 a month) into a standard NHS prescription charge.",
      "GPs are not obliged to accept shared care — it is voluntary, and practices decline for various reasons: workload, unfamiliarity with the private provider, or local ICB policies about private diagnoses. A polite, well-structured written request that addresses the common objections significantly improves your chances, which is what this letter generator produces.",
      "Timing matters: GPs almost never accept shared care until titration is complete and your dose is stable, and your specialist must send a formal shared care request with a treatment summary. Your letter works alongside the clinic's paperwork, not instead of it.",
    ],
    faqs: [
      {
        question: "Can my GP refuse shared care?",
        answer:
          "Yes — shared care is voluntary for GPs, and refusals have become more common as ADHD prescribing has grown. If refused, ask for the reason in writing, ask whether another GP in the practice would accept, and ask your clinic whether they can address the practice's specific concerns. You can also switch to a practice known to accept shared care, or use Right to Choose pathways where shared care is more routinely accepted.",
      },
      {
        question: "When should I send this letter?",
        answer:
          "Once titration is finished and you have been stable on your dose — typically for at least a month or two — and your clinic has sent (or is about to send) its formal shared care request. Sending your letter at the same time as the clinic's paperwork puts a patient voice behind the clinical request.",
      },
      {
        question: "What if no GP will accept shared care?",
        answer:
          "Your options are continuing private prescriptions, transferring your care to an NHS ADHD service (rejoining the NHS pathway), or re-entering via Right to Choose in England, where the commissioned provider pathway includes NHS prescribing arrangements. Some private clinics also offer reduced-cost prescription-only plans for this situation.",
      },
      {
        question: "Does shared care cover my annual reviews?",
        answer:
          "No — under a typical agreement your specialist remains responsible for annual reviews and any dose changes, and clinics usually charge for these if you are a private patient (£100–£300 a year). Your GP handles routine prescriptions and basic monitoring like blood pressure checks between reviews.",
      },
    ],
    related: ["medication-comparison", "right-to-choose-letter", "post-diagnosis-plan"],
  },

  "workplace-adjustments": {
    name: "Workplace Adjustments Letter",
    aboutTitle: "About Reasonable Adjustments at Work",
    paragraphs: [
      "Under the Equality Act 2010, ADHD and autism can qualify as disabilities — conditions with a substantial, long-term effect on day-to-day activities — which gives you a legal right to reasonable adjustments at work. Employers must consider adjustments that remove or reduce the disadvantage you face; refusing without good reason can amount to disability discrimination.",
      "Effective adjustments are usually cheap and specific: written instructions after meetings, noise-cancelling headphones or a quieter desk, flexible start times, deadline reminders, breaking large projects into staged deliverables, or regular short check-ins instead of annual reviews. The best requests name the difficulty, propose the adjustment, and explain the benefit to your work.",
      "You do not need a formal diagnosis to request adjustments — the Equality Act protects people whose condition meets its definition, diagnosed or not — though a diagnosis makes the conversation easier. The government's Access to Work scheme can also fund coaching, software and equipment beyond what your employer provides. This tool generates a professional adjustment request letter from your inputs.",
    ],
    faqs: [
      {
        question: "Do I have to tell my employer about my ADHD or autism?",
        answer:
          "No — disclosure is entirely your choice. But an employer only has a duty to make adjustments once they know (or reasonably should know) about your disability. Many people disclose to HR or their manager only as far as needed to request specific adjustments, without sharing full medical details.",
      },
      {
        question: "What adjustments can I ask for?",
        answer:
          "Anything reasonable that reduces your disadvantage: quiet workspaces or headphones, written follow-ups to verbal instructions, flexible hours around your medication or energy patterns, extra time or reminders for deadlines, structured priorities from your manager, and adjusted communication (agendas in advance, one task at a time). 'Reasonable' depends on cost and practicality for your employer's size.",
      },
      {
        question: "What is Access to Work?",
        answer:
          "A government scheme (England, Scotland and Wales) that funds workplace support beyond reasonable adjustments — including specialist coaching, assistive software and support workers — paid to you or your employer. You apply directly online; you need a job or start date but not a formal diagnosis. Awards can be worth thousands of pounds a year and it is heavily underused.",
      },
      {
        question: "What if my employer refuses my request?",
        answer:
          "Ask for the refusal and reasons in writing, then raise it with HR or through your grievance procedure. If your condition meets the Equality Act definition, refusing reasonable adjustments without justification is unlawful. ACAS offers free advice, and an employment tribunal claim is the last resort — most disputes settle well before that.",
      },
    ],
    related: ["university-support", "pip-checker", "post-diagnosis-plan"],
  },

  "university-support": {
    name: "University Support Letter",
    aboutTitle: "About University Support for ADHD & Autism",
    paragraphs: [
      "UK universities are legally required to support disabled students, and both ADHD and autism qualify. Two systems matter: your university's own disability service, which arranges adjustments like extra exam time, extensions and lecture recordings; and Disabled Students' Allowance (DSA), a government grant that funds specialist mentoring, software and equipment — worth up to several thousand pounds a year and not means-tested.",
      "For DSA you need medical evidence: a diagnostic report for ADHD or autism. University adjustments are more flexible — many disability services will put interim support in place while you await assessment. Either way, the sooner you register with the disability service, the sooner support starts; many students wait until crisis point in second year when they could have had support from freshers' week.",
      "This tool generates a letter to your university's disability service requesting registration and specific adjustments, tailored to the difficulties you select.",
    ],
    faqs: [
      {
        question: "What support can I get at university with ADHD or autism?",
        answer:
          "Common adjustments include 25% extra time and rest breaks in exams, a smaller or quieter exam room, coursework extensions, lecture capture access, note-taking support, priority timetabling and library loans, and quiet accommodation. Through DSA you can add one-to-one specialist mentoring, coaching, and software for planning, reading and writing.",
      },
      {
        question: "What is the Disabled Students' Allowance and how do I apply?",
        answer:
          "DSA is a non-means-tested government grant for UK students whose disability affects their studies — ADHD and autism both qualify. Apply through your student finance body (e.g. Student Finance England) with your diagnostic evidence; you will then have a needs assessment that recommends your support package. Apply early — the process takes weeks to months.",
      },
      {
        question: "Do I need a formal diagnosis to get university support?",
        answer:
          "For DSA, yes — you need diagnostic evidence. For university-level adjustments, many disability services offer interim support based on a GP letter or screening results while you await a full assessment. Register with the disability service now and upgrade your evidence later.",
      },
      {
        question: "Will using disability support show on my degree?",
        answer:
          "No. Adjustments and DSA support are confidential, never appear on your transcript or degree certificate, and are not disclosed to employers. Examiners are not told which students had extra time.",
      },
    ],
    related: ["workplace-adjustments", "evidence-builder", "post-diagnosis-plan"],
  },

  "pip-checker": {
    name: "PIP Checker",
    aboutTitle: "About PIP for ADHD & Autism",
    paragraphs: [
      "Personal Independence Payment (PIP) is a non-means-tested benefit for people whose health condition or disability makes daily living or getting around harder. It is not diagnosis-based: you qualify by scoring points against functional descriptors — activities like preparing food, managing money, engaging with other people and planning journeys — regardless of what condition causes the difficulty.",
      "Many people with ADHD or autism do qualify, particularly where executive dysfunction, sensory overload or social difficulties mean they need prompting, supervision or help with these activities to do them safely, reliably and repeatedly. The 'reliably' rule matters: if you can technically do something but not safely, to an acceptable standard, repeatedly, or it takes you far longer than typical, you should score as if you cannot.",
      "This checker walks through the PIP descriptors most relevant to ADHD and autism and estimates whether a claim is worth pursuing. PIP currently pays between roughly £29 and £187 per week depending on your scores, and an award is backdated to your claim date.",
    ],
    faqs: [
      {
        question: "Can I get PIP for ADHD or autism?",
        answer:
          "Yes, if the functional impact is big enough. PIP looks at whether you need prompting, assistance or supervision for daily-living activities (cooking, medication, budgeting, social engagement) or mobility activities (planning and following journeys). Diagnosis alone scores nothing; consistent evidence of day-to-day impact scores everything.",
      },
      {
        question: "What evidence helps a PIP claim?",
        answer:
          "Your diagnostic report, letters from clinicians describing functional impact, a detailed personal statement with concrete examples (burned pans, missed medication, meltdowns after journeys), and statements from family or support workers who see your daily reality. Describe your worst days and how often they happen — the form invites you to describe your best.",
      },
      {
        question: "Do I need a formal diagnosis to claim PIP?",
        answer:
          "No — PIP is assessed on function, not diagnosis, and you can claim while on an assessment waiting list. In practice, though, medical evidence naming a condition makes awards more likely, so a claim usually gets stronger after diagnosis. If you claim pre-diagnosis, include screening results and GP notes.",
      },
      {
        question: "What if my claim is refused?",
        answer:
          "Most refusals can be challenged. First request a mandatory reconsideration within one month, adding any evidence you missed; if that fails, appeal to an independent tribunal. The majority of PIP appeals that reach a tribunal hearing succeed, so a refusal is genuinely not the end of the road. Citizens Advice and disability charities offer free help with appeals.",
      },
    ],
    related: ["workplace-adjustments", "post-diagnosis-plan", "adhd-tax-calculator"],
  },

  "post-diagnosis-plan": {
    name: "Post-Diagnosis Plan",
    aboutTitle: "About Life After Diagnosis",
    paragraphs: [
      "A diagnosis is a beginning, not an ending — and the weeks after it are often a strange mix of relief, grief and \"now what?\". Having a structured plan helps you turn the diagnosis into concrete improvements rather than a report in a drawer. This tool builds a personalised action plan across treatment, work or study, finances and self-understanding.",
      "For ADHD, the usual first decision is medication: whether to start titration, and how prescribing will work long-term (shared care with your GP, NHS pathway, or private). Beyond medication, evidence supports ADHD coaching, therapy adapted for ADHD, and structural changes to work and home routines. For autism, post-diagnostic support centres on understanding your profile, adjusting your environment and unmasking safely.",
      "Practical entitlements are worth acting on early: reasonable adjustments at work, DSA if you study, Access to Work funding, and possibly PIP. None of these happen automatically — each needs an application, and each has a tool on this site to help you start.",
    ],
    faqs: [
      {
        question: "What should I do first after an ADHD diagnosis?",
        answer:
          "Decide on medication — it has the strongest evidence base and most people notice benefits quickly once titrated. In parallel, tell the people who need to know (your GP at minimum), start the shared care conversation early, and pick one or two life areas (work systems, finances) to rebuild with your new understanding rather than trying to change everything at once.",
      },
      {
        question: "What support exists after an autism diagnosis?",
        answer:
          "Formal post-diagnostic support varies by area — some NHS services offer psychoeducation courses, others little. Useful next steps: workplace or university adjustments, sensory audit of your home and routines, autistic-led communities and resources, and therapy with an autism-informed practitioner if you want it. The National Autistic Society is a good UK starting point.",
      },
      {
        question: "Should I tell people about my diagnosis?",
        answer:
          "Entirely your call, and it does not have to be all-or-nothing. Many people tell close family and one trusted colleague or manager first. Disclosure at work is only necessary to the extent you want adjustments; disclosure to friends can be gradual. It is easier to widen disclosure later than to narrow it.",
      },
      {
        question: "My assessment found I don't have ADHD or autism — now what?",
        answer:
          "A good assessment should say what is going on instead — commonly anxiety, depression, trauma responses or sleep disorders can mimic both conditions. Ask the assessor for their differential explanation and recommendations, take the report to your GP, and pursue the indicated treatment. Your difficulties are still real and still treatable.",
      },
    ],
    related: ["shared-care-letter", "workplace-adjustments", "pip-checker"],
  },

  "adhd-tax-calculator": {
    name: "ADHD Tax Calculator",
    aboutTitle: "About the ADHD Tax",
    paragraphs: [
      "The \"ADHD tax\" is the extra money ADHD quietly costs you: late payment fees from forgotten bills, impulse purchases, unused subscriptions, replacing lost belongings, expired food, missed appointments with cancellation charges, and premium prices paid because organising a cheaper option needed executive function you didn't have that day. Individually the amounts are small; added up across a year they are often startling.",
      "Research consistently finds ADHD carries a real financial penalty — studies link it to lower savings, more consumer debt, more missed payments and measurable income effects. The point of this calculator is not guilt: it is to make an invisible cost visible, because a number focuses the mind and helps you evaluate what treatment and systems are worth to you.",
      "Comparing your annual ADHD tax with the one-off cost of an assessment (£495–£1,500) and the ongoing benefit of treatment and better systems often reframes the decision entirely. Many of the biggest leaks — subscriptions, late fees, duplicate purchases — also respond well to simple automation: direct debits, autopay, and a single list app.",
    ],
    faqs: [
      {
        question: "What counts as ADHD tax?",
        answer:
          "Any cost driven by executive dysfunction rather than genuine choice: late fees and interest, forgotten subscriptions, impulse buys you regret, lost or broken items replaced, food waste, missed-appointment charges, parking fines, expedited shipping because you left things late, and higher prices paid for convenience when planning failed.",
      },
      {
        question: "Is the ADHD tax a real, researched thing?",
        answer:
          "The term is informal but the phenomenon is well documented. Studies of adults with ADHD find significantly higher rates of missed payments, consumer debt and financial distress, and economic analyses attribute substantial lifetime income differences to untreated ADHD. Treatment and structured money systems measurably reduce these effects.",
      },
      {
        question: "How can I reduce my ADHD tax?",
        answer:
          "Automate ruthlessly: direct debits for every bill, autopay on credit cards, calendar reminders with lead time, a 24-hour rule for non-essential purchases over a set amount, an annual subscription audit, and one fixed place for keys, wallet and documents. Treating the underlying ADHD typically makes all of these easier to sustain.",
      },
      {
        question: "Does treatment actually pay for itself?",
        answer:
          "For many people, plausibly yes. If your calculated ADHD tax runs to hundreds or thousands of pounds a year, the maths of a one-off assessment plus treatment can favour acting — before counting career benefits, which research suggests are larger still. This calculator gives you your own number to weigh rather than a generic claim.",
      },
    ],
    related: ["cost-calculator", "pip-checker", "adhd-planner"],
  },

  "masking-quiz": {
    name: "Masking Quiz",
    aboutTitle: "About Autistic Masking",
    paragraphs: [
      "Masking (also called camouflaging) is the conscious or automatic suppression of autistic traits to appear neurotypical: forcing eye contact, scripting conversations in advance, copying other people's mannerisms, suppressing stimming, and pushing through sensory discomfort without showing it. Many autistic people mask so thoroughly and for so long that they, and everyone around them, lose sight of how much effort their 'normal' costs.",
      "Masking is strongly associated with exhaustion, anxiety, burnout and late diagnosis — it is one of the main reasons autistic women and high-masking men are missed by screeners and even clinicians. Research using measures like the Camouflaging Autistic Traits Questionnaire (CAT-Q), on which this quiz is based, links higher camouflaging scores to poorer mental health.",
      "This quiz explores three aspects of masking: compensation (strategies to offset social difficulties), masking itself (hiding autistic characteristics), and assimilation (forcing yourself to fit in despite discomfort). A high score suggests you work hard to appear neurotypical — useful self-knowledge, and important context to share with an assessor.",
    ],
    faqs: [
      {
        question: "What is autistic masking?",
        answer:
          "The suppression of natural autistic behaviour and performance of neurotypical behaviour: rehearsing conversations, forcing eye contact, imitating others' social styles, hiding stims and sensory distress, and constructing a persona for public settings. It can be deliberate or so habitual it feels automatic — many people only recognise it when they learn the concept.",
      },
      {
        question: "Why does masking matter for diagnosis?",
        answer:
          "Assessments observe your behaviour — and a skilled masker presents a neurotypical surface, which can lead to missed diagnoses. Telling your assessor explicitly that you mask, describing what you suppress and what it costs you, and bringing this quiz's result helps them look past the performance. Good clinicians assess for camouflaging deliberately.",
      },
      {
        question: "Is masking harmful?",
        answer:
          "Chronic masking is consistently linked to exhaustion, anxiety, depression, burnout and a fragmented sense of identity. It is also sometimes protective in unsafe environments — the goal is not to stop masking overnight but to gain choice: understanding when you mask, what it costs, and where you can safely drop it.",
      },
      {
        question: "Do non-autistic people mask too?",
        answer:
          "Everyone adjusts behaviour socially, but autistic masking differs in degree and cost — it involves suppressing core traits continuously, consumes significant cognitive resources, and causes measurable distress and fatigue. If this quiz resonates strongly, an autism assessment may be worth considering; masking heavily is itself a recognised autistic experience.",
      },
    ],
    related: ["autism-screening", "sensory-profile", "adhd-in-women"],
  },

  "executive-function": {
    name: "Executive Function Assessment",
    aboutTitle: "About Executive Function",
    paragraphs: [
      "Executive functions are the brain's management system: the processes that let you plan, start and finish tasks, hold information in mind, resist distraction, regulate emotions and switch flexibly between activities. They are largely governed by the prefrontal cortex, and they are exactly the processes that ADHD disrupts — many researchers describe ADHD as fundamentally a disorder of executive function.",
      "This self-assessment profiles you across the core domains: working memory, inhibition (impulse control), task initiation, planning and organisation, time management, emotional regulation and cognitive flexibility. Rather than one score, you get a profile showing where you are strong and where you struggle — because executive function difficulties are rarely uniform.",
      "Knowing your profile is practically useful: it points at which supports will help most (external memory systems for working memory issues, body doubling for initiation problems, time-blocking for time blindness), and it gives an assessor a structured picture of your difficulties if you pursue a diagnosis.",
    ],
    faqs: [
      {
        question: "What are the main executive functions?",
        answer:
          "Commonly listed domains are working memory (holding and using information), inhibitory control (resisting impulses and distraction), cognitive flexibility (switching between tasks and perspectives), plus higher-order functions built on them: planning, organisation, task initiation, time management and emotional regulation.",
      },
      {
        question: "Are executive function problems the same as ADHD?",
        answer:
          "Not exactly. ADHD reliably involves executive dysfunction, but executive difficulties also occur with autism, depression, anxiety, sleep deprivation, chronic stress, brain injury and normal ageing. A poor executive function profile says 'something is affecting these systems' — the diagnosis explains what.",
      },
      {
        question: "Can executive function be improved?",
        answer:
          "Yes, mainly by treating the cause and building external structure. ADHD medication measurably improves executive performance. Beyond that, the winning strategy is outsourcing: calendars and alarms as external memory, breaking tasks into visible steps, time-blocking, body doubling, and designing your environment to remove friction rather than relying on willpower.",
      },
      {
        question: "What is time blindness?",
        answer:
          "A weakened internal sense of time common in ADHD: minutes and hours pass unnoticed, future deadlines feel abstract until suddenly urgent, and estimating how long tasks take is chronically inaccurate. It responds well to externalising time — visible clocks, timers, calendar blocking and scheduled alarms rather than mental estimates.",
      },
    ],
    related: ["adhd-screening", "adhd-planner", "adhd-vs-anxiety"],
  },

  "adhd-planner": {
    name: "ADHD Planner",
    aboutTitle: "About ADHD-Friendly Planning",
    paragraphs: [
      "Standard productivity advice assumes a brain that acts on decisions. ADHD brains need something different: planning that works with time blindness, dopamine-seeking and inconsistent energy instead of pretending they don't exist. This planner is built on approaches that hold up in practice for ADHD — visible time, small concrete next actions, and forgiving structure that survives an imperfect day.",
      "The key principles: externalise everything (if it is only in your head it does not exist), make time visible (time-block rather than list, because a list has no size), shrink tasks until starting is trivial (the barrier is initiation, not ability), schedule around your real energy patterns rather than an idealised day, and build in slack because plans that require perfection collapse by Tuesday.",
      "No planner cures executive dysfunction — the goal is reducing the daily cost of it. If planning consistently fails despite good systems, that pattern is itself useful evidence for an ADHD assessment conversation.",
    ],
    faqs: [
      {
        question: "Why don't normal planners work for ADHD?",
        answer:
          "They rely on the very functions ADHD weakens: remembering to check the planner, estimating task durations, initiating unrewarding tasks and sustaining routines. ADHD-friendly planning compensates — alarms instead of memory, time-blocks instead of open lists, tiny first steps instead of big tasks, and rebuild-in-two-minutes systems instead of elaborate setups that collapse.",
      },
      {
        question: "What is body doubling?",
        answer:
          "Working alongside another person — physically or on a video call — whose presence makes starting and continuing tasks dramatically easier. Nobody fully knows why it works (accountability, mirrored focus, gentle social pressure), but it is one of the most consistently reported ADHD strategies. Online body-doubling communities and apps make it available on demand.",
      },
      {
        question: "How should I plan a day with ADHD?",
        answer:
          "Pick one to three genuine priorities, time-block them into your calendar with generous estimates, put the hardest task in your best energy window, set alarms for transitions, and leave at least a third of the day unplanned as buffer. In the evening, spend two minutes resetting tomorrow's plan — consistency of reset matters more than perfection of execution.",
      },
      {
        question: "Is my planner data stored on your servers?",
        answer:
          "No — everything you enter stays in your browser. Export or copy your plan if you want to keep it beyond this session.",
      },
    ],
    related: ["executive-function", "adhd-tax-calculator", "post-diagnosis-plan"],
  },

  "waiting-list-tracker": {
    name: "Waiting List Tracker",
    aboutTitle: "About Tracking Your NHS Referral",
    paragraphs: [
      "NHS ADHD and autism referrals move through stages — GP referral sent, triage, acceptance onto the waiting list, pre-assessment questionnaires, then assessment — and things go wrong quietly: referrals get lost, letters go astray, and people discover after a year that they were never on the list at all. Tracking your referral and chasing at the right moments protects you from silent failures.",
      "Good practice: confirm within two weeks that your referral was sent (ask your GP practice for the referral date and reference), confirm within a month that the service received and accepted it, then check your position every three to six months. Keep a dated log of every call and letter — this tracker gives you a structured place to do that.",
      "If waits in your area are severe, your log is also ammunition: it supports a Right to Choose switch in England, a complaint via PALS (the Patient Advice and Liaison Service), or an MP letter — all of which are legitimate levers people successfully use.",
    ],
    faqs: [
      {
        question: "How do I find out where I am on the waiting list?",
        answer:
          "Contact the assessment service directly — your GP's referral letter or the acknowledgement letter names the provider. Ask: has my referral been accepted, what is the current estimated wait from my referral date, and am I on the list for assessment or still awaiting triage? Put the answers and the date in your log.",
      },
      {
        question: "My referral was lost — what do I do?",
        answer:
          "Ask your GP practice to re-send it immediately and to backdate note the original referral date; ask the receiving service to honour the original date for queue position (they often will if the GP confirms it). This is exactly why confirming receipt early matters — a lost referral discovered at month two costs weeks, discovered at month eighteen it costs years.",
      },
      {
        question: "Can I be on the NHS list and get assessed privately at the same time?",
        answer:
          "Yes. Staying on the NHS list while pursuing a private or Right to Choose assessment is normal and sensible — nothing obliges you to withdraw. If your private assessment resolves everything, you can come off the NHS list then; until it does, keep your place.",
      },
      {
        question: "Who do I complain to about excessive waits?",
        answer:
          "Start with PALS at the provider trust — they resolve many issues informally. Escalate to a formal NHS complaint if needed, copy your ICB (which commissions the service), and consider writing to your MP; waiting-list casework is routine for them. Include your dated log; specific chronology makes complaints effective.",
      },
    ],
    related: ["nhs-wait-times", "right-to-choose-letter", "gp-script"],
  },

  "clinic-comparison": {
    name: "Clinic Comparison",
    aboutTitle: "About Comparing Assessment Clinics",
    paragraphs: [
      "Private ADHD and autism assessment clinics differ far more than their headline prices suggest. The meaningful comparison covers the whole pathway: assessment cost and length, who assesses you (consultant psychiatrist, specialist nurse, psychologist), titration costs if you want medication, prescription charges, the clinic's shared care success rate with GPs, and waiting time to first appointment.",
      "Quality markers worth checking: registration with the CQC (England) or equivalent regulator, assessments that follow NICE guidelines, use of structured diagnostic tools (DIVA-5 for ADHD; ADOS-2 and ADI-R for autism), a written diagnostic report your GP will respect, and transparent published pricing for the full pathway including follow-ups.",
      "This tool lets you compare clinics from our directory side by side on price, wait time, services and credentials — so the decision is based on the total picture rather than the cheapest first appointment.",
    ],
    faqs: [
      {
        question: "What should I compare when choosing a clinic?",
        answer:
          "Total pathway cost (assessment + titration + prescriptions + reviews), wait time, assessor qualifications, whether the assessment follows NICE guidelines with structured tools, shared care track record, remote versus in-person options, and what the written report includes. The cheapest assessment can be the most expensive pathway.",
      },
      {
        question: "Are online assessments legitimate?",
        answer:
          "Yes — video assessments by qualified UK clinicians using structured diagnostic interviews are clinically valid and now account for a large share of UK ADHD assessments; the NHS's own Right to Choose providers work mostly online. Autism assessments more often benefit from an in-person component (the ADOS-2 is designed for it), though remote autism assessment is also established.",
      },
      {
        question: "Will the NHS accept a diagnosis from any private clinic?",
        answer:
          "A diagnosis from a properly qualified clinician following NICE-concordant assessment should be accepted, but GP confidence varies with the clinic's reputation and report quality. Some GPs are more comfortable with well-known providers or those also holding NHS contracts. If NHS prescribing via shared care matters to you, ask the clinic about their shared care acceptance rate before booking.",
      },
      {
        question: "What red flags should make me avoid a clinic?",
        answer:
          "Very short assessments (under an hour for ADHD), guaranteed diagnoses or diagnosis-rate marketing, no registered clinician named, prices that only appear after booking, pressure to commit to expensive treatment packages upfront, no CQC (or equivalent) registration, and reports that GPs in reviews describe as inadequate for shared care.",
      },
    ],
    related: ["cost-calculator", "assessment-types", "nhs-wait-times"],
  },

  "assessment-types": {
    name: "Assessment Types",
    aboutTitle: "About ADHD & Autism Assessment Formats",
    paragraphs: [
      "Not all assessments look the same, and knowing the formats helps you judge what you are buying. An adult ADHD assessment is built around a structured clinical interview — commonly the DIVA-5 — covering current symptoms, childhood history and impairment, usually with rating scales from you and someone who knows you. Some clinics add a QbTest or similar computerised attention measure as supporting (not diagnostic) evidence.",
      "Autism assessment is typically longer and multi-part: a detailed developmental history (ideally with a parent or early informant, sometimes using the ADI-R), a structured observation such as the ADOS-2, and clinical interviews across one or more sessions. Combined ADHD-and-autism assessments exist and make sense given how often the conditions co-occur, though they cost more.",
      "Formats vary too: in-person, video, or hybrid; single long appointment or several shorter ones; psychiatrist-led (can prescribe immediately) or psychologist-led (diagnosis and recommendations, with prescribing referred on). This explainer tool walks through what each format involves and who it suits.",
    ],
    faqs: [
      {
        question: "What happens in an adult ADHD assessment?",
        answer:
          "Typically 1.5–3 hours: a structured diagnostic interview (often DIVA-5) covering each DSM-5 symptom in adulthood and childhood, developmental and medical history, screening for alternative explanations (anxiety, depression, sleep), informant input where available, and feedback. You usually receive the diagnosis at the end, followed by a written report.",
      },
      {
        question: "What are the ADOS-2 and ADI-R?",
        answer:
          "The two gold-standard structured autism tools. The ADOS-2 is an interactive observational assessment where a trained clinician engages you in activities and conversation designed to elicit autism-relevant behaviour. The ADI-R is a long structured interview with a parent or someone who knew you in early childhood. Good assessments combine one or both with broad clinical judgement.",
      },
      {
        question: "Is a QbTest necessary for ADHD diagnosis?",
        answer:
          "No. NICE-concordant diagnosis rests on clinical interview and history; the QbTest measures attention, impulsivity and movement objectively and can add supporting evidence or help monitor medication, but it cannot diagnose or exclude ADHD alone. Do not judge clinics on whether they include one.",
      },
      {
        question: "Psychiatrist or psychologist — does it matter who assesses me?",
        answer:
          "Both can validly diagnose. The practical difference is prescribing: a psychiatrist (or nurse prescriber) can start ADHD medication immediately after diagnosis, while a psychologist-led service refers you on for prescribing, adding a step. If medication is likely, a prescriber-led pathway is simpler; if you mainly want diagnostic clarity, either works.",
      },
    ],
    related: ["assessment-prep", "clinic-comparison", "medication-comparison"],
  },

  "sensory-profile": {
    name: "Sensory Profile Quiz",
    aboutTitle: "About Sensory Processing Differences",
    paragraphs: [
      "Sensory processing differences — being unusually over- or under-responsive to sound, light, touch, taste, smell, movement or internal body signals — are a core feature of autism (they are in the diagnostic criteria) and are also very common in ADHD. They shape daily life profoundly: the supermarket that exhausts you, the clothing labels you cannot ignore, the background noise that makes conversation impossible.",
      "Profiles are individual and mixed: the same person can be hypersensitive to sound but under-responsive to interoception (hunger, thirst, pain), or seek intense movement while avoiding light touch. Beyond the classic five senses, assessments also consider vestibular (balance/movement), proprioceptive (body position) and interoceptive (internal state) processing.",
      "This quiz maps your sensitivity across all eight systems and shows where you sit relative to typical responsiveness. The result helps you design your environment deliberately — and gives useful, structured detail to bring to an autism or ADHD assessment.",
    ],
    faqs: [
      {
        question: "What is sensory overload?",
        answer:
          "The state where incoming sensory input exceeds your capacity to process it — typically in loud, bright, busy or unpredictable environments. It can cause anxiety, irritability, shutdown (withdrawal and reduced responsiveness) or meltdown (loss of regulation). It is a neurological response, not a behavioural choice, and recovery needs genuine low-stimulation time.",
      },
      {
        question: "Do sensory issues mean I'm autistic?",
        answer:
          "Not by themselves. Sensory differences are part of the autism diagnostic criteria and strongly associated with it, but they also occur with ADHD, anxiety, migraine and in people with no diagnosis. A strong sensory profile alongside social communication differences makes an autism assessment worth considering; alongside attention difficulties, consider ADHD too.",
      },
      {
        question: "How can I manage sensory sensitivities?",
        answer:
          "Audit and adjust your environment: noise-cancelling headphones or loop earplugs, controlling light (dimmers, sunglasses, screen filters), seam-free clothing, planned recovery time after high-input events, and scheduling demanding environments for your most regulated times. Occupational therapists specialising in sensory integration can help with severe difficulties.",
      },
      {
        question: "What are the eight sensory systems?",
        answer:
          "Sight, hearing, touch, taste and smell, plus three internal systems: vestibular (movement and balance), proprioception (awareness of body position and force) and interoception (internal signals like hunger, thirst, temperature and pain). Differences in the internal three are less visible but often explain difficulties with eating, sleep and emotional awareness.",
      },
    ],
    related: ["autism-screening", "masking-quiz", "executive-function"],
  },

  "adhd-vs-anxiety": {
    name: "ADHD vs Anxiety Checker",
    aboutTitle: "About ADHD vs Anxiety",
    paragraphs: [
      "ADHD and anxiety are genuinely hard to tell apart from the inside: both produce restlessness, poor concentration, racing thoughts, irritability and sleep problems. Misdiagnosis runs in both directions — and matters, because the treatments differ and treating the wrong condition often fails. Many adults, especially women, collect an anxiety diagnosis years before anyone considers ADHD.",
      "The distinguishing questions are about pattern and cause. ADHD-driven inattention is constant across life and worst for boring tasks regardless of stakes; anxiety-driven inattention tracks worry and eases when the worry resolves. ADHD restlessness is physical stimulation-seeking; anxious restlessness is tension with a sense of dread. ADHD symptoms start in childhood; pure anxiety can begin at any age, often with an identifiable trigger.",
      "They also co-occur constantly — roughly a quarter to half of adults with ADHD have an anxiety disorder, and years of undiagnosed ADHD reliably generate anxiety about the chaos it causes. This checker compares your symptoms against both patterns and indicates whether one, the other, or both are worth assessing.",
    ],
    faqs: [
      {
        question: "How can I tell if it's ADHD or anxiety?",
        answer:
          "Ask what drives the symptom. Can't focus because your mind pulls toward anything more stimulating — or because worry loops crowd everything out? Lifelong and setting-independent — or arriving with a stressful period and fluctuating with it? Childhood onset, boredom intolerance and interest-based attention point to ADHD; trigger-linked worry, dread and physical tension point to anxiety.",
      },
      {
        question: "Can ADHD cause anxiety?",
        answer:
          "Very commonly. Living with untreated ADHD means constant deadline crises, forgotten obligations and social missteps — rational things to become anxious about. This 'secondary anxiety' often improves substantially when the ADHD is treated, which is one reason getting the primary diagnosis right matters so much.",
      },
      {
        question: "What if I have both?",
        answer:
          "Both get treated, usually starting with whichever causes more impairment — often the ADHD, since treating it can reduce secondary anxiety. Stimulants can be used cautiously alongside anxiety (they occasionally worsen it, often they don't), non-stimulants like atomoxetine can help both, and therapy plus SSRIs remain options for the anxiety side. A good assessor will map the interaction.",
      },
      {
        question: "Will an ADHD assessment check for anxiety too?",
        answer:
          "A competent one, yes — screening for anxiety, depression and other conditions that mimic or accompany ADHD is a required part of NICE-concordant assessment, precisely to avoid misattribution. If a clinic's assessment doesn't include differential screening, that is a red flag.",
      },
    ],
    related: ["adhd-screening", "adhd-in-women", "executive-function"],
  },
};
