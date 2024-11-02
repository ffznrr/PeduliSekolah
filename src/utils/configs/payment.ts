import { MidtransClient } from "midtrans-node-client";

export const snap = new MidtransClient.Snap({
    isProduction: process.env.MIDTRANS_STATUS,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
})