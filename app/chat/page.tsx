import { RedirectToChatButton } from "@/components/redirect-to-chat-button";
import { Button } from "@/components/ui/button";

export default function Chat() {


    return (
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
            <RedirectToChatButton />
        </div>
    );
}