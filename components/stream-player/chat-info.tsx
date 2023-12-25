import { useMemo } from "react";
import { Info } from "lucide-react";

import Hint from "../hint";

interface ChatInfoProps {
    isDelayed: boolean;
    isFollowersOnly: boolean;
}

export const ChatInfo = ({ isDelayed, isFollowersOnly }: ChatInfoProps) => {
    const hint = useMemo(() => {
        if (isFollowersOnly && !isDelayed) {
            return "Only followers can chat"
        }

        if (isDelayed && isFollowersOnly) {
            return "Messages are delayed by 3 seconds"
        }

        if (isDelayed && isFollowersOnly) {
            return "Only followers can chat after 3 seconds"
        }

        return ""
    }, [isDelayed, isFollowersOnly]);

    const label = useMemo(() => {
        if (isFollowersOnly && !isDelayed) {
            return "Followers Only"
        }

        if (isDelayed && isFollowersOnly) {
            return "Slow Mode"
        }

        if (isDelayed && isFollowersOnly) {
            return "Follwers Only & Slow Mode"
        }

        return ""
    }, [isDelayed, isFollowersOnly]);


    if (!isDelayed && !isFollowersOnly) {
        return null
    }

    return (
        <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
            <Hint label={label} >
                <Info className="h-4 w-4" />
            </Hint>
            <span className="text-xs font-semibold">{label}</span>
        </div>
    )
}