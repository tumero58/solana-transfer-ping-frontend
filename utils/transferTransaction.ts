import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

export const transferTransaction = async (
    connection: Connection,
    publicKey: PublicKey,
    sendTransaction: Function,
    receiverPublicKey: string,
    amount: number) => {
    if (!connection || !publicKey) {
        alert("Please connect your wallet");
        return;
    }
    if (amount <= 0) {
        alert("Please write transfer amount");
        return;
    }
    if (receiverPublicKey === "") {
        alert("Please write the recipient address");
        return;
    }
    try {
        const toPublicKey = new PublicKey(receiverPublicKey);
        const transaction = new Transaction();
        const sendSolInstructions = SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: toPublicKey,
            lamports: amount * LAMPORTS_PER_SOL
        });
        transaction.add(sendSolInstructions);
        const signature = await sendTransaction(transaction, connection);
        alert(`Success \nSignature: ${signature}`);
    } catch (err) {
        alert(err.message);
    }
};
