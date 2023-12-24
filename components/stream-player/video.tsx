"use client"
import React from 'react'
import { ConnectionState, Track } from 'livekit-client'
import {
    useConnectionState,
    useRemoteParticipant,
    useTracks
} from '@livekit/components-react'
import { OfflineVideo } from './offline-video'
import { Loading } from './loading'
import { LiveVideo } from './live-video'



interface VideoProps {
    hostname: string
    hostIdentity: string
}

const video = ({
    hostname,
    hostIdentity
}: VideoProps) => {
    const connectionState = useConnectionState()
    const participant = useRemoteParticipant(hostIdentity)
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone
    ]).filter((track) => track.participant.identity === hostIdentity)

    let content;

    if (!participant && connectionState === ConnectionState.Connected) {
        content = <OfflineVideo username={hostname} />
    } else if (!participant || tracks.length === 0) {
        content = <Loading label={connectionState} />
    } else {
        content = <LiveVideo participant={participant} />
    }

    return (
        <div className='aspect-video box-border group relative'>
            {content}
        </div>
    )
}

export default video