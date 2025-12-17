// ELEMENTS
const proceedBtn = document.querySelector("#proceedBtn");
const connectBtn = document.querySelector("#connectBtn");
const addressSection = document.querySelector("#addressSection");
const solInput = document.querySelector("#solAddress");
const progressFill = document.querySelector(".progress > span");
const submitSol = document.getElementById("submitSol");
const acceptBtn = document.getElementById("acceptBtn");
const termsModal = document.getElementById("termsModal");
const airdropPage = document.getElementById("airdropPage");

// Example user data
const userWalletAddress = "YourWalletHere";
const userAirdropBalance = 500; // New balance
const previousBalance = 300; // Previous balance for diff

// STEP 1: Proceed → Connect
proceedBtn.addEventListener("click", () => {
  proceedBtn.classList.add("hidden");
  connectBtn.classList.remove("hidden");
});

// STEP 2: Connect → Show input
connectBtn.addEventListener("click", () => {
  connectBtn.classList.add("hidden");
  addressSection.classList.remove("hidden");
  solInput.focus();
});

// STEP 3: Progress + Submit
solInput.addEventListener("input", () => {
  let percent = Math.min((solInput.value.length / 44) * 100, 100);
  progressFill.style.width = percent + "%";
  submitSol.style.display = solInput.value.trim().length > 10 ? "block" : "none";
});

// STEP 4: Submit → Terms (ONLY on Submit click)
submitSol.addEventListener("click", () => {
  if(solInput.value.trim().length > 0) {
    termsModal.classList.remove("hidden");
  }
});

// STEP 5: Accept → Airdrop page + diff (instant)
acceptBtn.addEventListener("click", () => {
  termsModal.classList.add("hidden");

  // Update wallet & balance
  sessionStorage.setItem("wallet", userWalletAddress);
  sessionStorage.setItem("balance", userAirdropBalance);

  document.getElementById("userWallet").textContent = userWalletAddress;
  document.getElementById("airdropBalance").textContent = userAirdropBalance;

  // Compute & show difference
  const diff = userAirdropBalance - previousBalance;
  document.getElementById("balanceDiff").textContent = (diff >= 0 ? "+" : "") + diff;
  document.getElementById("balanceDiffSection").classList.remove("hidden");

  // Show airdrop page instantly
  airdropPage.classList.remove("hidden");
  setTimeout(() => airdropPage.classList.add("show"), 50);
});

// Populate wallet & balance if previously stored
document.addEventListener("DOMContentLoaded", () => {
  const wallet = sessionStorage.getItem("wallet") || "—";
  const balance = sessionStorage.getItem("balance") || "0";
  document.getElementById("userWallet").textContent = wallet;
  document.getElementById("airdropBalance").textContent = balance;
});
