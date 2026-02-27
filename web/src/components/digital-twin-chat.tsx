"use client";

import { FormEvent, useMemo, useState } from "react";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

const starterPrompts = [
  "What are Adrian's strongest architecture skills?",
  "What are the biggest milestones in his career journey?",
  "How does Adrian approach modernization on Azure?",
  "How does Adrian balance board-level strategy with delivery?"
];

function newMessage(role: ChatRole, content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content
  };
}

export function DigitalTwinChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    newMessage(
      "assistant",
      "I am AdrianAI, a digital twin assistant. Ask me anything about Adrian's career journey, architecture leadership, and cloud modernization expertise."
    )
  ]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasUserMessages = useMemo(
    () => messages.some((message) => message.role === "user"),
    [messages]
  );

  async function sendPrompt(rawPrompt: string) {
    const prompt = rawPrompt.trim();
    if (!prompt || isLoading) {
      return;
    }

    const userMessage = newMessage("user", prompt);
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setDraft("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/digital-twin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.content
          }))
        })
      });

      const data = (await response.json()) as { error?: string; reply?: string };
      const reply = typeof data.reply === "string" ? data.reply.trim() : "";

      if (!response.ok || !reply) {
        throw new Error(data.error ?? "Unable to get a response from AdrianAI.");
      }

      setMessages((current) => [...current, newMessage("assistant", reply)]);
    } catch (sendError) {
      const message =
        sendError instanceof Error
          ? sendError.message
          : "Unable to connect to the digital twin right now.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendPrompt(draft);
  }

  return (
    <div className="digital-twin-shell">
      {!hasUserMessages && (
        <div className="prompt-row" aria-label="Suggested prompts">
          {starterPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              className="prompt-chip"
              onClick={() => void sendPrompt(prompt)}
              disabled={isLoading}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <div className="chat-stream" aria-live="polite">
        {messages.map((message) => (
          <article
            key={message.id}
            className={`chat-bubble ${message.role === "assistant" ? "chat-assistant" : "chat-user"}`}
          >
            <p className="chat-role">{message.role === "assistant" ? "AdrianAI" : "You"}</p>
            <p>{message.content}</p>
          </article>
        ))}

        {isLoading && (
          <article className="chat-bubble chat-assistant">
            <p className="chat-role">AdrianAI</p>
            <p>Thinking...</p>
          </article>
        )}
      </div>

      <form className="chat-form" onSubmit={handleSubmit}>
        <label htmlFor="digital-twin-input" className="sr-only">
          Ask AdrianAI
        </label>
        <textarea
          id="digital-twin-input"
          placeholder="Ask about architecture philosophy, major deliveries, leadership style, certifications..."
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          rows={3}
          maxLength={1500}
          disabled={isLoading}
          required
        />
        <div className="chat-actions">
          {error && <p className="chat-error">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={isLoading || !draft.trim()}>
            {isLoading ? "Sending..." : "Ask AdrianAI"}
          </button>
        </div>
      </form>
    </div>
  );
}
