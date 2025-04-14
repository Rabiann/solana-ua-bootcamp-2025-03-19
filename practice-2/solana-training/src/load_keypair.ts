import { Keypair } from "@solana/web3.js";
import "dotenv/config";

const privateKey = process.env["SECRET"];
if (privateKey === undefined) {
    console.log("Add SECRET_KEY to .env");
    process.exit(1);
}

const asArray = Uint8Array.from(JSON.parse(privateKey));
const keypair = Keypair.fromSecretKey(asArray);

console.log(`Public: ${keypair.publicKey.toBase58()}`);