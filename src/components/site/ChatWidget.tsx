import { Link } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { CHAT_ENABLED, CONTACT_EMAIL, LOGO_SRC } from "@/config";
import { cn } from "@/lib/utils";

const CHAT_ERROR_REPLY = `Sorry, I am having trouble connecting right now. Please email ${CONTACT_EMAIL} for immediate assistance.`;

const WELCOME =
  "Hi there! Welcome to BGWYP. How can I help you with our programs or the Summer Accelerator today?";

const INTERNAL = [
  "/",
  "/about",
  "/programs",
  "/safety",
  "/get-involved",
  "/partner",
  "/donate",
  "/faq",
  "/contact",
] as const;

type InternalPath = (typeof INTERNAL)[number];

function isInternal(href: string): href is InternalPath {
  return (INTERNAL as readonly string[]).includes(href);
}

type ChatMessage = { id: number; role: "bot" | "user"; text: string };

function MessageBody({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const label = match[1];
    const href = match[2];
    nodes.push(
      isInternal(href) ? (
        <Link key={match.index} to={href}>
          {label}
        </Link>
      ) : (
        <a key={match.index} href={href}>
          {label}
        </a>
      ),
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: 1, role: "bot", text: WELCOME }]);
  const nextId = useRef(2);
  const sending = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
  }, [messages, open]);

  if (!CHAT_ENABLED) return null;

  function close() {
    setOpen(false);
    toggleRef.current?.focus();
  }

  async function send(event?: FormEvent) {
    event?.preventDefault();
    const text = draft.trim().slice(0, 500);
    if (!text || sending.current) return;
    sending.current = true;
    const userId = nextId.current++;
    const loadingId = nextId.current++;
    setDraft("");
    setMessages((current) => [
      ...current,
      { id: userId, role: "user", text },
      { id: loadingId, role: "bot", text: "Thinking..." },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages
            .filter(
              (message) =>
                message.text !== WELCOME && message.text !== "Thinking..." && message.text !== CHAT_ERROR_REPLY,
            )
            .slice(-8)
            .map((message) => ({
              role: message.role === "user" ? "user" : "model",
              text: message.text,
            })),
        }),
      });
      const data = (await response.json()) as { reply?: unknown };
      if (typeof data.reply !== "string" || !data.reply.trim()) throw new Error("Chat failed");
      setMessages((current) =>
        current.map((message) => (message.id === loadingId ? { ...message, text: data.reply as string } : message)),
      );
    } catch {
      setMessages((current) =>
        current.map((message) => (message.id === loadingId ? { ...message, text: CHAT_ERROR_REPLY } : message)),
      );
    } finally {
      sending.current = false;
    }
  }

  return (
    <div id="bgwyp-chat-container" className="chat-container">
      <button
        id="chat-toggle-btn"
        ref={toggleRef}
        type="button"
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        aria-controls="chat-window"
        onClick={() => (open ? close() : setOpen(true))}
      >
        💬
      </button>
      <div
        id="chat-window"
        role="dialog"
        aria-labelledby={titleId}
        className={cn("chat-window", !open && "hidden")}
      >
        <div className="chat-header">
          <div>
            <h3 id={titleId}>BGWYP Assistant</h3>
            <p className="chat-source">Answers from this website</p>
          </div>
          <div className="chat-header-end">
            <button id="chat-close-btn" type="button" onClick={close} aria-label="Close chat">
              &times;
            </button>
            <img className="chat-header-logo" src={LOGO_SRC} alt="" width={52} height={52} />
          </div>
        </div>
        <div
          id="chat-messages"
          ref={scrollerRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          className="chat-messages"
        >
          {messages.map((message) => (
            <div key={message.id} className={cn("message", message.role === "user" ? "user-message" : "bot-message")}>
              <MessageBody text={message.text} />
            </div>
          ))}
        </div>
        <form className="chat-input-area" onSubmit={send}>
          <label htmlFor="chat-user-input" className="sr-only">
            Type your question
          </label>
          <input
            id="chat-user-input"
            ref={inputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") close();
            }}
            placeholder="Type your question..."
            maxLength={500}
          />
          <button id="chat-send-btn" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
