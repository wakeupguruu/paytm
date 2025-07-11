"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
    if (amount <= 0) {
        throw new Error("Invalid transfer amount");
    }

    const session = await getServerSession(authOptions);
    const from = session?.user?.id;

    if (!from) {
        throw new Error("User not authenticated");
    }

    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if (!toUser) {
        throw new Error("Receiver not found");
    }

    await prisma.$transaction(async (tx) => {
        const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(from) },
        });

        if (!fromBalance || fromBalance.amount < amount) {
            throw new Error("Insufficient funds");
        }

        await tx.balance.update({
            where: { userId: Number(from) },
            data: { amount: { decrement: amount } },
        });

        await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
        });

        await tx.p2pTransfer.create({
            data: {
                fromUserId: Number(from),
                toUserId: toUser.id,
                amount,
                timestamp: new Date()
            }
        });
    });

    return { message: "Transfer successful" };
}
