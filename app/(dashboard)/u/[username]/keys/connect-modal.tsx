"use client"
import React, { ElementRef } from 'react'
import { IngressInput } from 'livekit-server-sdk'
import { createIngress } from '@/actions/ingress'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogClose,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import {
    Alert,
    AlertTitle,
    AlertDescription,
} from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { toast } from 'sonner'



interface ConnectModalProps { }

const RTMP = String(IngressInput.RTMP_INPUT)
const WHIP = String(IngressInput.WHIP_INPUT)

type IngressType = typeof RTMP | typeof WHIP

const ConnectModal = (props: ConnectModalProps) => {
    const closeRef = React.useRef<ElementRef<"button">>(null)
    const [isPending, startTransition] = React.useTransition()
    const [ingressType, setIngressType] = React.useState<IngressType>(RTMP)

    const onSubmit = () => {
        startTransition(() => {
            createIngress(parseInt(ingressType))
                .then(() => {
                    toast.success('Ingress created')
                    closeRef?.current?.click()
                })
                .catch((err) => {
                    toast.error("Something went wrong")
                });
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"primary"} size={"sm"}>
                    Generate
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate Connection</DialogTitle>
                </DialogHeader>
                <Select
                    value={ingressType}
                    onValueChange={(value) => setIngressType(value)}
                    disabled={isPending}
                >
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder="Ingress Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem className='' value={RTMP}>RTMPT</SelectItem>
                        <SelectItem className='' value={WHIP}>WHIP</SelectItem>
                    </SelectContent>
                </Select>
                <Alert >
                    <AlertTriangle className='h-4 w-4' />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                        This action will reset all active stream using the current connection
                    </AlertDescription>
                </Alert>
                <div className='flex justify-between'>
                    <DialogClose ref={closeRef} asChild>
                        <Button variant={"ghost"} size={"sm"}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={onSubmit}
                        disabled={isPending}
                        variant={"primary"}
                    >
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ConnectModal