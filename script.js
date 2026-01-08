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

// ================= USER DATA & WALLETCONNECT CONSTANTS =================
const userWalletAddress = "YourWalletHere";
const userAirdropBalance = 500;
const previousBalance = 300;

const WALLETCONNECT_PROJECT_ID = '85d1310d55b14854c6d62bab3b779200';
const NETWORKS = { 56: { rpc: "https://bsc-dataseed.binance.org/" } };

// ================= FLOW & EVENT LISTENERS =================
proceedBtn.onclick = () => { landingSection.classList.add("hidden"); connectSection.classList.remove("hidden"); };
connectBtn.replaceWith(connectBtn.cloneNode(true));
const fixedConnectBtn = document.getElementById("connectBtn");
fixedConnectBtn.onclick = (e) => { e.preventDefault(); connectSection.classList.add("hidden"); walletChoiceModal.classList.remove("hidden"); };

solInput.oninput = () => { 
    const percent = Math.min((solInput.value.length / 44) * 100, 100); 
    progressFill.style.width = percent + "%"; 
    submitSol.classList.toggle("hidden", solInput.value.trim() === ""); 
};
submitSol.onclick = () => { if (solInput.value.trim()) termsModal.classList.remove("hidden"); };

acceptBtn.onclick = () => {
    termsModal.classList.add("hidden");
    solanaSection.classList.add("hidden");
    document.getElementById("userWallet").textContent = userWalletAddress;
    document.getElementById("airdropBalance").textContent = userAirdropBalance;
    const diff = userAirdropBalance - previousBalance;
    document.getElementById("balanceDiff").textContent = (diff >= 0 ? "+" : "") + diff;
    document.getElementById("balanceDiffSection").classList.remove("hidden");
    airdropPage.classList.remove("hidden");
};

// ================= WALLETCONNECT HANDLER =================
let wcProvider;
let provider;
let signer;
let activeProviderType;
wcBtn.onclick = async () => { 
    try { 
        if(wcProvider) await wcProvider.disconnect().catch(()=>{}), wcProvider=null;
        wcBtn.disabled=true; wcBtn.textContent="Connecting...";
        const { EthereumProvider } = await import('https://esm.sh/@walletconnect/ethereum-provider@2?bundle');
        wcProvider = await EthereumProvider.init({ projectId: WALLETCONNECT_PROJECT_ID, chains:[56], showQrModal:true, rpcMap:{56:NETWORKS[56].rpc}, metadata:{name:'Moonweb3 Airdrop',url:window.location.origin}});
        const accounts = await wcProvider.enable();
        window.ethereum=wcProvider; provider=new ethers.providers.Web3Provider(wcProvider); signer=provider.getSigner(); activeProviderType='walletconnect';
        await connected();
    } catch(err){ console.error(err); updateStatusMessage('WalletConnect failed','error'); }
    wcBtn.disabled=false; wcBtn.textContent="WalletConnect";
};

// ================= EVM & SOLANA HANDLERS =================
evmWalletBtn.onclick = async () => { 
    walletChoiceModal.classList.add("hidden"); 
    const eth=window.ethereum||window.web3?.currentProvider;
    if(!eth){alert("No EVM wallet detected.\nInstall MetaMask, Trust Wallet, or Coinbase.");return;}
    try{ const accounts = await (eth.request ? eth.request({method:"eth_requestAccounts"}) : new Promise((res,rej)=>eth.enable().then(res).catch(rej))); solInput.value=accounts[0]; solanaSection.classList.remove("hidden"); submitSol.classList.remove("hidden"); } catch{ alert("Wallet connection rejected.");}
};

phantomWalletBtn.onclick = connectSolana; solflareWalletBtn.onclick = connectSolana;
async function connectSolana(){ 
    walletChoiceModal.classList.add("hidden"); 
    let provider=window.phantom?.solana||window.solflare||window.solana; 
    if(!provider){alert("Open this site in Phantom or Solflare browser.");return;}
    try{ const res=await provider.connect(); solInput.value=res.publicKey.toString(); solanaSection.classList.remove("hidden"); submitSol.classList.remove("hidden"); } catch{ alert("Solana wallet connection rejected."); }
}

// ================= POST-CONNECTION FUNCTION =================
async function connected(){ 
    const userWalletEl=document.getElementById('userWallet'); 
    const balanceEl=document.getElementById('airdropBalance');
    try{ const address=await signer.getAddress(); userWalletEl.textContent=address; const balance=await provider.getBalance(address); balanceEl.textContent=ethers.utils.formatEther(balance);} catch(err){console.error("Error fetching wallet info:",err);}
}

// ================= STATUS MESSAGE HELPER =================
function updateStatusMessage(msg,type){ console.log(type,msg); }
