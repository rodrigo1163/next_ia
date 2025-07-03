'use client';

import { useChat } from '@ai-sdk/react';
import { createIdGenerator } from 'ai';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 3,
    initialMessages: [],
    sendExtraMessageFields: true,
    generateId: createIdGenerator({ prefix: 'msgc', size: 16 }),
    experimental_prepareRequestBody({ messages, id }) {
      return {
        messages, // esse é o array completo
        message: messages[messages.length - 1], // isso é necessário para o appendClientMessage
        id,
      };
    },
  });

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center">

      <Card className="w-[440px]">
        <CardHeader>
          <CardTitle>Chat AI</CardTitle>
          <CardDescription>Using Vercel SDK to create a chat bot</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full pr-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className="flex gap-3 text-slate-600 text-sm mb-4"
              >
                {m.role === "user" && (
                  <Avatar>
                    <AvatarFallback>RS</AvatarFallback>
                    <AvatarImage src="https://github.com/Rodrigo1163.png" />
                  </Avatar>
                )}
                {m.role === "assistant" && (
                  <Avatar>
                    <AvatarFallback>RT</AvatarFallback>
                    <AvatarImage src="https://github.com/rocketseat.png" />
                  </Avatar>
                )}
                <p className="leading-relaxed">
                  <span className="block font-bold text-slate-700">
                    {m.role === "user" ? "Usuário" : "AI"}:
                  </span>
                  {m.content.length > 0 ? (
                    m.content
                  ) : (
                    <span className="italic font-light">
                      {"calling tool: " + m?.toolInvocations?.[0].toolName}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form className="w-full flex gap-2" onSubmit={handleSubmit}>
            <Input
              name="prompt"
              placeholder="How can i help you?"
              value={input}
              onChange={handleInputChange}
            />
            <Button type="submit">
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}