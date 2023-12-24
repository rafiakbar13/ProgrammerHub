import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const Logo = () => {
    return (
        <div className="flex flex-col
         items-center gap-y-4">
            <div className="bg-white rounded-full p-1">
                <Image src="/spooky.svg" width={80} height={80} alt="ProgrammerHub" />
            </div>

            <div className={cn("flex flex-col items-center", font.className)}>
                <h1 className="text-xl font-bold ">ProgrammerHub</h1>
                <p className="text-sm text-muted-foreground ">A place for programmers</p>
            </div>
        </div>
    )
}