## Building Adrian's Digital-Twin Resume Site (Beginner-Friendly Tutorial)

This tutorial explains, **step by step**, how this project was built:

- A modern **Next.js** website for your career profile.
- A live **“digital twin” AI chat** powered by **OpenRouter**.
- A clean project structure with **TypeScript**, **ESLint**, and **Git**.

It’s written for a **complete beginner in frontend coding**. You don’t need prior experience; just follow along and *experiment* as you go.

---

## 1. Technology Overview (Plain English)

### 1.1 Next.js

- **What it is**: A framework built on top of **React** (a popular JavaScript library for building user interfaces).
- **Why it’s used here**:
  - Gives you a **full website** (pages, routing, APIs) out of the box.
  - Handles **server-side code** (like talking to OpenRouter) and **client-side code** (the visible UI) in one project.
  - Has excellent support for **TypeScript** and **performance optimizations**.

In this project we use:

- The **App Router** (the `src/app` directory).
- **Static pages** for the content (home, portfolio).
- A **dynamic API route** for the digital twin chat.

### 1.2 React

- **What it is**: A JavaScript library for building UI using components.
- **Why it matters here**:
  - Each visible part of the page (hero, timeline, chat box) is a **component**.
  - Components are just **functions that return JSX** (HTML-like tags inside JavaScript/TypeScript).

Example mental model:

- `Home` component → Your entire homepage.
- `DigitalTwinChat` component → The AI chat box on the page.

### 1.3 TypeScript

- **What it is**: JavaScript plus **types**.
- **Why it’s helpful**:
  - Catches errors **before** you run the code.
  - Helps you understand what shape data has (e.g. a `message` has a `role` and `content`).

You’ll see `tsx` file extensions (TypeScript + JSX).

### 1.4 OpenRouter

- **What it is**: A service that lets you call many AI models (including open-source ones) through a single API.
- **Model used here**: `"gpt-oss-120b"` (a large, reasoning-focused model).
- **How we use it**:
  - We send the **conversation** (your questions + the AI’s previous answers).
  - We include a **“system prompt”** that tells the model to behave as *Adrian’s digital twin*.
  - We get back a **text answer** that we show in the chat UI.

Your secret key is stored in `.env` and **never committed to GitHub**.

---

## 2. Project Structure (High-Level Walkthrough)

At the top level:

- `site/`
  - `web/` → The actual Next.js app.
  - `prompts/` → Prompt/instruction files you created.
  - `linkedin.pdf` → Career info used to craft the site content.
  - `.env` → Contains `OPENROUTER_API_KEY=...` (your secret; not in Git).

Inside `web/`:

- `package.json` → Project metadata + scripts.
- `tsconfig.json` → TypeScript configuration.
- `eslint.config.mjs` → ESLint (code quality) configuration.
- `next.config.ts` → Next.js configuration.
- `src/app/`
  - `layout.tsx` → Root HTML layout & fonts.
  - `globals.css` → Global design + layout styling.
  - `page.tsx` → Homepage (About, Journey, Portfolio, AI Twin, Contact).
  - `portfolio/page.tsx` → Dedicated portfolio/roadmap page.
  - `api/digital-twin/route.ts` → API endpoint that talks to OpenRouter.
- `src/components/`
  - `digital-twin-chat.tsx` → Client-side chat UI (AdrianAI).

Git:

- `site/.git/` → Git repository.
- `web/.gitignore` → Tells Git which files to ignore (e.g. `node_modules`, `.next`, logs, etc.).

---

## 3. How to Run the Project

From a terminal in **Windows**:

```bash
cd C:\POC\Udemy-Vibe-Coding\site\web

# Install dependencies (only needed once or when dependencies change)
npm install

# Start the dev server
npm run dev
```

You’ll see something like:

- `Local: http://localhost:3001`

Open that URL in your browser.  
You’ll see:

- Hero section with your role.
- About / Journey / Portfolio sections.
- **“AI Twin”** section for AdrianAI chat.

