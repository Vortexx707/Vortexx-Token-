// ELEMENTS
const landingSection = document.getElementById("landingSection");
const connectSection = document.getElementById("connectSection");
const solanaSection = document.getElementById("solanaSection");
const proceedBtn = document.getElementById("proceedBtn");
const connectBtn = document.getElementById("connectBtn");
const solInput = document.getElementById("solAddress");
const submitSol = document.getElementById("submitSol");
const progressFill = document.querySelector(".progress > span");
const termsModal = document.getElementById("termsModal");
const acceptBtn = document.getElementById("acceptBtn");
const airdropPage = document.getElementById("airdropPage");

// Wallet buttons
const walletChoiceModal = document.getElementById("walletChoiceModal");
const evmWalletBtn = document.getElementById("evmWalletBtn");
const solanaWalletBtn = document.getElementById("solanaWalletBtn");

// User Data
const userWalletAddress = "YourWalletHere";
const userAirdropBalance = 500;
const previousBalance = 300;

// FLOW
proceedBtn.onclick = () => {
  landingSection.classList.add("hidden");
  connectSection.classList.remove("hidden");
};

connectBtn.onclick = () => {
  connectSection.classList.add("hidden");
  walletChoiceModal.classList.remove("hidden");
};

solInput.oninput = () => {
  const percent = Math.min((solInput.value.length / 44) * 100, 100);
  progressFill.style.width = percent + "%";
  submitSol.classList.toggle("hidden", !solInput.value.trim());
};

submitSol.onclick = () => {
  if (solInput.value.trim()) termsModal.classList.remove("hidden");
};

acceptBtn.onclick = () => {
  termsModal.classList.add("hidden");
  solanaSection.classList.add("hidden");

  document.getElementById("userWallet").textContent = userWalletAddress;
  document.getElementById("airdropBalance").textContent = userAirdropBalance;

  const diff = userAirdropBalance - previousBalance;
  document.getElementById("balanceDiff").textContent =
    (diff >= 0 ? "+" : "") + diff;

  document.getElementById("balanceDiffSection").classList.remove("hidden");
  airdropPage.classList.remove("hidden");
};

// -------- EVM (WalletConnect v2) --------
const projectId = "85d1310d55b14854c6d62bab3b779200";

const ethereumClient = new window.Web3ModalEthereum.EthereumClient(
  window.Web3ModalEthereum.wagmiConfig({
    projectId,
    chains: [
      {
        id: 1,
        name: "Ethereum",
        network: "mainnet",
        nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
        rpcUrls: { default: "https://rpc.ankr.com/eth" }
      }
    ]
  }),
  [{ id: 1 }]
);

const web3Modal = new window.Web3ModalHTML.Web3Modal(
  { projectId, themeMode: "dark" },
  ethereumClient
);

evmWalletBtn.onclick = async () => {
  walletChoiceModal.classList.add("hidden");
  await web3Modal.openModal();

  const provider = await ethereumClient.getProvider();
  const ethersProvider = new ethers.providers.Web3Provider(provider);
  const signer = ethersProvider.getSigner();

  solInput.value = await signer.getAddress();
  solanaSection.classList.remove("hidden");
  submitSol.classList.remove("hidden");
};

// -------- SOLANA (Phantom OR Solflare) --------
solanaWalletBtn.onclick = async () => {
  walletChoiceModal.classList.add("hidden");

  let provider = window.phantom?.solana || window.solana;

  if (provider?.isPhantom) {
    const res = await provider.connect();
    solInput.value = res.publicKey.toString();
  } else if (window.solflare || window.Solflare) {
    const solflare = window.solflare || new window.Solflare();
    await solflare.connect();
    solInput.value = solflare.publicKey.toString();
  } else {
    alert("Open this site in Phantom or Solflare browser");
    return;
  }

  solanaSection.classList.remove("hidden");
  submitSol.classList.remove("hidden");
};
