use dotenvy::dotenv;
use solana_client::rpc_client::RpcClient;
use std::env;
use solana_sdk::{commitment_config::CommitmentConfig, pubkey::Pubkey, signature::keypair_from_seed, signer::Signer};
use anyhow::{anyhow, Result};

const LAMPORTS_PER_SOL: f64 = 1_000_000_000.0;

fn load_pubkey_from_env() -> Result<Pubkey> {
    let private_key = env::var("SECRET")?;
    let a: Vec<u8> = serde_json::from_str(&private_key)?;
    let kp = keypair_from_seed(&a)
        .map_err(|_| anyhow!("Failed to create Keypair from private key"))?;
    Ok(kp.pubkey())
}

fn main() -> Result<()> {
    dotenv().unwrap();
    let pubkey = load_pubkey_from_env()?;
    let url = String::from("https://api.devnet.solana.com");
    let connection = RpcClient::new_with_commitment(url, CommitmentConfig::confirmed());

    let balance = connection
        .get_balance(&pubkey)? as f64;

    println!("{}: {} SOL", pubkey, balance / LAMPORTS_PER_SOL);
    Ok(())
}