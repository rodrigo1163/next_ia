import { loadChat, saveChat } from "@/tools/chat-store";
import { openai } from "@ai-sdk/openai";
import { appendClientMessage, appendResponseMessages, streamText } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { message, id } = await req.json();
  const previousMessages = await loadChat(id);
  const messages = appendClientMessage({
    messages: previousMessages,
    message,
  });

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,

    async onFinish({ response }) {
      await saveChat({
        id,
        messages: appendResponseMessages({
          messages,
          responseMessages: response.messages,
        }),
      });
    },
  });
  result.consumeStream();

  return result.toDataStreamResponse();
}
