const e="energy-breakdown-card",t="energy-breakdown-card-editor",o=["day","week","month","year"],s={day:"Day",week:"Week",month:"Month",year:"Year"},i={day:"yesterday",week:"last week",month:"last month",year:"last year"};function r(e,t,o,s){var i,r=arguments.length,n=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,o):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,s);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(n=(r<3?i(n):r>3?i(t,o,n):i(t,o))||n);return r>3&&n&&Object.defineProperty(t,o,n),n}"function"==typeof SuppressedError&&SuppressedError;const n=globalThis,a=n.ShadowRoot&&(void 0===n.ShadyCSS||n.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,c=Symbol(),l=new WeakMap;let h=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==c)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(a&&void 0===e){const o=void 0!==t&&1===t.length;o&&(e=l.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&l.set(t,e))}return e}toString(){return this.cssText}};const d=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,o,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[s+1],e[0]);return new h(o,e,c)},u=a?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return(e=>new h("string"==typeof e?e:e+"",void 0,c))(t)})(e):e,{is:p,defineProperty:m,getOwnPropertyDescriptor:g,getOwnPropertyNames:f,getOwnPropertySymbols:_,getPrototypeOf:v}=Object,y=globalThis,$=y.trustedTypes,b=$?$.emptyScript:"",w=y.reactiveElementPolyfillSupport,x=(e,t)=>e,A={toAttribute(e,t){switch(t){case Boolean:e=e?b:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=null!==e;break;case Number:o=null===e?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch(e){o=null}}return o}},k=(e,t)=>!p(e,t),S={attribute:!0,type:String,converter:A,reflect:!1,useDefault:!1,hasChanged:k};Symbol.metadata??=Symbol("metadata"),y.litPropertyMetadata??=new WeakMap;let E=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=S){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),s=this.getPropertyDescriptor(e,o,t);void 0!==s&&m(this.prototype,e,s)}}static getPropertyDescriptor(e,t,o){const{get:s,set:i}=g(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const r=s?.call(this);i?.call(this,t),this.requestUpdate(e,r,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??S}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const e=v(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const e=this.properties,t=[...f(e),..._(e)];for(const o of t)this.createProperty(o,e[o])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,o]of t)this.elementProperties.set(e,o)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const o=this._$Eu(e,t);void 0!==o&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const e of o)t.unshift(u(e))}else void 0!==e&&t.push(u(e));return t}static _$Eu(e,t){const o=t.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(a)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const o of t){const t=document.createElement("style"),s=n.litNonce;void 0!==s&&t.setAttribute("nonce",s),t.textContent=o.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){const o=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,o);if(void 0!==s&&!0===o.reflect){const i=(void 0!==o.converter?.toAttribute?o.converter:A).toAttribute(t,o.type);this._$Em=e,null==i?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(e,t){const o=this.constructor,s=o._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=o.getPropertyOptions(s),i="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:A;this._$Em=s;const r=i.fromAttribute(t,e.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(e,t,o,s=!1,i){if(void 0!==e){const r=this.constructor;if(!1===s&&(i=this[e]),o??=r.getPropertyOptions(e),!((o.hasChanged??k)(i,t)||o.useDefault&&o.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,o))))return;this.C(e,t,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:s,wrapped:i},r){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==i||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,o]of e){const{wrapped:e}=o,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,o,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[x("elementProperties")]=new Map,E[x("finalized")]=new Map,w?.({ReactiveElement:E}),(y.reactiveElementVersions??=[]).push("2.1.2");const D=globalThis,M=e=>e,T=D.trustedTypes,C=T?T.createPolicy("lit-html",{createHTML:e=>e}):void 0,O="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,N="?"+P,z=`<${N}>`,U=document,F=()=>U.createComment(""),H=e=>null===e||"object"!=typeof e&&"function"!=typeof e,I=Array.isArray,R="[ \t\n\f\r]",j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,W=/>/g,B=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),V=/'/g,Y=/"/g,q=/^(?:script|style|textarea|title)$/i,J=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),G=J(1),Z=J(2),K=Symbol.for("lit-noChange"),X=Symbol.for("lit-nothing"),Q=new WeakMap,ee=U.createTreeWalker(U,129);function te(e,t){if(!I(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(t):t}const oe=(e,t)=>{const o=e.length-1,s=[];let i,r=2===t?"<svg>":3===t?"<math>":"",n=j;for(let t=0;t<o;t++){const o=e[t];let a,c,l=-1,h=0;for(;h<o.length&&(n.lastIndex=h,c=n.exec(o),null!==c);)h=n.lastIndex,n===j?"!--"===c[1]?n=L:void 0!==c[1]?n=W:void 0!==c[2]?(q.test(c[2])&&(i=RegExp("</"+c[2],"g")),n=B):void 0!==c[3]&&(n=B):n===B?">"===c[0]?(n=i??j,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?B:'"'===c[3]?Y:V):n===Y||n===V?n=B:n===L||n===W?n=j:(n=B,i=void 0);const d=n===B&&e[t+1].startsWith("/>")?" ":"";r+=n===j?o+z:l>=0?(s.push(a),o.slice(0,l)+O+o.slice(l)+P+d):o+P+(-2===l?t:d)}return[te(e,r+(e[o]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class se{constructor({strings:e,_$litType$:t},o){let s;this.parts=[];let i=0,r=0;const n=e.length-1,a=this.parts,[c,l]=oe(e,t);if(this.el=se.createElement(c,o),ee.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=ee.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(O)){const t=l[r++],o=s.getAttribute(e).split(P),n=/([.?@])?(.*)/.exec(t);a.push({type:1,index:i,name:n[2],strings:o,ctor:"."===n[1]?ce:"?"===n[1]?le:"@"===n[1]?he:ae}),s.removeAttribute(e)}else e.startsWith(P)&&(a.push({type:6,index:i}),s.removeAttribute(e));if(q.test(s.tagName)){const e=s.textContent.split(P),t=e.length-1;if(t>0){s.textContent=T?T.emptyScript:"";for(let o=0;o<t;o++)s.append(e[o],F()),ee.nextNode(),a.push({type:2,index:++i});s.append(e[t],F())}}}else if(8===s.nodeType)if(s.data===N)a.push({type:2,index:i});else{let e=-1;for(;-1!==(e=s.data.indexOf(P,e+1));)a.push({type:7,index:i}),e+=P.length-1}i++}}static createElement(e,t){const o=U.createElement("template");return o.innerHTML=e,o}}function ie(e,t,o=e,s){if(t===K)return t;let i=void 0!==s?o._$Co?.[s]:o._$Cl;const r=H(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),void 0===r?i=void 0:(i=new r(e),i._$AT(e,o,s)),void 0!==s?(o._$Co??=[])[s]=i:o._$Cl=i),void 0!==i&&(t=ie(e,i._$AS(e,t.values),i,s)),t}class re{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,s=(e?.creationScope??U).importNode(t,!0);ee.currentNode=s;let i=ee.nextNode(),r=0,n=0,a=o[0];for(;void 0!==a;){if(r===a.index){let t;2===a.type?t=new ne(i,i.nextSibling,this,e):1===a.type?t=new a.ctor(i,a.name,a.strings,this,e):6===a.type&&(t=new de(i,this,e)),this._$AV.push(t),a=o[++n]}r!==a?.index&&(i=ee.nextNode(),r++)}return ee.currentNode=U,s}p(e){let t=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class ne{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,s){this.type=2,this._$AH=X,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ie(this,e,t),H(e)?e===X||null==e||""===e?(this._$AH!==X&&this._$AR(),this._$AH=X):e!==this._$AH&&e!==K&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>I(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==X&&H(this._$AH)?this._$AA.nextSibling.data=e:this.T(U.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:o}=e,s="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=se.createElement(te(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new re(s,this),o=e.u(this.options);e.p(t),this.T(o),this._$AH=e}}_$AC(e){let t=Q.get(e.strings);return void 0===t&&Q.set(e.strings,t=new se(e)),t}k(e){I(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,s=0;for(const i of e)s===t.length?t.push(o=new ne(this.O(F()),this.O(F()),this,this.options)):o=t[s],o._$AI(i),s++;s<t.length&&(this._$AR(o&&o._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=M(e).nextSibling;M(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ae{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,s,i){this.type=1,this._$AH=X,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=i,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=X}_$AI(e,t=this,o,s){const i=this.strings;let r=!1;if(void 0===i)e=ie(this,e,t,0),r=!H(e)||e!==this._$AH&&e!==K,r&&(this._$AH=e);else{const s=e;let n,a;for(e=i[0],n=0;n<i.length-1;n++)a=ie(this,s[o+n],t,n),a===K&&(a=this._$AH[n]),r||=!H(a)||a!==this._$AH[n],a===X?e=X:e!==X&&(e+=(a??"")+i[n+1]),this._$AH[n]=a}r&&!s&&this.j(e)}j(e){e===X?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ce extends ae{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===X?void 0:e}}class le extends ae{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==X)}}class he extends ae{constructor(e,t,o,s,i){super(e,t,o,s,i),this.type=5}_$AI(e,t=this){if((e=ie(this,e,t,0)??X)===K)return;const o=this._$AH,s=e===X&&o!==X||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,i=e!==X&&(o===X||s);s&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class de{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){ie(this,e)}}const ue=D.litHtmlPolyfillSupport;ue?.(se,ne),(D.litHtmlVersions??=[]).push("3.3.3");const pe=globalThis;class me extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,o)=>{const s=o?.renderBefore??t;let i=s._$litPart$;if(void 0===i){const e=o?.renderBefore??null;s._$litPart$=i=new ne(t.insertBefore(F(),e),e,void 0,o??{})}return i._$AI(e),i})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}me._$litElement$=!0,me.finalized=!0,pe.litElementHydrateSupport?.({LitElement:me});const ge=pe.litElementPolyfillSupport;ge?.({LitElement:me}),(pe.litElementVersions??=[]).push("4.2.2");const fe=e=>(t,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},_e={attribute:!0,type:String,converter:A,reflect:!1,hasChanged:k},ve=(e=_e,t,o)=>{const{kind:s,metadata:i}=o;let r=globalThis.litPropertyMetadata.get(i);if(void 0===r&&globalThis.litPropertyMetadata.set(i,r=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),r.set(o.name,e),"accessor"===s){const{name:s}=o;return{set(o){const i=t.get.call(this);t.set.call(this,o),this.requestUpdate(s,i,e,!0,o)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=o;return function(o){const i=this[s];t.call(this,o),this.requestUpdate(s,i,e,!0,o)}}throw Error("Unsupported decorator location: "+s)};function ye(e){return(t,o)=>"object"==typeof o?ve(e,t,o):((e,t,o)=>{const s=t.hasOwnProperty(o);return t.constructor.createProperty(o,e),s?Object.getOwnPropertyDescriptor(t,o):void 0})(e,t,o)}function $e(e){return ye({...e,state:!0,attribute:!1})}function be(e,t,o=1){const s=new Date(e.getTime());switch(s.setHours(0,0,0,0),t){case"day":return s;case"week":{const e=(s.getDay()-o+7)%7;return s.setDate(s.getDate()-e),s}case"month":return s.setDate(1),s;case"year":return s.setMonth(0,1),s}}function we(e,t){const o=new Date(e.getTime());switch(t){case"day":o.setDate(o.getDate()+1);break;case"week":o.setDate(o.getDate()+7);break;case"month":o.setMonth(o.getMonth()+1);break;case"year":o.setFullYear(o.getFullYear()+1)}return o}function xe(e,t){const o=new Date(e.getTime());switch(t){case"day":return o.setDate(o.getDate()-1),o;case"week":return o.setDate(o.getDate()-7),o;case"month":{const e=o.getDate();o.setDate(1),o.setMonth(o.getMonth()-1);const t=new Date(o.getFullYear(),o.getMonth()+1,0).getDate();return o.setDate(Math.min(e,t)),o}case"year":{const e=o.getDate();o.setDate(1),o.setFullYear(o.getFullYear()-1);const t=new Date(o.getFullYear(),o.getMonth()+1,0).getDate();return o.setDate(Math.min(e,t)),o}}}function Ae(e,t,o){const s=be(e,t,o);return{start:s,end:we(s,t)}}function ke(e,t,o){const s=we(t,o);return e.getTime()>s.getTime()?s:e.getTime()<t.getTime()?t:e}const Se=["S","M","T","W","T","F","S"],Ee=["J","F","M","A","M","J","J","A","S","O","N","D"];function De(e,t=1){if(0===e)return"0";if(Math.abs(e)>=1e3){const t=e/1e3;return Math.round(10*t)/10+"k"}const o=t>=10?0:t>=1?Number.isInteger(t)?0:1:Math.min(4,Math.ceil(-Math.log10(t))+1);return e.toFixed(o)}const Me=38,Te=6,Ce=Me,Oe=Te,Pe=10,Ne=22;function ze(e,t){const{width:o,height:s}=t,i=Math.max(1,o-Ce-Oe),r=Math.max(1,s-Pe-Ne),n=Pe+r,a=e.buckets.length,c=r<110?2:4,l=function(e,t=4){if(!Number.isFinite(e)||e<=0)return t;const o=e/t,s=Math.pow(10,Math.floor(Math.log10(o))),i=o/s;return(i<=1?1:i<=2?2:i<=2.5?2.5:i<=5?5:10)*s*t}(Math.max(...e.totals,0),c),h=i/Math.max(1,a),d=Math.max(2,.62*h),u=t.rounded?Math.min(d/2,4):0,p=function(e){return e<=8?1:e<=14?2:e<=24?3:Math.ceil(e/8)}(a),m=e=>n-e/l*r,g=[];for(let e=0;e<=c;e++){const o=l/c,s=o*e,r=m(s);g.push(Z`
      <line class="grid" x1=${Ce} x2=${Ce+i} y1=${r} y2=${r} />
      <text class="tick" x=${Ce-8} y=${r+4} text-anchor="end">
        ${0===e?t.unit:De(s,o)}
      </text>
    `)}const f=e.buckets.map((o,s)=>{const i=Ce+h*s+h/2-d/2,a=e.totals[s],c=m(a),p=Math.max(0,n-c),g=`clip-${s}`,f=null!==t.activeIndex&&t.activeIndex!==s;let _=n;const v=e.series.map(e=>{const t=e.values[s]/l*r,o=_-t;return _=o,t<=0?Z``:Z`<rect x=${i} y=${o} width=${d} height=${t} fill=${e.color} />`}),y=_-c;return Z`
      <g class=${f?"bar dimmed":"bar"}>
        <defs>
          <clipPath id=${g}>
            <rect x=${i} y=${c} width=${d} height=${p+u} rx=${u} ry=${u} />
          </clipPath>
        </defs>
        <g clip-path=${`url(#${g})`}>
          ${p>0?Z`<rect x=${i} y=${c} width=${d} height=${p} fill="var(--ebc-empty-bar)" />`:Z``}
          ${v}
          ${y>.5?Z`<rect x=${i} y=${c} width=${d} height=${y} fill="var(--ebc-empty-bar)" />`:Z``}
        </g>
        <rect
          class="hit"
          x=${Ce+h*s}
          y=${Pe}
          width=${h}
          height=${r}
          @pointerenter=${()=>t.onHover(s)}
          @pointerleave=${()=>t.onHover(null)}
          @click=${()=>t.onSelect(s)}
        />
      </g>
    `}),_=e.buckets.map((e,t)=>{if(t%p!==0)return Z``;return Z`<text class="xlabel" x=${Ce+h*t+h/2} y=${s-6} text-anchor="middle">${e.label}</text>`});return Z`
    <svg
      viewBox=${`0 0 ${o} ${s}`}
      width=${o}
      height=${s}
      role="img"
      aria-label="Energy consumption by period"
    >
      ${g}
      ${f}
      ${_}
    </svg>
  `}function Ue(e,t){const o=Math.abs(e)>=1e3?1:2;return new Intl.NumberFormat(t||void 0,{minimumFractionDigits:o,maximumFractionDigits:o}).format(e)}const Fe=["--energy-grid-consumption-color","--accent-color","--primary-color","--label-badge-blue"];function He(e,t){const o=e.getPropertyValue(t).trim();return o.startsWith("var(")?"":o}function Ie(e){const t=e.trim().toLowerCase();if(!t)return null;let o,s,i;const r=t.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);if(r){const e=r[1];3===e.length?(o=parseInt(e[0]+e[0],16),s=parseInt(e[1]+e[1],16),i=parseInt(e[2]+e[2],16)):(o=parseInt(e.slice(0,2),16),s=parseInt(e.slice(2,4),16),i=parseInt(e.slice(4,6),16))}else{const e=t.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/);if(!e)return null;o=Number(e[1]),s=Number(e[2]),i=Number(e[3])}return[o,s,i].every(e=>Number.isFinite(e))?function(e,t,o){const s=Math.max(e,t,o),i=Math.min(e,t,o),r=(s+i)/2,n=s-i;if(0===n)return{h:0,s:0,l:r};const a=r>.5?n/(2-s-i):n/(s+i);let c;c=s===e?60*((t-o)/n+(t<o?6:0)):s===t?60*((o-e)/n+2):60*((e-t)/n+4);return{h:c,s:a,l:r}}(o/255,s/255,i/255):null}function Re({h:e,s:t,l:o}){const s=(e%360+360)%360,i=(1-Math.abs(2*o-1))*t,r=i*(1-Math.abs(s/60%2-1)),n=o-i/2,[a,c,l]=s<60?[i,r,0]:s<120?[r,i,0]:s<180?[0,i,r]:s<240?[0,r,i]:s<300?[r,0,i]:[i,0,r],h=e=>Math.round(255*(e+n)).toString(16).padStart(2,"0");return`#${h(a)}${h(c)}${h(l)}`}const je=(e,t,o)=>Math.min(o,Math.max(t,e));function Le(e,t){const o=[];for(let s=1;s<=Math.max(t,1);s++){const t=He(e,`--graph-color-${s}`);if(!t)break;o.push(t)}const s=Fe.map(t=>Ie(He(e,t))).find(e=>null!==e)??Ie("#488fc2"),i=[];for(let e=0;e<t;e++)o.length?i.push(o[e%o.length]):i.push(Re({h:s.h+137.508*e,s:je(s.s*(e%2==1?.82:1),.32,.92),l:je(s.l+.09*(e%3-1),.34,.74)}));return{series:i,other:null!==Ie(He(e,"--graph-color-other"))?He(e,"--graph-color-other"):Re({h:s.h,s:.08,l:je(s.l,.42,.62)})}}function We(e,t){try{return Le(getComputedStyle(e),t)}catch{return Le({getPropertyValue:()=>""},t)}}async function Be(e){return e.callWS({type:"energy/get_prefs"})}function Ve(e,t){const o=new Date(e.getTime());switch(t){case"hour":return o.setHours(o.getHours()-1),o;case"day":return o.setDate(o.getDate()-1),o;case"week":return o.setDate(o.getDate()-7),o;case"month":return o.setMonth(o.getMonth()-1),o}}async function Ye(e,t,o,s,i){if(!t.length)return{};return function(e){const t={};for(const[o,s]of Object.entries(e)){if(!s?.length){t[o]=s??[];continue}const e=s.some(e=>"number"==typeof e.change&&Number.isFinite(e.change));if(e){t[o]=s;continue}let i=null;t[o]=s.map(e=>{const t="number"==typeof e.sum&&Number.isFinite(e.sum)?e.sum:null,o=null!==t&&null!==i?t-i:0;return null!==t&&(i=t),{...e,change:o}})}return t}(await e.callWS({type:"recorder/statistics_during_period",start_time:Ve(o,i).toISOString(),end_time:s.toISOString(),statistic_ids:t,period:i,types:["change","sum"],units:{energy:"kWh"}}))}function qe(e){return(e.device_consumption??[]).filter(e=>!e.included_in_stat)}function Je(e){const t={gridFrom:[],gridTo:[],solarFrom:[],batteryFrom:[],batteryTo:[]};for(const o of e.energy_sources??[])if("grid"===o.type){const e=o.flow_from??[],s=o.flow_to??[];for(const o of e)o?.stat_energy_from&&t.gridFrom.push(o.stat_energy_from);for(const e of s)e?.stat_energy_to&&t.gridTo.push(e.stat_energy_to);!t.gridFrom.length&&o.stat_energy_from&&t.gridFrom.push(o.stat_energy_from),!t.gridTo.length&&o.stat_energy_to&&t.gridTo.push(o.stat_energy_to)}else"solar"===o.type?o.stat_energy_from&&t.solarFrom.push(o.stat_energy_from):"battery"===o.type&&(o.stat_energy_from&&t.batteryFrom.push(o.stat_energy_from),o.stat_energy_to&&t.batteryTo.push(o.stat_energy_to));return t}function Ge(e){return"number"==typeof e?e:new Date(e).getTime()}function Ze(e){const t=e.change;return"number"==typeof t&&Number.isFinite(t)?t:0}function Ke(e,t,o){const s=new Array(o.length).fill(0);if(!o.length)return s;for(const i of t)for(const t of e[i]??[]){const e=Xe(o,Ge(t.start));e>=0&&(s[e]+=Ze(t))}return s}function Xe(e,t){let o=0,s=e.length-1;for(;o<=s;){const i=o+s>>1,r=e[i];if(t<r.start.getTime())s=i-1;else{if(!(t>=r.end.getTime()))return i;o=i+1}}return-1}function Qe(e,t,o,s){const i=o.getTime(),r=s.getTime();let n=0;for(const o of t)for(const t of e[o]??[]){const e=Ge(t.start),o=void 0!==t.end?Ge(t.end):e;if(o<=i||e>=r)continue;const s=Ze(t),a=o-e;if(a<=0){n+=s;continue}const c=Math.min(o,r)-Math.max(e,i);n+=s*Math.min(1,Math.max(0,c/a))}return n}function et(e,t,o,s,i,r){if("devices"===o)return Qe(e,r,s,i);const n=Qe(e,t.gridFrom,s,i);return"grid"===o?n:Math.max(0,n-Qe(e,t.gridTo,s,i)+Qe(e,t.solarFrom,s,i)+Qe(e,t.batteryFrom,s,i)-Qe(e,t.batteryTo,s,i))}function tt({prefs:e,stats:t,buckets:o,config:s,palette:i}){const r=new Map((s.devices??[]).map(e=>[e.stat,e])),n=s.total_mode??"grid",a=qe(e).filter(e=>!r.get(e.stat_consumption)?.hidden);let c=a.map((e,s)=>{const n=r.get(e.stat_consumption),a=Ke(t,[e.stat_consumption],o);return{key:e.stat_consumption,name:n?.name||e.name||e.stat_consumption,color:n?.color||i.series[s%i.series.length],values:a,total:a.reduce((e,t)=>e+t,0)}});c.sort((e,t)=>t.total-e.total);const l=s.max_devices??8;let h=new Array(o.length).fill(0);if(l>0&&c.length>l){const e=c.slice(l);c=c.slice(0,l),h=o.map((t,o)=>e.reduce((e,t)=>e+t.values[o],0))}const d=o.map((e,t)=>c.reduce((e,o)=>e+o.values[t],0)+h[t]),u=function(e,t,o,s,i){if("devices"===o)return i.slice();const r=Ke(e,t.gridFrom,s);if("grid"===o)return r;const n=Ke(e,t.gridTo,s),a=Ke(e,t.solarFrom,s),c=Ke(e,t.batteryFrom,s),l=Ke(e,t.batteryTo,s);return r.map((e,t)=>Math.max(0,e-n[t]+a[t]+c[t]-l[t]))}(t,Je(e),n,o,d),p=!1!==s.show_other&&"devices"!==n;if(p||h.some(e=>e>0)){const e=u.map((e,t)=>Math.max(0,(p?e-d[t]:0)+h[t])),t=e.reduce((e,t)=>e+t,0);t>0&&c.push({key:"__other__",name:s.other_name||"Other",color:s.other_color||i.other,values:e,total:t})}const m=o.map((e,t)=>c.reduce((e,o)=>e+o.values[t],0));return{buckets:o,series:c,totals:m.map((e,t)=>Math.max(e,u[t]))}}let ot=class extends me{constructor(){super(...arguments),this._period="week",this._total=0,this._comparison=null,this._loading=!0,this._width=0,this._height=0,this._hover=null,this._totalStatIds=[],this._sourceTypes=[],this._usedDeviceFallback=!1,this._fetchToken=0}static async getConfigElement(){return await Promise.resolve().then(function(){return lt}),document.createElement(t)}static getStubConfig(){return{type:`custom:${e}`,icon:"mdi:lightning-bolt",periods:["day","week","month","year"],default_period:"week",show_comparison:!0,show_legend:!0}}setConfig(e){if(!e)throw new Error("Invalid configuration");const t=(e.periods?.length?e.periods:o).filter(e=>o.includes(e));if(!t.length)throw new Error("At least one time period must be enabled");this._config={...e,periods:t};const s=e.default_period&&t.includes(e.default_period)?e.default_period:t[0];this._period=s,this._loading=!0,this._load()}getCardSize(){return 6}getGridOptions(){return{rows:6,columns:12,min_rows:4,min_columns:6}}getLayoutOptions(){return{grid_rows:6,grid_columns:12,grid_min_rows:4,grid_min_columns:6}}connectedCallback(){super.connectedCallback(),this._resizeObserver=new ResizeObserver(e=>{for(const t of e)this._width=Math.floor(t.contentRect.width),this._height=Math.floor(t.contentRect.height)}),this._timer=window.setInterval(()=>{this._load()},3e5)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),this._resizeObserver=void 0,this._timer&&window.clearInterval(this._timer),this._timer=void 0}firstUpdated(){const e=this.renderRoot.querySelector(".chart");e&&this._resizeObserver&&this._resizeObserver.observe(e)}updated(e){if(!e.has("hass")||!this.hass)return;const t=e.get("hass");t&&t.themes===this.hass.themes||this._load()}get _firstDayOfWeek(){return function(e,t){if("monday"===e)return 1;if("sunday"===e)return 0;try{const e=new Intl.Locale(t||navigator.language||"en-GB"),o="function"==typeof e.getWeekInfo?e.getWeekInfo():e.weekInfo;if(7===o?.firstDay)return 0;if(1===o?.firstDay)return 1}catch{}return 1}(this._config?.first_day_of_week,this.hass?.locale?.language??this.hass?.language)}async _load(){const e=this.hass,t=this._config;if(!e||!t)return;const o=++this._fetchToken;try{const s=await Be(e),i=t.total_mode??"grid",r=this._period,n=this._firstDayOfWeek,a=new Date,c=function(e,t,o){const{start:s,end:i}=Ae(e,t,o),r=[];if("day"===t){for(let e=0;e<24;e++){const t=new Date(s.getTime());t.setHours(e,0,0,0);const o=new Date(t.getTime());o.setHours(e+1,0,0,0),r.push({start:t,end:o,label:String(e).padStart(2,"0")})}return r}if("week"===t){for(let e=0;e<7;e++){const t=new Date(s.getTime());t.setDate(s.getDate()+e);const o=new Date(t.getTime());o.setDate(t.getDate()+1),r.push({start:t,end:o,label:Se[t.getDay()]})}return r}if("month"===t){let e=new Date(s.getTime());for(;e.getTime()<i.getTime();){const t=7-(e.getDay()-o+7)%7,s=new Date(e.getTime());s.setDate(e.getDate()+t);const n=s.getTime()>i.getTime()?new Date(i.getTime()):s;r.push({start:new Date(e.getTime()),end:n,label:String(e.getDate())}),e=n}return r}for(let e=0;e<12;e++){const t=new Date(s.getFullYear(),e,1,0,0,0,0),o=new Date(s.getFullYear(),e+1,1,0,0,0,0);r.push({start:t,end:o,label:Ee[e]})}return r}(a,r,n),{start:l,end:h}=Ae(a,r,n),d=function(e){switch(e){case"day":return"hour";case"week":case"month":return"day";case"year":return"month"}}(r),u=qe(s),p=u.map(e=>e.stat_consumption),m=Je(s),g=function(e,t){return"devices"===t?[]:"home"===t?[...e.gridFrom,...e.gridTo,...e.solarFrom,...e.batteryFrom,...e.batteryTo]:e.gridFrom}(m,i);if(!p.length&&!g.length)throw new Error("No energy sources or devices are configured in the Energy dashboard.");this._totalStatIds=g,this._sourceTypes=function(e){return Array.from(new Set((e.energy_sources??[]).map(e=>e?.type).filter(Boolean)))}(s);const f=Array.from(new Set([...p,...g])),_=await Ye(e,f,l,h,d);if(o!==this._fetchToken)return;const v=tt({prefs:s,stats:_,buckets:c,config:t,palette:We(this,u.length)});let y=et(_,m,i,l,a,p);const $=Qe(_,p,l,a);this._usedDeviceFallback=y<=0&&$>0,this._usedDeviceFallback&&(y=$);let b=null;if(!1!==t.show_comparison&&(b=await this._loadComparison(e,{now:a,period:r,fdow:n,mode:i,sources:m,deviceIds:p,totalIds:g,statsPeriod:d,current:y}),o!==this._fetchToken))return;this._data=v,this._total=y,this._comparison=b,this._error=void 0,this._loading=!1}catch(e){if(o!==this._fetchToken)return;this._error=e instanceof Error?e.message:String(e),this._loading=!1}}async _loadComparison(e,t){const o=this._config.comparison_mode??"like_for_like",s=function(e,t,o,s){const i=xe(be(e,t,s),t);return"like_for_like"===o?{start:i,end:ke(xe(e,t),i,t)}:{start:i,end:we(i,t)}}(t.now,t.period,o,t.fdow),i=be(s.start,t.period,t.fdow),r=we(i,t.period),n="devices"===t.mode?t.deviceIds:t.totalIds;if(!n.length)return null;const a=et(await Ye(e,n,i,r,t.statsPeriod),t.sources,t.mode,s.start,s.end,t.deviceIds);if(a<=0)return null;return(("projected"===o?t.current/function(e,t,o){const{start:s,end:i}=Ae(e,t,o),r=i.getTime()-s.getTime();if(r<=0)return 1;const n=(e.getTime()-s.getTime())/r;return Math.min(1,Math.max(1e-6,n))}(t.now,t.period,t.fdow):t.current)-a)/a*100}_cyclePeriod(){const e=this._config?.periods??o,t=e.indexOf(this._period);this._period=e[(t+1)%e.length],this._hover=null,this._loading=!0,this._load()}_comparisonText(){const e=this._config?.comparison_mode??"like_for_like",t=i[this._period];return"projected"===e?`projected vs ${t}`:`vs ${t}`}render(){const e=this._config;return e?G`
      <ha-card>
        <div class="root">
          <div class="header">
            <div class="summary">
              ${e.icon?G`<ha-icon class="icon" .icon=${e.icon}></ha-icon>`:X}
              <div class="figures">
                <div class="value">
                  <span class="number">${Ue(this._total,this.hass?.locale?.language)}</span>
                  <span class="unit">kWh</span>
                </div>
                ${this._renderComparison()}
              </div>
            </div>
            <button
              class="period"
              @click=${this._cyclePeriod}
              aria-label=${`Time period: ${s[this._period]}. Click to change.`}
            >
              ${s[this._period]}
            </button>
          </div>
          ${this._renderNotice()}
          ${this._renderBody()}
          ${!1!==e.show_legend?this._renderLegend():X}
        </div>
      </ha-card>
    `:X}_renderComparison(){if(!1===this._config?.show_comparison)return X;if(null===this._comparison)return X;const e=this._comparison>0?"up":this._comparison<0?"down":"flat";return G`
      <div class="comparison ${e}">
        <span class="delta">${function(e){const t=Math.round(e);return`${t>0?"+":""}${t}%`}(this._comparison)}</span>
        <span class="against">${this._comparisonText()}</span>
      </div>
    `}_renderNotice(){if(this._error||!this._data||!this._usedDeviceFallback)return X;const e=this._totalStatIds.length?G`no data came back for <code>${this._totalStatIds.join(", ")}</code>`:G`no grid consumption source was found${this._sourceTypes.length?G` (configured sources: ${this._sourceTypes.join(", ")})`:X}`;return G`
      <div class="notice">Showing the device total only — ${e}.</div>
    `}_renderBody(){if(this._error)return G`<div class="chart error"><div class="message">${this._error}</div></div>`;const e=this._height,t=this._data;return G`
      <div class="chart">
        ${t&&this._width>0&&e>0?ze(t,{width:this._width,height:e,rounded:!1!==this._config?.rounded_bars,unit:"kWh",activeIndex:this._hover,onHover:e=>{this._hover=e},onSelect:e=>{this._hover=this._hover===e?null:e}}):G`<div class="message">${this._loading?"Loading…":""}</div>`}
        ${this._renderTooltip()}
      </div>
    `}_renderTooltip(){const e=this._data,t=this._hover;if(!e||null===t||!this._width)return X;const o=e.buckets[t];if(!o)return X;const s=Math.max(1,this._width-Me-Te)/Math.max(1,e.buckets.length),i=Me+s*t+s/2,r=Math.min(Math.max(i,90),Math.max(90,this._width-90)),n=e.series.filter(e=>e.values[t]>0);return G`
      <div class="tooltip" style=${`left:${r}px`}>
        <div class="tt-head">
          <span>${this._tooltipTitle(o.start)}</span>
          <span class="tt-total">${Ue(e.totals[t])} kWh</span>
        </div>
        ${n.length?n.map(e=>G`
                <div class="tt-row">
                  <span class="swatch" style=${`background:${e.color}`}></span>
                  <span class="tt-name">${e.name}</span>
                  <span class="tt-value">${Ue(e.values[t])}</span>
                </div>
              `):G`<div class="tt-row tt-empty">No consumption</div>`}
      </div>
    `}_tooltipTitle(e){const t=this.hass?.locale?.language;switch(this._period){case"day":return e.toLocaleTimeString(t,{hour:"2-digit",minute:"2-digit"});case"week":return e.toLocaleDateString(t,{weekday:"long"});case"month":return e.toLocaleDateString(t,{day:"numeric",month:"short"});case"year":return e.toLocaleDateString(t,{month:"long"})}}_renderLegend(){const e=this._data;return e&&e.series.length?G`
      <div class="legend">
        ${e.series.map(e=>G`
            <div class="legend-item">
              <span class="swatch" style=${`background:${e.color}`}></span>
              <span class="legend-name">${e.name}</span>
              <span class="legend-value">${Ue(e.total)}</span>
            </div>
          `)}
      </div>
    `:X}};ot.styles=d`
    :host {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      /* The sections grid sizes the element around us, so take its height and
         let the flex chain below distribute it. */
      height: 100%;
      /* Floor for layouts that do not give the card a height of its own. */
      min-height: var(--ebc-min-height, 240px);
      --ebc-empty-bar: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
      --ebc-grid: color-mix(in srgb, var(--secondary-text-color) 45%, transparent);
      --ebc-icon-color: var(--primary-text-color);
      --ebc-icon-size: 1.6em;
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
      --mdc-icon-size: var(--ebc-icon-size);
      width: var(--ebc-icon-size);
      height: var(--ebc-icon-size);
      color: var(--ebc-icon-color);
      flex: 0 0 auto;
      /* Optically centred on the headline figure beside it. */
      margin-top: 0.22em;
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
      flex: 0 0 auto;
      font-size: 0.78em;
      line-height: 1.3;
      color: var(--warning-color, #ffa726);
    }
    .notice code {
      font-size: 0.95em;
      word-break: break-all;
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
  `,r([ye({attribute:!1})],ot.prototype,"hass",void 0),r([$e()],ot.prototype,"_config",void 0),r([$e()],ot.prototype,"_period",void 0),r([$e()],ot.prototype,"_data",void 0),r([$e()],ot.prototype,"_total",void 0),r([$e()],ot.prototype,"_comparison",void 0),r([$e()],ot.prototype,"_error",void 0),r([$e()],ot.prototype,"_loading",void 0),r([$e()],ot.prototype,"_width",void 0),r([$e()],ot.prototype,"_height",void 0),r([$e()],ot.prototype,"_hover",void 0),r([$e()],ot.prototype,"_totalStatIds",void 0),r([$e()],ot.prototype,"_sourceTypes",void 0),r([$e()],ot.prototype,"_usedDeviceFallback",void 0),ot=r([fe(e)],ot);const st=window;st.customCards=st.customCards||[],st.customCards.push({type:e,name:"Energy Breakdown Card",description:"Stacked per-device energy consumption from the Energy dashboard, with day/week/month/year drill-down.",preview:!0,documentationURL:"https://github.com/fwhitten/energy-breakdown-card"}),console.info("%c ENERGY-BREAKDOWN-CARD %c 1.3.0 ","color: white; background: #7c4dff; font-weight: 700;","color: #7c4dff; background: white; font-weight: 700;");const it={icon:"Icon",default_period:"Default time period",periods:"Selectable time periods",total_mode:"Consumption figure",comparison_mode:"Comparison baseline",show_comparison:"Show comparison to previous period",show_legend:"Show legend",show_other:'Show "Other" remainder',other_name:'"Other" label',max_devices:"Maximum devices shown",rounded_bars:"Rounded bars",first_day_of_week:"First day of week"},rt=[{name:"icon",selector:{icon:{}}},{name:"periods",selector:{select:{multiple:!0,mode:"list",options:o.map(e=>({value:e,label:s[e]}))}}},{type:"grid",name:"",schema:[{name:"default_period",selector:{select:{mode:"dropdown",options:o.map(e=>({value:e,label:s[e]}))}}},{name:"total_mode",selector:{select:{mode:"dropdown",options:[{value:"grid",label:"Grid import"},{value:"home",label:"Home consumption (grid + solar + battery)"},{value:"devices",label:"Sum of devices"}]}}}]},{name:"show_comparison",selector:{boolean:{}}},{name:"comparison_mode",selector:{select:{mode:"dropdown",options:[{value:"like_for_like",label:"Same elapsed time in previous period"},{value:"full_previous",label:"Whole previous period"},{value:"projected",label:"Projected period vs whole previous period"}]}}},{name:"show_other",selector:{boolean:{}}},{type:"grid",name:"",schema:[{name:"show_legend",selector:{boolean:{}}},{name:"rounded_bars",selector:{boolean:{}}}]},{type:"grid",name:"",schema:[{name:"first_day_of_week",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Follow language"},{value:"monday",label:"Monday"},{value:"sunday",label:"Sunday"}]}}}]},{name:"max_devices",selector:{number:{min:1,max:20,mode:"box"}}}];let nt=class extends me{constructor(){super(...arguments),this._devices=[]}setConfig(e){this._config=e,this._loadDevices()}async _loadDevices(){if(this.hass&&!this._devices.length)try{const e=await Be(this.hass);this._devices=qe(e),this._devicesError=void 0}catch(e){this._devicesError="Could not read the Energy dashboard configuration. Set it up under Settings → Dashboards → Energy."}}updated(){this._loadDevices()}get _data(){const e=this._config;return{show_comparison:!0,show_legend:!0,show_other:!0,rounded_bars:!0,comparison_mode:"like_for_like",total_mode:"grid",first_day_of_week:"auto",max_devices:8,periods:o,...e}}_emit(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}_valueChanged(e){e.stopPropagation();const t={...e.detail.value};t.periods?.length&&t.default_period&&!t.periods.includes(t.default_period)&&(t.default_period=t.periods[0]),this._emit(t)}_updateDevice(e,t){const o=this._data,s=[...o.devices??[]],i=s.findIndex(t=>t.stat===e),r={...i>=0?s[i]:{stat:e},...t},n=!r.name&&!r.color&&!r.hidden;i>=0?n?s.splice(i,1):s[i]=r:n||s.push(r);const a={...o};s.length?a.devices=s:delete a.devices,this._emit(a)}_updateConfig(e){const t={...this._data,...e};for(const o of Object.keys(e))void 0===t[o]&&delete t[o];this._emit(t)}_override(e){return(this._config?.devices??[]).find(t=>t.stat===e)}render(){return this._config&&this.hass?G`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${rt}
          .computeLabel=${e=>it[e.name]??e.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
        ${this._renderDevices()}
      </div>
    `:X}_renderDevices(){const e=We(this,this._devices.length);return G`
      <div class="devices">
        <h4>Devices</h4>
        ${this._devicesError?G`<div class="warning">${this._devicesError}</div>`:0===this._devices.length?G`<div class="hint">
                No individual devices are configured in the Energy dashboard yet.
              </div>`:G`<div class="hint">
                  Rename, recolour or hide any device from the Energy dashboard. Each field is
                  labelled with the name the Energy dashboard uses; type to override it.
                </div>
                ${this._devices.map((t,o)=>this._renderDevice(t,o,e.series))}`}
        ${!1!==this._data.show_other?this._renderOtherRow():X}
      </div>
    `}_renderOtherRow(){const e=this._data;return G`
      <div class="device">
        <input
          class="color"
          type="color"
          .value=${e.other_color||We(this,this._devices.length).other}
          title="Colour"
          @change=${e=>this._updateConfig({other_color:e.target.value})}
        />
        <div class="field">
          <span class="dev-name">Other</span>
          <input
            class="rename"
            type="text"
            placeholder="Other"
            .value=${e.other_name??""}
            @change=${e=>this._updateConfig({other_name:e.target.value||void 0})}
          />
        </div>
        <span class="spacer"></span>
      </div>
    `}_renderDevice(e,t,o){const s=e.stat_consumption,i=this._override(s),r=i?.color||o[t%o.length];return G`
      <div class="device ${i?.hidden?"hidden":""}">
        <input
          class="color"
          type="color"
          .value=${r}
          title="Colour"
          @change=${e=>this._updateDevice(s,{color:e.target.value})}
        />
        <div class="field">
          <span class="dev-name" title=${s}>${e.name||s}</span>
          <input
            class="rename"
            type="text"
            placeholder=${e.name||s}
            .value=${i?.name??""}
            @change=${e=>this._updateDevice(s,{name:e.target.value||void 0})}
          />
        </div>
        <ha-icon-button
          .path=${i?.hidden?ct:at}
          .label=${i?.hidden?"Show device":"Hide device"}
          @click=${()=>this._updateDevice(s,{hidden:!i?.hidden||void 0})}
        ></ha-icon-button>
      </div>
    `}};nt.styles=d`
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
      gap: 10px;
      margin-bottom: 10px;
    }
    .device.hidden .field {
      opacity: 0.5;
    }
    .field {
      flex: 1 1 auto;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .dev-name {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    /* Native inputs, so the rows do not depend on which Home Assistant
       form components happen to be loaded in the editor. */
    input.rename {
      width: 100%;
      box-sizing: border-box;
      font: inherit;
      padding: 7px 9px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #444);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
      color: var(--primary-text-color);
    }
    input.rename:focus {
      outline: none;
      border-color: var(--primary-color);
    }
    .spacer {
      inline-size: 48px;
      flex: 0 0 auto;
    }
    input.color {
      inline-size: 36px;
      block-size: 36px;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
      flex: 0 0 auto;
    }
  `,r([$e()],nt.prototype,"_config",void 0),r([$e()],nt.prototype,"_devices",void 0),r([$e()],nt.prototype,"_devicesError",void 0),nt=r([fe(t)],nt);const at="M12 9a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z",ct="M11.83 9 15 12.16V12a3 3 0 0 0-3-3h-.17m-4.3.8 1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28.46.46A11.8 11.8 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7Z";var lt=Object.freeze({__proto__:null,get EnergyBreakdownCardEditor(){return nt}});
