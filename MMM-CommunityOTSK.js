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
            "MMM-CommunityOTSK.css"
        ];
    },

    getDom: function () {

        var wrapper = document.createElement("div");
        
        var div1 = document.createElement("div");
        var div2 = document.createElement("div");
        var div3 = document.createElement("div");



        if (this.dataFile) {
            div1.innerHTML = "This is div1";
            div2.innerHTML = "This is div2";
            div3.innerHTML = "This is div3";

            wrapper.appendChild(div1, div2, div3);
            // h1.innerText = "OTSK Community Notice";
            // img.src = this.dataFile[this.config.commNum].img;
            // span.innerText = this.dataFile[this.config.commNum].writter;
            // contents.innerText = this.dataFile[this.config.commNum].contents;

        } else {
            wrapper.innerHTML = "No data";
        }


        if (this.config.commNum >= 5) this.config.commNum = 1;
        else this.config.commNum += 1;

        return wrapper;
    }
});