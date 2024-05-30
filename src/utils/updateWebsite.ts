const updateWebsite = () => {
	const xhr = new XMLHttpRequest();

	xhr.open("get", "/", true);

	xhr.onreadystatechange = function () {
		// console.log(xhr.readyState);
		// 0－未初始化，即尚未调用 open。
		// 1－初始化，即尚未调用 send。
		// 2－发送数据，即已经调用 send。
		// 3－数据传送中。
		// 4－完成。
		if (xhr.readyState === 4 && xhr.status === 200) {
			// console.log(xhr.responseText); //获得字符串的响应数据
			// responseXML  //获得 XML 形式的响应数据
			const data = xhr.responseText;
			const dom = document.createElement("div");
			dom.innerHTML = data;
			[...dom.children].forEach(val => {
				if (val.tagName === "SCRIPT" && (val as HTMLScriptElement).src.includes(window.location.href)) {
					if (window.localStorage.getItem("version")) {
						const currentVersion = window.localStorage.getItem("version");
						if (currentVersion != (val as HTMLScriptElement).src) {
							console.log("版本不一样");
							window.localStorage.setItem("version", (val as HTMLScriptElement).src);
							setTimeout(() => {
								location.reload();
							}, 1500);
						}
					} else {
						console.log("没存版本");
						window.localStorage.setItem("version", (val as HTMLScriptElement).src);
					}
				}
			});
		}
	};

	xhr.send();
};

export default updateWebsite;
