import 'dotenv/config'
import {
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    clusterApiUrl
} from '@solana/web3.js'

const connection = new Connection(clusterApiUrl("devnet"));
console.log(`🧑🏻‍🎤 Connected to devnet`)

const privateKey = process.env["SECRET"];
const privateKeyArray = Uint8Array.from(JSON.parse(privateKey));
const publicKey = new PublicKey(
    Keypair.fromSecretKey(privateKeyArray).publicKey
);

const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(`The balance for wallet ${publicKey} is: ${balanceInSOL} SOL`)
