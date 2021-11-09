let SWAP_WAY = 1; // 1: from bnb to xtime; 2: from xtime to bnb
let DEADLINE_TIME = 20 * 60;
let SLIPPAGE = 20;
let SWAP_FROM_VALUE = 0;
let SWAP_TO_VALUE = 0;
let BNB_BALANCE = 0;
let XTIME_BALANCE = 0;
let CURRENT_ADDRESS;

function bindBtnEvents() {
	$("#btn-swap").click(function () {
		checkSwapInputValue();
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


	// add Liquidity
	$("#btn-join-poll").click(function () {
		$("#window-body-poll-liquidity").addClass("hide")
		$("#window-body-poll-add").removeClass("hide")
	})

	// from add liquidity back
	$("#btn-poll-add-back").click(function () {
		$("#window-body-poll-liquidity").removeClass("hide")
		$("#window-body-poll-add").addClass("hide")
	})

	// exchange swap coin from to
	$("#btn-exchange").click(function () {
		switch (SWAP_WAY) {
		case 1:
			$("#btn-swap-from").html(`<img class="token-icon" src="assets/icon/xtime.png">XTime`);
			$("#btn-swap-to").html(`<img class=\"token-icon\" src=\"assets/icon/bnb.png\">BNB`);
			SWAP_WAY = 2;
			break;
		case 2:
			$("#btn-swap-from").html(`<img class=\"token-icon\" src=\"assets/icon/bnb.png\">BNB`);
			$("#btn-swap-to").html(`<img class="token-icon" src="assets/icon/xtime.png">XTime`);
			SWAP_WAY = 1;
			break;
		}

		$("#input-swap-from").val(SWAP_TO_VALUE);
		$("#input-swap-to").val(SWAP_FROM_VALUE);

		SWAP_TO_VALUE = $("#input-swap-to").val();
		SWAP_FROM_VALUE = $("#input-swap-from").val();
	})

	// connect wallet
	$("#btn-connect-wallet").click(function () {
		connectWallet().then((web3) => {
			window.web3 = web3;
			if (web3.currentProvider.chainId !== "0x38") {
				switchChain();
			}
			initContract();
			CURRENT_ADDRESS = getCurrentAddress();
			getBalance(CURRENT_ADDRESS).then(result => {
				BNB_BALANCE = Web3.utils.fromWei(result)
				$("#label-balance").html(`Balance: ${BNB_BALANCE}`);
				$("#label-balance").removeClass("hide");
			});
			getXTimeBalance(CURRENT_ADDRESS).then(result => {
				XTIME_BALANCE = Web3.utils.fromWei(result)
			})
			getXTimeToWBNBPrice();
			setInterval(getXTimeToWBNBPrice, 5000)
			connectWalletSuccess()
		}).catch(error => {
			console.log(error);
		})
	});

	// change the swap from value
	$("#input-swap-from").on("input", function () {
		SWAP_FROM_VALUE = $(this).val();
		SWAP_TO_VALUE = calculateSwapToNumber();
		$("#input-swap-to").val(SWAP_TO_VALUE);
		checkSwapInputValue();
	})


	$("#input-swap-to").on("input", function () {
		SWAP_TO_VALUE = $(this).val();
		SWAP_FROM_VALUE = calculateSwapFromNumber();
		$("#input-swap-from").val(SWAP_FROM_VALUE)
		checkSwapInputValue();
	})

	$(".stake-container").on("click", "div.detail-btn", function (e) {
		let parent = $($(this).parents(".stake-container")[0]);
		if (parent.hasClass("open")) {
			parent.removeClass("open")
		} else {
			parent.addClass("open")
		}
	})

	// confirm swap
	$("#btn-confirm-swap").click(function (){
		if (SWAP_WAY === 1) {
			swapBNBToXTime().then(() => {
				showSuccessInfo("Swap Success!", "You transaction is on the way")
			});
		} else {
			swapXTimeToBNB().then(() => {
				showSuccessInfo("Swap Success!", "You transaction is on the way")
			})
		}
	})
}

function calculateSwapToNumber() {
	if (SWAP_WAY === 1) {
		return (SWAP_FROM_VALUE * XTIME_PRICE).toFixed(18);
	} else {
		return (SWAP_FROM_VALUE / XTIME_PRICE).toFixed(18);
	}
}

function calculateSwapFromNumber() {
	if (SWAP_WAY === 1) {
		return SWAP_TO_VALUE / XTIME_PRICE;
	} else {
		return SWAP_TO_VALUE * XTIME_PRICE;
	}
}

function checkSwapInputValue() {
	if (SWAP_FROM_VALUE > 0 && SWAP_TO_VALUE > 0) {
		if (SWAP_WAY === 1 && SWAP_FROM_VALUE <= BNB_BALANCE) {
			$("#btn-confirm-swap").attr("disabled", false);
			$("#btn-confirm-swap").html("Swap");
			return;
		} else if (SWAP_WAY === 2 && SWAP_FROM_VALUE <= XTIME_BALANCE) {
			$("#btn-confirm-swap").attr("disabled", false);
			$("#btn-confirm-swap").html("Swap");
			return;
		}
	}

	$("#btn-confirm-swap").attr("disabled", true);
	$("#btn-confirm-swap").html("Insufficient BNB balance");
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

// change the deadline
$("#input-deadline").on("input", function (e) {
	DEADLINE_TIME = $("#input-deadline").val() * 60;
})

$("#input-percent").on("input", function () {
	let value = Number($("#input-percent").val());

	if (value >= 100) {
		value = 100;
		$("#input-percent").val(100);
	}

	switch (value) {
	case 10:
		$(".btn-percent").removeClass("active");
		$("#btn-percent-10").addClass("active");
		break;
	case 15:
		$(".btn-percent").removeClass("active");
		$("#btn-percent-15").addClass("active");
		break;
	case 25:
		$(".btn-percent").removeClass("active");
		$("#btn-percent-25").addClass("active");
		break;
	default:
		$(".btn-percent").removeClass("active");
	}
	SLIPPAGE = value;
})

// click button change slippage
function settingPercentChange() {
	$("#btn-percent-10").click(function () {
		$(".btn-percent").removeClass("active");
		$(this).addClass("active");
		$("#input-percent").val(10);
		SLIPPAGE = 0.1;
	})

	$("#btn-percent-15").click(function () {
		$(".btn-percent").removeClass("active");
		$(this).addClass("active");
		$("#input-percent").val(15);
		SLIPPAGE = 0.15;
	})

	$("#btn-percent-25").click(function () {
		$(".btn-percent").removeClass("active");
		$(this).addClass("active");
		$("#input-percent").val(25);
		SLIPPAGE = 0.25;
	})
}