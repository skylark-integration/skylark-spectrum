/**
 * skylark-widgets-colorpicker - The skylark color picker widget
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-widgets-colorpicker/
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-langx/langx","skylark-domx-browser","skylark-domx-noder","skylark-domx-eventer","skylark-domx-finder","skylark-domx-query","skylark-data-color/colors","skylark-data-color/Color","skylark-widgets-base/Widget"],function(e,t,o,a,s,l,i,r,n,c){"use strict";var d=t.noop,p={beforeShow:d,move:d,change:d,show:d,hide:d,color:!1,flat:!1,showInput:!1,allowEmpty:!1,showButtons:!0,clickoutFiresChange:!0,showInitial:!1,showPalette:!1,showPaletteOnly:!1,hideAfterPaletteSelect:!1,togglePaletteOnly:!1,showSelectionPalette:!0,localStorageKey:!1,appendTo:"body",maxSelectionSize:7,cancelText:"cancel",chooseText:"choose",togglePaletteMoreText:"more",togglePaletteLessText:"less",clearText:"Clear Color Selection",noColorSelectedText:"No Color Selected",preferredFormat:!1,className:"",containerClassName:"",replacerClassName:"",showAlpha:!1,theme:"sp-light",palette:[["#ffffff","#000000","#ff0000","#ff8000","#ffff00","#008000","#0000ff","#4b0082","#9400d3"]],selectionPalette:[],disabled:!1,offset:null},h=[],f=["<div class='sp-replacer'>","<div class='sp-preview'><div class='sp-preview-inner'></div></div>","<div class='sp-dd'>&#9660;</div>","</div>"].join(""),g=function(){var e="";if(o.isIE)for(var t=1;t<=6;t++)e+="<div class='sp-"+t+"'></div>";return["<div class='sp-container sp-hidden'>","<div class='sp-palette-container'>","<div class='sp-palette sp-thumb sp-cf'></div>","<div class='sp-palette-button-container sp-cf'>","<button type='button' class='sp-palette-toggle'></button>","</div>","</div>","<div class='sp-picker-container'>","<div class='sp-top sp-cf'>","<div class='sp-fill'></div>","<div class='sp-top-inner'>","<div class='sp-color'>","<div class='sp-sat'>","<div class='sp-val'>","<div class='sp-dragger'></div>","</div>","</div>","</div>","<div class='sp-clear sp-clear-display'>","</div>","<div class='sp-hue'>","<div class='sp-slider'></div>",e,"</div>","</div>","<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>","</div>","<div class='sp-input-container sp-cf'>","<input class='sp-input' type='text' spellcheck='false'  />","</div>","<div class='sp-initial sp-thumb sp-cf'></div>","<div class='sp-button-container sp-cf'>","<a class='sp-cancel' href='#'></a>","<button type='button' class='sp-choose'></button>","</div>","</div>","</div>"].join("")}();function u(e,t,o,a){for(var s=[],l=0;l<e.length;l++){var c=e[l];if(c){var d=r.Color(c),p=d.toHsl().l<.5?"sp-thumb-el sp-thumb-dark":"sp-thumb-el sp-thumb-light";p+=n.equals(t,c)?" sp-thumb-active":"";var h=d.toString(a.preferredFormat||"rgb"),f="background-color:"+d.toRgbString();s.push('<span title="'+h+'" data-color="'+d.toRgbString()+'" class="'+p+'"><span class="sp-thumb-inner" style="'+f+';" /></span>')}else{s.push(i("<div />").append(i('<span data-color="" style="background-color:transparent;" class="sp-clear-display"></span>').attr("title",a.noColorSelectedText)).html())}}return"<div class='sp-cf "+o+"'>"+s.join("")+"</div>"}var v=t.Evented.inherit({klassName:"ColorPicker",init:function(e,a){var l=function(e,o){var a=t.mixin({},p,e);return a.callbacks={move:m(a.move,o),change:m(a.change,o),show:m(a.show,o),hide:m(a.hide,o),beforeShow:m(a.beforeShow,o)},a}(a,e),c=l.flat,d=l.showSelectionPalette,v=l.localStorageKey,k=l.theme,b=l.callbacks,C=t.debounce(qe,10),y=!1,P=!1,x=0,S=0,T=0,M=0,F=0,A=0,I=0,O=0,E=0,R=0,D=1,N=[],z=[],H={},j=l.selectionPalette.slice(0),q=l.maxSelectionSize,K="sp-dragging",L=null,W=e.ownerDocument,B=(W.body,i(e)),V=!1,G=i(g,W).addClass(k),J=G.find(".sp-picker-container"),Q=G.find(".sp-color"),U=G.find(".sp-dragger"),X=G.find(".sp-hue"),Y=G.find(".sp-slider"),Z=G.find(".sp-alpha-inner"),$=G.find(".sp-alpha"),_=G.find(".sp-alpha-handle"),ee=G.find(".sp-input"),te=G.find(".sp-palette"),oe=G.find(".sp-initial"),ae=G.find(".sp-cancel"),se=G.find(".sp-clear"),le=G.find(".sp-choose"),ie=G.find(".sp-palette-toggle"),re=B.is("input"),ne=re&&"color"===B.attr("type")&&inputTypeColorSupport(),ce=re&&!c,de=ce?i(f).addClass(k).addClass(l.className).addClass(l.replacerClassName):i([]),pe=ce?de:B,he=de.find(".sp-preview-inner"),fe=l.color||re&&B.val(),ge=!1,ue=l.preferredFormat,ve=!l.showButtons||l.clickoutFiresChange,we=!fe,me=l.allowEmpty&&!ne;function ke(){if(l.showPaletteOnly&&(l.showPalette=!0),ie.text(l.showPaletteOnly?l.togglePaletteMoreText:l.togglePaletteLessText),l.palette){N=l.palette.slice(0),z=t.isArray(N[0])?N:[N],H={};for(var e=0;e<z.length;e++)for(var o=0;o<z[e].length;o++){var a=n(z[e][o]).toRgbString();H[a]=!0}}G.toggleClass("sp-flat",c),G.toggleClass("sp-input-disabled",!l.showInput),G.toggleClass("sp-alpha-enabled",l.showAlpha),G.toggleClass("sp-clear-enabled",me),G.toggleClass("sp-buttons-disabled",!l.showButtons),G.toggleClass("sp-palette-buttons-disabled",!l.togglePaletteOnly),G.toggleClass("sp-palette-disabled",!l.showPalette),G.toggleClass("sp-palette-only",l.showPaletteOnly),G.toggleClass("sp-initial-disabled",!l.showInitial),G.addClass(l.className).addClass(l.containerClassName),qe()}function be(){if(v&&window.localStorage){try{var e=window.localStorage[v].split(",#");e.length>1&&(delete window.localStorage[v],t.each(e,function(e,t){Ce(t)}))}catch(e){}try{j=window.localStorage[v].split(";")}catch(e){}}}function Ce(e){if(d){var o=n(e).toRgbString();if(!H[o]&&-1===t.inArray(o,j))for(j.push(o);j.length>q;)j.shift();if(v&&window.localStorage)try{window.localStorage[v]=j.join(";")}catch(e){}}}function ye(){var e=De(),o=t.map(z,function(t,o){return u(t,e,"sp-palette-row sp-palette-row-"+o,l)});be(),j&&o.push(u(function(){var e=[];if(l.showPalette)for(var t=0;t<j.length;t++){var o=n(j[t]).toRgbString();H[o]||e.push(j[t])}return e.reverse().slice(0,l.maxSelectionSize)}(),e,"sp-palette-row sp-palette-row-selection",l)),te.html(o.join(""))}function Pe(){if(l.showInitial){var e=ge,t=De();oe.html(u([e,t],t,"sp-palette-row-initial",l))}}function xe(){(S<=0||x<=0||M<=0)&&qe(),P=!0,G.addClass(K),L=null,B.trigger("dragstart.ColorPicker",[De()])}function Se(){P=!1,G.removeClass(K),B.trigger("dragstop.ColorPicker",[De()])}function Te(){var e=ee.val();if(null!==e&&""!==e||!me){var t=n(e);t.isValid()?(Re(t),Ne(),je()):ee.addClass("sp-validation-error")}else Re(null),Ne(),je()}function Me(){y?Oe():Fe()}function Fe(){var e=s.create("beforeShow.ColorPicker");y?qe():(B.trigger(e,[De()]),!1===b.beforeShow(De())||e.isDefaultPrevented()||(!function(){for(var e=0;e<h.length;e++)h[e]&&h[e].hide()}(),y=!0,i(W).on("keydown.ColorPicker",Ae),i(W).on("click.ColorPicker",Ie),i(window).on("resize.ColorPicker",C),de.addClass("sp-active"),G.removeClass("sp-hidden"),qe(),ze(),ge=De(),Pe(),b.show(ge),B.trigger("show.ColorPicker",[ge])))}function Ae(e){27===e.keyCode&&Oe()}function Ie(e){2!=e.button&&(P||(ve?je(!0):Ee(),Oe()))}function Oe(){y&&!c&&(y=!1,i(W).off("keydown.ColorPicker",Ae),i(W).off("click.ColorPicker",Ie),i(window).off("resize.ColorPicker",C),de.removeClass("sp-active"),G.addClass("sp-hidden"),b.hide(De()),B.trigger("hide.ColorPicker",[De()]))}function Ee(){Re(ge,!0),je(!0)}function Re(e,t){var o,a;n.equals(e,De())?ze():(!e&&me?we=!0:(we=!1,a=(o=r.Color(e)).toHsv(),O=a.h%360/360,E=a.s,R=a.v,D=a.a),ze(),o&&o.isValid()&&!t&&(ue=l.preferredFormat||o.getFormat()))}function De(e){return e=e||{},me&&we?null:n.fromRatio({h:O,s:E,v:R,a:Math.round(1e3*D)/1e3},{format:e.format||ue})}function Ne(){ze(),b.move(De()),B.trigger("move.ColorPicker",[De()])}function ze(){ee.removeClass("sp-validation-error"),He();var e=n.fromRatio({h:O,s:1,v:1});Q.css("background-color",e.toHexString());var t=ue;D<1&&(0!==D||"name"!==t)&&("hex"!==t&&"hex3"!==t&&"hex6"!==t&&"name"!==t||(t="rgb"));var a=De({format:t}),s="";if(he.removeClass("sp-clear-display"),he.css("background-color","transparent"),!a&&me)he.addClass("sp-clear-display");else{var i=a.toHexString(),r=a.toRgbString();if(he.css("background-color",r),l.showAlpha){var c=a.toRgb();c.a=0;var d=n(c).toRgbString(),p="linear-gradient(left, "+d+", "+i+")";o.isIE?Z.css("filter",n(d).toFilter({gradientType:1},i)):(Z.css("background","-webkit-"+p),Z.css("background","-moz-"+p),Z.css("background","-ms-"+p),Z.css("background","linear-gradient(to right, "+d+", "+i+")"))}s=a.toString(t)}l.showInput&&ee.val(s),l.showPalette&&ye(),Pe()}function He(){var e=E,t=R;if(me&&we)_.hide(),Y.hide(),U.hide();else{_.show(),Y.show(),U.show();var o=e*x,a=S-t*S;o=Math.max(-T,Math.min(x-T,o-T)),a=Math.max(-T,Math.min(S-T,a-T)),U.css({top:a+"px",left:o+"px"});var s=D*F;_.css({left:s-A/2+"px"});var l=O*M;Y.css({top:l-I+"px"})}}function je(e){var t=De(),o="",a=!n.equals(t,ge);t&&(o=t.toString(ue),Ce(t)),re&&B.val(o),e&&a&&(b.change(t),B.trigger("change",[t]))}function qe(){var e,t,o,a,s,r,n,d,p,h,f,g;y&&(x=Q.width(),S=Q.height(),T=U.height(),X.width(),M=X.height(),I=Y.height(),F=$.width(),A=_.width(),c||(G.css("position","absolute"),l.offset?G.offset(l.offset):G.offset((t=pe,o=(e=G).outerWidth(),a=e.outerHeight(),s=t.outerHeight(),r=e[0].ownerDocument,n=r.documentElement,d=n.clientWidth+i(r).scrollLeft(),p=n.clientHeight+i(r).scrollTop(),h=t.offset(),f=h.left,g=h.top,g+=s,f-=Math.min(f,f+o>d&&d>o?Math.abs(f+o-d):0),{top:g-=Math.min(g,g+a>p&&p>a?Math.abs(a+s-0):0),bottom:h.bottom,left:f,right:h.right,width:h.width,height:h.height}))),He(),l.showPalette&&ye(),B.trigger("reflow.ColorPicker"))}function Ke(){Oe(),V=!0,B.attr("disabled",!0),pe.addClass("sp-disabled")}!function(){if(o.isIE&&G.find("*:not(input)").attr("unselectable","on"),ke(),ce&&B.after(de).hide(),me||se.hide(),c)B.after(G).hide();else{var e="parent"===l.appendTo?B.parent():i(l.appendTo);1!==e.length&&(e=i("body")),e.append(G)}function t(e){return e.data&&e.data.ignore?(Re(i(e.target).closest(".sp-thumb-el").data("color")),Ne()):(Re(i(e.target).closest(".sp-thumb-el").data("color")),Ne(),l.hideAfterPaletteSelect?(je(!0),Oe()):je()),!1}be(),pe.on("click.ColorPicker touchstart.ColorPicker",function(e){V||Me(),e.stopPropagation(),i(e.target).is("input")||e.preventDefault()}),(B.is(":disabled")||!0===l.disabled)&&Ke(),G.click(w),ee.change(Te),ee.on("paste",function(){setTimeout(Te,1)}),ee.keydown(function(e){13==e.keyCode&&Te()}),ae.text(l.cancelText),ae.on("click.ColorPicker",function(e){e.stopPropagation(),e.preventDefault(),Ee(),Oe()}),se.attr("title",l.clearText),se.on("click.ColorPicker",function(e){e.stopPropagation(),e.preventDefault(),we=!0,Ne(),c&&je(!0)}),le.text(l.chooseText),le.on("click.ColorPicker",function(e){e.stopPropagation(),e.preventDefault(),o.isIE&&ee.is(":focus")&&ee.trigger("change"),ee.hasClass("sp-validation-error")||(je(!0),Oe())}),ie.text(l.showPaletteOnly?l.togglePaletteMoreText:l.togglePaletteLessText),ie.on("click.spectrum",function(e){e.stopPropagation(),e.preventDefault(),l.showPaletteOnly=!l.showPaletteOnly,l.showPaletteOnly||c||G.css("left","-="+(J.outerWidth(!0)+5)),ke()}),draggable($,function(e,t,o){D=e/F,we=!1,o.shiftKey&&(D=Math.round(10*D)/10),Ne()},xe,Se),draggable(X,function(e,t){O=parseFloat(t/M),we=!1,l.showAlpha||(D=1),Ne()},xe,Se),draggable(Q,function(e,t,o){if(o.shiftKey){if(!L){var a=E*x,s=S-R*S,i=Math.abs(e-a)>Math.abs(t-s);L=i?"x":"y"}}else L=null;var r=!L||"y"===L;(!L||"x"===L)&&(E=parseFloat(e/x)),r&&(R=parseFloat((S-t)/S)),we=!1,l.showAlpha||(D=1),Ne()},xe,Se),fe?(Re(fe),ze(),ue=l.preferredFormat||n(fe).format,Ce(fe)):ze(),c&&Fe();var a=o.isIE?"mousedown.ColorPicker":"click.ColorPicker touchstart.ColorPicker";te.on(a,".sp-thumb-el",t),oe.on(a,".sp-thumb-el:nth-child(1)",{ignore:!0},t)}();var Le={show:Fe,hide:Oe,toggle:Me,reflow:qe,option:function(e,o){return void 0===e?t.mixin({},l):void 0===o?l[e]:(l[e]=o,"preferredFormat"===e&&(ue=l.preferredFormat),void ke())},enable:function(){V=!1,B.attr("disabled",!1),pe.removeClass("sp-disabled")},disable:Ke,offset:function(e){l.offset=e,qe()},set:function(e){Re(e),je()},get:De,destroy:function(){B.show(),pe.off("click.ColorPicker touchstart.ColorPicker"),G.remove(),de.remove(),h[Le.id]=null},container:G};return Le.id=h.push(Le)-1,Le}});function w(e){e.stopPropagation()}function m(e,t){var o=Array.prototype.slice,a=o.call(arguments,2);return function(){return e.apply(t,a.concat(o.call(arguments)))}}var k="ColorPicker.id";return v.load=!0,v.loadOpts={},v.draggable=draggable,v.defaults=p,v.localization={},v.palettes={},i.fn.colorPicker=function(e,o){if("string"==typeof e){var a=this,s=Array.prototype.slice.call(arguments,1);return this.each(function(){var t=h[i(this).data(k)];if(t){var o=t[e];if(!o)throw new Error("skylark-ui-colorpicker: no such method: '"+e+"'");"get"==e?a=t.get():"container"==e?a=t.container:"option"==e?a=t.option.apply(t,s):"destroy"==e?(t.destroy(),i(this).removeData(k)):o.apply(t,s)}}),a}return this.colorPicker("destroy").each(function(){var o=t.mixin({},i(this).data(),e),a=v(this,o);i(this).data(k,a.id)})},e.attach("widgets.ColorPicker",v)});
//# sourceMappingURL=sourcemaps/ColorPicker.js.map
