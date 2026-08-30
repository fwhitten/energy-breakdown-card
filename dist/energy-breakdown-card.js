const t="energy-breakdown-card",e="energy-breakdown-card-editor",s=["day","week","month","year"],o={day:"Day",week:"Week",month:"Month",year:"Year"},i={day:"yesterday",week:"last week",month:"last month",year:"last year"};function r(t,e,s,o){var i,r=arguments.length,n=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,s,o);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(n=(r<3?i(n):r>3?i(e,s,n):i(e,s))||n);return r>3&&n&&Object.defineProperty(e,s,n),n}"function"==typeof SuppressedError&&SuppressedError;const n=globalThis,a=n.ShadowRoot&&(void 0===n.ShadyCSS||n.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,c=Symbol(),l=new WeakMap;let h=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==c)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(a&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=l.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&l.set(e,t))}return t}toString(){return this.cssText}};const d=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new h(s,t,c)},p=a?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new h("string"==typeof t?t:t+"",void 0,c))(e)})(t):t,{is:u,defineProperty:m,getOwnPropertyDescriptor:g,getOwnPropertyNames:f,getOwnPropertySymbols:_,getPrototypeOf:v}=Object,y=globalThis,$=y.trustedTypes,b=$?$.emptyScript:"",w=y.reactiveElementPolyfillSupport,x=(t,e)=>t,A={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},E=(t,e)=>!u(t,e),S={attribute:!0,type:String,converter:A,reflect:!1,useDefault:!1,hasChanged:E};Symbol.metadata??=Symbol("metadata"),y.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=S){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),o=this.getPropertyDescriptor(t,s,e);void 0!==o&&m(this.prototype,t,o)}}static getPropertyDescriptor(t,e,s){const{get:o,set:i}=g(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const r=o?.call(this);i?.call(this,e),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??S}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const t=v(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const t=this.properties,e=[...f(t),..._(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(p(t))}else void 0!==t&&e.push(p(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(a)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of e){const e=document.createElement("style"),o=n.litNonce;void 0!==o&&e.setAttribute("nonce",o),e.textContent=s.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,s);if(void 0!==o&&!0===s.reflect){const i=(void 0!==s.converter?.toAttribute?s.converter:A).toAttribute(e,s.type);this._$Em=t,null==i?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(t,e){const s=this.constructor,o=s._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=s.getPropertyOptions(o),i="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:A;this._$Em=o;const r=i.fromAttribute(e,t.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(t,e,s,o=!1,i){if(void 0!==t){const r=this.constructor;if(!1===o&&(i=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??E)(i,e)||s.useDefault&&s.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:o,wrapped:i},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==i||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,s,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[x("elementProperties")]=new Map,k[x("finalized")]=new Map,w?.({ReactiveElement:k}),(y.reactiveElementVersions??=[]).push("2.1.2");const M=globalThis,C=t=>t,D=M.trustedTypes,T=D?D.createPolicy("lit-html",{createHTML:t=>t}):void 0,O="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,N="?"+P,U=`<${N}>`,R=document,H=()=>R.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,z=Array.isArray,F="[ \t\n\f\r]",j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,W=/>/g,B=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),V=/'/g,Y=/"/g,q=/^(?:script|style|textarea|title)$/i,J=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),G=J(1),Z=J(2),K=Symbol.for("lit-noChange"),X=Symbol.for("lit-nothing"),Q=new WeakMap,tt=R.createTreeWalker(R,129);function et(t,e){if(!z(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==T?T.createHTML(e):e}const st=(t,e)=>{const s=t.length-1,o=[];let i,r=2===e?"<svg>":3===e?"<math>":"",n=j;for(let e=0;e<s;e++){const s=t[e];let a,c,l=-1,h=0;for(;h<s.length&&(n.lastIndex=h,c=n.exec(s),null!==c);)h=n.lastIndex,n===j?"!--"===c[1]?n=L:void 0!==c[1]?n=W:void 0!==c[2]?(q.test(c[2])&&(i=RegExp("</"+c[2],"g")),n=B):void 0!==c[3]&&(n=B):n===B?">"===c[0]?(n=i??j,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?B:'"'===c[3]?Y:V):n===Y||n===V?n=B:n===L||n===W?n=j:(n=B,i=void 0);const d=n===B&&t[e+1].startsWith("/>")?" ":"";r+=n===j?s+U:l>=0?(o.push(a),s.slice(0,l)+O+s.slice(l)+P+d):s+P+(-2===l?e:d)}return[et(t,r+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class ot{constructor({strings:t,_$litType$:e},s){let o;this.parts=[];let i=0,r=0;const n=t.length-1,a=this.parts,[c,l]=st(t,e);if(this.el=ot.createElement(c,s),tt.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=tt.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(O)){const e=l[r++],s=o.getAttribute(t).split(P),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:i,name:n[2],strings:s,ctor:"."===n[1]?ct:"?"===n[1]?lt:"@"===n[1]?ht:at}),o.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:i}),o.removeAttribute(t));if(q.test(o.tagName)){const t=o.textContent.split(P),e=t.length-1;if(e>0){o.textContent=D?D.emptyScript:"";for(let s=0;s<e;s++)o.append(t[s],H()),tt.nextNode(),a.push({type:2,index:++i});o.append(t[e],H())}}}else if(8===o.nodeType)if(o.data===N)a.push({type:2,index:i});else{let t=-1;for(;-1!==(t=o.data.indexOf(P,t+1));)a.push({type:7,index:i}),t+=P.length-1}i++}}static createElement(t,e){const s=R.createElement("template");return s.innerHTML=t,s}}function it(t,e,s=t,o){if(e===K)return e;let i=void 0!==o?s._$Co?.[o]:s._$Cl;const r=I(e)?void 0:e._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),void 0===r?i=void 0:(i=new r(t),i._$AT(t,s,o)),void 0!==o?(s._$Co??=[])[o]=i:s._$Cl=i),void 0!==i&&(e=it(t,i._$AS(t,e.values),i,o)),e}class rt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,o=(t?.creationScope??R).importNode(e,!0);tt.currentNode=o;let i=tt.nextNode(),r=0,n=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new nt(i,i.nextSibling,this,t):1===a.type?e=new a.ctor(i,a.name,a.strings,this,t):6===a.type&&(e=new dt(i,this,t)),this._$AV.push(e),a=s[++n]}r!==a?.index&&(i=tt.nextNode(),r++)}return tt.currentNode=R,o}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class nt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,o){this.type=2,this._$AH=X,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=it(this,t,e),I(t)?t===X||null==t||""===t?(this._$AH!==X&&this._$AR(),this._$AH=X):t!==this._$AH&&t!==K&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>z(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==X&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=ot.createElement(et(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new rt(o,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=Q.get(t.strings);return void 0===e&&Q.set(t.strings,e=new ot(t)),e}k(t){z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,o=0;for(const i of t)o===e.length?e.push(s=new nt(this.O(H()),this.O(H()),this,this.options)):s=e[o],s._$AI(i),o++;o<e.length&&(this._$AR(s&&s._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=C(t).nextSibling;C(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class at{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,o,i){this.type=1,this._$AH=X,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=i,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=X}_$AI(t,e=this,s,o){const i=this.strings;let r=!1;if(void 0===i)t=it(this,t,e,0),r=!I(t)||t!==this._$AH&&t!==K,r&&(this._$AH=t);else{const o=t;let n,a;for(t=i[0],n=0;n<i.length-1;n++)a=it(this,o[s+n],e,n),a===K&&(a=this._$AH[n]),r||=!I(a)||a!==this._$AH[n],a===X?t=X:t!==X&&(t+=(a??"")+i[n+1]),this._$AH[n]=a}r&&!o&&this.j(t)}j(t){t===X?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ct extends at{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===X?void 0:t}}class lt extends at{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==X)}}class ht extends at{constructor(t,e,s,o,i){super(t,e,s,o,i),this.type=5}_$AI(t,e=this){if((t=it(this,t,e,0)??X)===K)return;const s=this._$AH,o=t===X&&s!==X||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,i=t!==X&&(s===X||o);o&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class dt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){it(this,t)}}const pt=M.litHtmlPolyfillSupport;pt?.(ot,nt),(M.litHtmlVersions??=[]).push("3.3.3");const ut=globalThis;class mt extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const o=s?.renderBefore??e;let i=o._$litPart$;if(void 0===i){const t=s?.renderBefore??null;o._$litPart$=i=new nt(e.insertBefore(H(),t),t,void 0,s??{})}return i._$AI(t),i})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}mt._$litElement$=!0,mt.finalized=!0,ut.litElementHydrateSupport?.({LitElement:mt});const gt=ut.litElementPolyfillSupport;gt?.({LitElement:mt}),(ut.litElementVersions??=[]).push("4.2.2");const ft=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},_t={attribute:!0,type:String,converter:A,reflect:!1,hasChanged:E},vt=(t=_t,e,s)=>{const{kind:o,metadata:i}=s;let r=globalThis.litPropertyMetadata.get(i);if(void 0===r&&globalThis.litPropertyMetadata.set(i,r=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),r.set(s.name,t),"accessor"===o){const{name:o}=s;return{set(s){const i=e.get.call(this);e.set.call(this,s),this.requestUpdate(o,i,t,!0,s)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=s;return function(s){const i=this[o];e.call(this,s),this.requestUpdate(o,i,t,!0,s)}}throw Error("Unsupported decorator location: "+o)};function yt(t){return(e,s)=>"object"==typeof s?vt(t,e,s):((t,e,s)=>{const o=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),o?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function $t(t){return yt({...t,state:!0,attribute:!1})}function bt(t,e,s=1){const o=new Date(t.getTime());switch(o.setHours(0,0,0,0),e){case"day":return o;case"week":{const t=(o.getDay()-s+7)%7;return o.setDate(o.getDate()-t),o}case"month":return o.setDate(1),o;case"year":return o.setMonth(0,1),o}}function wt(t,e){const s=new Date(t.getTime());switch(e){case"day":s.setDate(s.getDate()+1);break;case"week":s.setDate(s.getDate()+7);break;case"month":s.setMonth(s.getMonth()+1);break;case"year":s.setFullYear(s.getFullYear()+1)}return s}function xt(t,e){const s=new Date(t.getTime());switch(e){case"day":return s.setDate(s.getDate()-1),s;case"week":return s.setDate(s.getDate()-7),s;case"month":{const t=s.getDate();s.setDate(1),s.setMonth(s.getMonth()-1);const e=new Date(s.getFullYear(),s.getMonth()+1,0).getDate();return s.setDate(Math.min(t,e)),s}case"year":{const t=s.getDate();s.setDate(1),s.setFullYear(s.getFullYear()-1);const e=new Date(s.getFullYear(),s.getMonth()+1,0).getDate();return s.setDate(Math.min(t,e)),s}}}function At(t,e,s){const o=bt(t,e,s);return{start:o,end:wt(o,e)}}function Et(t,e,s){const o=wt(e,s);return t.getTime()>o.getTime()?o:t.getTime()<e.getTime()?e:t}const St=["S","M","T","W","T","F","S"],kt=["J","F","M","A","M","J","J","A","S","O","N","D"];function Mt(t,e=1){if(0===t)return"0";if(Math.abs(t)>=1e3){const e=t/1e3;return Math.round(10*e)/10+"k"}const s=e>=10?0:e>=1?Number.isInteger(e)?0:1:Math.min(4,Math.ceil(-Math.log10(e))+1);return t.toFixed(s)}const Ct=38,Dt=6,Tt=Ct,Ot=Dt,Pt=10,Nt=22;function Ut(t,e){const{width:s,height:o}=e,i=Math.max(1,s-Tt-Ot),r=Math.max(1,o-Pt-Nt),n=Pt+r,a=t.buckets.length,c=function(t,e=4){if(!Number.isFinite(t)||t<=0)return e;const s=t/e,o=Math.pow(10,Math.floor(Math.log10(s))),i=s/o;return(i<=1?1:i<=2?2:i<=2.5?2.5:i<=5?5:10)*o*e}(Math.max(...t.totals,0)),l=i/Math.max(1,a),h=Math.max(2,.62*l),d=e.rounded?Math.min(h/2,4):0,p=function(t){return t<=8?1:t<=14?2:t<=24?3:Math.ceil(t/8)}(a),u=t=>n-t/c*r,m=[];for(let t=0;t<=4;t++){const s=c/4,o=s*t,r=u(o);m.push(Z`
      <line class="grid" x1=${Tt} x2=${Tt+i} y1=${r} y2=${r} />
      <text class="tick" x=${Tt-8} y=${r+4} text-anchor="end">
        ${0===t?e.unit:Mt(o,s)}
      </text>
    `)}const g=t.buckets.map((s,o)=>{const i=Tt+l*o+l/2-h/2,a=t.totals[o],p=u(a),m=Math.max(0,n-p),g=`clip-${o}`,f=null!==e.activeIndex&&e.activeIndex!==o;let _=n;const v=t.series.map(t=>{const e=t.values[o]/c*r,s=_-e;return _=s,e<=0?Z``:Z`<rect x=${i} y=${s} width=${h} height=${e} fill=${t.color} />`}),y=_-p;return Z`
      <g class=${f?"bar dimmed":"bar"}>
        <defs>
          <clipPath id=${g}>
            <rect x=${i} y=${p} width=${h} height=${m+d} rx=${d} ry=${d} />
          </clipPath>
        </defs>
        <g clip-path=${`url(#${g})`}>
          ${m>0?Z`<rect x=${i} y=${p} width=${h} height=${m} fill="var(--ebc-empty-bar)" />`:Z``}
          ${v}
          ${y>.5?Z`<rect x=${i} y=${p} width=${h} height=${y} fill="var(--ebc-empty-bar)" />`:Z``}
        </g>
        <rect
          class="hit"
          x=${Tt+l*o}
          y=${Pt}
          width=${l}
          height=${r}
          @pointerenter=${()=>e.onHover(o)}
          @pointerleave=${()=>e.onHover(null)}
          @click=${()=>e.onSelect(o)}
        />
      </g>
    `}),f=t.buckets.map((t,e)=>{if(e%p!==0)return Z``;return Z`<text class="xlabel" x=${Tt+l*e+l/2} y=${o-6} text-anchor="middle">${t.label}</text>`});return Z`
    <svg
      viewBox=${`0 0 ${s} ${o}`}
      width=${s}
      height=${o}
      role="img"
      aria-label="Energy consumption by period"
    >
      ${m}
      ${g}
      ${f}
    </svg>
  `}function Rt(t,e){const s=Math.abs(t)>=1e3?1:2;return new Intl.NumberFormat(e||void 0,{minimumFractionDigits:s,maximumFractionDigits:s}).format(t)}const Ht=["--energy-grid-consumption-color","--accent-color","--primary-color","--label-badge-blue"];function It(t,e){const s=t.getPropertyValue(e).trim();return s.startsWith("var(")?"":s}function zt(t){const e=t.trim().toLowerCase();if(!e)return null;let s,o,i;const r=e.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);if(r){const t=r[1];3===t.length?(s=parseInt(t[0]+t[0],16),o=parseInt(t[1]+t[1],16),i=parseInt(t[2]+t[2],16)):(s=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16))}else{const t=e.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/);if(!t)return null;s=Number(t[1]),o=Number(t[2]),i=Number(t[3])}return[s,o,i].every(t=>Number.isFinite(t))?function(t,e,s){const o=Math.max(t,e,s),i=Math.min(t,e,s),r=(o+i)/2,n=o-i;if(0===n)return{h:0,s:0,l:r};const a=r>.5?n/(2-o-i):n/(o+i);let c;c=o===t?60*((e-s)/n+(e<s?6:0)):o===e?60*((s-t)/n+2):60*((t-e)/n+4);return{h:c,s:a,l:r}}(s/255,o/255,i/255):null}function Ft({h:t,s:e,l:s}){const o=(t%360+360)%360,i=(1-Math.abs(2*s-1))*e,r=i*(1-Math.abs(o/60%2-1)),n=s-i/2,[a,c,l]=o<60?[i,r,0]:o<120?[r,i,0]:o<180?[0,i,r]:o<240?[0,r,i]:o<300?[r,0,i]:[i,0,r],h=t=>Math.round(255*(t+n)).toString(16).padStart(2,"0");return`#${h(a)}${h(c)}${h(l)}`}const jt=(t,e,s)=>Math.min(s,Math.max(e,t));function Lt(t,e){const s=[];for(let o=1;o<=Math.max(e,1);o++){const e=It(t,`--graph-color-${o}`);if(!e)break;s.push(e)}const o=Ht.map(e=>zt(It(t,e))).find(t=>null!==t)??zt("#488fc2"),i=[];for(let t=0;t<e;t++)s.length?i.push(s[t%s.length]):i.push(Ft({h:o.h+137.508*t,s:jt(o.s*(t%2==1?.82:1),.32,.92),l:jt(o.l+.09*(t%3-1),.34,.74)}));return{series:i,other:null!==zt(It(t,"--graph-color-other"))?It(t,"--graph-color-other"):Ft({h:o.h,s:.08,l:jt(o.l,.42,.62)})}}function Wt(t,e){try{return Lt(getComputedStyle(t),e)}catch{return Lt({getPropertyValue:()=>""},e)}}async function Bt(t){return t.callWS({type:"energy/get_prefs"})}async function Vt(t,e,s,o,i){return e.length?t.callWS({type:"recorder/statistics_during_period",start_time:s.toISOString(),end_time:o.toISOString(),statistic_ids:e,period:i,types:["change"]}):{}}function Yt(t){return(t.device_consumption??[]).filter(t=>!t.included_in_stat)}function qt(t){const e={gridFrom:[],gridTo:[],solarFrom:[],batteryFrom:[],batteryTo:[]};for(const s of t.energy_sources??[])if("grid"===s.type){for(const t of s.flow_from??[])t.stat_energy_from&&e.gridFrom.push(t.stat_energy_from);for(const t of s.flow_to??[])t.stat_energy_to&&e.gridTo.push(t.stat_energy_to)}else"solar"===s.type?s.stat_energy_from&&e.solarFrom.push(s.stat_energy_from):"battery"===s.type&&(s.stat_energy_from&&e.batteryFrom.push(s.stat_energy_from),s.stat_energy_to&&e.batteryTo.push(s.stat_energy_to));return e}function Jt(t){return"number"==typeof t?t:new Date(t).getTime()}function Gt(t){const e=t.change;return"number"==typeof e&&Number.isFinite(e)?e:0}function Zt(t,e,s){const o=new Array(s.length).fill(0);if(!s.length)return o;for(const i of e)for(const e of t[i]??[]){const t=Kt(s,Jt(e.start));t>=0&&(o[t]+=Gt(e))}return o}function Kt(t,e){let s=0,o=t.length-1;for(;s<=o;){const i=s+o>>1,r=t[i];if(e<r.start.getTime())o=i-1;else{if(!(e>=r.end.getTime()))return i;s=i+1}}return-1}function Xt(t,e,s,o){const i=s.getTime(),r=o.getTime();let n=0;for(const s of e)for(const e of t[s]??[]){const t=Jt(e.start),s=void 0!==e.end?Jt(e.end):t;if(s<=i||t>=r)continue;const o=Gt(e),a=s-t;if(a<=0){n+=o;continue}const c=Math.min(s,r)-Math.max(t,i);n+=o*Math.min(1,Math.max(0,c/a))}return n}function Qt(t,e,s,o,i,r){if("devices"===s)return Xt(t,r,o,i);const n=Xt(t,e.gridFrom,o,i);return"grid"===s?n:Math.max(0,n-Xt(t,e.gridTo,o,i)+Xt(t,e.solarFrom,o,i)+Xt(t,e.batteryFrom,o,i)-Xt(t,e.batteryTo,o,i))}function te({prefs:t,stats:e,buckets:s,config:o,palette:i}){const r=new Map((o.devices??[]).map(t=>[t.stat,t])),n=o.total_mode??"grid",a=Yt(t).filter(t=>!r.get(t.stat_consumption)?.hidden);let c=a.map((t,o)=>{const n=r.get(t.stat_consumption),a=Zt(e,[t.stat_consumption],s);return{key:t.stat_consumption,name:n?.name||t.name||t.stat_consumption,color:n?.color||i.series[o%i.series.length],values:a,total:a.reduce((t,e)=>t+e,0)}});c.sort((t,e)=>e.total-t.total);const l=o.max_devices??8;let h=new Array(s.length).fill(0);if(l>0&&c.length>l){const t=c.slice(l);c=c.slice(0,l),h=s.map((e,s)=>t.reduce((t,e)=>t+e.values[s],0))}const d=s.map((t,e)=>c.reduce((t,s)=>t+s.values[e],0)+h[e]),p=function(t,e,s,o,i){if("devices"===s)return i.slice();const r=Zt(t,e.gridFrom,o);if("grid"===s)return r;const n=Zt(t,e.gridTo,o),a=Zt(t,e.solarFrom,o),c=Zt(t,e.batteryFrom,o),l=Zt(t,e.batteryTo,o);return r.map((t,e)=>Math.max(0,t-n[e]+a[e]+c[e]-l[e]))}(e,qt(t),n,s,d),u=!1!==o.show_other&&"devices"!==n;if(u||h.some(t=>t>0)){const t=p.map((t,e)=>Math.max(0,(u?t-d[e]:0)+h[e])),e=t.reduce((t,e)=>t+e,0);e>0&&c.push({key:"__other__",name:o.other_name||"Other",color:o.other_color||i.other,values:t,total:e})}const m=s.map((t,e)=>c.reduce((t,s)=>t+s.values[e],0));return{buckets:s,series:c,totals:m.map((t,e)=>Math.max(t,p[e]))}}let ee=class extends mt{constructor(){super(...arguments),this._period="week",this._total=0,this._comparison=null,this._loading=!0,this._width=0,this._hover=null,this._fetchToken=0}static async getConfigElement(){return await Promise.resolve().then(function(){return ce}),document.createElement(e)}static getStubConfig(){return{type:`custom:${t}`,icon:"mdi:lightning-bolt",periods:["day","week","month","year"],default_period:"week",show_comparison:!0,show_legend:!0}}setConfig(t){if(!t)throw new Error("Invalid configuration");const e=(t.periods?.length?t.periods:s).filter(t=>s.includes(t));if(!e.length)throw new Error("At least one time period must be enabled");this._config={...t,periods:e};const o=t.default_period&&e.includes(t.default_period)?t.default_period:e[0];this._period=o,this._loading=!0,this._load()}getCardSize(){return 6}getGridOptions(){return{rows:6,columns:12,min_rows:4,min_columns:6}}getLayoutOptions(){return{grid_rows:6,grid_columns:12,grid_min_rows:4,grid_min_columns:6}}connectedCallback(){super.connectedCallback(),this._resizeObserver=new ResizeObserver(t=>{for(const e of t)this._width=Math.floor(e.contentRect.width)}),this._timer=window.setInterval(()=>{this._load()},3e5)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),this._resizeObserver=void 0,this._timer&&window.clearInterval(this._timer),this._timer=void 0}firstUpdated(){const t=this.renderRoot.querySelector(".chart");t&&this._resizeObserver&&this._resizeObserver.observe(t)}updated(t){if(!t.has("hass")||!this.hass)return;const e=t.get("hass");e&&e.themes===this.hass.themes||this._load()}get _firstDayOfWeek(){return function(t,e){if("monday"===t)return 1;if("sunday"===t)return 0;try{const t=new Intl.Locale(e||navigator.language||"en-GB"),s="function"==typeof t.getWeekInfo?t.getWeekInfo():t.weekInfo;if(7===s?.firstDay)return 0;if(1===s?.firstDay)return 1}catch{}return 1}(this._config?.first_day_of_week,this.hass?.locale?.language??this.hass?.language)}async _load(){const t=this.hass,e=this._config;if(!t||!e)return;const s=++this._fetchToken;try{const o=await Bt(t),i=e.total_mode??"grid",r=this._period,n=this._firstDayOfWeek,a=new Date,c=function(t,e,s){const{start:o,end:i}=At(t,e,s),r=[];if("day"===e){for(let t=0;t<24;t++){const e=new Date(o.getTime());e.setHours(t,0,0,0);const s=new Date(e.getTime());s.setHours(t+1,0,0,0),r.push({start:e,end:s,label:String(t).padStart(2,"0")})}return r}if("week"===e){for(let t=0;t<7;t++){const e=new Date(o.getTime());e.setDate(o.getDate()+t);const s=new Date(e.getTime());s.setDate(e.getDate()+1),r.push({start:e,end:s,label:St[e.getDay()]})}return r}if("month"===e){let t=new Date(o.getTime());for(;t.getTime()<i.getTime();){const e=7-(t.getDay()-s+7)%7,o=new Date(t.getTime());o.setDate(t.getDate()+e);const n=o.getTime()>i.getTime()?new Date(i.getTime()):o;r.push({start:new Date(t.getTime()),end:n,label:String(t.getDate())}),t=n}return r}for(let t=0;t<12;t++){const e=new Date(o.getFullYear(),t,1,0,0,0,0),s=new Date(o.getFullYear(),t+1,1,0,0,0,0);r.push({start:e,end:s,label:kt[t]})}return r}(a,r,n),{start:l,end:h}=At(a,r,n),d=function(t){switch(t){case"day":return"hour";case"week":case"month":return"day";case"year":return"month"}}(r),p=Yt(o),u=p.map(t=>t.stat_consumption),m=qt(o),g=function(t,e){return"devices"===e?[]:"home"===e?[...t.gridFrom,...t.gridTo,...t.solarFrom,...t.batteryFrom,...t.batteryTo]:t.gridFrom}(m,i);if(!u.length&&!g.length)throw new Error("No energy sources or devices are configured in the Energy dashboard.");const f=Array.from(new Set([...u,...g])),_=await Vt(t,f,l,h,d);if(s!==this._fetchToken)return;const v=te({prefs:o,stats:_,buckets:c,config:e,palette:Wt(this,p.length)}),y=Qt(_,m,i,l,a,u);let $=null;if(!1!==e.show_comparison&&($=await this._loadComparison(t,{now:a,period:r,fdow:n,mode:i,sources:m,deviceIds:u,totalIds:g,statsPeriod:d,current:y}),s!==this._fetchToken))return;this._data=v,this._total=y,this._comparison=$,this._error=void 0,this._loading=!1}catch(t){if(s!==this._fetchToken)return;this._error=t instanceof Error?t.message:String(t),this._loading=!1}}async _loadComparison(t,e){const s=this._config.comparison_mode??"like_for_like",o=function(t,e,s,o){const i=xt(bt(t,e,o),e);return"like_for_like"===s?{start:i,end:Et(xt(t,e),i,e)}:{start:i,end:wt(i,e)}}(e.now,e.period,s,e.fdow),i=bt(o.start,e.period,e.fdow),r=wt(i,e.period),n="devices"===e.mode?e.deviceIds:e.totalIds;if(!n.length)return null;const a=Qt(await Vt(t,n,i,r,e.statsPeriod),e.sources,e.mode,o.start,o.end,e.deviceIds);if(a<=0)return null;return(("projected"===s?e.current/function(t,e,s){const{start:o,end:i}=At(t,e,s),r=i.getTime()-o.getTime();if(r<=0)return 1;const n=(t.getTime()-o.getTime())/r;return Math.min(1,Math.max(1e-6,n))}(e.now,e.period,e.fdow):e.current)-a)/a*100}_cyclePeriod(){const t=this._config?.periods??s,e=t.indexOf(this._period);this._period=t[(e+1)%t.length],this._hover=null,this._loading=!0,this._load()}_comparisonText(){const t=this._config?.comparison_mode??"like_for_like",e=i[this._period];return"projected"===t?`projected vs ${e}`:`vs ${e}`}render(){const t=this._config;return t?G`
      <ha-card>
        <div class="root">
          <div class="header">
            <div class="summary">
              ${t.icon?G`<ha-icon class="icon" .icon=${t.icon}></ha-icon>`:X}
              <div class="figures">
                <div class="value">
                  <span class="number">${Rt(this._total,this.hass?.locale?.language)}</span>
                  <span class="unit">kWh</span>
                </div>
                ${this._renderComparison()}
              </div>
            </div>
            <button
              class="period"
              @click=${this._cyclePeriod}
              aria-label=${`Time period: ${o[this._period]}. Click to change.`}
            >
              ${o[this._period]}
            </button>
          </div>
          ${this._renderBody()}
          ${!1!==t.show_legend?this._renderLegend():X}
        </div>
      </ha-card>
    `:X}_renderComparison(){if(!1===this._config?.show_comparison)return X;if(null===this._comparison)return X;const t=this._comparison>0?"up":this._comparison<0?"down":"flat";return G`
      <div class="comparison ${t}">
        <span class="delta">${function(t){const e=Math.round(t);return`${e>0?"+":""}${e}%`}(this._comparison)}</span>
        <span class="against">${this._comparisonText()}</span>
      </div>
    `}_renderBody(){if(this._error)return G`<div class="chart error"><div class="message">${this._error}</div></div>`;const t=this._config?.chart_height??200,e=this._data;return G`
      <div class="chart" style=${`height:${t}px`}>
        ${e&&this._width>0?Ut(e,{width:this._width,height:t,rounded:!1!==this._config?.rounded_bars,unit:"kWh",activeIndex:this._hover,onHover:t=>{this._hover=t},onSelect:t=>{this._hover=this._hover===t?null:t}}):G`<div class="message">${this._loading?"Loading…":""}</div>`}
        ${this._renderTooltip()}
      </div>
    `}_renderTooltip(){const t=this._data,e=this._hover;if(!t||null===e||!this._width)return X;const s=t.buckets[e];if(!s)return X;const o=Math.max(1,this._width-Ct-Dt)/Math.max(1,t.buckets.length),i=Ct+o*e+o/2,r=Math.min(Math.max(i,90),Math.max(90,this._width-90)),n=t.series.filter(t=>t.values[e]>0);return G`
      <div class="tooltip" style=${`left:${r}px`}>
        <div class="tt-head">
          <span>${this._tooltipTitle(s.start)}</span>
          <span class="tt-total">${Rt(t.totals[e])} kWh</span>
        </div>
        ${n.length?n.map(t=>G`
                <div class="tt-row">
                  <span class="swatch" style=${`background:${t.color}`}></span>
                  <span class="tt-name">${t.name}</span>
                  <span class="tt-value">${Rt(t.values[e])}</span>
                </div>
              `):G`<div class="tt-row tt-empty">No consumption</div>`}
      </div>
    `}_tooltipTitle(t){const e=this.hass?.locale?.language;switch(this._period){case"day":return t.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"});case"week":return t.toLocaleDateString(e,{weekday:"long"});case"month":return t.toLocaleDateString(e,{day:"numeric",month:"short"});case"year":return t.toLocaleDateString(e,{month:"long"})}}_renderLegend(){const t=this._data;return t&&t.series.length?G`
      <div class="legend">
        ${t.series.map(t=>G`
            <div class="legend-item">
              <span class="swatch" style=${`background:${t.color}`}></span>
              <span class="legend-name">${t.name}</span>
              <span class="legend-value">${Rt(t.total)}</span>
            </div>
          `)}
      </div>
    `:X}};ee.styles=d`
    :host {
      --ebc-accent: var(--energy-grid-consumption-color, var(--primary-color));
      --ebc-empty-bar: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
      --ebc-grid: color-mix(in srgb, var(--secondary-text-color) 45%, transparent);
    }
    ha-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .root {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px;
      height: 100%;
      box-sizing: border-box;
    }
    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }
    .summary {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      min-width: 0;
    }
    .icon {
      --mdc-icon-size: 32px;
      color: var(--ebc-accent);
      flex: 0 0 auto;
      margin-top: 2px;
    }
    .figures {
      min-width: 0;
    }
    .value {
      display: flex;
      align-items: baseline;
      gap: 6px;
      line-height: 1.05;
    }
    .number {
      font-size: 2.1em;
      font-weight: 700;
      color: var(--primary-text-color);
    }
    .unit {
      font-size: 1em;
      font-weight: 600;
      color: var(--secondary-text-color);
    }
    .comparison {
      display: flex;
      align-items: baseline;
      gap: 5px;
      font-size: 0.85em;
      margin-top: 3px;
    }
    .comparison .delta {
      font-weight: 700;
    }
    .comparison.up .delta {
      color: var(--error-color, #db4437);
    }
    .comparison.down .delta {
      color: var(--success-color, #43a047);
    }
    .comparison.flat .delta {
      /* No change is not news: keep it the same weight as the text beside it. */
      color: var(--secondary-text-color);
    }
    .comparison .against {
      color: var(--secondary-text-color);
    }
    button.period {
      flex: 0 0 auto;
      border: none;
      cursor: pointer;
      border-radius: 999px;
      padding: 7px 16px;
      font-size: 0.95em;
      font-weight: 700;
      font-family: inherit;
      color: var(--text-primary-color, #fff);
      background: var(--ebc-accent);
    }
    button.period:hover {
      filter: brightness(1.1);
    }
    button.period:focus-visible {
      outline: 2px solid var(--primary-text-color);
      outline-offset: 2px;
    }
    .chart {
      position: relative;
      flex: 1 1 auto;
      min-height: 120px;
      width: 100%;
    }
    .chart svg {
      display: block;
    }
    .message {
      color: var(--secondary-text-color);
      font-size: 0.9em;
      padding: 8px 0;
    }
    .error .message {
      color: var(--error-color, #db4437);
    }
    .grid {
      stroke: var(--ebc-grid);
      stroke-width: 1;
      stroke-dasharray: 3 7;
    }
    .tick,
    .xlabel {
      fill: var(--secondary-text-color);
      font-size: 12px;
      font-family: inherit;
    }
    .bar {
      transition: opacity 120ms ease-in-out;
    }
    .bar.dimmed {
      opacity: 0.45;
    }
    .hit {
      fill: transparent;
      cursor: pointer;
    }
    .tooltip {
      position: absolute;
      top: 0;
      transform: translateX(-50%);
      z-index: 2;
      pointer-events: none;
      min-width: 170px;
      max-width: 100%;
      box-sizing: border-box;
      padding: 8px 10px;
      border-radius: 10px;
      background: var(--ha-card-background, var(--card-background-color));
      border: 1px solid var(--divider-color);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
      font-size: 0.8em;
    }
    .tt-head {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .tt-row {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .tt-name {
      flex: 1 1 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--secondary-text-color);
    }
    .tt-value {
      font-variant-numeric: tabular-nums;
    }
    .tt-empty {
      color: var(--secondary-text-color);
    }
    .swatch {
      width: 9px;
      height: 9px;
      border-radius: 2px;
      flex: 0 0 auto;
    }
    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 14px;
      font-size: 0.8em;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .legend-name {
      color: var(--secondary-text-color);
    }
    .legend-value {
      font-variant-numeric: tabular-nums;
      color: var(--primary-text-color);
    }
  `,r([yt({attribute:!1})],ee.prototype,"hass",void 0),r([$t()],ee.prototype,"_config",void 0),r([$t()],ee.prototype,"_period",void 0),r([$t()],ee.prototype,"_data",void 0),r([$t()],ee.prototype,"_total",void 0),r([$t()],ee.prototype,"_comparison",void 0),r([$t()],ee.prototype,"_error",void 0),r([$t()],ee.prototype,"_loading",void 0),r([$t()],ee.prototype,"_width",void 0),r([$t()],ee.prototype,"_hover",void 0),ee=r([ft(t)],ee);const se=window;se.customCards=se.customCards||[],se.customCards.push({type:t,name:"Energy Breakdown Card",description:"Stacked per-device energy consumption from the Energy dashboard, with day/week/month/year drill-down.",preview:!0,documentationURL:"https://github.com/fwhitten/energy-breakdown-card"}),console.info("%c ENERGY-BREAKDOWN-CARD %c 1.1.0 ","color: white; background: #7c4dff; font-weight: 700;","color: #7c4dff; background: white; font-weight: 700;");const oe={icon:"Icon",default_period:"Default time period",periods:"Selectable time periods",total_mode:"Consumption figure",comparison_mode:"Comparison baseline",show_comparison:"Show comparison to previous period",show_legend:"Show legend",show_other:'Show "Other" remainder',other_name:'"Other" label',max_devices:"Maximum devices shown",chart_height:"Chart height (px)",rounded_bars:"Rounded bars",first_day_of_week:"First day of week"},ie=[{name:"icon",selector:{icon:{}}},{name:"periods",selector:{select:{multiple:!0,mode:"list",options:s.map(t=>({value:t,label:o[t]}))}}},{type:"grid",name:"",schema:[{name:"default_period",selector:{select:{mode:"dropdown",options:s.map(t=>({value:t,label:o[t]}))}}},{name:"total_mode",selector:{select:{mode:"dropdown",options:[{value:"grid",label:"Grid import"},{value:"home",label:"Home consumption (grid + solar + battery)"},{value:"devices",label:"Sum of devices"}]}}}]},{name:"show_comparison",selector:{boolean:{}}},{name:"comparison_mode",selector:{select:{mode:"dropdown",options:[{value:"like_for_like",label:"Same elapsed time in previous period"},{value:"full_previous",label:"Whole previous period"},{value:"projected",label:"Projected period vs whole previous period"}]}}},{name:"show_other",selector:{boolean:{}}},{type:"grid",name:"",schema:[{name:"show_legend",selector:{boolean:{}}},{name:"rounded_bars",selector:{boolean:{}}}]},{type:"grid",name:"",schema:[{name:"first_day_of_week",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Follow language"},{value:"monday",label:"Monday"},{value:"sunday",label:"Sunday"}]}}}]},{type:"grid",name:"",schema:[{name:"max_devices",selector:{number:{min:1,max:20,mode:"box"}}},{name:"chart_height",selector:{number:{min:100,max:500,step:10,mode:"box"}}}]}];let re=class extends mt{constructor(){super(...arguments),this._devices=[]}setConfig(t){this._config=t,this._loadDevices()}async _loadDevices(){if(this.hass&&!this._devices.length)try{const t=await Bt(this.hass);this._devices=Yt(t),this._devicesError=void 0}catch(t){this._devicesError="Could not read the Energy dashboard configuration. Set it up under Settings → Dashboards → Energy."}}updated(){this._loadDevices()}get _data(){const t=this._config;return{show_comparison:!0,show_legend:!0,show_other:!0,rounded_bars:!0,comparison_mode:"like_for_like",total_mode:"grid",first_day_of_week:"auto",max_devices:8,chart_height:200,periods:s,...t}}_emit(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_valueChanged(t){t.stopPropagation();const e={...t.detail.value};e.periods?.length&&e.default_period&&!e.periods.includes(e.default_period)&&(e.default_period=e.periods[0]),this._emit(e)}_updateDevice(t,e){const s=this._data,o=[...s.devices??[]],i=o.findIndex(e=>e.stat===t),r={...i>=0?o[i]:{stat:t},...e},n=!r.name&&!r.color&&!r.hidden;i>=0?n?o.splice(i,1):o[i]=r:n||o.push(r);const a={...s};o.length?a.devices=o:delete a.devices,this._emit(a)}_updateConfig(t){const e={...this._data,...t};for(const s of Object.keys(t))void 0===e[s]&&delete e[s];this._emit(e)}_override(t){return(this._config?.devices??[]).find(e=>e.stat===t)}render(){return this._config&&this.hass?G`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${ie}
          .computeLabel=${t=>oe[t.name]??t.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
        ${this._renderDevices()}
      </div>
    `:X}_renderDevices(){const t=Wt(this,this._devices.length);return G`
      <div class="devices">
        <h4>Devices</h4>
        ${this._devicesError?G`<div class="warning">${this._devicesError}</div>`:0===this._devices.length?G`<div class="hint">
                No individual devices are configured in the Energy dashboard yet.
              </div>`:G`<div class="hint">
                  Rename, recolour or hide any device from the Energy dashboard. Leave a name blank to
                  use the Energy dashboard's own name.
                </div>
                ${this._devices.map((e,s)=>this._renderDevice(e,s,t.series))}`}
        ${!1!==this._data.show_other?this._renderOtherRow():X}
      </div>
    `}_renderOtherRow(){const t=this._data;return G`
      <div class="device">
        <input
          class="color"
          type="color"
          .value=${t.other_color||Wt(this,this._devices.length).other}
          title="Colour"
          @change=${t=>this._updateConfig({other_color:t.target.value})}
        />
        <ha-textfield
          class="name"
          .value=${t.other_name??""}
          placeholder="Other"
          @change=${t=>this._updateConfig({other_name:t.target.value||void 0})}
        ></ha-textfield>
        <span class="spacer"></span>
      </div>
    `}_renderDevice(t,e,s){const o=t.stat_consumption,i=this._override(o),r=i?.color||s[e%s.length];return G`
      <div class="device ${i?.hidden?"hidden":""}">
        <input
          class="color"
          type="color"
          .value=${r}
          title="Colour"
          @change=${t=>this._updateDevice(o,{color:t.target.value})}
        />
        <ha-textfield
          class="name"
          .value=${i?.name??""}
          .placeholder=${t.name||o}
          @change=${t=>this._updateDevice(o,{name:t.target.value||void 0})}
        ></ha-textfield>
        <ha-icon-button
          .path=${i?.hidden?ae:ne}
          .label=${i?.hidden?"Show device":"Hide device"}
          @click=${()=>this._updateDevice(o,{hidden:!i?.hidden||void 0})}
        ></ha-icon-button>
      </div>
    `}};re.styles=d`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    h4 {
      margin: 4px 0 0;
    }
    .hint,
    .warning {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin-bottom: 4px;
    }
    .warning {
      color: var(--error-color, #db4437);
    }
    .device {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .device.hidden .name {
      opacity: 0.5;
    }
    .name {
      flex: 1 1 auto;
    }
    .spacer {
      inline-size: 48px;
      flex: 0 0 auto;
    }
    input.color {
      inline-size: 34px;
      block-size: 34px;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
      flex: 0 0 auto;
    }
  `,r([$t()],re.prototype,"_config",void 0),r([$t()],re.prototype,"_devices",void 0),r([$t()],re.prototype,"_devicesError",void 0),re=r([ft(e)],re);const ne="M12 9a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z",ae="M11.83 9 15 12.16V12a3 3 0 0 0-3-3h-.17m-4.3.8 1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28.46.46A11.8 11.8 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7Z";var ce=Object.freeze({__proto__:null,get EnergyBreakdownCardEditor(){return re}});
