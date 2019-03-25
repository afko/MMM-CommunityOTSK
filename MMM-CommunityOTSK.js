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
        wrapper.id = "COMM";
        img.id = 'IMG';

      

        if (this.dataFile) {
            wrapper.innerHTML = ""
// {/* <img class="MqU2J" height="36" width="36" src="https://lh3.googleusercontent.com/a/default-user=s45-p-k-rw-no" alt=""> */}

            img.src = this.dataFile[this.config.commNum].img;
            wrapper.appendChild(img);
            // wrapper.innerHTML = "[" + this.config.commNum + "] ";
            wrapper.innerHTML += this.dataFile[this.config.commNum].writter;
            wrapper.innerHTML += " - " + this.dataFile[this.config.commNum].contents;
        } else {
            wrapper.innerHTML = "No data";
        }

        
        if (this.config.commNum >= 2) this.config.commNum = 1;
        else this.config.commNum += 1;
        
        return wrapper;
    }
});