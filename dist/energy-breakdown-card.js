const t="energy-breakdown-card",e="energy-breakdown-card-editor",s=["day","week","month","year"],o={day:"Day",week:"Week",month:"Month",year:"Year"},r={day:"yesterday",week:"last week",month:"last month",year:"last year"};function i(t,e,s,o){var r,i=arguments.length,n=i<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,s,o);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(i<3?r(n):i>3?r(e,s,n):r(e,s))||n);return i>3&&n&&Object.defineProperty(e,s,n),n}"function"==typeof SuppressedError&&SuppressedError;const n=globalThis,a=n.ShadowRoot&&(void 0===n.ShadyCSS||n.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,c=Symbol(),l=new WeakMap;let h=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==c)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(a&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=l.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&l.set(e,t))}return t}toString(){return this.cssText}};const d=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new h(s,t,c)},u=a?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new h("string"==typeof t?t:t+"",void 0,c))(e)})(t):t,{is:p,defineProperty:m,getOwnPropertyDescriptor:g,getOwnPropertyNames:f,getOwnPropertySymbols:_,getPrototypeOf:v}=Object,y=globalThis,$=y.trustedTypes,b=$?$.emptyScript:"",w=y.reactiveElementPolyfillSupport,x=(t,e)=>t,A={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},S=(t,e)=>!p(t,e),E={attribute:!0,type:String,converter:A,reflect:!1,useDefault:!1,hasChanged:S};Symbol.metadata??=Symbol("metadata"),y.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=E){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),o=this.getPropertyDescriptor(t,s,e);void 0!==o&&m(this.prototype,t,o)}}static getPropertyDescriptor(t,e,s){const{get:o,set:r}=g(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const i=o?.call(this);r?.call(this,e),this.requestUpdate(t,i,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??E}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const t=v(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const t=this.properties,e=[...f(t),..._(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(u(t))}else void 0!==t&&e.push(u(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(a)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of e){const e=document.createElement("style"),o=n.litNonce;void 0!==o&&e.setAttribute("nonce",o),e.textContent=s.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,s);if(void 0!==o&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:A).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,o=s._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=s.getPropertyOptions(o),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:A;this._$Em=o;const i=r.fromAttribute(e,t.type);this[o]=i??this._$Ej?.get(o)??i,this._$Em=null}}requestUpdate(t,e,s,o=!1,r){if(void 0!==t){const i=this.constructor;if(!1===o&&(r=this[t]),s??=i.getPropertyOptions(t),!((s.hasChanged??S)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:o,wrapped:r},i){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,i??e??this[t]),!0!==r||void 0!==i)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,s,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[x("elementProperties")]=new Map,k[x("finalized")]=new Map,w?.({ReactiveElement:k}),(y.reactiveElementVersions??=[]).push("2.1.2");const M=globalThis,D=t=>t,C=M.trustedTypes,T=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,O="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,N="?"+P,U=`<${N}>`,H=document,I=()=>H.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,z=Array.isArray,F="[ \t\n\f\r]",j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,W=/>/g,B=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),V=/'/g,Y=/"/g,q=/^(?:script|style|textarea|title)$/i,J=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),G=J(1),Z=J(2),K=Symbol.for("lit-noChange"),X=Symbol.for("lit-nothing"),Q=new WeakMap,tt=H.createTreeWalker(H,129);function et(t,e){if(!z(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==T?T.createHTML(e):e}const st=(t,e)=>{const s=t.length-1,o=[];let r,i=2===e?"<svg>":3===e?"<math>":"",n=j;for(let e=0;e<s;e++){const s=t[e];let a,c,l=-1,h=0;for(;h<s.length&&(n.lastIndex=h,c=n.exec(s),null!==c);)h=n.lastIndex,n===j?"!--"===c[1]?n=L:void 0!==c[1]?n=W:void 0!==c[2]?(q.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=B):void 0!==c[3]&&(n=B):n===B?">"===c[0]?(n=r??j,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?B:'"'===c[3]?Y:V):n===Y||n===V?n=B:n===L||n===W?n=j:(n=B,r=void 0);const d=n===B&&t[e+1].startsWith("/>")?" ":"";i+=n===j?s+U:l>=0?(o.push(a),s.slice(0,l)+O+s.slice(l)+P+d):s+P+(-2===l?e:d)}return[et(t,i+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class ot{constructor({strings:t,_$litType$:e},s){let o;this.parts=[];let r=0,i=0;const n=t.length-1,a=this.parts,[c,l]=st(t,e);if(this.el=ot.createElement(c,s),tt.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=tt.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(O)){const e=l[i++],s=o.getAttribute(t).split(P),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:s,ctor:"."===n[1]?ct:"?"===n[1]?lt:"@"===n[1]?ht:at}),o.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:r}),o.removeAttribute(t));if(q.test(o.tagName)){const t=o.textContent.split(P),e=t.length-1;if(e>0){o.textContent=C?C.emptyScript:"";for(let s=0;s<e;s++)o.append(t[s],I()),tt.nextNode(),a.push({type:2,index:++r});o.append(t[e],I())}}}else if(8===o.nodeType)if(o.data===N)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=o.data.indexOf(P,t+1));)a.push({type:7,index:r}),t+=P.length-1}r++}}static createElement(t,e){const s=H.createElement("template");return s.innerHTML=t,s}}function rt(t,e,s=t,o){if(e===K)return e;let r=void 0!==o?s._$Co?.[o]:s._$Cl;const i=R(e)?void 0:e._$litDirective$;return r?.constructor!==i&&(r?._$AO?.(!1),void 0===i?r=void 0:(r=new i(t),r._$AT(t,s,o)),void 0!==o?(s._$Co??=[])[o]=r:s._$Cl=r),void 0!==r&&(e=rt(t,r._$AS(t,e.values),r,o)),e}class it{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,o=(t?.creationScope??H).importNode(e,!0);tt.currentNode=o;let r=tt.nextNode(),i=0,n=0,a=s[0];for(;void 0!==a;){if(i===a.index){let e;2===a.type?e=new nt(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new dt(r,this,t)),this._$AV.push(e),a=s[++n]}i!==a?.index&&(r=tt.nextNode(),i++)}return tt.currentNode=H,o}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class nt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,o){this.type=2,this._$AH=X,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=rt(this,t,e),R(t)?t===X||null==t||""===t?(this._$AH!==X&&this._$AR(),this._$AH=X):t!==this._$AH&&t!==K&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>z(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==X&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(H.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=ot.createElement(et(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new it(o,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=Q.get(t.strings);return void 0===e&&Q.set(t.strings,e=new ot(t)),e}k(t){z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,o=0;for(const r of t)o===e.length?e.push(s=new nt(this.O(I()),this.O(I()),this,this.options)):s=e[o],s._$AI(r),o++;o<e.length&&(this._$AR(s&&s._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=D(t).nextSibling;D(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class at{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,o,r){this.type=1,this._$AH=X,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=X}_$AI(t,e=this,s,o){const r=this.strings;let i=!1;if(void 0===r)t=rt(this,t,e,0),i=!R(t)||t!==this._$AH&&t!==K,i&&(this._$AH=t);else{const o=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=rt(this,o[s+n],e,n),a===K&&(a=this._$AH[n]),i||=!R(a)||a!==this._$AH[n],a===X?t=X:t!==X&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}i&&!o&&this.j(t)}j(t){t===X?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ct extends at{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===X?void 0:t}}class lt extends at{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==X)}}class ht extends at{constructor(t,e,s,o,r){super(t,e,s,o,r),this.type=5}_$AI(t,e=this){if((t=rt(this,t,e,0)??X)===K)return;const s=this._$AH,o=t===X&&s!==X||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==X&&(s===X||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class dt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){rt(this,t)}}const ut=M.litHtmlPolyfillSupport;ut?.(ot,nt),(M.litHtmlVersions??=[]).push("3.3.3");const pt=globalThis;class mt extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const o=s?.renderBefore??e;let r=o._$litPart$;if(void 0===r){const t=s?.renderBefore??null;o._$litPart$=r=new nt(e.insertBefore(I(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}mt._$litElement$=!0,mt.finalized=!0,pt.litElementHydrateSupport?.({LitElement:mt});const gt=pt.litElementPolyfillSupport;gt?.({LitElement:mt}),(pt.litElementVersions??=[]).push("4.2.2");const ft=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},_t={attribute:!0,type:String,converter:A,reflect:!1,hasChanged:S},vt=(t=_t,e,s)=>{const{kind:o,metadata:r}=s;let i=globalThis.litPropertyMetadata.get(r);if(void 0===i&&globalThis.litPropertyMetadata.set(r,i=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),i.set(s.name,t),"accessor"===o){const{name:o}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(o,r,t,!0,s)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=s;return function(s){const r=this[o];e.call(this,s),this.requestUpdate(o,r,t,!0,s)}}throw Error("Unsupported decorator location: "+o)};function yt(t){return(e,s)=>"object"==typeof s?vt(t,e,s):((t,e,s)=>{const o=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),o?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function $t(t){return yt({...t,state:!0,attribute:!1})}function bt(t,e,s=1){const o=new Date(t.getTime());switch(o.setHours(0,0,0,0),e){case"day":return o;case"week":{const t=(o.getDay()-s+7)%7;return o.setDate(o.getDate()-t),o}case"month":return o.setDate(1),o;case"year":return o.setMonth(0,1),o}}function wt(t,e){const s=new Date(t.getTime());switch(e){case"day":s.setDate(s.getDate()+1);break;case"week":s.setDate(s.getDate()+7);break;case"month":s.setMonth(s.getMonth()+1);break;case"year":s.setFullYear(s.getFullYear()+1)}return s}function xt(t,e){const s=new Date(t.getTime());switch(e){case"day":return s.setDate(s.getDate()-1),s;case"week":return s.setDate(s.getDate()-7),s;case"month":{const t=s.getDate();s.setDate(1),s.setMonth(s.getMonth()-1);const e=new Date(s.getFullYear(),s.getMonth()+1,0).getDate();return s.setDate(Math.min(t,e)),s}case"year":{const t=s.getDate();s.setDate(1),s.setFullYear(s.getFullYear()-1);const e=new Date(s.getFullYear(),s.getMonth()+1,0).getDate();return s.setDate(Math.min(t,e)),s}}}function At(t,e,s){const o=bt(t,e,s);return{start:o,end:wt(o,e)}}function St(t,e,s){const o=wt(e,s);return t.getTime()>o.getTime()?o:t.getTime()<e.getTime()?e:t}const Et=["S","M","T","W","T","F","S"],kt=["J","F","M","A","M","J","J","A","S","O","N","D"];function Mt(t,e=1){if(0===t)return"0";if(Math.abs(t)>=1e3){const e=t/1e3;return Math.round(10*e)/10+"k"}const s=e>=10?0:e>=1?Number.isInteger(e)?0:1:Math.min(4,Math.ceil(-Math.log10(e))+1);return t.toFixed(s)}const Dt=38,Ct=6,Tt=Dt,Ot=Ct,Pt=10,Nt=22;function Ut(t,e){const{width:s,height:o}=e,r=Math.max(1,s-Tt-Ot),i=Math.max(1,o-Pt-Nt),n=Pt+i,a=t.buckets.length,c=i<110?2:4,l=function(t,e=4){if(!Number.isFinite(t)||t<=0)return e;const s=t/e,o=Math.pow(10,Math.floor(Math.log10(s))),r=s/o;return(r<=1?1:r<=2?2:r<=2.5?2.5:r<=5?5:10)*o*e}(Math.max(...t.totals,0),c),h=r/Math.max(1,a),d=Math.max(2,.62*h),u=e.rounded?Math.min(d/2,4):0,p=function(t){return t<=8?1:t<=14?2:t<=24?3:Math.ceil(t/8)}(a),m=t=>n-t/l*i,g=[];for(let t=0;t<=c;t++){const s=l/c,o=s*t,i=m(o);g.push(Z`
      <line class="grid" x1=${Tt} x2=${Tt+r} y1=${i} y2=${i} />
      <text class="tick" x=${Tt-8} y=${i+4} text-anchor="end">
        ${0===t?e.unit:Mt(o,s)}
      </text>
    `)}const f=t.buckets.map((s,o)=>{const r=Tt+h*o+h/2-d/2,a=t.totals[o],c=m(a),p=Math.max(0,n-c),g=`clip-${o}`,f=null!==e.activeIndex&&e.activeIndex!==o;let _=n;const v=t.series.map(t=>{const e=t.values[o]/l*i,s=_-e;return _=s,e<=0?Z``:Z`<rect x=${r} y=${s} width=${d} height=${e} fill=${t.color} />`}),y=_-c;return Z`
      <g class=${f?"bar dimmed":"bar"}>
        <defs>
          <clipPath id=${g}>
            <rect x=${r} y=${c} width=${d} height=${p+u} rx=${u} ry=${u} />
          </clipPath>
        </defs>
        <g clip-path=${`url(#${g})`}>
          ${p>0?Z`<rect x=${r} y=${c} width=${d} height=${p} fill="var(--ebc-empty-bar)" />`:Z``}
          ${v}
          ${y>.5?Z`<rect x=${r} y=${c} width=${d} height=${y} fill="var(--ebc-empty-bar)" />`:Z``}
        </g>
        <rect
          class="hit"
          x=${Tt+h*o}
          y=${Pt}
          width=${h}
          height=${i}
          @pointerenter=${()=>e.onHover(o)}
          @pointerleave=${()=>e.onHover(null)}
          @click=${()=>e.onSelect(o)}
        />
      </g>
    `}),_=t.buckets.map((t,e)=>{if(e%p!==0)return Z``;return Z`<text class="xlabel" x=${Tt+h*e+h/2} y=${o-6} text-anchor="middle">${t.label}</text>`});return Z`
    <svg
      viewBox=${`0 0 ${s} ${o}`}
      width=${s}
      height=${o}
      role="img"
      aria-label="Energy consumption by period"
    >
      ${g}
      ${f}
      ${_}
    </svg>
  `}function Ht(t,e){const s=Math.abs(t)>=1e3?1:2;return new Intl.NumberFormat(e||void 0,{minimumFractionDigits:s,maximumFractionDigits:s}).format(t)}const It=["--energy-grid-consumption-color","--accent-color","--primary-color","--label-badge-blue"];function Rt(t,e){const s=t.getPropertyValue(e).trim();return s.startsWith("var(")?"":s}function zt(t){const e=t.trim().toLowerCase();if(!e)return null;let s,o,r;const i=e.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);if(i){const t=i[1];3===t.length?(s=parseInt(t[0]+t[0],16),o=parseInt(t[1]+t[1],16),r=parseInt(t[2]+t[2],16)):(s=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),r=parseInt(t.slice(4,6),16))}else{const t=e.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/);if(!t)return null;s=Number(t[1]),o=Number(t[2]),r=Number(t[3])}return[s,o,r].every(t=>Number.isFinite(t))?function(t,e,s){const o=Math.max(t,e,s),r=Math.min(t,e,s),i=(o+r)/2,n=o-r;if(0===n)return{h:0,s:0,l:i};const a=i>.5?n/(2-o-r):n/(o+r);let c;c=o===t?60*((e-s)/n+(e<s?6:0)):o===e?60*((s-t)/n+2):60*((t-e)/n+4);return{h:c,s:a,l:i}}(s/255,o/255,r/255):null}function Ft({h:t,s:e,l:s}){const o=(t%360+360)%360,r=(1-Math.abs(2*s-1))*e,i=r*(1-Math.abs(o/60%2-1)),n=s-r/2,[a,c,l]=o<60?[r,i,0]:o<120?[i,r,0]:o<180?[0,r,i]:o<240?[0,i,r]:o<300?[i,0,r]:[r,0,i],h=t=>Math.round(255*(t+n)).toString(16).padStart(2,"0");return`#${h(a)}${h(c)}${h(l)}`}const jt=(t,e,s)=>Math.min(s,Math.max(e,t));function Lt(t,e){const s=[];for(let o=1;o<=Math.max(e,1);o++){const e=Rt(t,`--graph-color-${o}`);if(!e)break;s.push(e)}const o=It.map(e=>zt(Rt(t,e))).find(t=>null!==t)??zt("#488fc2"),r=[];for(let t=0;t<e;t++)s.length?r.push(s[t%s.length]):r.push(Ft({h:o.h+137.508*t,s:jt(o.s*(t%2==1?.82:1),.32,.92),l:jt(o.l+.09*(t%3-1),.34,.74)}));return{series:r,other:null!==zt(Rt(t,"--graph-color-other"))?Rt(t,"--graph-color-other"):Ft({h:o.h,s:.08,l:jt(o.l,.42,.62)})}}function Wt(t,e){try{return Lt(getComputedStyle(t),e)}catch{return Lt({getPropertyValue:()=>""},e)}}async function Bt(t){return t.callWS({type:"energy/get_prefs"})}function Vt(t,e){const s=new Date(t.getTime());switch(e){case"hour":return s.setHours(s.getHours()-1),s;case"day":return s.setDate(s.getDate()-1),s;case"week":return s.setDate(s.getDate()-7),s;case"month":return s.setMonth(s.getMonth()-1),s}}async function Yt(t,e,s,o,r){if(!e.length)return{};return function(t){const e={};for(const[s,o]of Object.entries(t)){if(!o?.length){e[s]=o??[];continue}const t=o.some(t=>"number"==typeof t.change&&Number.isFinite(t.change));if(t){e[s]=o;continue}let r=null;e[s]=o.map(t=>{const e="number"==typeof t.sum&&Number.isFinite(t.sum)?t.sum:null,s=null!==e&&null!==r?e-r:0;return null!==e&&(r=e),{...t,change:s}})}return e}(await t.callWS({type:"recorder/statistics_during_period",start_time:Vt(s,r).toISOString(),end_time:o.toISOString(),statistic_ids:e,period:r,types:["change","sum"],units:{energy:"kWh"}}))}function qt(t){return(t.device_consumption??[]).filter(t=>!t.included_in_stat)}function Jt(t){const e={gridFrom:[],gridTo:[],solarFrom:[],batteryFrom:[],batteryTo:[]};for(const s of t.energy_sources??[])if("grid"===s.type){for(const t of s.flow_from??[])t.stat_energy_from&&e.gridFrom.push(t.stat_energy_from);for(const t of s.flow_to??[])t.stat_energy_to&&e.gridTo.push(t.stat_energy_to)}else"solar"===s.type?s.stat_energy_from&&e.solarFrom.push(s.stat_energy_from):"battery"===s.type&&(s.stat_energy_from&&e.batteryFrom.push(s.stat_energy_from),s.stat_energy_to&&e.batteryTo.push(s.stat_energy_to));return e}function Gt(t){return"number"==typeof t?t:new Date(t).getTime()}function Zt(t){const e=t.change;return"number"==typeof e&&Number.isFinite(e)?e:0}function Kt(t,e,s){const o=new Array(s.length).fill(0);if(!s.length)return o;for(const r of e)for(const e of t[r]??[]){const t=Xt(s,Gt(e.start));t>=0&&(o[t]+=Zt(e))}return o}function Xt(t,e){let s=0,o=t.length-1;for(;s<=o;){const r=s+o>>1,i=t[r];if(e<i.start.getTime())o=r-1;else{if(!(e>=i.end.getTime()))return r;s=r+1}}return-1}function Qt(t,e,s,o){const r=s.getTime(),i=o.getTime();let n=0;for(const s of e)for(const e of t[s]??[]){const t=Gt(e.start),s=void 0!==e.end?Gt(e.end):t;if(s<=r||t>=i)continue;const o=Zt(e),a=s-t;if(a<=0){n+=o;continue}const c=Math.min(s,i)-Math.max(t,r);n+=o*Math.min(1,Math.max(0,c/a))}return n}function te(t,e,s,o,r,i){if("devices"===s)return Qt(t,i,o,r);const n=Qt(t,e.gridFrom,o,r);return"grid"===s?n:Math.max(0,n-Qt(t,e.gridTo,o,r)+Qt(t,e.solarFrom,o,r)+Qt(t,e.batteryFrom,o,r)-Qt(t,e.batteryTo,o,r))}function ee({prefs:t,stats:e,buckets:s,config:o,palette:r}){const i=new Map((o.devices??[]).map(t=>[t.stat,t])),n=o.total_mode??"grid",a=qt(t).filter(t=>!i.get(t.stat_consumption)?.hidden);let c=a.map((t,o)=>{const n=i.get(t.stat_consumption),a=Kt(e,[t.stat_consumption],s);return{key:t.stat_consumption,name:n?.name||t.name||t.stat_consumption,color:n?.color||r.series[o%r.series.length],values:a,total:a.reduce((t,e)=>t+e,0)}});c.sort((t,e)=>e.total-t.total);const l=o.max_devices??8;let h=new Array(s.length).fill(0);if(l>0&&c.length>l){const t=c.slice(l);c=c.slice(0,l),h=s.map((e,s)=>t.reduce((t,e)=>t+e.values[s],0))}const d=s.map((t,e)=>c.reduce((t,s)=>t+s.values[e],0)+h[e]),u=function(t,e,s,o,r){if("devices"===s)return r.slice();const i=Kt(t,e.gridFrom,o);if("grid"===s)return i;const n=Kt(t,e.gridTo,o),a=Kt(t,e.solarFrom,o),c=Kt(t,e.batteryFrom,o),l=Kt(t,e.batteryTo,o);return i.map((t,e)=>Math.max(0,t-n[e]+a[e]+c[e]-l[e]))}(e,Jt(t),n,s,d),p=!1!==o.show_other&&"devices"!==n;if(p||h.some(t=>t>0)){const t=u.map((t,e)=>Math.max(0,(p?t-d[e]:0)+h[e])),e=t.reduce((t,e)=>t+e,0);e>0&&c.push({key:"__other__",name:o.other_name||"Other",color:o.other_color||r.other,values:t,total:e})}const m=s.map((t,e)=>c.reduce((t,s)=>t+s.values[e],0));return{buckets:s,series:c,totals:m.map((t,e)=>Math.max(t,u[e]))}}let se=class extends mt{constructor(){super(...arguments),this._period="week",this._total=0,this._comparison=null,this._loading=!0,this._width=0,this._height=0,this._hover=null,this._totalStatIds=[],this._fetchToken=0}static async getConfigElement(){return await Promise.resolve().then(function(){return le}),document.createElement(e)}static getStubConfig(){return{type:`custom:${t}`,icon:"mdi:lightning-bolt",periods:["day","week","month","year"],default_period:"week",show_comparison:!0,show_legend:!0}}setConfig(t){if(!t)throw new Error("Invalid configuration");const e=(t.periods?.length?t.periods:s).filter(t=>s.includes(t));if(!e.length)throw new Error("At least one time period must be enabled");this._config={...t,periods:e};const o=t.default_period&&e.includes(t.default_period)?t.default_period:e[0];this._period=o,this._loading=!0,this._load()}getCardSize(){return 6}getGridOptions(){return{rows:6,columns:12,min_rows:4,min_columns:6}}getLayoutOptions(){return{grid_rows:6,grid_columns:12,grid_min_rows:4,grid_min_columns:6}}connectedCallback(){super.connectedCallback(),this._resizeObserver=new ResizeObserver(t=>{for(const e of t)this._width=Math.floor(e.contentRect.width),this._height=Math.floor(e.contentRect.height)}),this._timer=window.setInterval(()=>{this._load()},3e5)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),this._resizeObserver=void 0,this._timer&&window.clearInterval(this._timer),this._timer=void 0}firstUpdated(){const t=this.renderRoot.querySelector(".chart");t&&this._resizeObserver&&this._resizeObserver.observe(t)}updated(t){if(!t.has("hass")||!this.hass)return;const e=t.get("hass");e&&e.themes===this.hass.themes||this._load()}get _firstDayOfWeek(){return function(t,e){if("monday"===t)return 1;if("sunday"===t)return 0;try{const t=new Intl.Locale(e||navigator.language||"en-GB"),s="function"==typeof t.getWeekInfo?t.getWeekInfo():t.weekInfo;if(7===s?.firstDay)return 0;if(1===s?.firstDay)return 1}catch{}return 1}(this._config?.first_day_of_week,this.hass?.locale?.language??this.hass?.language)}async _load(){const t=this.hass,e=this._config;if(!t||!e)return;const s=++this._fetchToken;try{const o=await Bt(t),r=e.total_mode??"grid",i=this._period,n=this._firstDayOfWeek,a=new Date,c=function(t,e,s){const{start:o,end:r}=At(t,e,s),i=[];if("day"===e){for(let t=0;t<24;t++){const e=new Date(o.getTime());e.setHours(t,0,0,0);const s=new Date(e.getTime());s.setHours(t+1,0,0,0),i.push({start:e,end:s,label:String(t).padStart(2,"0")})}return i}if("week"===e){for(let t=0;t<7;t++){const e=new Date(o.getTime());e.setDate(o.getDate()+t);const s=new Date(e.getTime());s.setDate(e.getDate()+1),i.push({start:e,end:s,label:Et[e.getDay()]})}return i}if("month"===e){let t=new Date(o.getTime());for(;t.getTime()<r.getTime();){const e=7-(t.getDay()-s+7)%7,o=new Date(t.getTime());o.setDate(t.getDate()+e);const n=o.getTime()>r.getTime()?new Date(r.getTime()):o;i.push({start:new Date(t.getTime()),end:n,label:String(t.getDate())}),t=n}return i}for(let t=0;t<12;t++){const e=new Date(o.getFullYear(),t,1,0,0,0,0),s=new Date(o.getFullYear(),t+1,1,0,0,0,0);i.push({start:e,end:s,label:kt[t]})}return i}(a,i,n),{start:l,end:h}=At(a,i,n),d=function(t){switch(t){case"day":return"hour";case"week":case"month":return"day";case"year":return"month"}}(i),u=qt(o),p=u.map(t=>t.stat_consumption),m=Jt(o),g=function(t,e){return"devices"===e?[]:"home"===e?[...t.gridFrom,...t.gridTo,...t.solarFrom,...t.batteryFrom,...t.batteryTo]:t.gridFrom}(m,r);if(!p.length&&!g.length)throw new Error("No energy sources or devices are configured in the Energy dashboard.");this._totalStatIds=g;const f=Array.from(new Set([...p,...g])),_=await Yt(t,f,l,h,d);if(s!==this._fetchToken)return;const v=ee({prefs:o,stats:_,buckets:c,config:e,palette:Wt(this,u.length)}),y=te(_,m,r,l,a,p);let $=null;if(!1!==e.show_comparison&&($=await this._loadComparison(t,{now:a,period:i,fdow:n,mode:r,sources:m,deviceIds:p,totalIds:g,statsPeriod:d,current:y}),s!==this._fetchToken))return;this._data=v,this._total=y,this._comparison=$,this._error=void 0,this._loading=!1}catch(t){if(s!==this._fetchToken)return;this._error=t instanceof Error?t.message:String(t),this._loading=!1}}async _loadComparison(t,e){const s=this._config.comparison_mode??"like_for_like",o=function(t,e,s,o){const r=xt(bt(t,e,o),e);return"like_for_like"===s?{start:r,end:St(xt(t,e),r,e)}:{start:r,end:wt(r,e)}}(e.now,e.period,s,e.fdow),r=bt(o.start,e.period,e.fdow),i=wt(r,e.period),n="devices"===e.mode?e.deviceIds:e.totalIds;if(!n.length)return null;const a=te(await Yt(t,n,r,i,e.statsPeriod),e.sources,e.mode,o.start,o.end,e.deviceIds);if(a<=0)return null;return(("projected"===s?e.current/function(t,e,s){const{start:o,end:r}=At(t,e,s),i=r.getTime()-o.getTime();if(i<=0)return 1;const n=(t.getTime()-o.getTime())/i;return Math.min(1,Math.max(1e-6,n))}(e.now,e.period,e.fdow):e.current)-a)/a*100}_cyclePeriod(){const t=this._config?.periods??s,e=t.indexOf(this._period);this._period=t[(e+1)%t.length],this._hover=null,this._loading=!0,this._load()}_comparisonText(){const t=this._config?.comparison_mode??"like_for_like",e=r[this._period];return"projected"===t?`projected vs ${e}`:`vs ${e}`}render(){const t=this._config;return t?G`
      <ha-card>
        <div class="root">
          <div class="header">
            <div class="summary">
              ${t.icon?G`<ha-icon class="icon" .icon=${t.icon}></ha-icon>`:X}
              <div class="figures">
                <div class="value">
                  <span class="number">${Ht(this._total,this.hass?.locale?.language)}</span>
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
          ${this._renderNotice()}
          ${this._renderBody()}
          ${!1!==t.show_legend?this._renderLegend():X}
        </div>
      </ha-card>
    `:X}_renderComparison(){if(!1===this._config?.show_comparison)return X;if(null===this._comparison)return X;const t=this._comparison>0?"up":this._comparison<0?"down":"flat";return G`
      <div class="comparison ${t}">
        <span class="delta">${function(t){const e=Math.round(t);return`${e>0?"+":""}${e}%`}(this._comparison)}</span>
        <span class="against">${this._comparisonText()}</span>
      </div>
    `}_renderNotice(){if(this._error||!this._data||!this._totalStatIds.length)return X;const t=this._data.series.reduce((t,e)=>t+e.total,0);return this._total>0||t<=0?X:G`
      <div class="notice">
        No statistics returned for ${this._totalStatIds.join(", ")} — check the source configured in
        the Energy dashboard.
      </div>
    `}_renderBody(){if(this._error)return G`<div class="chart error"><div class="message">${this._error}</div></div>`;const t=this._height,e=this._data;return G`
      <div class="chart">
        ${e&&this._width>0&&t>0?Ut(e,{width:this._width,height:t,rounded:!1!==this._config?.rounded_bars,unit:"kWh",activeIndex:this._hover,onHover:t=>{this._hover=t},onSelect:t=>{this._hover=this._hover===t?null:t}}):G`<div class="message">${this._loading?"Loading…":""}</div>`}
        ${this._renderTooltip()}
      </div>
    `}_renderTooltip(){const t=this._data,e=this._hover;if(!t||null===e||!this._width)return X;const s=t.buckets[e];if(!s)return X;const o=Math.max(1,this._width-Dt-Ct)/Math.max(1,t.buckets.length),r=Dt+o*e+o/2,i=Math.min(Math.max(r,90),Math.max(90,this._width-90)),n=t.series.filter(t=>t.values[e]>0);return G`
      <div class="tooltip" style=${`left:${i}px`}>
        <div class="tt-head">
          <span>${this._tooltipTitle(s.start)}</span>
          <span class="tt-total">${Ht(t.totals[e])} kWh</span>
        </div>
        ${n.length?n.map(t=>G`
                <div class="tt-row">
                  <span class="swatch" style=${`background:${t.color}`}></span>
                  <span class="tt-name">${t.name}</span>
                  <span class="tt-value">${Ht(t.values[e])}</span>
                </div>
              `):G`<div class="tt-row tt-empty">No consumption</div>`}
      </div>
    `}_tooltipTitle(t){const e=this.hass?.locale?.language;switch(this._period){case"day":return t.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"});case"week":return t.toLocaleDateString(e,{weekday:"long"});case"month":return t.toLocaleDateString(e,{day:"numeric",month:"short"});case"year":return t.toLocaleDateString(e,{month:"long"})}}_renderLegend(){const t=this._data;return t&&t.series.length?G`
      <div class="legend">
        ${t.series.map(t=>G`
            <div class="legend-item">
              <span class="swatch" style=${`background:${t.color}`}></span>
              <span class="legend-name">${t.name}</span>
              <span class="legend-value">${Ht(t.total)}</span>
            </div>
          `)}
      </div>
    `:X}};se.styles=d`
    :host {
      display: flex;
      flex-direction: column;
      /* Floor for layouts that do not give the card a height of its own. */
      min-height: var(--ebc-min-height, 240px);
      --ebc-empty-bar: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
      --ebc-grid: color-mix(in srgb, var(--secondary-text-color) 45%, transparent);
      --ebc-icon-color: var(--primary-text-color);
      --ebc-period-background: color-mix(in srgb, var(--primary-text-color) 9%, transparent);
      --ebc-period-color: var(--primary-text-color);
    }
    ha-card {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      min-height: 0;
      overflow: hidden;
    }
    .root {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px;
      min-height: 0;
      box-sizing: border-box;
    }
    .header {
      flex: 0 0 auto;
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
      color: var(--ebc-icon-color);
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
      color: var(--ebc-period-color);
      background: var(--ebc-period-background);
    }
    button.period:hover {
      background: color-mix(in srgb, var(--primary-text-color) 16%, transparent);
    }
    button.period:focus-visible {
      outline: 2px solid var(--primary-text-color);
      outline-offset: 2px;
    }
    .chart {
      position: relative;
      /* Basis 0 so the chart claims the free space before it has any content
         to be measured from. */
      flex: 1 1 0;
      min-height: 0;
      width: 100%;
    }
    .chart svg {
      display: block;
    }
    .notice {
      font-size: 0.8em;
      color: var(--warning-color, #ffa726);
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
      flex: 0 0 auto;
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
  `,i([yt({attribute:!1})],se.prototype,"hass",void 0),i([$t()],se.prototype,"_config",void 0),i([$t()],se.prototype,"_period",void 0),i([$t()],se.prototype,"_data",void 0),i([$t()],se.prototype,"_total",void 0),i([$t()],se.prototype,"_comparison",void 0),i([$t()],se.prototype,"_error",void 0),i([$t()],se.prototype,"_loading",void 0),i([$t()],se.prototype,"_width",void 0),i([$t()],se.prototype,"_height",void 0),i([$t()],se.prototype,"_hover",void 0),i([$t()],se.prototype,"_totalStatIds",void 0),se=i([ft(t)],se);const oe=window;oe.customCards=oe.customCards||[],oe.customCards.push({type:t,name:"Energy Breakdown Card",description:"Stacked per-device energy consumption from the Energy dashboard, with day/week/month/year drill-down.",preview:!0,documentationURL:"https://github.com/fwhitten/energy-breakdown-card"}),console.info("%c ENERGY-BREAKDOWN-CARD %c 1.2.0 ","color: white; background: #7c4dff; font-weight: 700;","color: #7c4dff; background: white; font-weight: 700;");const re={icon:"Icon",default_period:"Default time period",periods:"Selectable time periods",total_mode:"Consumption figure",comparison_mode:"Comparison baseline",show_comparison:"Show comparison to previous period",show_legend:"Show legend",show_other:'Show "Other" remainder',other_name:'"Other" label',max_devices:"Maximum devices shown",rounded_bars:"Rounded bars",first_day_of_week:"First day of week"},ie=[{name:"icon",selector:{icon:{}}},{name:"periods",selector:{select:{multiple:!0,mode:"list",options:s.map(t=>({value:t,label:o[t]}))}}},{type:"grid",name:"",schema:[{name:"default_period",selector:{select:{mode:"dropdown",options:s.map(t=>({value:t,label:o[t]}))}}},{name:"total_mode",selector:{select:{mode:"dropdown",options:[{value:"grid",label:"Grid import"},{value:"home",label:"Home consumption (grid + solar + battery)"},{value:"devices",label:"Sum of devices"}]}}}]},{name:"show_comparison",selector:{boolean:{}}},{name:"comparison_mode",selector:{select:{mode:"dropdown",options:[{value:"like_for_like",label:"Same elapsed time in previous period"},{value:"full_previous",label:"Whole previous period"},{value:"projected",label:"Projected period vs whole previous period"}]}}},{name:"show_other",selector:{boolean:{}}},{type:"grid",name:"",schema:[{name:"show_legend",selector:{boolean:{}}},{name:"rounded_bars",selector:{boolean:{}}}]},{type:"grid",name:"",schema:[{name:"first_day_of_week",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Follow language"},{value:"monday",label:"Monday"},{value:"sunday",label:"Sunday"}]}}}]},{name:"max_devices",selector:{number:{min:1,max:20,mode:"box"}}}];let ne=class extends mt{constructor(){super(...arguments),this._devices=[]}setConfig(t){this._config=t,this._loadDevices()}async _loadDevices(){if(this.hass&&!this._devices.length)try{const t=await Bt(this.hass);this._devices=qt(t),this._devicesError=void 0}catch(t){this._devicesError="Could not read the Energy dashboard configuration. Set it up under Settings → Dashboards → Energy."}}updated(){this._loadDevices()}get _data(){const t=this._config;return{show_comparison:!0,show_legend:!0,show_other:!0,rounded_bars:!0,comparison_mode:"like_for_like",total_mode:"grid",first_day_of_week:"auto",max_devices:8,periods:s,...t}}_emit(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_valueChanged(t){t.stopPropagation();const e={...t.detail.value};e.periods?.length&&e.default_period&&!e.periods.includes(e.default_period)&&(e.default_period=e.periods[0]),this._emit(e)}_updateDevice(t,e){const s=this._data,o=[...s.devices??[]],r=o.findIndex(e=>e.stat===t),i={...r>=0?o[r]:{stat:t},...e},n=!i.name&&!i.color&&!i.hidden;r>=0?n?o.splice(r,1):o[r]=i:n||o.push(i);const a={...s};o.length?a.devices=o:delete a.devices,this._emit(a)}_updateConfig(t){const e={...this._data,...t};for(const s of Object.keys(t))void 0===e[s]&&delete e[s];this._emit(e)}_override(t){return(this._config?.devices??[]).find(e=>e.stat===t)}render(){return this._config&&this.hass?G`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${ie}
          .computeLabel=${t=>re[t.name]??t.name}
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
                  Rename, recolour or hide any device from the Energy dashboard. Each field is
                  labelled with the name the Energy dashboard uses; type to override it.
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
          label="Other"
          .value=${t.other_name??""}
          @change=${t=>this._updateConfig({other_name:t.target.value||void 0})}
        ></ha-textfield>
        <span class="spacer"></span>
      </div>
    `}_renderDevice(t,e,s){const o=t.stat_consumption,r=this._override(o),i=r?.color||s[e%s.length];return G`
      <div class="device ${r?.hidden?"hidden":""}">
        <input
          class="color"
          type="color"
          .value=${i}
          title="Colour"
          @change=${t=>this._updateDevice(o,{color:t.target.value})}
        />
        <ha-textfield
          class="name"
          .label=${t.name||o}
          .value=${r?.name??""}
          @change=${t=>this._updateDevice(o,{name:t.target.value||void 0})}
        ></ha-textfield>
        <ha-icon-button
          .path=${r?.hidden?ce:ae}
          .label=${r?.hidden?"Show device":"Hide device"}
          @click=${()=>this._updateDevice(o,{hidden:!r?.hidden||void 0})}
        ></ha-icon-button>
      </div>
    `}};ne.styles=d`
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
  `,i([$t()],ne.prototype,"_config",void 0),i([$t()],ne.prototype,"_devices",void 0),i([$t()],ne.prototype,"_devicesError",void 0),ne=i([ft(e)],ne);const ae="M12 9a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z",ce="M11.83 9 15 12.16V12a3 3 0 0 0-3-3h-.17m-4.3.8 1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28.46.46A11.8 11.8 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7Z";var le=Object.freeze({__proto__:null,get EnergyBreakdownCardEditor(){return ne}});
