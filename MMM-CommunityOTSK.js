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
        wrapper.id = "WRAPPER";
        wrapper.className = "center";
        var div1 = document.createElement("div");
        div1.id = "DIV1";
        var div2 = document.createElement("div");
        div2.id = "DIV2";
        div2.className = "center";
        var div3 = document.createElement("div");
        div3.id = "DIV3";

        var p = document.createElement("p");
        p.className = "center";
        p.id = "PP"
        var img = document.createElement("img");
        img.id = "IMG";

        if (this.dataFile) {
            img.src = this.dataFile[this.config.commNum].img;
            pWritter = document.createTextNode(" " + this.dataFile[this.config.commNum].writter);
            p.appendChild(img);
            p.appendChild(pWritter);

            div1.innerHTML = "* OTSK Community Notice *" + " #"+this.config.commNum ;
            div2.appendChild(p);

            div3.innerHTML = this.dataFile[this.config.commNum].contents;

            wrapper.appendChild(div1);
            wrapper.appendChild(div2);
            wrapper.appendChild(div3);

        } else {
            wrapper.innerHTML = "No data";
        }


        if (this.config.commNum >= 5) this.config.commNum = 1;
        else this.config.commNum += 1;

        return wrapper;
    }
});