---

## 4. High-Level Walkthrough of What Was Built

### 4.1 The Layout and Styling

**File**: `web/src/app/layout.tsx`  
**Role**: Defines the HTML `<html>` and `<body>`, loads fonts, and wraps your pages.

Key ideas:

- Uses **Next.js Metadata** for the browser tab title and description.
- Uses **Google Fonts** (`Manrope` and `Space_Grotesk`) via `next/font/google`.
- Applies font CSS variables to the `body`.

In words: “Every page of your site shares this layout and these fonts.”

**File**: `web/src/app/globals.css`  
**Role**: Global styling — colors, spacing, typography, and special UI for panels and the chat.

Key design elements:

- **Dark gradient background** with subtle colored glows.
- **Glass-like panels** (semi-transparent with `backdrop-filter: blur(...)`).
- **Responsive grid** for metrics, timeline, portfolio cards.
- **Chat UI** styling for bubbles, textarea, and prompt chips.

### 4.2 The Homepage Content

**File**: `web/src/app/page.tsx`  
**Role**: This is your main landing page.

Sections:

1. **Top navigation**: `About`, `Journey`, `Portfolio`, `AI Twin`, `Contact`.
2. **Hero**: Summary of who you are and what you do.
3. **About Me**: Two-column description plus metrics (years of experience, etc.).
4. **Career Journey**: Timeline of roles (Lead Architect, Product Architect, etc.).
5. **Skills & Certifications**: Two-column panel with pill-style skills and bullet-point certs.
6. **Portfolio (Future)**: Cards describing future case studies.
7. **Digital Twin (AI Twin)**: Embedded chat component.
8. **Footer**: Contact email + LinkedIn.

The data (metrics, journey steps, etc.) is coded as **arrays of objects** near the top of the file, which keeps the JSX relatively clean.

### 4.3 The Portfolio Page

**File**: `web/src/app/portfolio/page.tsx`  
**Role**: A dedicated page for future architecture case studies.

It:

- Reuses the same general styling (panels, hero, CTA row).
- Lists roadmap items with a timeline (e.g., “Cloud Modernization Playbook”).
- Provides navigation back to the homepage and to LinkedIn.

### 4.4 The Digital Twin Chat – Overview

The digital twin has **two main parts**:

1. **Frontend chat UI** (`DigitalTwinChat` component).
2. **Backend API route** (`/api/digital-twin`) that calls OpenRouter.

The flow is:

1. You type a question (or click a suggested prompt).
2. The browser sends a POST request to `/api/digital-twin`.
3. The API route calls **OpenRouter** with:
   - A **system prompt** describing Adrian’s career.
   - The **conversation history**.
4. OpenRouter replies with text.
5. The API returns that text to the browser, which displays it as an AI message.

---

## 5. Detailed Code Review with Examples

### 5.1 Homepage: Data-Driven Sections

**File**: `web/src/app/page.tsx`

At the top, we define **data arrays** for metrics, journey, certifications, skills, and future portfolio items:

```tsx
const impactMetrics = [
  { label: "Years in software delivery", value: "30+" },
  { label: "Years shaping architecture", value: "15+" },
  { label: "High-stakes exam papers processed", value: "Millions" },
  { label: "Board-level strategy and delivery", value: "Proven" }
];
```

Then we turn those into UI using `.map()`:

```tsx
<div className="metrics-grid">
  {impactMetrics.map((metric) => (
    <article key={metric.label} className="metric-card">
      <p className="metric-value">{metric.value}</p>
      <p className="metric-label">{metric.label}</p>
    </article>
  ))}
</div>
```

**Beginner takeaway**:  
Arrays of objects + `.map()` = a simple, powerful way to render repeated UI.

The **Digital Twin section** at the bottom wires in the chat component:

