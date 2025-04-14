import 'dotenv/config';
import {
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
    clusterApiUrl,
    Connection,
    sendAndConfirmTransaction,
    TransactionInstruction
} from "@solana/web3.js"
import { mintTo } from '@solana/spl-token';
import { getExplorerLink } from '@solana-developers/helpers';

let privateKey = process.env["SECRET"];
let key = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(key);
const connection = new Connection(clusterApiUrl("devnet"));

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);
const tokenMintAccount = new PublicKey("696eVDMgsKDwJQU87dgxXBKT5e37TQSgC39oeau7NqaE");

const recipientAssociatedTokenAccount = new PublicKey(`8YcS7Uc8rdoa9HAJrW3hqFyLRfHebWiV3MbcPsrYAu7W`);
const transactionSignature = await mintTo(
    connection,
    sender,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    sender,
    10 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = getExplorerLink(`transaction`, transactionSignature, `devnet`);
console.log(`success`);
console.log(`mint token transaction ${link}`);