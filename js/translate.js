let zh_simple = {
	"What is Xtime": "什么是 Xtime",
	"Token Info": "代币信息",
	"Exchange Info": "交易信息",
	"Road Map": "路线图",
	"XTime, from El Salvador.": "Xtime, 来自萨尔瓦多",
	"Unknown, so unlimited imagination.": "未知，所以想象永无止境",
	"Bringing smiles to millions": "带给人们微笑",
	"XTime Token is based on BSC.": "Xtime 基于 BSC",
	"AuditReport": "审计报告",
	"White Paper": "白皮书",
	"X-Time Characteristics": "Xtime 特性",
	"Maximum sales": "最大销量",
	"Additional 1% sales fee": "附加1%费用",
	"Safe": "安全",
	"Lock": "锁",
	"Audit": "审查",
	"More..": "更多",
	"Some thing you must know": "有些东西你必须要知道",
	"Into Black Hole": "扔进黑洞",
	"Pre-Sale": "预先销售",
	"Charitable": "可捐献的",
	"Be ready for our upcoming X-time token": "准备好拥有Xtime了吗？",
	"Contract address:": "交易地址",
	"K-Line": "K线图",
	"Road Map": "路线图",
	"We Now Here!": "现在在这！",
	"Language: EN":"语言：简体中文"
}
let zh_wawa = {
	"What is Xtime": "什麽是 Xtime",
	"Token Info": "代幣信息",
	"Exchange Info": "交易信息",
	"Road Map": "路線圖",
	"XTime, from El Salvador.": "Xtime, 來自薩爾瓦多",
	"Unknown, so unlimited imagination.": "未知，所以想象永無止境",
	"Bringing smiles to millions": "帶給人們微笑",
	"XTime Token is based on BSC.": "Xtime 基於 BSC",
	"AuditReport": "審計報告",
	"White Paper": "白皮書",
	"X-Time Characteristics": "Xtime 特性",
	"Maximum sales": "最大銷量",
	"Additional 1% sales fee": "附加1%費用",
	"Safe": "安全",
	"Lock": "鎖",
	"Audit": "審查",
	"More..": "更多",
	"Some thing you must know": "有些東西你必須要知道",
	"Into Black Hole": "扔進黑洞",
	"Pre-Sale": "預先銷售",
	"Charitable": "可捐獻的",
	"Be ready for our upcoming X-time token": "準備好擁有Xtime了嗎？",
	"Contract address:": "交易地址",
	"K-Line": "K線圖",
	"Road Map": "路線圖",
	"We Now Here!": "現在在這！",
	"Language: EN":"语言：繁体中文"
}

let jap = {
	"What is Xtime": "Xtimeとは何か、",
	"Token Info": "代行情報",
	"Exchange Info": "取引情報",
	"Road Map": "道路地図",
	"XTime，from El Salvador.": "Xtime，サルバドールから来た",
	"Unknown，so unlimited imagination.": "未知だから，想像にはきりがない",
	"Bringing smiles to millions": "笑顔を持ってきて",
	"XTime Token is based on BSC.": "XtimeはBSCに基づく",
	"AuditReport": "尋問報告書",
	"White Paper": "白皮書",
	"X-Time Characteristics": "Xtime特性",
	"Maximum sales": "最大オスミウム量",
	"Additional 1%sales fee": "付加1%料金",
	"Safe": "安全",
	"Lock": "鍵",
	"Audit": "検索",
	"Mode..": "もっと",
	"Some thing you must know": "あなたが知らなければならないことがある",
	"Into Black Hole": "ブラックホールに投げ込む",
	"Pre-Sale": "先行販売",
	"Charitable": "寄付可能なもの",
	"Be ready for our upcoming X-time token": "Xtimeを所有する準備はできましたか？",
	"Contract address": "取引先",
	"K-Line": "K線図",
	"Road Map": "道路地図",
	"We Now Here！": "今ここに！",
	"Language: EN":"语言：日本语"
}
let elenodes = null;
window.translate = function(i) {
	if (i == -1) {
		if (elenodes != null) {
			for (let node of elenodes) {
				node.ele.innerHTML = node.stext;
			}
		}
		return
	}
	let packs = [zh_simple, zh_wawa, jap];
	let pack = packs[i];
	if (elenodes == null) {
		let trans = document.getElementsByClassName("trans");
		elenodes = new Array();
		for (let tran of trans) {
			if (pack[tran.innerText]) {
				let node = new Object();
				node.source = tran.innerText;
				node.stext = tran.innerText
				tran.innerHTML = pack[tran.innerText]
				node.ele = tran;

				elenodes.push(node)
			} else {
				if (pack["#" + tran.id]) {
					let node = new Object();
					node.source = tran.id;
					node.stext = tran.innerText;
					tran.innerHTML = pack[tran.innerText]
					node.ele = tran;
					elenodes.push(node)
				}
			}
		}
	} else {
		for (let node of elenodes) {
			if (pack[node.source]) {
				node.ele.innerHTML = pack[node.source]
			} else {
				if (pack["#" + node.source]) {
					node.ele.innerHTML = pack["#" + node.source]
				}
			}
		}
	}
	// var menux = document.getElementById("menux");
	// menux.classList.remove("show");
	$('.dropdown-toggle').trigger('click').blur();
}
