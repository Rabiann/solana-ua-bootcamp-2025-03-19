import { makeKeypairs } from "@solana-developers/helpers";

const batch = 100;
const substrings = process.argv.slice(2);

var tries: number  = 1;
while (true) {
    const kps = makeKeypairs(batch);

    for (const kp of kps) {
        for (const substring of substrings) {
            if (kp.publicKey.toString().toLowerCase().includes(substring)) {
                let key = kp.publicKey.toString();
                const idx = key.toLowerCase().indexOf(substring);
                key = key.slice(0, idx) + '\x1b[45m' +  key.slice(idx, idx + substring.length) + '\x1b[0m' + key.slice(idx + substring.length);
                console.log(`\x1b[33mTries: ${tries}\x1b[0m
Found:
\t- Public Key: ${key}
\t- Secret Key: ${kp.secretKey}\n`);
                process.exit(0);
            }
        }
        tries++;
    }
}