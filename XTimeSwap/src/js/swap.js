let SWAP_WAY = 1; // 1: from bnb to xtime; 2: from xtime to bnb

function bindBtnEvents() {
	$("#btn-swap").click(function () {
		hidePageShowSwap();
		$("#swap-window").removeClass("hide");
		$("#pool-window").addClass("hide");
		$("#stake-window").addClass("hide");
	});

	$("#btn-pool").click(function () {
		hidePageShowSwap();
		$("#swap-window").addClass("hide");
		$("#pool-window").removeClass("hide");
		$("#stake-window").addClass("hide");
	});

	$("#btn-stake").click(function () {
		hidePageShowSwap();
		$("#swap-window").addClass("hide");
		$("#pool-window").addClass("hide");
		$("#stake-window").removeClass("hide");
	});

	$("btn-swap-setting").click(function () {

	});


	// exchange swap coin from to
	$("#btn-exchange").click(function () {
		switch (SWAP_WAY){
		case 1:
			$("#btn-swap-from").html(`<img class=\"token-icon\" src=\"assets/icon/bnb.png\">BNB`);
			$("#btn-swap-to").html(`<img class="token-icon" src="assets/icon/xtime.png">XTime`);
			SWAP_WAY = 2;
			break;
		case 2:
			$("#btn-swap-from").html(`<img class="token-icon" src="assets/icon/xtime.png">XTime`);
			$("#btn-swap-to").html(`<img class=\"token-icon\" src=\"assets/icon/bnb.png\">BNB`);
			SWAP_WAY = 1;
			break;
		}
	})

	// connect wallet
	$("#btn-connect-wallet").click(function () {
		connectWallet().then((web3) => {
			window.web3 = web3;
			if (web3.currentProvider.chainId !== "0x38") {
				switchChain();
			}
			connectWalletSuccess();
			getBalance(getCurrentAddress()).then(result => {
				let balance = web3.utils.fromWei(result, 'ether')
				$("#label-balance").html(`Balance: ${balance}`);
				$("#label-balance").removeClass("hide");
			})
		}).catch(error => {
			console.log(error);
		})
	});
}

function connectWalletSuccess() {
	$("#btn-connect-wallet").addClass("hide");
	$("#btn-confirm-swap").removeClass("hide");
}

function hidePageShowSwap() {
	if ($(".swap-container").hasClass("hide")) {
		$(".index-container").addClass("hide");
		$(".swap-container").removeClass("hide");
	}
}

function settingPercentChange() {
	$("#btn-percent-10").click(function () {
		$(".btn-percent").removeClass("active");
		$(this).addClass("active");
		$("#input-percent").val(10);
	})
	$("#btn-percent-15").click(function () {
		$(".btn-percent").removeClass("active");
		$(this).addClass("active");
		$("#input-percent").val(15);
	})
	$("#btn-percent-25").click(function () {
		$(".btn-percent").removeClass("active");
		$(this).addClass("active");
		$("#input-percent").val(25);
	})
}