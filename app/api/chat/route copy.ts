import { createResource } from "@/lib/actions/resources";
import { findRelevantContent } from "@/lib/ia/embedding";
import { loadChat } from "@/tools/chat-store";
import { openai } from "@ai-sdk/openai";
import { appendClientMessage, streamText, tool } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    system: `Você é um assistente que responde apenas com base nas informações disponíveis na sua base de conhecimento interna.`,
    tools: {
      getInformation: tool({
        description: `Busca informações na base de conhecimento para responder perguntas dos usuários.`,
        parameters: z.object({
          question: z.string().describe("A pergunta feita pelo usuário."),
        }),
        execute: async ({ question }) => findRelevantContent(question),
      }),
    },
  });
  return result.toDataStreamResponse();
}
