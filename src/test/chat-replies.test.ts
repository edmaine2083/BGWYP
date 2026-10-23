import { describe, expect, it } from "vitest";
import { ENROLLMENT_OPEN } from "@/config";
import { answerChat } from "@/lib/chat-replies";

describe("site chat replies", () => {
  it("answers who can join from the published age range", () => {
    expect(answerChat("Who can join?")).toMatch(/11 to 24/);
    expect(answerChat("Who can join?")).toMatch(/Foundations/);
  });

  it("describes a Summer Accelerator week without inventing dates", () => {
    const reply = answerChat("What happens in week 2 of the summer accelerator?");
    expect(reply).toMatch(/Wealth Fundamentals/);
    expect(reply).not.toMatch(/\b(January|June|July|2027)\b/);
  });

  it("uses the enrollment flag", () => {
    const reply = answerChat("How do I enroll?");
    expect(reply).toMatch(ENROLLMENT_OPEN ? /Enrollment is open/ : /not open yet/);
    expect(reply).toMatch(/interest list/);
  });

  it("sends danger reports to 911 and does not invent an answer for unknown questions", () => {
    expect(answerChat("A young person is in danger")).toMatch(/911/);
    expect(answerChat("What is the cafeteria menu on Mars?")).toMatch(/FAQ/);
  });
});
