"use server";

import db from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth"


export async function onRampTransaction(amount: number, provider: string) {
    const session = await getServerSession(authOptions)
    const userId = session.user.id
    const token = Math.random().toString()
    if(!userId){
        return {
            message: "User not logged in"
        }
    }
    const now = Date.now()

    await db.onRampTransaction.create({
        data:{
            userId: Number(userId),
            status: "Processing",
            amount: amount,
            provider: provider,
            token: token,
            startTime: new Date(now)
        }
    })

    return {
        message: "Transaction added in queue"
    }
}