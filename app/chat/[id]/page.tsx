import { ChatIa } from "@/components/chat";
import { loadChat } from "@/tools/chat-store";

export default async function Chat(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;
    const messagesLoad = await loadChat(id);
    return (
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
            <ChatIa messagesLoad={messagesLoad} id={id} />
        </div>
    );
}