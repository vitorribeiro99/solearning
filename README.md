### SPL Token Addres

addres: 5UtABbgdFzyg984N2X4YEvTmmR1fZugL71mbJuDaRKc1

account: 2yb9xp2JAQCW8caCJiot8mqhBfS7R87dq6BSwmCJoXCL

wallet: FGSR5YN3CzpHEzZoF9K3BEweRTZUGVWCHbTqh9moypkg

### Commands

# Initialize a project

` anchor init <project_name>`

or 

` anchor init <project_name> --javascript`

# Build project

`anchor build`

# Test project

`anchor test`

# See solana address

`solana address`

# Solana "Faucet"

`solana airdrop <amount_of_solana> --url devnet`

##


`mkdir ~/my-solana-wallet`
`solana-keygen new --outfile ~/my-solana-wallet/my-keypair.json` 

7ZNvX9nrvM5rAU2xNqkQRaM4HEHSQmjLnUQqKgQnE9T8 -> pubkey


#### Metaplex

- NFT standard on Solana
- standard deployed NFT programs 

### Check Wallet

```javascript
	const checkIfWalletIsConnected = async () => {
		try {
			const { solana } = window;
			if (solana) {
				if (solana.isPhantom) {
					console.log("Phantom wallet found!");
					const response = await solana.connect({
						onlyIfTrusted: true,
					});
					console.log(
						"Connected with public key:",
						response.publicKey.toString()
					);
					setWalletAddress(response.publicKey.toString());
				}
			} else {
				alert("Solana object not found! Get a Phantom wallet");
			}
		} catch (error) {
			console.error(error);
		}
	};
```