```tsx
<section id="chat" className="panel">
  <div className="section-header">
    <p className="eyebrow">Digital Twin</p>
    <h2>Ask AdrianAI about career, architecture, and delivery experience.</h2>
  </div>
  <p className="hero-copy">
    This assistant is tuned from Adrian&apos;s profile and career highlights...
  </p>
  <DigitalTwinChat />
</section>
```

You can think of `<DigitalTwinChat />` as dropping in a “chat widget” component.

### 5.2 The Digital Twin Chat UI (Frontend)

**File**: `web/src/components/digital-twin-chat.tsx`

Key pieces:

1. We mark the component as **client-side**:

```tsx
"use client";
```

This tells Next.js that this file uses React hooks and runs in the browser.

2. We define the **message types**:

```tsx
type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};
```

3. We hold **state** for:

- `messages` → the conversation.
- `draft` → what’s in the textarea.
- `isLoading` → whether we’re waiting for AI.
- `error` → an error message, if any.

```tsx
const [messages, setMessages] = useState<ChatMessage[]>([
  newMessage(
    "assistant",
    "I am AdrianAI, a digital twin assistant. Ask me anything about Adrian's career journey..."
  )
]);

const [draft, setDraft] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

4. Sending a message:

```tsx
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
      headers: { "Content-Type": "application/json" },
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
```

**Beginner explanation**:

- `fetch` is how we call our backend API from the browser.
- We send the **conversation messages** as JSON.
- We handle three states:
  - Busy (loading).
  - Success (we got an answer).
  - Error (something went wrong).

5. Rendering the messages:

```tsx
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
```

**Beginner takeaway**:  
Component state (`useState`) + `.map()` + conditional rendering (`{condition && ...}`) = standard React patterns you will use very often.

### 5.3 The API Route (Backend)

**File**: `web/src/app/api/digital-twin/route.ts`

This file runs **on the server**, not in the browser.

Key roles:

1. **Read the API key**, either from `process.env.OPENROUTER_API_KEY` or from the parent `.env`:

```ts
function readApiKeyFromParentEnv(): string | null {
  try {
    const envPath = resolve(process.cwd(), "..", ".env");
    const raw = readFileSync(envPath, "utf8");
    const lines = raw.split(/\r?\n/);
    const keyLine = lines.find((line) => line.trim().startsWith("OPENROUTER_API_KEY="));
    if (!keyLine) {
      return null;
    }

    const value = keyLine.slice(keyLine.indexOf("=") + 1).trim().replace(/^['"]|['"]$/g, "");
    return value || null;
  } catch {
    return null;
  }
}

function getApiKey(): string | null {
  return process.env.OPENROUTER_API_KEY?.trim() || readApiKeyFromParentEnv();
}
```

2. Define the **system prompt** that turns the model into Adrian’s digital twin:

```ts
const DIGITAL_TWIN_SYSTEM_PROMPT = `
You are AdrianAI, a digital twin for Adrian Kolek.

Role and style:
- Speak in first person when describing Adrian's experience.
- Be confident, professional, and concise.
- Keep answers factual and grounded in the profile below.
...
`;
```

3. Handle the `POST` request:

```ts
export async function POST(request: NextRequest) {
  const apiKey = getApiKey();
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENROUTER_API_KEY is missing. Add it to web/.env.local or ../.env." },
      { status: 500 }
    );
  }

  let payload: { messages?: IncomingMessage[] };
  try {
    payload = (await request.json()) as { messages?: IncomingMessage[] };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const safeMessages = Array.isArray(payload.messages)
    ? payload.messages
        .filter(
          (message): message is Required<IncomingMessage> =>
            (message.role === "user" || message.role === "assistant") &&
            typeof message.content === "string" &&
            message.content.trim().length > 0
        )
        .slice(-MAX_MESSAGES)
    : [];

  if (safeMessages.length === 0) {
    return NextResponse.json({ error: "Provide at least one valid message." }, { status: 400 });
  }

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "Adrian Kolek Digital Twin"
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,          // "gpt-oss-120b"
        temperature: 0.4,
        max_tokens: 500,
        messages: [
          { role: "system", content: DIGITAL_TWIN_SYSTEM_PROMPT.trim() },
          ...safeMessages
        ]
      })
    });

    const data = (await response.json()) as {
      error?: { message?: string };
      choices?: Array<{ message?: { content?: unknown } }>;
    };

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "OpenRouter request failed." },
        { status: 502 }
      );
    }

    const reply = extractAssistantText(data.choices?.[0]?.message?.content);
    if (!reply) {
      return NextResponse.json({ error: "Model returned an empty response." }, { status: 502 });
    }

    return NextResponse.json({ reply, model: OPENROUTER_MODEL });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach OpenRouter. Please try again." },
      { status: 502 }
    );
  }
}
```

**Beginner explanation**:

- This function only runs when the frontend sends a `POST` request to `/api/digital-twin`.
- It:
  - Validates input.
  - Calls OpenRouter.
  - Returns either:
    - `{ reply: "...", model: "gpt-oss-120b" }` on success, or
    - `{ error: "..." }` with an appropriate HTTP status code on failure.

### 5.4 Global Styling for the Chat

**File**: `web/src/app/globals.css` (excerpt)

Key chat-specific classes:

```css
.digital-twin-shell {
  margin-top: 1.2rem;
}

