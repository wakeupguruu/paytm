import express from "express";
import db from "@repo/db/client"
const app = express();
app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    // console.log(paymentInformation)

    db.onRampTransaction.findFirst({
        where: {
            token: paymentInformation.token
        }
    }).then((txn) => {
        if(!txn || txn.status === "Processing") {
            res.status(400).json({
                message: "Transaction is already Completed"
            })
        }
    })

    try {
        await db.$transaction([
            db.balance.upsert({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                update: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                },
                create: {
                    userId: Number(paymentInformation.userId),
                    amount: Number(paymentInformation.amount),
                    locked: 0
                }
            }),
            
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured"
        })
    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
    
   
})

app.listen(3000, () => console.log("Server running on port http://localhost:3000"));