"use client"

import { useSidebar } from '@/store/use-sidebar'
import { Follow, User } from '@prisma/client'
import React from 'react'
import UserItem, { UserItemSkeleton } from './user-item'

interface FollowingProps {
    data: (Follow & { following: User })[]
}

const following = ({
    data
}: FollowingProps) => {

    const { collapsed } = useSidebar()
    if (!data.length) return null
    return (
        <div>
            {!collapsed && (
                <div className='pl-6 mb-4'>
                    <p className='text-sm text-muted-foreground'>
                        Following
                    </p>
                </div>
            )}
            <ul className='space-y-4 px-2'>
                {data.map((follow) => (
                    <UserItem
                        key={follow.following.id}
                        username={follow.following.username}
                        imageUrl={follow.following.imageUrl}
                    />
                ))}
            </ul>
        </div>
    )
}

export default following


export const FollowingSkeleton = () => {
    return (
        <ul className='px-2 pt-2 lg:pt-0'>
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    )
}