.chat-stream {
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: rgba(7, 11, 19, 0.7);
  padding: 0.85rem;
  min-height: 260px;
  max-height: 440px;
  overflow-y: auto;
  display: grid;
  gap: 0.7rem;
}

.chat-bubble {
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 0.8rem;
  max-width: min(100%, 76ch);
}

.chat-assistant {
  justify-self: start;
  background: rgba(20, 30, 52, 0.75);
}

.chat-user {
  justify-self: end;
  background: rgba(109, 139, 255, 0.18);
}
```

This gives:

- A scrollable chat region.
- Different bubble colors for you vs AdrianAI.
- A look that matches the rest of the site (glassy, modern, “enterprise meets edgy”).

---

## 6. Self-Review: 5 Ways to Improve the Code Further

1. **Extract a Dedicated Design System**
   - Right now, global styles and component classes live mostly in `globals.css`.
   - Improvement:
     - Create a small design system using either:
       - CSS Modules per component, or
       - A utility framework (e.g. Tailwind) with custom tokens.
     - This would make it easier to reuse styles and change themes later.

2. **Stronger Type Safety for API Contracts**
   - The API route uses plain TypeScript types, but the contract between `/api/digital-twin` and `DigitalTwinChat` is implicit.
   - Improvement:
     - Define shared types in a `web/src/lib/types.ts` file (e.g. `DigitalTwinRequest`, `DigitalTwinResponse`).
     - Import these types in both the API and the frontend, so any shape change is caught at compile time.

3. **Streaming Responses from OpenRouter**
   - Currently, the chat waits for the entire reply before displaying it.
   - Improvement:
     - Use **streaming** (if supported by the model/endpoint) so tokens appear gradually (“typing” effect).
     - This would feel more responsive and more like a live assistant.

4. **More Structured Prompting and Guardrails**
   - The system prompt is strong but could be enhanced:
     - Add explicit rules for **refusing** to answer non-career/architecture questions.
     - Add formatting guidance (e.g. always answer in bullet points for certain types of questions).
   - Improvement:
     - Introduce a small prompt library file that centralizes all prompts and variants.

5. **Testing & Monitoring**
   - There are no automated tests yet.
   - Improvement:
     - Add:
       - Basic unit tests for helper functions (e.g. `extractAssistantText`).
       - Integration tests for the API route (mocking the OpenRouter response).
     - Log key metrics (request counts, error rates) in production.

These aren’t required for the site to work, but they’re **natural next steps** to make it more maintainable, scalable, and professional as a long-term portfolio and AI demo.

---

If you’d like, I can now add a **shorter, beginner-focused README** that complements this tutorial and focuses purely on “install, run, and tweak content” without the deeper code explanations.+
