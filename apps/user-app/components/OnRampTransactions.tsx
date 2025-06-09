import { Card } from "@repo/ui/card"
export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions" href="">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return (
        <Card title="Recent Transactions" href="">
            <div className="space-y-4">
            {transactions.map((t, idx) => (
                <div key={idx} className="flex justify-between items-center border-b pb-2">
                <div>
                    <div className="text-sm font-medium">Received INR</div>
                    <div className="text-slate-600 text-xs">{t.time.toDateString()}</div>
                </div>
                <div className="text-sm font-semibold text-green-700">
                    + Rs {t.amount / 100}
                </div>
                </div>
            ))}
            </div>
        </Card>
    );
}