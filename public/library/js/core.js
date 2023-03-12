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
        isFirefox: (typeof InstallTrigger !== 'undefined'),
        isIE: (navigator.userAgent.indexOf("Trident/")>-1&&navigator.userAgent.indexOf("rv:")>-1),
        isIOS: function(a){return a?_CHARWIN.utils.bcheck(RegExp("iP(hone|ad|od).+\\sOS\\s"+a,"i")):_CHARWIN.utils.bcheck(/iP(hone|ad|od)/i)},
        isIPad: function(a){return a?_CHARWIN.utils.bcheck(RegExp("iP(ad).+\\sOS\\s"+a,"i")):_CHARWIN.utils.bcheck(/iP(ad)/i)},
        isSafari: function(){return _CHARWIN.utils.bcheck(/safari/i)&&!_CHARWIN.utils.bcheck(/chrome/i)&&!_CHARWIN.utils.bcheck(/chromium/i)&&!_CHARWIN.utils.bcheck(/android/i)},
        isMobile: function(){return 'ontouchstart' in window || navigator.msMaxTouchPoints},
        isAndroid: function(a,e){return e&&_CHARWIN.utils.bcheck(/chrome\/[123456789]/i)&&!_CHARWIN.utils.bcheck(/chrome\/18/)?!1:a?(_CHARWIN.utils.isInt(a)&&!/\./.test(a)&&(a=""+a+"."),_CHARWIN.utils.bcheck(RegExp("Android\\s*"+a,"i"))):_CHARWIN.utils.bcheck(/Android/i)},
        isInt: function(a){return 0===parseFloat(a)%1},
        hexToRgba: function(a,c){var b="rgb",e=[parseInt(a.substr(1,2),16),parseInt(a.substr(3,2),16),parseInt(a.substr(5,2),16)];void 0!==c&&100!==c&&(b+="a",e.push(c/100));return b+"("+e.join(",")+")"},
        hasClass: function(oEl, sClass){
            var classIncluded = false;
            if(oEl){
                var sClassName = oEl.getAttribute("class");				
                if(sClassName && sClassName!=""){
                    sClassName = " " + sClassName + " ";
                    if(sClassName.indexOf(" " + sClass + " ") > -1){					
                        classIncluded = true;
                    }
                }	
            }
            return classIncluded;
        },
        addClass: function(oEl, sClass){
               if(oEl){
                   var sClassName = oEl.getAttribute("class");				
                   if(sClassName && sClassName!=""){
                       sClassName = " " + sClassName + " ";
                       if(sClassName.indexOf(" " + sClass + " ")==-1){					
                           sClassName += sClass;
                           if(sClassName.substring(0,1)==" ") sClassName = sClassName.substring(1);	
                           oEl.setAttribute("class",sClassName);
                       }
                   } else {
                       sClassName = sClass;
                       oEl.setAttribute("class",sClassName);
                   }		
               }
           },
           removeClass: function(oEl, sClass){
               if(oEl){
                   var sClassName = oEl.getAttribute("class");
                   var aNewClass = [];
                   if(sClassName && sClassName!=""){
                       var aClasses = sClassName.split(' ');	
                       for(var iC = 0, iCE = aClasses.length; iC<iCE;iC++){
                           if(aClasses[iC]!=sClass){
                               aNewClass.push(aClasses[iC]);
                           }
                       }
                       var sNewClass = aNewClass.join(' ');
                       oEl.setAttribute("class",sNewClass);					
                   }
               }
           },		   
        addDays: function(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        },
           minutesToDuration: function(minutes){
            var intMins = parseInt(minutes,10);
            var oneHour = 60;
            var oneDay = (oneHour*24);
            
            var days = 0;
            var hours = 0;
            var mins = 0;
            
            if(intMins>=oneDay) days = parseInt((intMins/oneDay),10);
            var justDays = (days*oneDay);
            if((intMins-justDays) > 0) intMins = (intMins-justDays);
            
            if(intMins>=oneHour) hours = parseInt((intMins/oneHour),10);
            var justHours = (hours*oneHour);
            if((intMins-justHours) > 0) mins = (intMins-justHours);
            
            var duration = {};
            duration.days = days;
            duration.hours = hours;
            duration.mins = mins;
            return duration;
        },
        slugify: function(text, preserveSlash){
            text = text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
            
            if(!preserveSlash){
                text = text.replace(/[^\w\-]+/g, ''); // Remove all non-word chars
            }

            return text;
        },
        cleanText: function(text){
            var txt = document.createElement("textarea");
            txt.innerHTML = text;
            return txt.value;
        },
        safeText: function(inText){
            inText = inText || "";
            var outText = _CHARWIN.utils.cleanQuotes(inText);
            outText = _CHARWIN.utils.cleanUTF(outText);
            return outText;
        },
        cleanQuotes: function(badQuotes){
            var goodQuotes = badQuotes
            .replace(/[\u2018\u2019]/g, "'")
            .replace(/[\u201C\u201D]/g, '"')
            .replace(/[\u2014]/g, '-');
            return goodQuotes;
        },
        cleanUTF: function(input){
            var output = "";
            for (var i=0; i<input.length; i++) {
                if (input.charCodeAt(i) <= 127) {
                    output += input.charAt(i);
                }
            }
            return output;
        },
        isExistingValue: function(existingValues,checkValue){
            var exists = false;
            for(var e=0,ee=existingValues.length;e<ee;e++){
                if(existingValues[e] == checkValue) exists = true;
            }
            return exists;
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
        insertAfter: function(newNode, referenceNode){
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
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
        clone: function(objectArray){
            if(objectArray){
                return JSON.parse(JSON.stringify(objectArray));
            } else {
                return {};
            }
        },		
        getURL: function(sURL, callback, synchronous, customHeaders){
            var xmlHTTP;

            if(_CHARWIN.utils.checkXDomain(sURL) && window.XDomainRequest) {
                // IE8 / 9
                xmlHTTP = new window.XDomainRequest();
                xmlHTTP.ontimeout = xmlHTTP.onprogress = function(){};
                xmlHTTP.timeout = 5000;
                try{
                    xmlHTTP.open("GET",sURL,!synchronous);
                    for(var hdr in customHeaders){
                        xmlHTTP.setRequestHeader(hdr,customHeaders[hdr]);
                    }
                    xmlHTTP.onload=function(){
                        callback(sURL,xmlHTTP.status,xmlHTTP.responseText);
                    };
                    xmlHTTP.send(null);
                } catch (e) {
                    _CHARWIN.utils.log('Oops! XDomainRequest: ' + e + ': ' + sURL);
                }
            } else{
                if (window.XMLHttpRequest){ 		
                    xmlHTTP=new XMLHttpRequest();
                } else {
                    // code for IE6, IE5
                    xmlHTTP=new ActiveXObject("Microsoft.XMLHTTP");
                }
                try{
                    if(xmlHTTP.overrideMimeType) xmlHTTP.overrideMimeType("text/plain");
                    xmlHTTP.open("GET",sURL,!synchronous);
                    for(var hdr in customHeaders){
                        xmlHTTP.setRequestHeader(hdr,customHeaders[hdr]);
                    }
                    xmlHTTP.onreadystatechange=function(){	
                        if(xmlHTTP.readyState===4){
                            if(xmlHTTP.status==200){	
                                callback(sURL,xmlHTTP.status,xmlHTTP.responseText);
                            } else {
                                callback(sURL,xmlHTTP.status,xmlHTTP.responseText);
                                _CHARWIN.utils.log('Oops! XMLHttpRequest: ' + xmlHTTP.status);	
                            }
                        }
                    };
                    xmlHTTP.send(null);
                } catch (e) {
                    _CHARWIN.utils.log('Oops! XMLHttpRequest: ' + e + ': ' + sURL);
                }
            }
        },
        postURL: function(sURL, callback, synchronous, customHeaders, postData){
            var xmlHTTP;

            if(_CHARWIN.utils.checkXDomain(sURL) && window.XDomainRequest) {
                // IE8 / 9
                xmlHTTP = new window.XDomainRequest();
                xmlHTTP.ontimeout = xmlHTTP.onprogress = function(){};
                xmlHTTP.timeout = 5000;
                try{
                    xmlHTTP.open("POST",sURL,!synchronous);
                    for(var hdr in customHeaders){
                        xmlHTTP.setRequestHeader(hdr,customHeaders[hdr]);
                    }
                    xmlHTTP.onload=function(){
                        callback(sURL,xmlHTTP.status,xmlHTTP.responseText);
                    };
                    xmlHTTP.send(null);
                } catch (e) {
                    _CHARWIN.utils.log('Oops! XDomainRequest: ' + e + ': ' + sURL);
                }
            } else{
                if (window.XMLHttpRequest){ 		
                    xmlHTTP=new XMLHttpRequest();
                } else {
                    // code for IE6, IE5
                    xmlHTTP=new ActiveXObject("Microsoft.XMLHTTP");
                }
                try{
                    //if(xmlHTTP.overrideMimeType) xmlHTTP.overrideMimeType("text/plain");				
                    xmlHTTP.open("POST",sURL,!synchronous);
                    for(var hdr in customHeaders){
                        xmlHTTP.setRequestHeader(hdr,customHeaders[hdr]);
                    }
                    xmlHTTP.onreadystatechange=function(){	
                        if(xmlHTTP.readyState===4){								
                            callback(sURL,xmlHTTP.status,xmlHTTP.responseText);
                            if(xmlHTTP.status!=200&&xmlHTTP.status!=204){
                                _CHARWIN.utils.log('Oops! XMLHttpRequest: ' + xmlHTTP.status);								
                            }
                        }
                    };
                    xmlHTTP.send(postData);
                } catch (e) {
                    _CHARWIN.utils.log('Oops! XMLHttpRequest: ' + e + ': ' + sURL);
                }
            }
        },
        checkXDomain: function(path) {
             return (path && path.indexOf('://') >= 0) && (path.split('/')[2] != self.location.href.split('/')[2]);
        },	
        numberFormatter: function(value){
            let numberFormatter = Intl.NumberFormat('en-US');
            let formatted = numberFormatter.format(value);

            return formatted;
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
    refs:{},
    funcs:{
        init: function(){
            console.log('JS Working');
            _CORE.overpayment.funcs.init();
            _CORE.funcs.slidersSetup();
        },
        slidersSetup: function(){
            for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
                e.style.setProperty('--value', e.value);
                e.style.setProperty('--min', e.min == '' ? '0' : e.min);
                e.style.setProperty('--max', e.max == '' ? '100' : e.max);
                e.addEventListener('input', () => e.style.setProperty('--value', e.value));
            }
        },
    }
};

document.addEventListener('DOMContentLoaded', function(){
    _CORE.funcs.init();
});
