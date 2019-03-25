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
        wrapper.id = "wrapId";

        var headDiv = document.createElement("div");
        headDiv.id = "headId";
        wrapper.childAppend(headDiv);
        var h1 = document.createElement("H1");

        header.childAppend(h1);

        var second = document.createElement("div");
        second.id = "secId";
        var li = document.createElement("li");
        var ul1 = document.createElement("ul");
        var img = document.createElement("img");
        var ul2 = document.createElement("ul");
        var ul2Div = document.createElement("div");
        ul2Div.className = "profile_name";
        var span = document.createElement("span");
        wrapper.childAppend(second);
        second.childAppend(li);
        li.childAppend(ul1);
        li.childAppend(ul2);
        ul1.childAppend(img);
        ul2.childAppend(ul2Div);
        ul2Div.childAppend(span);

        var contents = document.createElement("div");
        contents.id = "CONTENTS";
        wrapper.childAppend(contents);

        if (this.dataFile) {
            
            h1.innerText = "OTSK Community Notice";
            img.src = this.dataFile[this.config.commNum].img;
            span.innerText = this.dataFile[this.config.commNum].writter;
            contents.innerText = this.dataFile[this.config.commNum].contents;

        } else {
            wrapper.innerHTML = "No data";
        }


        if (this.config.commNum >= 5) this.config.commNum = 1;
        else this.config.commNum += 1;

        return wrapper;
    }
});