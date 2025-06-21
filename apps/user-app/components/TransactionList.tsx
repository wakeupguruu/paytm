"use client";

import { useEffect, useState } from "react";

export function TransactionList({ userId }: { userId: number }) {
    const [txns, setTxns] = useState<any[]>([]);

    const fetchTransactions = async () => {
        const res = await fetch("/api/transactions");
        const data = await res.json();
        setTxns(data);
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            {txns.map((txn, index) => {
                const isReceived = txn.toUserId === userId;
                const amountColor = isReceived ? "text-green-600" : "text-red-600";
                const sign = isReceived ? "+" : "-";
                const formattedDate = new Date(txn.timestamp).toDateString();

                return (
                    <div key={index} className="mb-4 border-b pb-2">
                        <div className="font-semibold">
                            {isReceived ? "Received INR" : "Sent INR"}
                        </div>
                        <div className="text-sm text-gray-500">{formattedDate}</div>
                        <div className={`text-lg font-bold ${amountColor}`}>
                            {sign} ₹{txn.amount}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
