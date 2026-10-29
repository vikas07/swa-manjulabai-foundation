export type Project = {
  id: string
  slug: string
  title: string
  shortTitle: string
  summary: string
  detail: string
  highlights: string[]
  budgetLabel?: string
  location?: string
  image: string
  pdf: string
  donatePurpose: string
}

export const projects: Project[] = [
  {
    id: 'cancer',
    slug: 'cancer-accommodation',
    title: 'Cancer Patient & Family Accommodation Centre',
    shortTitle: 'Cancer Accommodation',
    summary:
      'Safe stay and nutritious meals for cancer patients and caregivers — a charitable accommodation centre near treatment facilities.',
    detail:
      'Families travelling for oncology care often struggle with lodging and food. This detailed project report proposes an accommodation centre with roughly fifty rooms and free meals so patients and caregivers can focus on treatment with dignity. Total project cost: ₹20 crore — fully funded, no bank loan proposed.',
    highlights: [
      '~50 rooms planned',
      'Free meals for patients & caregivers',
      'Kharghar, Navi Mumbai',
      '₹20 Cr · fully funded DPR',
    ],
    budgetLabel: '₹20 Cr',
    location: 'Kharghar, Navi Mumbai',
    image: '/projects/cancer.jpg',
    pdf: '/docs/cancer-accommodation.pdf',
    donatePurpose: 'Cancer Accommodation',
  },
  {
    id: 'jute',
    slug: 'jute-skill-development',
    title: 'Jute Skill Development & Livelihood Project',
    shortTitle: 'Jute Skills',
    summary:
      'Short-batch jute craft training for women and men — 1,500 trainees building sustainable livelihoods.',
    detail:
      'Hands-on batches teach jute product making, value addition, and market linkage. The DPR targets about 1,500 trainees (women & men) in 15–21 day batches at our institution in Guwahati, Assam, with a project cost of ₹5 crore.',
    highlights: [
      '1,500 trainees (women & men)',
      '15–21 days per batch',
      'Guwahati, Assam',
      '₹5 Cr DPR',
    ],
    budgetLabel: '₹5 Cr',
    location: 'Guwahati, Assam',
    image: '/projects/jute.jpg',
    pdf: '/docs/jute-skill-development.pdf',
    donatePurpose: 'Jute Skill Development',
  },
  {
    id: 'rubber',
    slug: 'rubber-plantation',
    title: 'Rubber Plantation & Production Skill Development',
    shortTitle: 'Rubber Livelihood',
    summary:
      'Plantation and production skill training that creates lasting rural livelihood opportunities.',
    detail:
      'A livelihood-focused rubber plantation and production skill development programme. Training runs 15–21 days per student (max ₹10,000 training cost, with additional support of about ₹5,000–₹7,000). Documented with a ₹5 crore detailed project report from our Kharghar base.',
    highlights: [
      '15–21 days training',
      'Plantation & production skills',
      'Kharghar, Navi Mumbai',
      '₹5 Cr DPR',
    ],
    budgetLabel: '₹5 Cr',
    location: 'Kharghar, Navi Mumbai',
    image: '/projects/rubber.jpg',
    pdf: '/docs/rubber-plantation.pdf',
    donatePurpose: 'Rubber Plantation',
  },
  {
    id: 'aasra',
    slug: 'aasra',
    title: 'AASRA — Shelter, Education & Care',
    shortTitle: 'AASRA',
    summary:
      'Safe shelter, education, healthcare, and community support — a vision of care, dignity and opportunity.',
    detail:
      'AASRA is our umbrella of care: temporary shelter, child education and development, healthcare and wellbeing, livelihood and field support, and community participation. The project photo gallery in the DPR illustrates the key areas of proposed support.',
    highlights: [
      'Safe shelter',
      'Education & child development',
      'Healthcare & wellbeing',
      'Community & livelihood support',
    ],
    location: 'Mumbai & Maharashtra',
    image: '/projects/aasra.jpg',
    pdf: '/docs/aasra.pdf',
    donatePurpose: 'AASRA',
  },
]

export const donatePurposes = [
  'General Fund',
  'Cancer Accommodation',
  'Jute Skill Development',
  'Rubber Plantation',
  'AASRA',
] as const

export type DonatePurpose = (typeof donatePurposes)[number]
