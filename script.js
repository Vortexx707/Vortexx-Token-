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

// User Data
const userWalletAddress = "YourWalletHere";
const userAirdropBalance = 500;
const previousBalance = 300;

// Step 1
proceedBtn.addEventListener("click", () => {
  landingSection.classList.add("hidden");
  connectSection.classList.remove("hidden");
});

// Step 2
connectBtn.addEventListener("click", () => {
  connectSection.classList.add("hidden");
  walletChoiceModal.classList.remove("hidden");
});

// Step 3
solInput.addEventListener("input", () => {
  const percent = Math.min((solInput.value.length / 44) * 100, 100);
  progressFill.style.width = percent + "%";
  solInput.value.trim() !== ""
    ? submitSol.classList.remove("hidden")
    : submitSol.classList.add("hidden");
});

// Step 4
submitSol.addEventListener("click", () => {
  if (solInput.value.trim()) termsModal.classList.remove("hidden");
});

// Step 5
acceptBtn.addEventListener("click", () => {
  termsModal.classList.add("hidden");
  solanaSection.classList.add("hidden");

  document.getElementById("userWallet").textContent = userWalletAddress;
  document.getElementById("airdropBalance").textContent = userAirdropBalance;

  const diff = userAirdropBalance - previousBalance;
  document.getElementById("balanceDiff").textContent =
    (diff >= 0 ? "+" : "") + diff;
  document.getElementById("balanceDiffSection").classList.remove("hidden");

  airdropPage.classList.remove("hidden");
  setTimeout(() => airdropPage.classList.add("show"), 50);
});

// -------- Wallet Integration --------
const walletChoiceModal = document.getElementById("walletChoiceModal");
const evmWalletBtn = document.getElementById("evmWalletBtn");
const phantomWalletBtn = document.getElementById("phantomWalletBtn");
const solflareWalletBtn = document.getElementById("solflareWalletBtn");
const cancelWalletBtn = document.getElementById("cancelWalletBtn");

cancelWalletBtn.onclick = () =>
  walletChoiceModal.classList.add("hidden");


// =======================================================
// 🔐 WalletConnect v2 (EVM) — Trust, MetaMask, Coinbase
// =======================================================

const projectId = "85d1310d55b14854c6d62bab3b779200"; // 👈 REQUIRED

const ethereumClient = new window.Web3ModalEthereum.EthereumClient(
  window.Web3ModalEthereum.wagmiConfig({
    projectId,
    chains: [
      {
        id: 1,
        name: "Ethereum",
        network: "mainnet",
        nativeCurrency: {
          name: "Ether",
          symbol: "ETH",
          decimals: 18
        },
        rpcUrls: {
          default: "https://rpc.ankr.com/eth"
        }
      }
    ]
  }),
  [{ id: 1 }]
);

const web3Modal = new window.Web3ModalHTML.Web3Modal(
  {
    projectId,
    themeMode: "dark"
  },
  ethereumClient
);

// EVM CONNECT
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


// =======================================================
// 🟣 Phantom Wallet (v2 Injection)
// =======================================================

phantomWalletBtn.onclick = async () => {
  walletChoiceModal.classList.add("hidden");

  const provider = window.phantom?.solana || window.solana;
  if (!provider || !provider.isPhantom) {
    alert("Phantom not detected. Open site in Phantom browser.");
    return;
  }

  const res = await provider.connect();
  solInput.value = res.publicKey.toString();
  solanaSection.classList.remove("hidden");
  submitSol.classList.remove("hidden");
};


// =======================================================
// 🟠 Solflare Wallet (v2 Injection)
// =======================================================

solflareWalletBtn.onclick = async () => {
  walletChoiceModal.classList.add("hidden");

  let solflareProvider = window.solflare;

  if (!solflareProvider && window.Solflare) {
    solflareProvider = new window.Solflare();
  }

  if (!solflareProvider) {
    alert("Solflare not detected. Open site in Solflare browser.");
    return;
  }

  await solflareProvider.connect();
  solInput.value = solflareProvider.publicKey.toString();
  solanaSection.classList.remove("hidden");
  submitSol.classList.remove("hidden");
};
