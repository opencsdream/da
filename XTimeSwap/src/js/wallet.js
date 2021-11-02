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

function getCurrentAddress() {
	return web3.currentProvider.selectedAddress;
}

function getBalance(address) {
	return new Promise(async function(resolve, reject){
		try {
			let balance = await web3.eth.getBalance(address);
			resolve(balance);
		} catch (error) {
			reject(error);
		}
	})
}