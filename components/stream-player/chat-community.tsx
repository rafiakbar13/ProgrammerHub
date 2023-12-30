"use client"

import { LocalParticipant, RemoteParticipant } from "livekit-client"
import { useMemo, useState } from "react"
import { useDebounce } from "usehooks-ts"
import { useParticipants } from "@livekit/components-react"
import { Input } from "../ui/input"
import { ScrollArea } from "../ui/scroll-area"
import CommunityItem from "./community-item"


interface ChatCommunityProps {
    hostName: string
    viewerName: string
    isHidden: boolean
}

export const ChatCommunity = ({ hostName, viewerName, isHidden }: ChatCommunityProps) => {
    const [value, setValue] = useState("")
    const participants = useParticipants()
    const debounceValue = useDebounce<string>(value, 500)

    const onChange = (newValue: string) => {
        setValue(newValue)
    }

    const filteredParticipants = useMemo(() => {
        const deduped: RemoteParticipant[] = participants.reduce((acc: RemoteParticipant[], participant: RemoteParticipant | LocalParticipant) => {
            const hostAsViewer = `host-${participant.identity}`;
            if (!acc.some((p: RemoteParticipant) => p.identity === hostAsViewer)) {
                acc.push(participant as RemoteParticipant);
            }
            return acc;
        }, []);

        return deduped.filter((participant: RemoteParticipant) => {
            return participant.name?.toLowerCase().includes(debounceValue.toLowerCase());
        });
    }, [participants, debounceValue]);


    if (isHidden) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">Community is disabled</p>
            </div>
        )
    }


    return (
        <div className="p-4">
            <Input
                onChange={(e) => onChange(e.target.value)}
                placeholder="Seach community"
                className="border-white/10"
            />
            <ScrollArea className="gap-y-2 mt-4">
                <p className="text-center text-sm text-muted-foreground hidden last:block p-2">No Result</p>
                {filteredParticipants.map((participant: any) => (
                    <CommunityItem
                        key={participant.identity}
                        hostName={hostName}
                        viewerName={viewerName}
                        participantName={participant.name}
                        participantIdentity={participant.identity}
                    />
                ))}
            </ScrollArea>
        </div>
    )
}