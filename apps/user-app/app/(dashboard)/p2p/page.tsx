import { SendCard } from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function getP2pTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: Number(session?.user?.id) },
                { toUserId: Number(session?.user?.id) }
            ]
        },
        orderBy: {
            timestamp: 'desc'
        }
    });

    return { txns, userId: Number(session?.user?.id) };
}



export default async function () {
    const { txns, userId } = await getP2pTransactions();

    return (
        <div className="w-full">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Transfer
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    <SendCard />
                </div>
                <div>
                    <div className="text-2xl text-gray-700 mb-4">
                        Recent Transactions
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        {txns.length === 0 ? (
                            <p className="text-gray-500">No transactions yet.</p>
                        ) : (
                            txns.map((txn, index) => {
                                const isReceived = txn.toUserId === userId;
                                const amountColor = isReceived ? "text-green-600" : "text-red-600";
                                const sign = isReceived ? "+" : "-";
                                const formattedDate = new Date(txn.timestamp).toDateString();

                                return (
                                    <div key={index} className="mb-4 border-b pb-2">
                                        <div className="font-semibold">
                                            {isReceived ? "Received INR" : "Sent INR"}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {formattedDate}
                                        </div>
                                        <div className={`text-lg font-bold ${amountColor}`}>
                                            {sign} ₹{txn.amount}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
