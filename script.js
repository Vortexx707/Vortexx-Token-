// -------------------- CONFIG --------------------
const WALLETCONNECT_PROJECT_ID = "85d1310d55b14854c6d62bab3b779200";

// -------------------- ELEMENTS --------------------
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
const cancelWalletBtn = document.getElementById("cancelWalletBtn");

// -------------------- USER DATA (DEMO) --------------------
const userAirdropBalance = 500;
const previousBalance = 300;

// -------------------- UI FLOW --------------------
proceedBtn.onclick = () => {
  landingSection.classList.add("hidden");
  connectSection.classList.remove("hidden");
};

connectBtn.onclick = (e) => {
  e.stopPropagation();
  walletChoiceModal.classList.remove("hidden");
};

cancelWalletBtn.onclick = () => {
  walletChoiceModal.classList.add("hidden");
};

// -------------------- INPUT PROGRESS --------------------
solInput.addEventListener("input", () => {
  const percent = Math.min((solInput.value.length / 44) * 100, 100);
  progressFill.style.width = percent + "%";

  solInput.value.trim()
    ? submitSol.classList.remove("hidden")
    : submitSol.classList.add("hidden");
});

// -------------------- SUBMIT --------------------
submitSol.onclick = () => {
  if (solInput.value.trim()) {
    termsModal.classList.remove("hidden");
  }
};

// -------------------- ACCEPT TERMS --------------------
acceptBtn.onclick = () => {
  termsModal.classList.add("hidden");
  solanaSection.classList.add("hidden");

  document.getElementById("userWallet").textContent = solInput.value;
  document.getElementById("airdropBalance").textContent = userAirdropBalance;

  const diff = userAirdropBalance - previousBalance;
  document.getElementById("balanceDiff").textContent =
    (diff >= 0 ? "+" : "") + diff;

  document.getElementById("balanceDiffSection").classList.remove("hidden");
  airdropPage.classList.remove("hidden");
};

// -------------------- EVM (WalletConnect v2) --------------------
let ethereumProvider;

evmWalletBtn.onclick = async () => {
  walletChoiceModal.classList.add("hidden");

  try {
    ethereumProvider = await window.EthereumProvider.init({
      projectId: WALLETCONNECT_PROJECT_ID,
      chains: [1],
      showQrModal: true,
      methods: ["eth_requestAccounts"],
      events: ["accountsChanged", "chainChanged"]
    });

    await ethereumProvider.enable();

    const ethersProvider = new ethers.providers.Web3Provider(ethereumProvider);
    const signer = ethersProvider.getSigner();
    const address = await signer.getAddress();

    connectSection.classList.add("hidden");
    solanaSection.classList.remove("hidden");
    solInput.value = address;
    submitSol.classList.remove("hidden");

  } catch (err) {
    alert("EVM wallet connection cancelled");
    console.error(err);
  }
};

// -------------------- SOLANA (PHANTOM → SOLFLARE FALLBACK) --------------------
phantomWalletBtn.onclick = async () => {
  walletChoiceModal.classList.add("hidden");

  try {
    // PHANTOM FIRST
    if (window.phantom?.solana?.isPhantom) {
      const res = await window.phantom.solana.connect();
      connectSection.classList.add("hidden");
      solanaSection.classList.remove("hidden");
      solInput.value = res.publicKey.toString();
      submitSol.classList.remove("hidden");
      return;
    }

    // SOLFLARE FALLBACK
    let solflare = window.solflare;
    if (!solflare && window.Solflare) {
      solflare = new window.Solflare();
    }

    if (solflare) {
      await solflare.connect();
      connectSection.classList.add("hidden");
      solanaSection.classList.remove("hidden");
      solInput.value = solflare.publicKey.toString();
      submitSol.classList.remove("hidden");
      return;
    }

    alert("No Solana wallet detected. Use Phantom or Solflare browser.");

  } catch (err) {
    alert("Solana wallet connection failed");
    console.error(err);
  }
};
