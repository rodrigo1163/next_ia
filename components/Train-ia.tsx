"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@ai-sdk/react";

export function TrainIa() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } =
        useChat({
            maxSteps: 3,
            api: "/api/train-ia",
        });
    return (
        <Card className="w-[440px]">
            <CardHeader>
                <CardTitle>Chat AI</CardTitle>
                <CardDescription>Using Vercel SDK to create a chat bot</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[400px] w-full pr-4">
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
                                        {'calling tool: ' + message?.toolInvocations?.[0].toolName}
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
                    <Button type="submit" disabled={isLoading}>
                        Send
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}