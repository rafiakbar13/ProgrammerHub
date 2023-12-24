"use client"

import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { startTransition, useTransition } from "react";
import { updateStream } from "@/actions/stream";
import { Skeleton } from '@/components/ui/skeleton'

type FieldType = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly'

interface ToggleCardProps {
    label: string;
    value: boolean;
    field: FieldType;
}

export const ToggleCard = ({
    label,
    value,
    field,
}: ToggleCardProps) => {
    const [isPending, startTransition] = useTransition()

    const onChange = () => {
        startTransition(() => {
            updateStream({
                [field]: !value,
            })
                .then(() => {
                    toast.success('Stream updated')
                })
                .catch(() => {
                    toast.error('Failed to update stream')
                })
        })
    }

    return (
        <div className="rounded-xl bg-muted p-6">
            <div className="flex items-center justify-between">
                <p className="font-semibold shrink-0">{label}</p>
                <div className="space-y-2">
                    <Switch
                        checked={value}
                        onCheckedChange={onChange}
                        disabled={isPending}
                    >
                        {value ? 'On' : 'Off'}
                    </Switch>
                </div>
            </div>
        </div>
    )
}


export const ToggleCardSkeleton = () => {
    return (
        <Skeleton className='rounded-xl p-10 w-full' />
    )
}