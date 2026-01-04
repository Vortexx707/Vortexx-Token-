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

let web3ModalInstance;

window.addEventListener("load", () => {
  web3ModalInstance = new window.Web3Modal.default({
    cacheProvider: false,
    providerOptions: {
      walletconnect: {
        package: window.WalletConnectProvider.default,
        options: { rpc: { 1: "https://rpc.ankr.com/eth" } }
      }
    }
  });
});

cancelWalletBtn.onclick = () =>
  walletChoiceModal.classList.add("hidden");

evmWalletBtn.onclick = async () => {
  walletChoiceModal.classList.add("hidden");
  const provider = await web3ModalInstance.connect();
  const ethersProvider = new ethers.providers.Web3Provider(provider);
  const signer = ethersProvider.getSigner();
  solInput.value = await signer.getAddress();
  solanaSection.classList.remove("hidden");
  submitSol.classList.remove("hidden");
};

phantomWalletBtn.onclick = async () => {
  walletChoiceModal.classList.add("hidden");
  if (!window.solana || !window.solana.isPhantom)
    return alert("Phantom Wallet not installed");

  const res = await window.solana.connect({ onlyIfTrusted: false });
  solInput.value = res.publicKey.toString();
  solanaSection.classList.remove("hidden");
  submitSol.classList.remove("hidden");
};

solflareWalletBtn.onclick = async () => {
  walletChoiceModal.classList.add("hidden");
  if (!window.Solflare) return alert("Solflare Wallet not installed");

  const solflare = new window.Solflare();
  await solflare.connect();
  solInput.value = solflare.publicKey.toString();
  solanaSection.classList.remove("hidden");
  submitSol.classList.remove("hidden");
};
