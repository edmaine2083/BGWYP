export type StageId = "foundations" | "exploration" | "mastery" | "transition";

export const summerStages: { id: StageId; name: string; audience: string }[] = [
  { id: "foundations", name: "Foundations", audience: "Grades 6–8" },
  { id: "exploration", name: "Exploration", audience: "Grades 9–10" },
  { id: "mastery", name: "Mastery", audience: "Grades 11–12" },
  { id: "transition", name: "Transition-Age", audience: "Ages 18–24" },
];

export type StageWeek = {
  learn: string[];
  activity?: { name: string; description: string };
  leaveWith: string;
};

export type Week = {
  number: number;
  title: string;
  theme: string;
  byStage: Record<StageId, StageWeek>;
};

export const summerAccelerator = {
  heading: "Summer Accelerator",
  tagline: "Six weeks. Four stages. One plan for life.",
  intro:
    "Every participant follows the same six weekly themes, but the work is matched to their grade or age. Choose a stage to see exactly what young people learn and build each week. Every week ends with something real they can keep, not just a quiz.",
  stats: [
    { value: "6", label: "Weeks" },
    { value: "24", label: "Days" },
    { value: "96", label: "Hours" },
  ],
  dates: "", // fill in when confirmed; hidden while empty
  location: "", // fill in once the site agreement is signed; hidden while empty
  selectorLabel: "Choose a stage",
  weeks: [
    {
      number: 1,
      title: "The Baltimore Legacy",
      theme:
        "Wealth starts with knowing what is around you and who owns it. Everyone begins by mapping their community and their starting point.",
      byStage: {
        foundations: {
          learn: [
            "Money is a tool for exchanging value, not a measure of a person's worth",
            "Needs vs. wants, and the money beliefs we pick up from home and community",
            "Opportunity cost: every dollar spent on one thing is not spent on another",
            "The assets in their own neighborhood: libraries, transit, businesses, and rec centers",
          ],
          activity: {
            name: "Corner Store Economy",
            description:
              "Groups run a mock corner store with limited inventory and customers on different budgets, and see opportunity cost play out live.",
          },
          leaveWith:
            "A neighborhood opportunity map, a baseline financial literacy check, and an interview with a trusted adult about the money lesson they wish they had learned sooner.",
        },
        exploration: {
          learn: [
            "How Baltimore's local economy works and which sectors are growing",
            "Where their own interests connect to real careers in the city",
            "A baseline look at what they already know about careers and money",
          ],
          leaveWith: "A local economy map tied to their career interests.",
        },
        mastery: {
          learn: [
            "Where they come from and how it shapes the road ahead",
            "How ready they are for college, training, or work after high school",
            "Setting the starting point for their capstone plan",
          ],
          leaveWith: "An origin map reflection and a postsecondary readiness baseline.",
        },
        transition: {
          learn: [
            "Taking stock of their current living, work, and school situation",
            "Naming the barriers in the way, such as transportation, childcare, or housing",
            "Building a plan to remove those barriers so they can focus on growth",
          ],
          leaveWith: "A personal barrier plan and a clear starting point for the summer.",
        },
      },
    },
    {
      number: 2,
      title: "Wealth Fundamentals",
      theme:
        "The core money skills: earning, budgeting, saving, and understanding where every dollar goes.",
      byStage: {
        foundations: {
          learn: [
            "Building a Spend / Save / Give budget from sample income",
            "How a bank or credit union account works, and spotting hidden fees and subscriptions",
            "Simple vs. compound growth, and why starting early matters",
            "Setting a specific, time-bound savings goal",
          ],
          activity: {
            name: "Month-in-a-Minute and Two Friends, Two Futures",
            description:
              "Participants rebudget as surprise expenses hit, then chart two friends who save the same amount, one starting at 12 and one at 22, to see compound growth at work.",
          },
          leaveWith:
            "A budget starter, a savings target contract signed with a trusted adult, and a passed wealth-math quiz (80% mastery).",
        },
        exploration: {
          learn: [
            "Reading a paystub: gross vs. net pay, taxes, and common deductions",
            "Comparing checking and savings accounts, banks and credit unions, and their fees",
            "Recognizing and avoiding common scams that target teens",
          ],
          activity: {
            name: "Paystub Analysis Lab",
            description:
              "Participants work with sample paystubs, find the deductions, calculate take-home pay, and plan a month's budget.",
          },
          leaveWith:
            "A completed paystub lab and a side-by-side comparison of two real account options.",
        },
        mastery: {
          learn: [
            "Everything in the paystub lab, plus total compensation: pay, benefits, and retirement",
            "Comparing an hourly job with a salaried offer that includes benefits",
            "The return on investment of different options after high school",
          ],
          activity: {
            name: "Total Compensation Lab",
            description:
              "Participants compare an hourly and a salaried offer with benefits to see what a job is really worth.",
          },
          leaveWith:
            "A total compensation comparison and a first look at the return on their postsecondary options.",
        },
        transition: {
          learn: [
            "Building an independent living budget: rent, bills, food, transportation, and savings",
            "Tax basics: W-2s, 1099s, and when to get free filing help",
            "Evaluating job offers beyond salary",
          ],
          activity: {
            name: "Tax Preparation Module",
            description:
              "Participants walk through a basic tax return using sample documents and learn where to find free tax help.",
          },
          leaveWith: "An independent living budget and a clear plan for filing taxes.",
        },
      },
    },
    {
      number: 3,
      title: "Creative Entrepreneurship",
      theme:
        "Turning skills and ideas into income, from a first business idea to a real application.",
      byStage: {
        foundations: {
          learn: [
            "Identifying three personal skills other people would value or pay for",
            "The difference between a product and a service",
            "Pricing, cost, and profit, and how to tell a good deal from a scam",
            "Why earning safely and with permission matters at their age",
          ],
          activity: {
            name: "Shark-Free Pitch Day",
            description:
              "Pairs create a one-minute pitch, set a price, and calculate cost vs. profit on 10 sales to classmates acting as customers.",
          },
          leaveWith: "A skills page in their portfolio and their first business idea.",
        },
        exploration: {
          learn: [
            "Different ways to earn: wages, gig work, freelancing, and ownership",
            "Pricing, costs, and break-even for a simple business",
            "Turning school, family, and community experience into professional resume language",
          ],
          activity: {
            name: "Pitch Day with Mentors",
            description:
              "Teams build a business concept, test pricing with peers, and pitch to local entrepreneurs and mentors for feedback.",
          },
          leaveWith: "A first resume draft and a plan for the career sectors they want to explore.",
        },
        mastery: {
          learn: [
            "Building a one-page business concept with real pricing logic",
            "Putting together a professional scholarship or job application",
            "Presenting their work to mentors and responding to feedback",
          ],
          activity: {
            name: "Pitch Day with Mentors",
            description:
              "Teams pitch to local entrepreneurs and mentors, who give feedback on one strength and one gap.",
          },
          leaveWith: "A one-page business concept or a complete scholarship or job packet.",
        },
        transition: {
          learn: [
            "Business structures at a high level: sole proprietorship, LLC, and nonprofit",
            "Why business and personal money must stay separate",
            "First steps to register a venture, track income, and manage taxes",
          ],
          activity: {
            name: "Start a Business or a Nonprofit?",
            description:
              "Teams pick the right structure for real scenarios and map the first 90 days, with a guest attorney or CPA joining for Q&A.",
          },
          leaveWith:
            "Business files with market research, pricing, and start-up costs, or a job placement packet.",
        },
      },
    },
    {
      number: 4,
      title: "Social Capital & Power",
      theme:
        "Who you know matters. Participants build the relationships and networks that open doors.",
      byStage: {
        foundations: {
          learn: [
            "Who the trusted adults in their life are and how each one can help",
            "How to ask for help and introduce themselves with confidence",
          ],
          leaveWith: "A trusted-adult support map.",
        },
        exploration: {
          learn: [
            "How to reach out to mentors and professionals with confidence",
            "Building a support ladder of people who can help them move up",
            "Finding and using professional resources in their fields of interest",
          ],
          activity: {
            name: "Mentor Outreach Practice",
            description:
              "Participants practice outreach scripts and make real connections with professionals and mentors.",
          },
          leaveWith: "Mentor outreach scripts, a support ladder, and five professional resources.",
        },
        mastery: {
          learn: [
            "How colleges, employers, and institutions make decisions, and who the gatekeepers are",
            "How to reach out directly to admissions counselors and hiring managers",
            "Turning gatekeepers into allies",
          ],
          activity: {
            name: "Gatekeeper Role-Play",
            description:
              "Participants role-play reaching out to an admissions counselor or hiring manager and practice making their case.",
          },
          leaveWith: "A map of the institutions they need to reach and a plan for direct outreach.",
        },
        transition: {
          learn: [
            "Activating their network to find jobs, promotions, and opportunities",
            "Leading and teaching younger participants with professionalism",
          ],
          activity: {
            name: "Near-Peer Practicum",
            description:
              "Participants help co-facilitate activities for younger Foundations participants, always with BGWYP staff present.",
          },
          leaveWith: "An activated professional network and hands-on leadership experience.",
        },
      },
    },
    {
      number: 5,
      title: "The Generational Plan",
      theme: "Everything comes together into a real plan for the future, and for the family.",
      byStage: {
        foundations: {
          learn: [
            "Assets put money in your pocket and liabilities take it out",
            "What ownership means for a family across generations",
            "How to lead a short, respectful money conversation at home",
          ],
          activity: {
            name: "Asset or Liability?",
            description:
              "A card-sort game with debate rounds, where many items depend on how they are used, like a phone for a side business vs. for games.",
          },
          leaveWith:
            "A family checklist and a guided money conversation at home, with one takeaway to share at the Showcase.",
        },
        exploration: {
          learn: [
            "Comparing college, trade school, apprenticeship, military, and work routes by cost and return",
            "How Baltimore's history, including housing and lending policy, shaped who had access to wealth",
            "Building a pathway plan they can act on",
          ],
          activity: {
            name: "Pathway ROI Lab",
            description:
              "Teams compare three routes by 10-year cost, likely earnings, and debt, using real public data.",
          },
          leaveWith: "A pathway memo comparing two or three options.",
        },
        mastery: {
          learn: [
            "Everything in the Pathway ROI Lab, plus FAFSA, scholarships, and student loans",
            "Planning for income, savings, and career growth over time",
          ],
          activity: {
            name: "Pathway ROI Lab",
            description:
              "Teams compare routes by cost and return, then turn the best option into a long-term plan.",
          },
          leaveWith: "A 5- or 10-year financial and career plan.",
        },
        transition: {
          learn: [
            "Protecting what they build: insurance, wills, and naming beneficiaries",
            "Renting vs. buying, and the real costs of owning a home",
            "Local programs and trusted housing counselors for first-time buyers",
          ],
          activity: {
            name: "The Family Property Puzzle and House Hunt",
            description:
              "Teams see what happens when a family member dies without a will, then walk through buying a home, from pre-approval to closing.",
          },
          leaveWith: "A 12-month plan for stability, legacy, and homeownership readiness.",
        },
      },
    },
    {
      number: 6,
      title: "Showcase and Next Steps",
      theme:
        "Participants present their work to families, mentors, and partners, and lock in their next steps.",
      byStage: {
        foundations: {
          learn: ["Presenting their work with confidence to an audience of family and community"],
          activity: {
            name: "Portfolio Showcase",
            description:
              "Participants present their portfolio, budget, and business idea at the community Showcase.",
          },
          leaveWith: "A completed portfolio and a confirmed fall schedule.",
        },
        exploration: {
          learn: ["Presenting a career pathway and defending their choices"],
          activity: {
            name: "Pathway Presentation",
            description: "Participants present their chosen pathway and the plan behind it.",
          },
          leaveWith: "A presented pathway plan and fall checkpoints set with their mentor.",
        },
        mastery: {
          learn: ["Defending a capstone plan in front of mentors and professionals"],
          activity: {
            name: "Capstone Defense",
            description: "Participants defend their capstone plan, scored with a portfolio rubric.",
          },
          leaveWith: "A verified next step after high school.",
        },
        transition: {
          learn: ["Finalizing placement and committing to follow-through"],
          activity: {
            name: "Placement and Certification",
            description:
              "Participants finalize placement packets and can earn Level-Up Mentor Certification to mentor younger participants.",
          },
          leaveWith:
            "A placement packet, 30-day follow-ups scheduled, and Level-Up Mentor Certification.",
        },
      },
    },
  ] as Week[],
  included: {
    heading: "What's included",
    items: ["Meals", "Transportation", "Materials", "Mentors"],
    text: "Meals, transportation support, all materials, and mentors at every step.",
  },
  showcase: {
    heading: "Join us at the Showcase",
    text: "All four stages present together to families, mentors, and partners.",
  },
};
