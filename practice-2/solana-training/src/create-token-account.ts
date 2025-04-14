import 'dotenv/config';
import {
    getExplorerLink
} from '@solana-developers/helpers'
import {
    Keypair,
    clusterApiUrl,
    Connection,
    PublicKey
} from '@solana/web3.js'
import { createMint, getOrCreateAssociatedTokenAccount } from '@solana/spl-token';

let privateKey = process.env['SECRET'];
const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);
const connection = new Connection(clusterApiUrl('devnet'))
console.log(`Out public key is ${sender.publicKey.toBase58()}`);

const tokenMintAccount = new PublicKey(
    '696eVDMgsKDwJQU87dgxXBKT5e37TQSgC39oeau7NqaE'
);

const recipient = new PublicKey('13FMS1RdCq5d7t26sXVHSKCbELEFTk26ZxVuwad3m49P');
const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    recipient
);

console.log(`Token account: ${tokenAccount.address.toBase58()}`);

const link = getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    'devnet'
)

console.log(`Created token accout: ${link}`);

