function connectWallet() {
	return new Promise(async function (resolve, reject) {
		if (window.ethereum) {
			const web3 = new Web3(window.ethereum);
			try {
				await window.ethereum.enable();
				resolve(web3);
			} catch (error) {
				reject(error);
			}
		} else {
			showAlert();
		}
	})
}

function switchChain() {
	return web3.currentProvider.request({
		"method": "wallet_switchEthereumChain",
		"params": [
			{
				"chainId": "0x38"
			}
		],
	})
}

connectWallet().then((web3) => {
	console.log(web3);
	window.web3 = web3;
	if (web3.currentProvider.chainId !== "0x38") {
		switchChain();
	}
}).catch(error => {
	console.log(error);
})
