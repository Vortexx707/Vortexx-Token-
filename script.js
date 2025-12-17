// ELEMENTS
const proceedBtn = document.getElementById("proceedBtn");
const connectBtn = document.getElementById("connectBtn");
const solanaSection = document.getElementById("solanaSection");
const solInput = document.getElementById("solAddress");
const progressFill = document.querySelector(".progress > span");
const submitSol = document.getElementById("submitSol");
const acceptBtn = document.getElementById("acceptBtn");
const termsModal = document.getElementById("termsModal");
const airdropPage = document.getElementById("airdropPage");

// Example data
const userWalletAddress = "YourWalletHere";
const userAirdropBalance = 500; // Current airdrop
const previousBalance = 300; // Previous for diff

// STEP 1: Proceed → Connect
proceedBtn.addEventListener("click", () => {
  document.getElementById("landingSection").classList.add("hidden");
  document.getElementById("connectSection").classList.remove("hidden");
});

// STEP 2: Connect → Solana input
connectBtn.addEventListener("click", () => {
  document.getElementById("connectSection").classList.add("hidden");
  solanaSection.classList.remove("hidden");
  solInput.focus();
});

// STEP 3: Show Submit after typing
solInput.addEventListener("input", () => {
  let percent = Math.min((solInput.value.length / 44) * 100, 100);
  progressFill.style.width = percent + "%";
  submitSol.style.display = solInput.value.trim().length > 10 ? "block" : "none";
});

// STEP 4: Submit → Show Terms
submitSol.addEventListener("click", () => {
  if(solInput.value.trim().length > 0) {
    termsModal.classList.remove("hidden");
  }
});

// STEP 5: Accept → Show Airdrop
acceptBtn.addEventListener("click", () => {
  termsModal.classList.add("hidden");
  solanaSection.classList.add("hidden");

  // Update wallet & balance
  document.getElementById("userWallet").textContent = userWalletAddress;
  document.getElementById("airdropBalance").textContent = userAirdropBalance;

  // Compute difference
  const diff = userAirdropBalance - previousBalance;
  const diffSection = document.getElementById("balanceDiffSection");
  document.getElementById("balanceDiff").textContent = (diff >= 0 ? "+" : "") + diff;
  diffSection.classList.remove("hidden");

  // Show airdrop page
  airdropPage.classList.remove("hidden");
  setTimeout(() => airdropPage.classList.add("show"), 50);
});
