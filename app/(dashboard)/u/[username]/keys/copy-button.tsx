"use client"

import { Button } from '@/components/ui/button'
import { CheckCheck, Copy } from 'lucide-react'
import React from 'react'

interface CopyButtonProps {
    value?: string
}

const CopyButton = ({
    value
}: CopyButtonProps) => {
    const [isCopied, setIsCopied] = React.useState(false)

    const onCopy = () => {
        if (!value) {
            return
        }

        setIsCopied(true)
        navigator.clipboard.writeText(value)
        setTimeout(() => {
            setIsCopied(false)
        }, 1000)
    }

    const Icon = isCopied ? CheckCheck : Copy

    return (
        <Button
            onClick={onCopy}
            disabled={!value || isCopied}
            variant={"ghost"}
            size={"sm"}
        >
            <Icon
                className='w-6 h-6'

            />
        </Button>
    )
}

export default CopyButton