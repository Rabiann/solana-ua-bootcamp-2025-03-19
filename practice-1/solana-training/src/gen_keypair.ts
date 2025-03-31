import { Keypair } from "@solana/web3.js";
const keypair = Keypair.generate();
console.log(`PUBLIC: ${keypair.publicKey}\nSECRET: ${keypair.secretKey}`);