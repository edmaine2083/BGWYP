import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { BookOpen, Bus, ChevronDown, Users, Utensils, type LucideIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { H2, Section } from "@/components/site/ui";
import {
  summerAccelerator,
  summerStages,
  type StageId,
  type Week,
} from "@/content/summerAccelerator";

const includedIcons: Record<string, LucideIcon> = {
  Meals: Utensils,
  Transportation: Bus,
  Materials: BookOpen,
  Mentors: Users,
};

function WeekPanel({ week, stageId }: { week: Week; stageId: StageId }) {
  const detail = week.byStage[stageId];
  return (
    <div className="px-5 pb-5">
      <p className="text-muted-foreground">{week.theme}</p>
      <div className={detail.activity ? "mt-4 grid items-start gap-4 md:grid-cols-2" : "mt-4"}>
        <div>
          <p className="font-semibold text-gold-deep">What they learn</p>
          <ul className="mt-3 space-y-2">
            {detail.learn.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        {detail.activity ? (
          <div className="rounded-lg bg-gold/10 p-4">
            <p className="text-sm font-semibold text-gold-deep">Hands-on</p>
            <p className="mt-2 font-semibold">{detail.activity.name}</p>
            <p className="mt-1">{detail.activity.description}</p>
          </div>
        ) : null}
      </div>
      <p className="mt-4">
        <span className="font-semibold text-gold-deep">They leave with:</span> {detail.leaveWith}
      </p>
    </div>
  );
}

export function SummerAccelerator() {
  const [stageId, setStageId] = useState<StageId>("foundations");
  const [openWeek, setOpenWeek] = useState("");
  const stage = summerStages.find((item) => item.id === stageId);
  if (!stage) return null;

  return (
    <Section labelledBy="summer">
      <H2 id="summer">{summerAccelerator.heading}</H2>
      <p className="mt-4 font-[Georgia,serif] text-xl italic text-gold-deep md:text-2xl">
        {summerAccelerator.tagline}
      </p>
      <p className="mt-4 max-w-3xl text-lg">{summerAccelerator.intro}</p>

      <div className="band-dark mt-10 rounded-xl px-5 py-8">
        <ul className="grid grid-cols-3 gap-4 text-center">
          {summerAccelerator.stats.map((stat) => (
            <li key={stat.label}>
              <p className="font-display text-3xl text-gold md:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-gold">{stat.label}</p>
            </li>
          ))}
        </ul>
        {summerAccelerator.dates ? (
          <p className="mt-4 text-center text-sm text-ink-muted">{summerAccelerator.dates}</p>
        ) : null}
        {summerAccelerator.location ? (
          <p className="mt-1 text-center text-sm text-ink-muted">{summerAccelerator.location}</p>
        ) : null}
      </div>

      <div className="mt-10 max-w-md">
        <label htmlFor="summer-stage" className="mb-2 block font-semibold">
          {summerAccelerator.selectorLabel}
        </label>
        <Select
          value={stageId}
          onValueChange={(value) => {
            setStageId(value as StageId);
            setOpenWeek("");
          }}
        >
          <SelectTrigger id="summer-stage" className="h-12 border-2 border-gold bg-card text-base">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {summerStages.map((item) => (
              <SelectItem key={item.id} value={item.id} className="text-base">
                {item.name}: {item.audience}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Accordion.Root
        type="single"
        collapsible
        value={openWeek}
        onValueChange={setOpenWeek}
        className="mt-6 space-y-4"
      >
        {summerAccelerator.weeks.map((week) => (
          <Accordion.Item
            key={week.number}
            value={String(week.number)}
            className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-card"
          >
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center gap-4 p-5 text-left">
                <span
                  aria-hidden
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-gold bg-gold font-display text-lg text-ink"
                >
                  {week.number}
                </span>
                <span className="font-display text-lg text-gold-deep">{week.title}</span>
                <ChevronDown
                  aria-hidden
                  className="ml-auto shrink-0 text-gold-deep transition-transform group-data-[state=open]:rotate-180"
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <WeekPanel week={week} stageId={stage.id} />
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>

      <h3 className="mt-12 text-xl text-gold-deep">{summerAccelerator.included.heading}</h3>
      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {summerAccelerator.included.items.map((item) => {
          const Icon = includedIcons[item];
          if (!Icon) return null;
          return (
            <li key={item} className="rounded-xl border-2 border-gold px-3 py-5 text-center">
              <span className="icon-ring">
                <Icon aria-hidden />
              </span>
              <p className="mt-3 font-semibold">{item}</p>
            </li>
          );
        })}
      </ul>
      <p className="mt-4">{summerAccelerator.included.text}</p>

      <div className="mt-10 rounded-xl border-2 border-gold p-6 md:p-8">
        <h3 className="text-xl text-gold-deep">{summerAccelerator.showcase.heading}</h3>
        <p className="mt-3">{summerAccelerator.showcase.text}</p>
      </div>
    </Section>
  );
}
