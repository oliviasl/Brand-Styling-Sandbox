import prompt from "./prompt";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { designTokens } = await req.json();

    const { text } = await generateText({
      model: google("gemini-1.5-pro-latest", {
        structuredOutputs: false,
      }),
      prompt: `${prompt}\n\nStylesto update:\n${JSON.stringify(designTokens, null, 2)}`,
    });

    return Response.json({ success: true, output: text });
  } catch {
    return Response.json({ success: false });
  }
}
