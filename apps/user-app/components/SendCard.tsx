"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/p2pTransaction";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!number || !amount) {
            alert("Please enter both number and amount");
            return;
        }

        setLoading(true);
        try {
            await p2pTransfer(number, Number(amount));
            alert("Transfer successful!");

            // Reset inputs
            setNumber("");
            setAmount("");
        } catch (err) {
            console.error("Transfer failed:", err);
            alert("Transfer failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full">
            <Center>
                <Card title="Send" href="">
                    <div className="min-w-72 pt-2">
                        <TextInput
                            placeholder="Number"
                            label="Number"
                            /*@ts-ignore*/
                            value={number}
                            onChange={(value) => setNumber(value)}
                        />
                        <TextInput
                            placeholder="Amount"
                            label="Amount"
                            /*@ts-ignore*/
                            value={amount}
                            onChange={(value: any) => setAmount(value)}
                        />
                        <div className="pt-4 flex justify-center">
                            <Button onClick={handleSend} disabled={loading}>
                                {loading ? "Sending..." : "Send"}
                            </Button>
                        </div>
                    </div>
                </Card>
            </Center>
        </div>
    );
}
