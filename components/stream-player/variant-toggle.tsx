"use client"

import { ArrowLeftFromLine, ArrowRightFromLine, MessageSquare, Users } from "lucide-react"

import Hint from "../hint"
import { Button } from "../ui/button"
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar"


export const VariantToggle = () => {
    const {
        variant,
        onChangeVariant
    } = useChatSidebar((state) => state)
    const isChat = variant === ChatVariant.CHAT


    let Icon = variant === ChatVariant.CHAT ? Users : MessageSquare


    const onToggle = () => {
        const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT
        onChangeVariant(newVariant)
    }

    const label = isChat ? "Community" : "Go Back to chat"

    return (
        <Hint label={label} side="left" asChild>
            <Button
                onClick={onToggle}
                className="h-auto hover:bg-white/10 hover:text-primary bg-transparent"
                aria-label={label}
                variant={"ghost"}
            >
                <Icon className="h-4 w-4" />
            </Button>
        </Hint>

    )
}