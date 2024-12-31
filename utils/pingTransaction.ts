import { Connection, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";


const PROGRAM_ID = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const PROGRAM_DATA_ID = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

export const pingTransaction = async (connection: Connection, publicKey: PublicKey, sendTransaction: Function) => {
    if (!connection || !publicKey) {
        alert("Please connect your wallet");
        return;
    }
    try {
        const programPublicKey = new PublicKey(PROGRAM_ID);
        const programDataPublicKey = new PublicKey(PROGRAM_DATA_ID);
        const transaction = new Transaction();

        const instructions = new TransactionInstruction({
            programId: programPublicKey,
            keys: [
                {
                    pubkey: programDataPublicKey,
                    isSigner: false,
                    isWritable: true
                }
            ]
        });
        transaction.add(instructions);
        const signature = await sendTransaction(transaction, connection);
        alert(`Success \nSignature: ${signature}`);
    } catch (err) {
        console.log(err.message);
    }
};
