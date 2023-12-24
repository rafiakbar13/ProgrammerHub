"use server";
import { blockUser, unBlockUser } from "@/lib/block-service"
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
    // TODO: adapt to dicsconnet from livestream
    // TODO: allow ablitiy to kick the guest

    const blockedUser = await blockUser(id);

    if (blockedUser) {
        revalidatePath(`/${blockedUser.blocked.username}`);
    }

    return blockedUser;
}


export const onUnBlock = async (id: string) => {
    const unblockedUser = await unBlockUser(id);

    if (unblockedUser) {
        revalidatePath(`/${unblockedUser.blocked.username}`);
    }

    return unblockedUser;
}