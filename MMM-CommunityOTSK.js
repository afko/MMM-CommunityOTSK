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
        wrapper.id = "WRAPPER";


        var header = document.createElement("div");
        header.id = "HEADER";
        var h1 = document.createElement("h1");
        h1.className = "title";
        wrapper.childAppend(header);
        header.childAppend(h1);

        var second = document.createElement("div");
        second.id = "SECOND";
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
        
        // var divImgName = document.createElement("div");
        // var img = document.createElement("img");
        // var divName = document.createElement("div");
        // var divContents = document.createElement("div");

        // wrapper.id = "COMM";

        // divImgName.id = "WRAPDIV"
        // img.id = "IMG";
        // divName.id = "NAME"

        // divContents.id ="CONTENTS"

        if (this.dataFile) {
            
            h1.innerHTML = "OTSK Community Notice";
            img.src = this.dataFile[this.config.commNum].img;
            span.innerHTML = this.dataFile[this.config.commNum].writter;
            contents.innerHTML = this.dataFile[this.config.commNum].contents;

        } else {
            wrapper.innerHTML = "No data";
        }

        
        if (this.config.commNum >= 5) this.config.commNum = 1;
        else this.config.commNum += 1;
        
        return wrapper;
    }
});