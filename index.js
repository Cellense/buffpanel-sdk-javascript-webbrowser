var BuffPanelSdk = function (_window, _document) {
	var _class = function (gameToken) {
		var gaAll = null;
		if (ga && ga.getAll) {
			gaAll = ga.getAll();
		} else {
			return;
		}
		var trackingId = null;
		var clientId = null;
		if ((gaAll.length >= 1) && gaAll[0] && gaAll[0].get) {
			clientId = gaAll[0].get('clientId');
			trackingId = gaAll[0].get('trackingId');
		} else {
			return;
		}
	};

	return new 
		

		var image = document.createElement('img');
		image.onload = function() {};
		image.src = 'http://buffpanel.com/api/ga_event/' + gameToken + '?tid=' + trackingId + '&cid=' + clientId;
	};
}(window, document);
