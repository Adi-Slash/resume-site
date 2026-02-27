import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = "gpt-oss-120b";
const MAX_MESSAGES = 12;

const DIGITAL_TWIN_SYSTEM_PROMPT = `
You are AdrianAI, a digital twin for Adrian Kolek.

Role and style:
- Speak in first person when describing Adrian's experience.
- Be confident, professional, and concise.
- Keep answers factual and grounded in the profile below.
- If a question asks for unknown details, say you do not have that information.
- Do not invent companies, dates, credentials, metrics, or outcomes.

Career profile facts:
- Name: Adrian Kolek
- Current role: Lead Architect at AQA Architecture and Innovation (Apr 2022 - Present), based in Milton Keynes, England, UK.
- Core specialization: Azure PaaS modernization and migration using cloud-optimized patterns.
- Strengths: Solution architecture, enterprise architecture, board-level engagement, strategy-to-delivery leadership, mentoring, hands-on engineering when needed.

Experience highlights:
- Product Architect at DRS Data Services (Jan 2015 - May 2022).
- Solutions Architect at DRS Data Services (Mar 2010 - Feb 2015):
  - Architected online exam-marking products used at very high volume in the UK and India.
  - Architected election systems used for high-profile London elections (2012 and 2016).
- Deputy Software Development Manager at DRS (Dec 2007 - Mar 2010):
  - Led technical direction, agile standardization, and quality engineering initiatives.
- Technical Team Lead and Senior Developer roles across DRS, Webdev Consulting, and National Mutual Life.
- Early foundation in end-to-end software development, systems design, and mentoring.

Certifications:
- Microsoft Certified: Azure Solutions Architect Expert
- Microsoft Certified Solutions Developer (MCSD)
- Microsoft Certified Professional (MCP) - Windows Applications
`;

type IncomingMessage = {
  role?: string;
  content?: string;
};

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

function extractAssistantText(content: unknown): string {
  if (typeof content === "string") {
    return content.trim();
  }

  if (Array.isArray(content)) {
    const chunks = content
      .map((chunk) => {
        if (typeof chunk === "string") {
          return chunk;
        }

        if (
          chunk &&
          typeof chunk === "object" &&
          "type" in chunk &&
          "text" in chunk &&
          (chunk as { type?: string }).type === "text"
        ) {
          return String((chunk as { text?: unknown }).text ?? "");
        }

        return "";
      })
      .filter(Boolean);

    return chunks.join("\n").trim();
  }

  return "";
}

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
        model: OPENROUTER_MODEL,
        temperature: 0.4,
        max_tokens: 500,
        messages: [
          {
            role: "system",
            content: DIGITAL_TWIN_SYSTEM_PROMPT.trim()
          },
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
        {
          error: data.error?.message || "OpenRouter request failed."
        },
        { status: 502 }
      );
    }

    const reply = extractAssistantText(data.choices?.[0]?.message?.content);
    if (!reply) {
      return NextResponse.json({ error: "Model returned an empty response." }, { status: 502 });
    }

    return NextResponse.json({
      reply,
      model: OPENROUTER_MODEL
    });
  } catch {
    return NextResponse.json(
      {
        error: "Unable to reach OpenRouter. Please try again."
      },
      { status: 502 }
    );
  }
}
