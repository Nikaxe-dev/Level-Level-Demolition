const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function waituntil(isTrue: Function, interval: number) {
	function TryIt() {
		var ret;
		try {
			ret = isTrue();
		}catch {

		}

		if (!ret) console.log("not true yet");

		return ret;
	}

	var p = new Promise((resolve, reject) => {
		var ret = TryIt();
		if (ret) {
			resolve(ret);
		} else {
			var isTrueHandle = window.setInterval(function(){
				ret = TryIt();
				if (ret) {
					window.clearInterval(isTrueHandle);
					console.log("cleared interval");
					resolve(ret);
				}
			}, interval || 500);
		}
	});

	return p;
}