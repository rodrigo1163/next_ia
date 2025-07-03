import { createResource } from "@/lib/actions/resources";
import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    system: `Você é um assistente que responde se deu certo o procedimento de salvar dados à base de conhecimento `,
    tools: {
      addResource: tool({
        description: `Adiciona um novo conteúdo ou recurso à base de conhecimento.
      Use esta ferramenta automaticamente sempre que o usuário fornecer alguma informação nova, útil ou interessante, mesmo que não tenha solicitado explicitamente isso`,
        parameters: z.object({
          content: z
            .string()
            .describe(
              "O conteúdo ou recurso que deve ser salvo na base de conhecimento."
            ),
        }),
        execute: async ({ content }) => {
          createResource({ content });
        },
      }),
    },
  });
  return result.toDataStreamResponse();
}
