import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  DONATIONS_ENABLED,
  ENROLLMENT_OPEN,
} from "@/config";
import { summerAccelerator, summerStages, type StageId } from "@/content/summerAccelerator";

const PROGRAMS = "[Programs](/programs)";
const FAQ = "[FAQ](/faq)";
const SAFETY = "[How We Protect Young People](/safety)";
const CONTACT = "[Contact](/contact)";
const DONATE = "[Donate](/donate)";
const INVOLVED = "[Get Involved](/get-involved)";
const ABOUT = "[About](/about)";
const PARTNER = "[Partner](/partner)";

function stageId(q: string): StageId | null {
  if (/\bfoundations\b|grades?\s*6\b|middle school/.test(q)) return "foundations";
  if (/\bexploration\b|grades?\s*9\b|grades?\s*10\b/.test(q)) return "exploration";
  if (/\bmastery\b|grades?\s*11\b|grades?\s*12\b|\bjuniors?\b|\bseniors?\b/.test(q)) return "mastery";
  if (/\btransition\b|18\s*[-–]\s*24|young adults?/.test(q)) return "transition";
  return null;
}

function weekAnswer(q: string): string | null {
  const numbered = q.match(/week\s*([1-6])\b/);
  const week =
    (numbered && summerAccelerator.weeks.find((w) => w.number === Number(numbered[1]))) ||
    summerAccelerator.weeks.find((w) => q.includes(w.title.toLowerCase()));
  if (!week) return null;

  const stage = stageId(q);
  if (!stage) {
    return `Week ${week.number} of the Summer Accelerator is “${week.title}.” ${week.theme} Each stage covers that theme in a way that fits their grade or age. The full plan is on ${PROGRAMS}.`;
  }

  const detail = week.byStage[stage];
  const meta = summerStages.find((s) => s.id === stage);
  const activity = detail.activity ? ` The activity is ${detail.activity.name}: ${detail.activity.description}` : "";
  return `Week ${week.number} for ${meta?.name} (${meta?.audience}) is “${week.title}.” They learn: ${detail.learn.join("; ")}.${activity} They leave with: ${detail.leaveWith}`;
}

function programOverview(): string {
  const stages = summerStages.map((s) => `${s.name} (${s.audience})`).join(", ");
  return `BGWYP teaches Baltimore young people ages 11 to 24 how money, work, and ownership work. Everyone enters the stage that fits their grade or age: ${stages}. The year starts with a six-week Summer Accelerator, then monthly school-year sessions from September to May. Start on ${PROGRAMS}.`;
}

function stageAnswer(id: StageId): string {
  const stage = summerStages.find((s) => s.id === id);
  const blurbs: Record<StageId, string> = {
    foundations:
      "Foundations is for grades 6–8. Young people build healthy money habits and map the people and places in their neighborhood that can help them grow. They leave ready for the basics, connected to adults who have their back.",
    exploration:
      "Exploration is for grades 9–10. Teens explore careers, meet professionals, and learn how a paycheck works before a first job. They build a first resume, a mentor connection, and a comparison of career pathways.",
    mastery:
      "Mastery is for grades 11–12. Juniors and seniors turn exploration into a plan and compare college, careers, and training by cost and return. They build an application packet and a 5- or 10-year roadmap.",
    transition:
      "Transition-Age is for ages 18–24. Young adults work toward independence: rent, bills, credit, income, and ownership. They can also earn Level-Up Mentor Certification and mentor younger participants, always with an adult present.",
  };
  return `${blurbs[id]} See ${stage?.name ?? "this stage"} on ${PROGRAMS}.`;
}

