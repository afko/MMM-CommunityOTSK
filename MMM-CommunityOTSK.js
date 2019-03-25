/* Magic Mirror
 * Module: Daum News
 *
 * By Sungje Kim 
 * 
 */

Module.register('MMM-CommunityOTSK', {
    defaults: {
        updateNewsInterval: 3 * 1000, // 3 secs 
        fadeSpeed: 4000,
        updateInterval: 4 * 1000, // 4 secs
        commNum: 0
    },

    start: function () {
        this.sendSocketNotification("START", this.config);
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "DATA") {
            this.dataFile = payload;
            this.updateDom();
        }
    },

    getScripts: function () {
        return [
            '//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'
        ];
    },
    getStyles: function () {
        return [
            "font-awesome.css",
            "MMM-CommunityOTSK.css"];
    },

    getDom: function () {

        var wrapper = document.createElement("div");

        var img = document.createElement("img");
        var divName = document.createElement("div");
        var divContents = document.createElement("div");

        wrapper.id = "COMM";
        wrapper.className = "center";
        img.id = "IMG";
        divName.id = "NAME"
        divContents.id ="CONTENTS"

        if (this.dataFile) {
            wrapper.innerHTML = ""

            img.src = this.dataFile[this.config.commNum].img;
            wrapper.appendChild(img);
            // wrapper.innerHTML = "[" + this.config.commNum + "] ";
            divName.innerHTML += this.dataFile[this.config.commNum].writter;
            divContents.innerHTML += " - " + this.dataFile[this.config.commNum].contents;

            wrapper.appendChild(divName);
            wrapper.appendChild(divContents);

        } else {
            wrapper.innerHTML = "No data";
        }

        
        if (this.config.commNum >= 5) this.config.commNum = 1;
        else this.config.commNum += 1;
        
        return wrapper;
    }
});