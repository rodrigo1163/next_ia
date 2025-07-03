"use client"

import { createChat } from "@/tools/chat-store";
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation'
export function RedirectToChatButton() {
    const router = useRouter()
    async function goChat() {
        const id = await createChat(); // create a new chat
        router.push(`/chat/${id}`);
    }
    return <Button onClick={goChat}>Iniciar chat</Button>
}