videojs.Youtube=videojs.MediaTechController.extend({init:function(a,b,c){videojs.MediaTechController.call(this,a,b,c);this.features.progressEvents=!1;this.features.timeupdateEvents=!1;if("undefined"!=typeof b.source)for(var e in b.source)a.options()[e]=b.source[e];this.userQuality=videojs.Youtube.convertQualityName(a.options().quality);this.player_=a;this.player_el_=document.getElementById(a.id());this.player_el_.className+=" vjs-youtube";this.qualityButton=document.createElement("div");this.qualityButton.setAttribute("class",
"vjs-quality-button vjs-menu-button vjs-control");this.qualityButton.setAttribute("tabindex",0);b=document.createElement("div");this.qualityButton.appendChild(b);this.qualityTitle=document.createElement("span");b.appendChild(this.qualityTitle);b=document.createElement("div");b.setAttribute("class","vjs-menu");this.qualityButton.appendChild(b);this.qualityMenuContent=document.createElement("ul");this.qualityMenuContent.setAttribute("class","vjs-menu-content");b.appendChild(this.qualityMenuContent);
this.id_=this.player_.id()+"_youtube_api";this.el_=videojs.Component.prototype.createEl("iframe",{id:this.id_,className:"vjs-tech",scrolling:"no",marginWidth:0,marginHeight:0,frameBorder:0,webkitAllowFullScreen:"true",mozallowfullscreen:"true",allowFullScreen:"true"});this.iframeblocker=videojs.Component.prototype.createEl("div",{className:"iframeblocker"});var d=this;(this.toggleOnClick=!!this.player_.options().toggleOnClick)?this.iframeblocker.addEventListener("click",function(){d.paused()?d.play():
d.pause()}):this.iframeblocker.addEventListener("click",function(){!0===d.player_.userActive()?d.player_.userActive(!1):d.player_.userActive(!0)});this.iframeblocker.addEventListener("mousemove",function(a){d.player_.userActive()||d.player_.userActive(!0);a.stopPropagation();a.preventDefault()});this.iframeblocker.addEventListener("tap",function(){!0===d.player_.userActive()?d.player_.userActive(!1):d.player_.userActive(!0)});this.player_.options().ytcontrols||(this.iframeblocker.style.display="block");
this.player_el_.insertBefore(this.iframeblocker,this.player_el_.firstChild);this.player_el_.insertBefore(this.el_,this.iframeblocker);this.parseSrc(a.options().src);this.playOnReady=this.player_.options().autoplay||!1;this.forceSSL=this.player_.options().forceSSL||!1;b={enablejsapi:1,iv_load_policy:3,playerapiid:this.id(),disablekb:1,wmode:"transparent",controls:this.player_.options().ytcontrols?1:0,html5:this.player_.options().forceHTML5?1:null,playsinline:this.player_.options().playsInline?1:0,
showinfo:0,modestbranding:1,rel:0,autoplay:this.playOnReady?1:0,loop:this.player_.options().loop?1:0,list:this.playlistId,vq:this.userQuality};for(var f in b)!b.hasOwnProperty(f)||"undefined"!==typeof b[f]&&null!==b[f]||delete b[f];"file:"!=window.location.protocol?this.forceSSL?this.el_.src="https://www.youtube.com/embed/"+this.videoId+"?"+videojs.Youtube.makeQueryString(b):(b.origin=window.location.protocol+"//"+window.location.host,this.el_.src=window.location.protocol+"//www.youtube.com/embed/"+
this.videoId+"?"+videojs.Youtube.makeQueryString(b)):this.el_.src="https://www.youtube.com/embed/"+this.videoId+"?"+videojs.Youtube.makeQueryString(b);a.ready(function(){d.player_el_.getElementsByClassName("vjs-control-bar")[0].appendChild(d.qualityButton);d.playOnReady&&!d.player_.options().ytcontrols&&("undefined"!=typeof d.player_.loadingSpinner&&d.player_.loadingSpinner.show(),"undefined"!=typeof d.player_.bigPlayButton&&d.player_.bigPlayButton.hide())});this.player_.options().ytcontrols?this.player_.controls(!1):
this.player_.poster()||(null==this.videoId?this.iframeblocker.style.backgroundColor="black":this.player_.poster("https://img.youtube.com/vi/"+this.videoId+"/0.jpg"));videojs.Youtube.apiReady?this.loadYoutube():(videojs.Youtube.loadingQueue.push(this),videojs.Youtube.apiLoading||(a=document.createElement("script"),a.onerror=function(a){d.onError(a)},a.src=this.forceSSL||"file:"===window.location.protocol?"https://www.youtube.com/iframe_api":"//www.youtube.com/iframe_api",f=document.getElementsByTagName("script")[0],
f.parentNode.insertBefore(a,f),videojs.Youtube.apiLoading=!0));this.on("dispose",function(){this.el_.parentNode.removeChild(this.el_);this.iframeblocker.parentNode.removeChild(this.iframeblocker);this.qualityButton.parentNode.removeChild(this.qualityButton);"undefined"!=typeof this.player_.loadingSpinner&&this.player_.loadingSpinner.hide();"undefined"!=typeof this.player_.bigPlayButton&&this.player_.bigPlayButton.hide()})}});
videojs.Youtube.prototype.parseSrc=function(a){if(this.srcVal=a){var b=a.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);this.videoId=b&&11==b[2].length?b[2]:null;b=a.match(/[?&]list=([^#\&\?]+)/);null!=b&&1<b.length?this.playlistId=b[1]:this.playlistId&&delete this.playlistId;b=a.match(/[?&]vq=([^#\&\?]+)/);null!=b&&1<b.length&&(this.userQuality=b[1])}};
videojs.Youtube.prototype.src=function(a){a&&(this.parseSrc(a),null==this.videoId?(this.iframeblocker.style.backgroundColor="black",this.iframeblocker.style.display="block"):(this.player_.options().autoplay?this.ytplayer.loadVideoById({videoId:this.videoId,suggestedQuality:this.userQuality}):this.ytplayer.cueVideoById({videoId:this.videoId,suggestedQuality:this.userQuality}),this.player_el_.getElementsByClassName("vjs-poster")[0].style.backgroundImage="url(https://img.youtube.com/vi/"+this.videoId+
"/0.jpg)",this.iframeblocker.style.backgroundColor="",this.iframeblocker.style.display="",this.player_.poster("https://img.youtube.com/vi/"+this.videoId+"/0.jpg")));return this.srcVal};videojs.Youtube.prototype.load=function(){};videojs.Youtube.prototype.play=function(){null!=this.videoId&&(this.player_.options().ytcontrols||this.player_.trigger("waiting"),this.isReady_?this.ytplayer.playVideo():this.playOnReady=!0)};videojs.Youtube.prototype.pause=function(){this.ytplayer.pauseVideo()};
videojs.Youtube.prototype.paused=function(){return this.ytplayer?this.lastState!==YT.PlayerState.PLAYING&&this.lastState!==YT.PlayerState.BUFFERING:!0};videojs.Youtube.prototype.currentTime=function(){return this.ytplayer&&this.ytplayer.getCurrentTime?this.ytplayer.getCurrentTime():0};videojs.Youtube.prototype.setCurrentTime=function(a){this.ytplayer.seekTo(a,!0);this.player_.trigger("timeupdate")};
videojs.Youtube.prototype.duration=function(){return this.ytplayer&&this.ytplayer.getDuration?this.ytplayer.getDuration():0};videojs.Youtube.prototype.volume=function(){this.ytplayer&&isNaN(this.volumeVal)&&(this.volumeVal=this.ytplayer.getVolume()/100);return this.volumeVal};videojs.Youtube.prototype.setVolume=function(a){a&&a!=this.volumeVal&&(this.ytplayer.setVolume(100*a),this.volumeVal=a,this.player_.trigger("volumechange"))};videojs.Youtube.prototype.muted=function(){return this.mutedVal};
videojs.Youtube.prototype.setMuted=function(a){a?this.ytplayer.mute():this.ytplayer.unMute();this.mutedVal=a;this.player_.trigger("volumechange")};videojs.Youtube.prototype.buffered=function(){if(this.ytplayer&&this.ytplayer.getVideoBytesLoaded){var a=this.ytplayer.getVideoBytesLoaded(),b=this.ytplayer.getVideoBytesTotal();if(!a||!b)return 0;var c=this.ytplayer.getDuration(),a=a/b*c,b=this.ytplayer.getVideoStartBytes()/b*c;return videojs.createTimeRange(b,b+a)}return videojs.createTimeRange(0,0)};
videojs.Youtube.prototype.supportsFullScreen=function(){return!0};videojs.Youtube.isSupported=function(){return!0};videojs.Youtube.canPlaySource=function(a){return"video/youtube"==a.type};videojs.Youtube.canControlVolume=function(){return!0};videojs.Youtube.loadingQueue=[];
videojs.Youtube.prototype.loadYoutube=function(){this.ytplayer=new YT.Player(this.id_,{events:{onReady:function(a){a.target.vjsTech.onReady()},onStateChange:function(a){a.target.vjsTech.onStateChange(a.data)},onPlaybackQualityChange:function(a){a.target.vjsTech.onPlaybackQualityChange(a.data)},onError:function(a){a.target.vjsTech.onError(a.data)}}});this.ytplayer.vjsTech=this};
videojs.Youtube.makeQueryString=function(a){var b=[],c;for(c in a)a.hasOwnProperty(c)&&b.push(encodeURIComponent(c)+"="+encodeURIComponent(a[c]));return b.join("&")};window.onYouTubeIframeAPIReady=function(){for(var a;a=videojs.Youtube.loadingQueue.shift();)a.loadYoutube();videojs.Youtube.loadingQueue=[];videojs.Youtube.apiReady=!0};
videojs.Youtube.prototype.onReady=function(){this.isReady_=!0;this.triggerReady();this.iframeblocker.style.display="";"undefined"!=typeof this.player_.loadingSpinner&&this.player_.loadingSpinner.hide();this.player_.options().muted&&this.setMuted(!0);this.playOnReady&&(this.playOnReady=!1,this.play())};
videojs.Youtube.prototype.updateQualities=function(){var a=this.ytplayer.getAvailableQualityLevels(),b=this;if(0==a.length)this.qualityButton.style.display="none";else{for(this.qualityButton.style.display="";this.qualityMenuContent.hasChildNodes();)this.qualityMenuContent.removeChild(this.qualityMenuContent.lastChild);for(var c=0;c<a.length;++c){var e=document.createElement("li");e.setAttribute("class","vjs-menu-item");setInnerText(e,videojs.Youtube.parseQualityName(a[c]));e.setAttribute("data-val",
a[c]);a[c]==this.quality&&videojs.Youtube.addClass(e,"vjs-selected");e.addEventListener("click",function(){var a=this.getAttribute("data-val");b.ytplayer.setPlaybackQuality(a);setInnerText(b.qualityTitle,videojs.Youtube.parseQualityName(a));(a=b.qualityMenuContent.querySelector(".vjs-selected"))&&videojs.Youtube.removeClass(a,"vjs-selected");videojs.Youtube.addClass(this,"vjs-selected")});this.qualityMenuContent.appendChild(e)}}};
videojs.Youtube.prototype.onStateChange=function(a){if(a!=this.lastState){switch(a){case -1:this.player_.trigger("durationchange");break;case YT.PlayerState.ENDED:this.player_.options().ytcontrols||(this.player_el_.getElementsByClassName("vjs-poster")[0].style.display="block","undefined"!=typeof this.player_.bigPlayButton&&this.player_.bigPlayButton.show());this.player_.trigger("ended");break;case YT.PlayerState.PLAYING:"undefined"!=typeof this.player_.bigPlayButton&&this.player_.bigPlayButton.hide();
this.updateQualities();this.player_.trigger("timeupdate");this.player_.trigger("durationchange");this.player_.trigger("playing");this.player_.trigger("play");break;case YT.PlayerState.PAUSED:this.player_.trigger("pause");break;case YT.PlayerState.BUFFERING:this.player_.trigger("timeupdate"),this.player_.options().ytcontrols||this.player_.trigger("waiting")}this.lastState=a}};
videojs.Youtube.convertQualityName=function(a){switch(a){case "144p":return"tiny";case "240p":return"small";case "360p":return"medium";case "480p":return"large";case "720p":return"hd720";case "1080p":return"hd1080"}return a};videojs.Youtube.parseQualityName=function(a){switch(a){case "tiny":return"144p";case "small":return"240p";case "medium":return"360p";case "large":return"480p";case "hd720":return"720p";case "hd1080":return"1080p"}return a};
videojs.Youtube.prototype.onPlaybackQualityChange=function(a){this.quality=a;setInnerText(this.qualityTitle,videojs.Youtube.parseQualityName(a));switch(a){case "medium":this.player_.videoWidth=480;this.player_.videoHeight=360;break;case "large":this.player_.videoWidth=640;this.player_.videoHeight=480;break;case "hd720":this.player_.videoWidth=960;this.player_.videoHeight=720;break;case "hd1080":this.player_.videoWidth=1440;this.player_.videoHeight=1080;break;case "highres":this.player_.videoWidth=
1920;this.player_.videoHeight=1080;break;case "small":this.player_.videoWidth=320;this.player_.videoHeight=240;break;case "tiny":this.player_.videoWidth=144;this.player_.videoHeight=108;break;default:this.player_.videoWidth=0,this.player_.videoHeight=0}this.player_.trigger("ratechange")};videojs.Youtube.prototype.onError=function(a){this.player_.error=a;this.player_.trigger("error")};
videojs.Youtube.addClass=function(a,b){-1==(" "+a.className+" ").indexOf(" "+b+" ")&&(a.className=""===a.className?b:a.className+" "+b)};videojs.Youtube.removeClass=function(a,b){var c,e;if(-1!=a.className.indexOf(b)){c=a.className.split(" ");for(e=c.length-1;0<=e;e--)c[e]===b&&c.splice(e,1);a.className=c.join(" ")}};function setInnerText(a,b){if(void 0===a)return!1;a["innerText"in a?"innerText":"textContent"]=b}
(function(){var a=document.createElement("style");a.type="text/css";setInnerText(a,"   .vjs-youtube .vjs-poster { background-size: cover; }  .vjs-poster, .vjs-loading-spinner, .vjs-big-play-button, .vjs-text-track-display{ pointer-events: none !important; }  .iframeblocker { display:none;position:absolute;top:0;left:0;width:100%;height:100%;cursor:pointer;z-index:2; }  .vjs-youtube.vjs-user-inactive .iframeblocker { display:block; }   .vjs-quality-button > div:first-child > span:first-child { position:relative;top:7px }  ");document.getElementsByTagName("head")[0].appendChild(a)})();
