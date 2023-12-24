"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { onFollow, onUnfollow } from "@/actions/follow"
import { toast } from "sonner"
import { onBlock } from "@/actions/block"

interface ActionsProps {
    isFollowing: boolean
    userId: string
}

export const Actions = ({
    isFollowing,
    userId
}: ActionsProps) => {
    const [isPending, startTransitions] = useTransition()
    const handleFollow = () => {
        startTransitions(() => {
            onFollow("123")
                .then((data) => {
                    toast.success(`You are now following ${data.following.username}`)

                })
                .catch(() => {
                    toast.error("Failed to follow")
                })
        })
    }

    const handleUnFollow = () => {
        startTransitions(() => {
            onUnfollow("123")
                .then((data) => {
                    toast.success(`You have unfollow ${data.following.username}`)

                })
                .catch(() => {
                    toast.error("Failed to follow")
                })
        })
    }

    const onClick = isFollowing ? handleUnFollow : handleFollow

    const handleBlock = () => {
        startTransitions(() => {
            onBlock(userId)
                .then((data) => {
                    toast.success(`Blocked the user ${data.blocked.username}`)
                })
                .catch(() => {
                    toast.error("Something went wrong")
                })
        })
    }

    return (
        <>
            <Button disabled={isPending} variant={"primary"} onClick={onClick}>
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Button onClick={handleBlock} disabled={isPending} >
                Block
            </Button>
        </>
    )
} 