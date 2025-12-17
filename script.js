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

// STEP 1: Proceed → Connect
proceedBtn.addEventListener("click", () => {
  landingSection.classList.add("hidden");
  connectSection.classList.remove("hidden");
});

// STEP 2: Connect → Show Solana input
connectBtn.addEventListener("click", () => {
  connectSection.classList.add("hidden");
  solanaSection.classList.remove("hidden");
  solInput.focus();
});

// STEP 3: Show Submit button after typing
solInput.addEventListener("input", () => {
  // Update progress bar
  const percent = Math.min((solInput.value.length / 44) * 100, 100);
  progressFill.style.width = percent + "%";

  // Show Submit button immediately if input is not empty
  if(solInput.value.trim() !== "") {
    submitSol.classList.remove("hidden"); // show Submit
  } else {
    submitSol.classList.add("hidden");    // hide Submit if empty
  }
});

// Only show Terms if wallet is complete (44 chars)
submitSol.addEventListener("click", () => {
  const wallet = solInput.value.trim();
  if(wallet.length === 44) {
    termsModal.classList.remove("hidden");
  } else {
    alert("Please enter a valid Solana address (44 characters).");
    solInput.focus();
  }
});

// STEP 4: Submit → Show Terms
submitSol.addEventListener("click", () => {
  if(solInput.value.trim().length > 0){
    termsModal.classList.remove("hidden");
  }
});

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
