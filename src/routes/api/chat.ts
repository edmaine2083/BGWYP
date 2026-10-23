import { createFileRoute } from "@tanstack/react-router";
import { handleChatPost } from "@/lib/chat-api";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      GET: ({ request }) => handleChatPost(request),
      POST: ({ request }) => handleChatPost(request),
      PUT: ({ request }) => handleChatPost(request),
      PATCH: ({ request }) => handleChatPost(request),
      DELETE: ({ request }) => handleChatPost(request),
    },
  },
});
