import React, { useEffect , useState } from "react";
import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import CandyMachine from "./CandyMachine";
import logo from "./assets/publed_logo-removebg-preview.png";

// Constants
const TWITTER_HANDLE = "publed_official";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const ActorTypeOptions = ['Author', 'Organization', 'University', 'Reviewer??'];

const App = () => {

	const [walletAddress, setWalletAddres] = useState(null);
	const [walletType, setWalletType] = useState(null);
	const [selectedActorType, setSelectedActorType] = useState(null);
	const [actorTypeConfirmed, setActorTypeConfirmed] = useState(false);

	useEffect(() => {
		const actorType = localStorage.getItem("actorType");
		if (actorType) {
			setActorTypeConfirmed(true);
			setSelectedActorType(actorType);
		}
	}, []);

	const handleChange = event => {
		setSelectedActorType(event.target.value);
	  };

	const handleConfirm = () => {
		// Perform actions to confirm actor type selection, such as storing the actor type in the wallet's metadata
		setActorTypeConfirmed(true);
		localStorage.setItem("actorType", selectedActorType);
	};

	const checkIfWalletIsConnected = async () => {
		try {
			const { solana } = window;
			if (selectedActorType && actorTypeConfirmed) {
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
					setWalletAddres(response.publicKey.toString())
					setWalletType(selectedActorType.toString())}
				}
			} else {
				alert("Solana object not found! Get a Phantom wallet");
			}
		} catch (error) {
			console.error(error);
		}
	};
	const connectWallet = async () => {
		const { solana } = window;
		if (solana) {
			const response = await solana.connect();
			console.log(
				"Connected with public key:",
				response.publicKey.toString(), selectedActorType.toString()
			);
			setWalletAddres(response.publicKey.toString())
			setWalletType(selectedActorType.toString())
		}
	};

	const renderNotConnectedContainer = () => (
		<div>
		<p>Your Solana Phantom wallet is not connected. Please select your actor type and connect your wallet to continue.</p>
		<label>Select actor type:</label>
			<select  value={selectedActorType} onChange={handleChange}className="actor-type-select">
				<option >Select actor type</option>
				{ActorTypeOptions.map(option => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
			{!actorTypeConfirmed && ( // Only render the "Confirm actor type" button if the actor type has not been confirmed
				<button onClick={connectWallet} disabled={!selectedActorType}>Confirm actor type</button>
				)}
			</div>
	)

	useEffect(() => {
		const onLoad = async() => {
			await checkIfWalletIsConnected()
		}
		window.addEventListener('load', onLoad);
		return () => window.removeEventListener("load", onLoad);
	}, [])
	return (
		<div className="App">
			<div className="container">
				<div className="header-container">
				<img src={logo} width={300} height={300} />
					<p className="header">PubLed - Decentralizing Scientific Publishing</p>
					<p className="sub-text">Research Objects as Non-Fungible Tokens(NFTs)</p>
					
				{!walletAddress && renderNotConnectedContainer()}
				</div>
				{walletAddress && (<CandyMachine walletAddress={window.solana} />)}
				<div className="footer-container">
					<img
						alt="Twitter Logo"
						className="twitter-logo"
						src={twitterLogo}
					/>
					<a
						className="footer-text"
						href={TWITTER_LINK}
						target="_blank"
						rel="noreferrer"
					>{`Publed @${TWITTER_HANDLE}`}</a>
				</div>
			</div>
		</div>
	);
};

export default App;
