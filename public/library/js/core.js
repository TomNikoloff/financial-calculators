_CORE={
    extend:function(what, where){
        var newNode = _CORE;
        if(where&&where!=''){
            var whereTree = where.split('.');
            for(var w=0,we=whereTree.length;w<we;w++){
                if(!newNode[whereTree[w]])newNode[whereTree[w]]={};
                newNode = newNode[whereTree[w]];
            }
        } 
        for(var whatKey in what){
            newNode[whatKey] = what[whatKey];
        }			
    },
    cache:{},
    utils:{
        bcheck: function(regex){var agent = navigator.userAgent.toLowerCase();return (agent.match(regex) !== null);},
        isIE: function(){ return (navigator.userAgent.indexOf("Trident/")>-1&&navigator.userAgent.indexOf("rv:")>-1)},
        isFirefox: function(){ return (typeof InstallTrigger !== 'undefined'); },
        isIOS: function(a){return a?_CORE.utils.bcheck(RegExp("iP(hone|ad|od).+\\sOS\\s"+a,"i")):_CORE.utils.bcheck(/iP(hone|ad|od)/i)},
        isIPad: function(a){return a?_CORE.utils.bcheck(RegExp("iP(ad).+\\sOS\\s"+a,"i")):_CORE.utils.bcheck(/iP(ad)/i)},
        isSafari: function(){return _CORE.utils.bcheck(/safari/i)&&!_CORE.utils.bcheck(/chrome/i)&&!_CORE.utils.bcheck(/chromium/i)&&!_CORE.utils.bcheck(/android/i)},
        isMobile: function(){return _CORE.utils.isIOS()||_CORE.utils.isAndroid()},
        isAndroid: function(a,e){return e&&_CORE.utils.bcheck(/chrome\/[123456789]/i)&&!_CORE.utils.bcheck(/chrome\/18/)?!1:a?(_CORE.utils.isInt(a)&&!/\./.test(a)&&(a=""+a+"."),_CORE.utils.bcheck(RegExp("Android\\s*"+a,"i"))):_CORE.utils.bcheck(/Android/i)},
        isInt: function(a){return 0===parseFloat(a)%1},
        hexToRgba: function(a,c){var b="rgb",e=[parseInt(a.substr(1,2),16),parseInt(a.substr(3,2),16),parseInt(a.substr(5,2),16)];void 0!==c&&100!==c&&(b+="a",e.push(c/100));return b+"("+e.join(",")+")"},
        log: function(msg){console.info(msg);},
        timeCode: function(){
            return parseInt(Date.now()/1000, 10);
        },
        forEach: function(objectArray, callback, parentObj){
            if(typeof(objectArray) === "string"){
                var selector = objectArray;
                objectArray = (parentObj?parentObj:document).querySelectorAll(selector);
            }
            if(objectArray.keys){
                // array
                for(var s=0,sl=objectArray.length;s<sl;s++){
                    callback(s,objectArray[s]);
                }
            } else {
                // object
                for(var key in objectArray){
                    callback(key,objectArray[key]);
                }
            }
        },
        fetchPOST: function(url, payload){
            fetch(url,{
                method: 'post',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.text())
            .then(data => {
                
                UIkit.notification.closeAll();
                UIkit.notification(data);
                
                console.log(data);
            })
            .catch(function(err){
                UIkit.notification.closeAll();
                UIkit.notification(err);
                console.log(err);
            });
        },
        slugify: function(text){
            return text.toString()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
        },
        makeId: function(len, prefix){
            var sID = "";
            var iLen = (len?len:5);
            var sPoss = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var iPosLen = sPoss.length;
            for( var i=0; i < iLen; i++ ){
                sID += sPoss.charAt(Math.floor(Math.random() * iPosLen));
            }
            return (prefix?prefix:'')+sID;
        },
        capitalizeWords: function(arr){
            return arr.map(element => {
                return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
              });
        },
        properCase: function(text){
            var firstChar = text.substring(0,1);
            firstChar = firstChar.toUpperCase();
            return firstChar+text.substring(1);
        },
        sortArr: function(arr, order, label){
            console.log(arr, order);
            return arr.sort((a, b) => order.indexOf(a[label]) - order.indexOf(b[label]));
        },
        objIsEmpty: function(obj){
            return Object.keys(obj).length === 0;
        }
    },
    funcs:{
        init: function(){
            console.log('JS Working');
        }
    }
};

document.addEventListener('DOMContentLoaded', function(){
    _CORE.funcs.init();
});
