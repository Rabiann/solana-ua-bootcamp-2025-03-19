use std::env;
use dotenvy::dotenv;
use solana_sdk::signer::{keypair::keypair_from_seed, Signer};

fn main() {
    dotenv().unwrap();
    let private_key = env::var("SECRET").unwrap();
    let a: Vec<u8> = serde_json::from_str(&private_key).expect("Invalid JSON");
    let kp = keypair_from_seed(&a).unwrap();

    println!("
    Keypair:
    \t - Public: {}
    \t - Secret: {:?}"
    , kp.pubkey(), kp.secret().as_bytes());
}