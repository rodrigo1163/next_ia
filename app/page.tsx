'use client';

import { useState, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { createIdGenerator } from 'ai';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { XIcon, Plus, Send } from 'lucide-react';

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

  const [isOpenChat, setIsOpenChat] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center relative">
      <div className="absolute bottom-0 right-5 w-80 z-10">
        {/* HEADER DO CHAT */}
        <div className="bg-black rounded-t-md flex items-start justify-end w-full px-2 py-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpenChat(!isOpenChat)}
            className="hover:bg-transparent"
          >
            {isOpenChat ? (
              <XIcon className="w-4 h-4 text-white" />
            ) : (
              <Plus className="w-4 h-4 text-white" />
            )}
          </Button>
        </div>

        {/* CHAT CARD */}
        {isOpenChat && (
          <Card className="h-[340px] flex flex-col overflow-hidden rounded-none">
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full w-full pr-4 p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="flex gap-3 text-slate-600 text-sm mb-4"
                  >
                    {message.role === "user" && (
                      <Avatar>
                        <AvatarFallback>RS</AvatarFallback>
                        <AvatarImage src="https://github.com/Rodrigo1163.png" />
                      </Avatar>
                    )}
                    {message.role === "assistant" && (
                      <Avatar>
                        <AvatarFallback>RT</AvatarFallback>
                        <AvatarImage src="https://github.com/rocketseat.png" />
                      </Avatar>
                    )}
                    <p className="leading-relaxed">
                      <span className="block font-bold text-slate-700">
                        {message.role === "user" ? "Usuário" : "AI"}:
                      </span>
                      {message.content.length > 0 ? (
                        message.content
                      ) : (
                        <span className="italic font-light">
                          {"calling tool: " + message?.toolInvocations?.[0].toolName}
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
            <CardFooter className="p-2 border-t">
              <form className="w-full flex gap-2" onSubmit={handleSubmit}>
                <Input
                  name="prompt"
                  placeholder="Como posso ajudar?"
                  value={input}
                  onChange={handleInputChange}
                  className="w-full"
                />
                <Button type="submit">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        )}
      </div>

      <div className='absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1'>
        <div className='bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transition-all duration-300'></div>
        <div className='bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 transition-all duration-300'></div>
        <div className='bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300'></div>
        <div className='bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 transition-all duration-300'></div>
      </div>

    </div>
  );
}