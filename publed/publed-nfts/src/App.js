import React, { useEffect , useState } from "react";
import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import CandyMachine from "./CandyMachine";
import logo from "./assets/publed_logo-removebg-preview.png";

// Constants
const TWITTER_HANDLE = "publed_official";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const ActorTypeOptions = ['Author', 'Organization', 'University', 'Reviewer??'];

const UserProfile = () => {
	
	console.log("ola");
	return (<div></div>);

};

const App = () => {

	const [walletAddress, setWalletAddres] = useState(null);
	const [selectedActorType, setSelectedActorType] = useState(null);
	const [actorTypeConfirmed, setActorTypeConfirmed] = useState(false);
	
	const [showSignUpContainer, setShowSignUpContainer] = useState(false);
	const [isSignUpClicked, setIsSignUpClicked] = useState(false);

	const [showSignInContainer, setShowSignInContainer] = useState(false);
	const [isSignInClicked, setIsSignInClicked] = useState(false);

	const [isRegisted, setIsRegisted] = useState(false);


	useEffect(() => {
		const actorType = localStorage.getItem("actorType");
		if (actorType) {
			setActorTypeConfirmed(true);
			setSelectedActorType(actorType);
		}
	}, []);

	const handleSignUp = () => {
		setShowSignUpContainer(true);
		setIsSignUpClicked(true);
	  }
	
	  const handleSignIn = () => {
		setShowSignInContainer(true);
		setIsSignInClicked(true);
	  }

	const handleChange = event => {
		setSelectedActorType(event.target.value);
	  };

	const handleConfirm = () => {
		const userInfa = JSON.parse(localStorage.getItem(`userInfo-AARYw58j8T7ZBSxWD7egje5L1pJo6tVMMrwWuXWafPNr`));
		if (userInfa.Registed){
		alert("Already registered");
		setWalletAddres(null);
		setIsSignUpClicked(false);
		setIsSignInClicked(false);
		setShowSignInContainer(false);
		setShowSignUpContainer(false);
		const { solana } = window;
		if (solana) {
		  solana.disconnect();
		}
		}
		else{
			setActorTypeConfirmed(true);
		}
	};

	const handleProfile = () => {
					// const userInfo = JSON.parse(localStorage.getItem(`userInfo-${walletAddress}`));
					// console.log("UserInfo:", userInfo)
	}

	const handleLogout = () => {
		setWalletAddres(null);
		setIsSignUpClicked(false);
		setIsSignInClicked(false);
		const { solana } = window;
		if (solana) {
		  solana.disconnect();
		}
	};
	const checkIfWalletIsConnected = async () => {
		try {
			const { solana } = window;
			if (solana) {
				if (solana.isPhantom) {
					// const response = await solana.connect({
					// 	onlyIfTrusted: true,
					// });
					// console.log("Phantom wallet found with the address:",
					// 	response.publicKey.toString(),
					// );
					// setWalletAddres(response.publicKey.toString())
					// const userwallet = response.publicKey.toString();
					// const userInfo = JSON.parse(localStorage.getItem(`userInfo-${userwallet}`));
					// console.log("UserInfo:", userInfo)
				}
				}
			 else {
				alert("Solana object not found! Get a Phantom wallet");
			}	
		} catch (error) {
			console.error(error);
		}
	};

	const connectFirstWallet = async () => {
		
		const { solana } = window;

			if (solana) {
				const response = await solana.connect();
				console.log(
					"Connected with public key:",
					response.publicKey.toString()
				);
				const wallet = response.publicKey.toString();
				setWalletAddres(wallet)
				setIsRegisted(true);
				console.log("Address:", wallet);
	
				const userInfo = {
					aalletAddress: response.publicKey.toString(),
					actorType: selectedActorType,
					TypeConfirmed: actorTypeConfirmed,
					Registed: isRegisted
				  }
				  localStorage.setItem(`userInfo-${response.publicKey.toString()}`, JSON.stringify(userInfo));
				  setShowSignUpContainer(false);
				  setShowSignInContainer(false);
				  setIsSignUpClicked(true);
				  setIsSignInClicked(true);
				  
			}
		
	};

	const connectWallet = async () => {
		const { solana } = window;
		if (solana) {
			const response = await solana.connect();
			console.log(
				"Connected with public key:",
				response.publicKey.toString()
			);
			const wallet = response.publicKey.toString();
			setWalletAddres(wallet)
			console.log("Address:", wallet);
			  setShowSignUpContainer(false);
			  setShowSignInContainer(false);
			  setIsSignUpClicked(true);
			  setIsSignInClicked(true);
		}
	};

	const renderSignUpContainer = () => (
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
		<div><button className="cta-button2 connect-wallet-button" onClick={handleConfirm} disabled={!selectedActorType}>Confirm your profile</button>				
		</div> 
		<button className="cta-button connect-wallet-button"  onClick={connectFirstWallet} disabled={!actorTypeConfirmed}>Connect wallet</button>
		</div> )

const renderSignInContainer = () => (
	<div>
	<button className="cta-button connect-wallet-button" onClick={connectWallet} >Connect wallet</button>
	</div> 
)

	useEffect(() => {
		const onLoad = async() => {
			setIsSignUpClicked(false);
			setActorTypeConfirmed(false);
			await checkIfWalletIsConnected()
		}
		window.addEventListener('load', onLoad);
		return () => window.removeEventListener("load", onLoad);
	}, [])
	return (
		<div className="App">
			
			<div className="container">
				<div className="division-bar">	
				<hr />
				<nav class="navbar">
				<div class="navbar-left">
					<img src={logo} width={190} height={50}/>
					<div><hr /></div>
				</div>
				<div class="navbar-left">
					{walletAddress && <button className="logout-button" onClick={handleLogout}>Logout</button>}
					{walletAddress && <button className="logout-button" onClick={handleProfile}>Profile</button>}
					
				</div>
				</nav>
					<p className="header">PubL3d - Decentralizing Scientific Publishing</p>
					<div><hr /></div>
					<p className="sub-text">Bringing Science from "Web0" to Web3</p>
						<div>
							{!walletAddress && !isSignUpClicked && !isSignInClicked && <button className="cta-button" onClick={handleSignUp}>Sign Up</button>}
							{showSignUpContainer && renderSignUpContainer()}
							{!walletAddress && !isSignUpClicked && !isSignInClicked && <button className="cta-button" onClick={handleSignIn}>Sign In</button>}
							{showSignInContainer && renderSignInContainer()}
						</div>
				</div>
				{walletAddress && <UserProfile/> && (<CandyMachine walletAddress={window.solana} />)}
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