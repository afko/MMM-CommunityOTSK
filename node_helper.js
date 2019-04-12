const NodeHelper = require("node_helper");
const fs= require("fs");

module.exports = NodeHelper.create({
//here comes the part of the nodehelper after the 3 dots as posted above

	socketNotificationReceived: function(notification, payload) {
		if(notification === "START"){
			this.config = payload;
			
			this.readData();
			setTimeout(function () {}, 2000)
			document.getElementById("DIV3").scrollBy({
				top: 40, // could be negative value
				left: 0,
				behavior: 'smooth'
			});
    			setInterval(() => {
					this.readData();
					setTimeout(function () {}, 2000)
					setInterval(function () {
						document.getElementById("DIV3").scrollBy({
							top: 40, // could be negative value
							left: 0,
							behavior: 'smooth'
						});
					}, 2500)
    			}, this.config.updateInterval);
		}
	},

	readData: function(){
		//to read a file to do the following
		fs.readFile("./modules/MMM-CommunityOTSK/community.json", "utf8", (err, data) => {
			if (err) throw err;
			this.sendSocketNotification("DATA", JSON.parse(data));
		});
	}
});