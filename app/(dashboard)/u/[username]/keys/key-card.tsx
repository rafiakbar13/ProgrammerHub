"use client"
import { Input } from '@/components/ui/input'
import React from 'react'
import CopyButton from './copy-button'
import { Button } from '@/components/ui/button'

interface KeyCardProps {
    value?: string | null
}

const KeyCard = ({
    value
}: KeyCardProps) => {
    const [isShown, setIsShown] = React.useState(false)
    return (
        <div className='rounded-xl bg-muted p-6'>
            <div className='flex items-start gap-x-10'>
                <p className='font-semibold shrink-0'>Stream key</p>
                <div className='space-y-2 w-full'>
                    <div className='w-full flex items-center gap-x-2'>
                        <Input
                            value={value || ""}
                            type={isShown ? "text" : "password"}
                            disabled
                            placeholder='Stream key'
                        />
                        <CopyButton value={value || ""} />
                    </div>
                    <Button
                        onClick={() => setIsShown(!isShown)}
                        variant={"link"}
                        size={"sm"}>
                        {isShown ? "Hide" : "Show"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default KeyCard