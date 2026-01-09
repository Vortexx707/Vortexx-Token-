// ================= ELEMENTS =================
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

const walletChoiceModal = document.getElementById("walletChoiceModal");
const evmWalletBtn = document.getElementById("evmWalletBtn");
const phantomWalletBtn = document.getElementById("phantomWalletBtn");
const solflareWalletBtn = document.getElementById("solflareWalletBtn");

// ================= USER DATA =================
const userWalletAddress = "YourWalletHere";
const userAirdropBalance = 500;
const previousBalance = 300;

// ================= FLOW =================
proceedBtn.onclick = () => {
  landingSection.classList.add("hidden");
  connectSection.classList.remove("hidden");
};

// 🔥 REMOVE ALL OLD LISTENERS SAFELY
connectBtn.replaceWith(connectBtn.cloneNode(true));
const fixedConnectBtn = document.getElementById("connectBtn");

fixedConnectBtn.onclick = (e) => {
  e.preventDefault();
  connectSection.classList.add("hidden");
  walletChoiceModal.classList.remove("hidden");
};

// ================= INPUT =================
solInput.oninput = () => {
  const percent = Math.min((solInput.value.length / 44) * 100, 100);
  progressFill.style.width = percent + "%";
  submitSol.classList.toggle("hidden", solInput.value.trim() === "");
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

// ================= EVM (MetaMask / Trust / Coinbase) =================
evmWalletBtn.onclick = async () => {
  walletChoiceModal.classList.add("hidden");

  // Check for injected wallets
  const eth = window.ethereum || window.web3?.currentProvider;

  if (!eth) {
    // For testing: fallback to alert
    alert(
      "No EVM wallet detected.\n\nInstall MetaMask, Trust Wallet, or Coinbase Wallet in your browser to test this feature."
    );
    return;
  }

  try {
    // Request accounts
    const accounts = await eth.request
      ? await eth.request({ method: "eth_requestAccounts" })
      : await new Promise((res, rej) => eth.enable().then(res).catch(rej));

    solInput.value = accounts[0];
    solanaSection.classList.remove("hidden");
    submitSol.classList.remove("hidden");
  } catch {
    alert("Wallet connection rejected.");
  }
};

// ================= SOLANA (Phantom / Solflare) =================
phantomWalletBtn.onclick = connectSolana;
solflareWalletBtn.onclick = connectSolana;

async function connectSolana() {
  walletChoiceModal.classList.add("hidden");

  let provider =
    window.phantom?.solana ||
    window.solflare ||
    window.solana;

  if (!provider) {
    alert("Open this site in Phantom or Solflare browser.");
    return;
  }

  try {
    const res = await provider.connect();
    solInput.value = res.publicKey.toString();
    solanaSection.classList.remove("hidden");
    submitSol.classList.remove("hidden");
  } catch {
    alert("Solana wallet connection rejected.");
  }
}
