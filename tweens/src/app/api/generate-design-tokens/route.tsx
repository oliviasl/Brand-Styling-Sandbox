import prompt from "./prompt";
import { DesignTokensSchema } from "./schema";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { attributes } = await req.json();

    const result = await generateObject({
      model: google("gemini-1.5-pro-latest", {
        structuredOutputs: false,
      }),
      schema: DesignTokensSchema,
      prompt: `${prompt}\n\n${Object.entries(attributes)
        .map(([key, value]) => `${key}: ${value}%`)
        .join("\n")}`,
    });

    return Response.json({ success: !!result?.object, object: result?.object });
  } catch {
    return Response.json({ success: false });
  }
}
