"use client"

import { useAuth } from "@clerk/nextjs"
import { useTransition } from "react"
import { Button } from "../ui/button"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { onFollow, onUnfollow } from "@/actions/follow"
import { toast } from "sonner"
import { Skeleton } from "../ui/skeleton"


interface ActionsProps {
    isFollowing: boolean
    hostIdentity: string
    isHost: boolean
}

export const Actions = ({
    isFollowing,
    hostIdentity,
    isHost
}: ActionsProps) => {
    const [isPending, startTransitions] = useTransition()
    const router = useRouter()
    const { userId } = useAuth()

    const handleFollow = () => {
        startTransitions(() => {
            onFollow(hostIdentity)
                .then((data) => {
                    toast.success(`Your are now Following ${data.following.username}`)
                })
                .catch((err) => {
                    toast.error("Something went wrong, please try again later")
                })
        })
    }

    const handleUnFollow = () => {
        startTransitions(() => {
            onUnfollow(hostIdentity)
                .then((data) => {
                    toast.success(`Your are now unFollowed ${data.following.username}`)
                })
                .catch((err) => {
                    toast.error("Something went wrong, please try again later")
                })
        })
    }
    const toggleFollow = () => {
        if (!userId) {
            return router.push("/sign-in")
        }

        if (isHost) {
            return
        }

        if (isFollowing) {
            // unfollow
            handleUnFollow()
        } else {
            // follow
            handleFollow()
        }
    }
    return (
        <Button
            disabled={isPending || isHost}
            onClick={toggleFollow}
            variant={"primary"}
            size={"sm"}
            className="w-full lg:w-auto"
        >
            <Heart className={cn(
                "h-4 w-4 mr-2",
                isFollowing ? "fill-white" : "fill-none"
            )} />
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    )
}

export const ActionsSkeleton = () => {
    return (
        <Skeleton className="h-10 w-full lg:w-24" />
    )
}