/** Reply from published site facts. Unknown questions point to FAQ and contact. */
export function answerChat(raw: string): string {
  const q = raw.toLowerCase().replace(/[’]/g, "'").replace(/\s+/g, " ").trim();
  if (!q) {
    return `Ask me about programs, the Summer Accelerator, safety, or how to get involved. You can also browse the ${FAQ}.`;
  }

  if (/^(hi|hello|hey|good (morning|afternoon|evening)|yo)\b/.test(q) && q.split(" ").length < 6) {
    return "Hi there. I can help with BGWYP programs, the Summer Accelerator, safety, and ways to get involved. What would you like to know?";
  }
  if (/^(thanks|thank you|thx)\b/.test(q)) {
    return `You're welcome. If you still need a person, reach us at ${CONTACT_PHONE} or ${CONTACT_EMAIL}.`;
  }

  if (/911|in danger|emergency|report a concern|report a problem|abuse/.test(q)) {
    return `If a young person is in danger, call 911. For other concerns, contact us at ${CONTACT_PHONE} or ${CONTACT_EMAIL}. How we protect young people is on ${SAFETY}.`;
  }

  const week = weekAnswer(q);
  if (week) return week;

  const stage = stageId(q);
  if (stage && /stage|program|grade|who|what|learn|for\b/.test(q)) return stageAnswer(stage);

  if (/level-?up|near-?peer/.test(q)) {
    return `Older youth and alumni can earn Level-Up Mentor Certification and mentor younger participants, always with an adult present. That is part of the Transition-Age stage and is described on ${PROGRAMS}.`;
  }

  if (/school[- ]year|september|first saturday|second saturday|monthly/.test(q)) {
    return `School-year continuation runs September through May, with three touchpoints a month: a First Saturday workshop, a Second Saturday lab or exposure visit, and a monthly virtual checkpoint. See ${PROGRAMS}.`;
  }

  if (/who can (join|come|participate|attend)|eligib|how old|what ages|11\s*(to|through|-|–)\s*24/.test(q)) {
    return programOverview();
  }

  if (/how much|cost|tuition|fee|free|price|meals|transport/.test(q)) {
    return `${summerAccelerator.included.text} The site does not list a family tuition. Sponsoring a young person's full year is $6,630, and a summer facilitator is $3,600. Questions about cost can go to ${CONTACT_EMAIL}, or see ${PROGRAMS} and ${INVOLVED}.`;
  }

  if (/enroll|sign ?up|register|\bapply\b|interest list|how do i (get in|start|join)|join the|cohort|\b60\b/.test(q)) {
    const status = ENROLLMENT_OPEN
      ? "Enrollment is open."
      : "Enrollment is not open yet.";
    return `${status} Space is limited to 60 young people and depends on funded capacity. Join the interest list on ${PROGRAMS}. Families can also use the form on ${INVOLVED}.`;
  }

  if (/donat|give|gift|501|tax|deduct|nonprofit|sponsor/.test(q)) {
    const giving = DONATIONS_ENABLED
      ? `You can give on the ${DONATE} page.`
      : `Online giving is not open yet. Join the notification list on the ${DONATE} page.`;
    return `${giving} The first-year goal is $437,608 for 60 Baltimore young people, $6,630 per young person, plus a 10% reserve. BGWYP is a Maryland nonprofit corporation, and the federal 501(c)(3) application is pending, so deductibility depends on IRS approval. More ways to help are on ${INVOLVED}.`;
  }

  if (/partner|business|employer|shadow|school|host/.test(q)) {
    return `Businesses can host a sector shadow, offer a guest session, sponsor a seat, or become a founding partner. Schools, employers, banks, colleges, and community groups can start on ${PARTNER}. A shadow host is never alone with a young person.`;
  }

  if (/volunteer|mentor|background check/.test(q)) {
    return `Mentor and volunteer roles open after a background check, safeguarding training, and a signed Code of Conduct. Applying does not guarantee a role. The form is on ${INVOLVED}.`;
  }

  if (/safe|screen|alone|pickup|background|ratio|protect/.test(q)) {
    return `Every adult is screened with fingerprint, FBI, and sex-offender registry checks, and trained before any contact with a young person. No adult is ever alone with a young person, in person or online. Ratios are one adult for every ten young people in grades 6 to 8, and one for every fifteen in older groups. The full list is on ${SAFETY}.`;
  }

  if (/contact|phone|email|call|where are you|address|baltimore/.test(q) && !/summer|program|week/.test(q)) {
    return `Building Generational Wealth Youth Program is in Baltimore, Maryland. Call ${CONTACT_PHONE} or email ${CONTACT_EMAIL}. The form is on ${CONTACT}.`;
  }

  if (/founder|edward|shepard|mission|who (are|is|runs|founded)|about|leadership|board/.test(q)) {
    return `Edward J. Shepard, MBA, founded Building Generational Wealth Youth Program in 2026. The mission is to equip Baltimore youth and young adults ages 11 through 24 with financial knowledge, career strategy, mentorship, and asset-building discipline. Leadership and values are on ${ABOUT}.`;
  }

  if (/summer|accelerator|six[- ]week|6[- ]week|showcase|96 hours|24 days/.test(q)) {
    const weeks = summerAccelerator.weeks.map((w) => `${w.number}. ${w.title}`).join("; ");
    const when = summerAccelerator.dates
      ? `Dates: ${summerAccelerator.dates}.`
      : "Dates will be posted when they are confirmed.";
    const where = summerAccelerator.location
      ? `Location: ${summerAccelerator.location}.`
      : "The location will be posted once the site agreement is signed.";
    return `${summerAccelerator.tagline} ${summerAccelerator.intro} The weeks are: ${weeks}. ${when} ${where} ${summerAccelerator.included.text} ${summerAccelerator.showcase.text} Open ${PROGRAMS} and choose a stage to see each week.`;
  }

  if (/program|stage|what do you (do|teach)|what is bgwyp|wealth|money/.test(q)) {
    return programOverview();
  }

  if (stage) return stageAnswer(stage);

  return `I don't have that on the site yet. The ${FAQ} covers who can join, the schedule, safety, and nonprofit status. You can also call ${CONTACT_PHONE} or email ${CONTACT_EMAIL}.`;
}
