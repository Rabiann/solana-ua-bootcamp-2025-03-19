use solana_sdk::signer::{keypair::keypair_from_seed, Signer};

fn main() {
    let mut seed_buffer = [0; 32];
    rand::fill(&mut seed_buffer);
    let kp = keypair_from_seed(&seed_buffer).expect("Keypair creation failed.");

    println!("
        Keypair:
         - Public: {}
         - Private: {:?}
    ", kp.pubkey(), kp.secret().as_bytes());
}