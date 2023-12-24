import { Button } from '@/components/ui/button'
import React from 'react'
import UrlCard from './url-card'
import { getSelf } from '@/lib/auth-service'
import { getStreamByUserId } from '@/lib/stream-service'

type Props = {}

const KeysPage = async (props: Props) => {
    const self = await getSelf()
    const stream = await getStreamByUserId(self.id)

    if (!stream) {
        throw new Error('Stream not found')
    }
    return (
        <div className='p-6'>
            <div className='flex items-center justify-between mb-4'>
                <h1 className='text-2xl font-bold'>Keys & URLs</h1>
                <Button variant={"primary"}>Generate New Key</Button>
            </div>
            <div className='space-y-4'>
                <UrlCard value={stream.serverUrl} />
                <KeyCard value={stream.key} />
            </div>
        </div>
    )
}

export default KeysPage