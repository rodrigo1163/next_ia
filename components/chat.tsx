"use client"

import { useChat } from '@ai-sdk/react';
import { type Message, createIdGenerator } from 'ai';
interface ChatIaProps {
    messagesLoad: Message[]
    id: string
}
export function ChatIa({ messagesLoad, id }: ChatIaProps) {

    const { messages, input, handleInputChange, handleSubmit } = useChat({
        id,
        initialMessages: messagesLoad,
        sendExtraMessageFields: true,
        generateId: createIdGenerator({ prefix: 'msgc', size: 16 }),
        experimental_prepareRequestBody({ messages, id }) {
            return { message: messages[messages.length - 1], id };
        },
        api: "/api/chat-2"
    });

    return (
        <>
            <div className="space-y-4">
                {messages.map(message => (
                    <div key={message.id} className="whitespace-pre-wrap">
                        <div>
                            <div className="font-bold">{message.role}</div>
                            <p>
                                {message.content.length > 0 ? (
                                    message.content
                                ) : (
                                    <span className="italic font-light">
                                        {'calling tool: ' + message?.toolInvocations?.[0].toolName}
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
                    value={input}
                    placeholder="Say something..."
                    onChange={handleInputChange}
                />
            </form>
        </>
    )
}