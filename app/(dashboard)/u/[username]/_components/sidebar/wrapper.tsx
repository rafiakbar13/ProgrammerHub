"use client"
import React from 'react'
import { cn } from '@/lib/utils'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'
import Container from './container'


interface WrapperProps {
    children: React.ReactNode
}


const Wrapper = ({ children }: WrapperProps) => {

    const { collapsed } = useCreatorSidebar((state) => state)
    return (
        <aside className={cn(
            "fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50",
            collapsed && "lg:w-[70px]"
        )}>
            <Container>
                {children}
            </Container>
        </aside>
    )
}

export default Wrapper