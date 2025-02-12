var gptScript = document.createElement("script");
gptScript.src = "//securepubads.g.doubleclick.net/tag/js/gpt.js";
gptScript.async = true;
document.head.appendChild(gptScript);

console.log("GPT.js e Banner.js foram carregados com sucesso!");



googletag.cmd.push(function(){
    var slot = "", pos = "", total = "", id = "", cls = document.getElementsByClassName("banneradtec");
    for(var i = 0; i < cls.length; i++){
      pos = cls[i].getAttribute("data-position");
      if(pos !== null && cls[i].id == ""){
        if(window.googletag.site.formats[pos] !== undefined){
          total = window.googletag.site.formats[pos].total;
          if(total !== undefined){
            window.googletag.site.formats[pos].total = total = total + 1;
          }
          else{
            window.googletag.site.formats[pos]["total"] = total = 1;
          }
          id = window.googletag.site.formats[pos].prefix+"_"+total;
          cls[i].id = id;
          slot = "";
          if (document.getElementById(id) !== null) {
            slot = googletag.defineSlot(window.googletag.site.account + window.googletag.site.section + "/" + id, window.googletag.site.formats[pos].sizes, id);
            slot.setTargeting('pos', id).addService(googletag.pubads());
            window.googletag.site.slots.push(id);
            
          }
        }
      }
    }

    if (window.googletag.site.slots.length > 0) {
      /*REFRESH*/
      googletag.pubads().addEventListener('impressionViewable', function(event) {
        var slot = event.slot;
        setTimeout(function() {
          googletag.pubads().refresh([slot]);
        }, 20000);
      });
      
        googletag.pubads().addEventListener("slotRenderEnded", function(event) {
            var slot = event.slot;
            var id = slot.getSlotElementId();
            if (id.indexOf("anchor") == -1) {
              var divbanner = document.querySelector("#"+id);
              value = divbanner.dataset.position;
              divbanner.style.height = event.size[1] + 'px';
              if ((value == "H1")||(value == "HT")){
                divbanner.style.width = event.size[0] + 'px';
                divbanner.style.marginLeft = 'auto';
                divbanner.style.marginRight = 'auto';
                divbanner.style.paddingLeft = 0;
                divbanner.style.paddingRight = 0;
          }  }
      }); 
/*
      googletag.pubads().setTargeting('editoria', window.googletag.site.removeAllCharacter(["{{pagePostTerms.category}}"]));
      console.log("Setando editoria: "+window.googletag.site.removeAllCharacter(["{{pagePostTerms.category}}"]));
      googletag.pubads().setTargeting('autor', window.googletag.site.removeAllCharacter(["{{pagePostTerms.author}}"]));
      console.log("Setando autor: "+window.googletag.site.removeAllCharacter(["{{pagePostTerms.author}}"]));
      googletag.pubads().setTargeting('postid', window.googletag.site.removeAllCharacter(["{{postID}}"]));
      console.log("Setando postid: "+window.googletag.site.removeAllCharacter(["{{postID}}"]));      
      googletag.pubads().setTargeting('tags', window.googletag.site.removeAllCharacter(["{{pagePostTerms.post_tag}}"]));
      console.log("Setando tags: "+window.googletag.site.removeAllCharacter(["{{pagePostTerms.post_tag}}"]));
      googletag.pubads().setPublisherProvidedId('{{visitorEmailHash}}'); */
      googletag.pubads().setCentering(true);
      //googletag.pubads().enableSingleRequest();
          /*Lazy Load*/
      googletag.pubads().enableLazyLoad({
        fetchMarginPercent: 200,
        renderMarginPercent: 100,
        mobileScaling: 2.0
      });
     /* 
    (function(w) {
        try {
            var name, col, persona = JSON.parse(window.localStorage.getItem("nvgpersona90304"));
            for (col in persona) {
                name = "nvg_" + col;
                name = name.substring(0, 10);
                if (typeof(googletag) == "object")
                    googletag.pubads().setTargeting(name, persona[col]);
                if (typeof(GA_googleAddAttr) == "function")
                    GA_googleAddAttr(name, persona[col]);
            }
        } catch (e) {}
    })(window)
      */
      !googletag.pubadsReady && googletag.enableServices();
      for (var j = 0; j < window.googletag.site.slots.length; j++) {
        googletag.display(window.googletag.site.slots[j]);
      }
    } /* Google Tag */
    
    /*
    var slotAnchor = googletag.defineOutOfPageSlot(window.googletag.site.account + window.googletag.site.section + "/anchor", googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR);
    if(slotAnchor){
      slotAnchor.addService(googletag.pubads());
      googletag.pubads().refresh([slotAnchor]);
    } 
var slotAnchorL = googletag.defineOutOfPageSlot(window.googletag.site.account + window.googletag.site.section + "/anchorL", googletag.enums.OutOfPageFormat.OUT_OF_PAGE_FORMAT_SIDE_RAILS_LEFT);
if(slotAnchorL){
  slotAnchorL.addService(googletag.pubads());
  googletag.pubads().refresh([slotAnchorL]);
} 

var slotAnchorR = googletag.defineOutOfPageSlot(window.googletag.site.account + window.googletag.site.section + "/anchorR", googletag.enums.OutOfPageFormat.OUT_OF_PAGE_FORMAT_SIDE_RAILS_RIGT);
if(slotAnchorR){
  slotAnchorR.addService(googletag.pubads());
  googletag.pubads().refresh([slotAnchorR]);
} */
   
  
  }); 