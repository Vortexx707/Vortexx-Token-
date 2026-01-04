// --------------------- ELEMENTS ---------------------
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

// Wallet modal elements
const walletChoiceModal = document.getElementById("walletChoiceModal");
const evmWalletBtn = document.getElementById("evmWalletBtn");
const phantomWalletBtn = document.getElementById("phantomWalletBtn");
const solflareWalletBtn = document.getElementById("solflareWalletBtn");
const cancelWalletBtn = document.getElementById("cancelWalletBtn");

// --------------------- USER DATA ---------------------
const userWalletAddress = "YourWalletHere";
const userAirdropBalance = 500;
const previousBalance = 300;

// --------------------- STEP 1: Proceed ---------------------
proceedBtn.addEventListener("click", () => {
  landingSection.classList.add("hidden");
  connectSection.classList.remove("hidden");
});

// --------------------- STEP 2: Connect Wallet ---------------------
connectBtn.addEventListener("click", () => {
  connectSection.classList.add("hidden");
  walletChoiceModal.classList.remove("hidden");
});

// --------------------- STEP 3: Input Solana Address ---------------------
solInput.addEventListener("input", () => {
  const percent = Math.min((solInput.value.length / 44) * 100, 100);
  progressFill.style.width = percent + "%";
  solInput.value.trim() !== ""
    ? submitSol.classList.remove("hidden")
    : submitSol.classList.add("hidden");
});

// --------------------- STEP 4: Submit Solana ---------------------
submitSol.addEventListener("click", () => {
  if (solInput.value.trim()) termsModal.classList.remove("hidden");
});

// --------------------- STEP 5: Accept Terms ---------------------
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
});

// --------------------- CANCEL WALLET MODAL ---------------------
cancelWalletBtn.onclick = () => walletChoiceModal.classList.add("hidden");

// --------------------- WALLET CONNECT ---------------------

// ✅ Insert your WalletConnect v2 Project ID here
const projectId = "85d1310d55b14854c6d62bab3b779200"; 

// EVM / WalletConnect v2 initialization
const ethereumClient = new window.Web3ModalEthereum.EthereumClient(
  window.Web3ModalEthereum.wagmiConfig({
    chains: [
      {
        id: 1,
        name: "Ethereum",
        network: "mainnet",
        nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
        rpcUrls: { default: "https://rpc.ankr.com/eth" }
      }
    ],
    projectId
  }),
  [{ id: 1 }]
);

const web3Modal = new window.Web3ModalHTML.Web3Modal(
  { projectId, walletImages: {}, themeMode: "dark" },
  ethereumClient
);

// --------------------- EVM WALLET ---------------------
evmWalletBtn.onclick = async () => {
  walletChoiceModal.classList.add("hidden");

  try {
    await web3Modal.openModal();
    const provider = await ethereumClient.getProvider();
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = ethersProvider.getSigner();
    solInput.value = await signer.getAddress();
    solanaSection.classList.remove("hidden");
    submitSol.classList.remove("hidden");
  } catch (err) {
    console.error(err);
    alert("EVM Wallet connection failed. Check your wallet or network.");
  }
};

// --------------------- PHANTOM WALLET ---------------------
phantomWalletBtn.onclick = async () => {
  walletChoiceModal.classList.add("hidden");

  const provider = window.phantom?.solana || window.solana;
  if (!provider?.isPhantom) {
    alert("Phantom Wallet not detected. Open in Phantom browser.");
    return;
  }

  try {
    const res = await provider.connect();
    solInput.value = res.publicKey.toString();
    solanaSection.classList.remove("hidden");
    submitSol.classList.remove("hidden");
  } catch (err) {
    console.error(err);
    alert("Phantom connection failed.");
  }
};

// --------------------- SOLFLARE WALLET ---------------------
solflareWalletBtn.onclick = async () => {
  walletChoiceModal.classList.add("hidden");

  let solflareProvider = window.solflare || (window.Solflare ? new window.Solflare() : null);

  if (!solflareProvider) {
    alert("Solflare Wallet not detected. Use Solflare browser.");
    return;
  }

  try {
    await solflareProvider.connect();
    solInput.value = solflareProvider.publicKey.toString();
    solanaSection.classList.remove("hidden");
    submitSol.classList.remove("hidden");
  } catch (err) {
    console.error(err);
    alert("Solflare connection failed.");
  }
};  await solflare.connect();
  solInput.value = solflare.publicKey.toString();
  solanaSection.classList.remove("hidden");
  submitSol.classList.remove("hidden");
};
