const ethers = require('ethers');
require('dotenv').config()

// const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/0dd851f4b1744833b598e2ba00869eba");


function sendToken(senderPrivateKry, reciever, amount) {
    let provider = new ethers.providers.JsonRpcProvider(process.env.NEON_DEVNET_URL);
    let wallet = new ethers.Wallet(senderPrivateKry, provider);
    let tx = {
        to: reciever,
        value: ethers.utils.parseEther(amount)
    }

    wallet.sendTransaction(tx)
        .then((txObj) => {
            console.log('txHash', txObj.hash)
        })
}

function getBalance(pubKey) {

    let provider = new ethers.providers.JsonRpcProvider(process.env.NEON_DEVNET_URL);

    provider.getBalance(pubKey).then((balance) => {
        const balanceInEth = ethers.utils.formatEther(balance)
        console.log(`balance: ${balanceInEth} ETH`)
    })
}


getBalance(process.env.SENDER_PUB_KEY)

sendToken(process.env.PRIVATE_KEY, process.env.RECIEVER_PUB_KEY, amount)
