const t="energy-breakdown-card",e="energy-breakdown-card-editor",o="power-breakdown-card",i="power-breakdown-card-editor",s=["day","week","month","year"],r={day:"Day",week:"Week",month:"Month",year:"Year"},n={day:"yesterday",week:"last week",month:"last month",year:"last year"},a="__other__";function l(t,e,o,i){var s,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,o,n):s(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n}"function"==typeof SuppressedError&&SuppressedError;const c=globalThis,d=c.ShadowRoot&&(void 0===c.ShadyCSS||c.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,h=Symbol(),u=new WeakMap;let p=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==h)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(d&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=u.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&u.set(e,t))}return t}toString(){return this.cssText}};const m=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,o,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1],t[0]);return new p(o,t,h)},g=d?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new p("string"==typeof t?t:t+"",void 0,h))(e)})(t):t,{is:f,defineProperty:_,getOwnPropertyDescriptor:v,getOwnPropertyNames:b,getOwnPropertySymbols:y,getPrototypeOf:w}=Object,x=globalThis,$=x.trustedTypes,k=$?$.emptyScript:"",S=x.reactiveElementPolyfillSupport,M=(t,e)=>t,A={toAttribute(t,e){switch(e){case Boolean:t=t?k:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},E=(t,e)=>!f(t,e),D={attribute:!0,type:String,converter:A,reflect:!1,useDefault:!1,hasChanged:E};Symbol.metadata??=Symbol("metadata"),x.litPropertyMetadata??=new WeakMap;let T=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=D){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(t,o,e);void 0!==i&&_(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){const{get:i,set:s}=v(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);s?.call(this,e),this.requestUpdate(t,r,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??D}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;const t=w(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){const t=this.properties,e=[...b(t),...y(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(g(t))}else void 0!==t&&e.push(g(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(d)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const o of e){const e=document.createElement("style"),i=c.litNonce;void 0!==i&&e.setAttribute("nonce",i),e.textContent=o.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(void 0!==i&&!0===o.reflect){const s=(void 0!==o.converter?.toAttribute?o.converter:A).toAttribute(e,o.type);this._$Em=t,null==s?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(t,e){const o=this.constructor,i=o._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=o.getPropertyOptions(i),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:A;this._$Em=i;const r=s.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,o,i=!1,s){if(void 0!==t){const r=this.constructor;if(!1===i&&(s=this[t]),o??=r.getPropertyOptions(t),!((o.hasChanged??E)(s,e)||o.useDefault&&o.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,o))))return;this.C(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:i,wrapped:s},r){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==s||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t){const{wrapped:t}=o,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,o,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};T.elementStyles=[],T.shadowRootOptions={mode:"open"},T[M("elementProperties")]=new Map,T[M("finalized")]=new Map,S?.({ReactiveElement:T}),(x.reactiveElementVersions??=[]).push("2.1.2");const C=globalThis,z=t=>t,O=C.trustedTypes,P=O?O.createPolicy("lit-html",{createHTML:t=>t}):void 0,N="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,F="?"+I,L=`<${F}>`,U=document,H=()=>U.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,B=Array.isArray,j="[ \t\n\f\r]",W=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,q=/-->/g,G=/>/g,Y=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),V=/'/g,Z=/"/g,J=/^(?:script|style|textarea|title)$/i,K=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),X=K(1),Q=K(2),tt=Symbol.for("lit-noChange"),et=Symbol.for("lit-nothing"),ot=new WeakMap,it=U.createTreeWalker(U,129);function st(t,e){if(!B(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==P?P.createHTML(e):e}const rt=(t,e)=>{const o=t.length-1,i=[];let s,r=2===e?"<svg>":3===e?"<math>":"",n=W;for(let e=0;e<o;e++){const o=t[e];let a,l,c=-1,d=0;for(;d<o.length&&(n.lastIndex=d,l=n.exec(o),null!==l);)d=n.lastIndex,n===W?"!--"===l[1]?n=q:void 0!==l[1]?n=G:void 0!==l[2]?(J.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=Y):void 0!==l[3]&&(n=Y):n===Y?">"===l[0]?(n=s??W,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?Y:'"'===l[3]?Z:V):n===Z||n===V?n=Y:n===q||n===G?n=W:(n=Y,s=void 0);const h=n===Y&&t[e+1].startsWith("/>")?" ":"";r+=n===W?o+L:c>=0?(i.push(a),o.slice(0,c)+N+o.slice(c)+I+h):o+I+(-2===c?e:h)}return[st(t,r+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class nt{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let s=0,r=0;const n=t.length-1,a=this.parts,[l,c]=rt(t,e);if(this.el=nt.createElement(l,o),it.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=it.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(N)){const e=c[r++],o=i.getAttribute(t).split(I),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:n[2],strings:o,ctor:"."===n[1]?ht:"?"===n[1]?ut:"@"===n[1]?pt:dt}),i.removeAttribute(t)}else t.startsWith(I)&&(a.push({type:6,index:s}),i.removeAttribute(t));if(J.test(i.tagName)){const t=i.textContent.split(I),e=t.length-1;if(e>0){i.textContent=O?O.emptyScript:"";for(let o=0;o<e;o++)i.append(t[o],H()),it.nextNode(),a.push({type:2,index:++s});i.append(t[e],H())}}}else if(8===i.nodeType)if(i.data===F)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=i.data.indexOf(I,t+1));)a.push({type:7,index:s}),t+=I.length-1}s++}}static createElement(t,e){const o=U.createElement("template");return o.innerHTML=t,o}}function at(t,e,o=t,i){if(e===tt)return e;let s=void 0!==i?o._$Co?.[i]:o._$Cl;const r=R(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(t),s._$AT(t,o,i)),void 0!==i?(o._$Co??=[])[i]=s:o._$Cl=s),void 0!==s&&(e=at(t,s._$AS(t,e.values),s,i)),e}class lt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,i=(t?.creationScope??U).importNode(e,!0);it.currentNode=i;let s=it.nextNode(),r=0,n=0,a=o[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new ct(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new mt(s,this,t)),this._$AV.push(e),a=o[++n]}r!==a?.index&&(s=it.nextNode(),r++)}return it.currentNode=U,i}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class ct{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,i){this.type=2,this._$AH=et,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=at(this,t,e),R(t)?t===et||null==t||""===t?(this._$AH!==et&&this._$AR(),this._$AH=et):t!==this._$AH&&t!==tt&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>B(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==et&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,i="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=nt.createElement(st(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new lt(i,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=ot.get(t.strings);return void 0===e&&ot.set(t.strings,e=new nt(t)),e}k(t){B(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,i=0;for(const s of t)i===e.length?e.push(o=new ct(this.O(H()),this.O(H()),this,this.options)):o=e[i],o._$AI(s),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=z(t).nextSibling;z(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class dt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,i,s){this.type=1,this._$AH=et,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=s,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=et}_$AI(t,e=this,o,i){const s=this.strings;let r=!1;if(void 0===s)t=at(this,t,e,0),r=!R(t)||t!==this._$AH&&t!==tt,r&&(this._$AH=t);else{const i=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=at(this,i[o+n],e,n),a===tt&&(a=this._$AH[n]),r||=!R(a)||a!==this._$AH[n],a===et?t=et:t!==et&&(t+=(a??"")+s[n+1]),this._$AH[n]=a}r&&!i&&this.j(t)}j(t){t===et?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ht extends dt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===et?void 0:t}}class ut extends dt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==et)}}class pt extends dt{constructor(t,e,o,i,s){super(t,e,o,i,s),this.type=5}_$AI(t,e=this){if((t=at(this,t,e,0)??et)===tt)return;const o=this._$AH,i=t===et&&o!==et||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==et&&(o===et||i);i&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class mt{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){at(this,t)}}const gt=C.litHtmlPolyfillSupport;gt?.(nt,ct),(C.litHtmlVersions??=[]).push("3.3.3");const ft=globalThis;class _t extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const i=o?.renderBefore??e;let s=i._$litPart$;if(void 0===s){const t=o?.renderBefore??null;i._$litPart$=s=new ct(e.insertBefore(H(),t),t,void 0,o??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return tt}}_t._$litElement$=!0,_t.finalized=!0,ft.litElementHydrateSupport?.({LitElement:_t});const vt=ft.litElementPolyfillSupport;vt?.({LitElement:_t}),(ft.litElementVersions??=[]).push("4.2.2");const bt=t=>(e,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},yt={attribute:!0,type:String,converter:A,reflect:!1,hasChanged:E},wt=(t=yt,e,o)=>{const{kind:i,metadata:s}=o;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),r.set(o.name,t),"accessor"===i){const{name:i}=o;return{set(o){const s=e.get.call(this);e.set.call(this,o),this.requestUpdate(i,s,t,!0,o)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=o;return function(o){const s=this[i];e.call(this,o),this.requestUpdate(i,s,t,!0,o)}}throw Error("Unsupported decorator location: "+i)};function xt(t){return(e,o)=>"object"==typeof o?wt(t,e,o):((t,e,o)=>{const i=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),i?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}function $t(t){return xt({...t,state:!0,attribute:!1})}function kt(t,e,o=1){const i=new Date(t.getTime());switch(i.setHours(0,0,0,0),e){case"day":return i;case"week":{const t=(i.getDay()-o+7)%7;return i.setDate(i.getDate()-t),i}case"month":return i.setDate(1),i;case"year":return i.setMonth(0,1),i}}function St(t,e){const o=new Date(t.getTime());switch(e){case"day":o.setDate(o.getDate()+1);break;case"week":o.setDate(o.getDate()+7);break;case"month":o.setMonth(o.getMonth()+1);break;case"year":o.setFullYear(o.getFullYear()+1)}return o}function Mt(t,e){const o=new Date(t.getTime());switch(e){case"day":return o.setDate(o.getDate()-1),o;case"week":return o.setDate(o.getDate()-7),o;case"month":{const t=o.getDate();o.setDate(1),o.setMonth(o.getMonth()-1);const e=new Date(o.getFullYear(),o.getMonth()+1,0).getDate();return o.setDate(Math.min(t,e)),o}case"year":{const t=o.getDate();o.setDate(1),o.setFullYear(o.getFullYear()-1);const e=new Date(o.getFullYear(),o.getMonth()+1,0).getDate();return o.setDate(Math.min(t,e)),o}}}function At(t,e,o){const i=St(e,o);return t.getTime()>i.getTime()?i:t.getTime()<e.getTime()?e:t}const Et=["S","M","T","W","T","F","S"],Dt=["J","F","M","A","M","J","J","A","S","O","N","D"];function Tt(t,e,o){const{start:i,end:s}=function(t,e,o){const i=kt(t,e,o);return{start:i,end:St(i,e)}}(t,e,o),r=[];if("day"===e){for(let t=0;t<24;t++){const e=new Date(i.getTime());e.setHours(t,0,0,0);const o=new Date(e.getTime());o.setHours(t+1,0,0,0),r.push({start:e,end:o,label:String(t).padStart(2,"0")})}return r}if("week"===e){for(let t=0;t<7;t++){const e=new Date(i.getTime());e.setDate(i.getDate()+t);const o=new Date(e.getTime());o.setDate(e.getDate()+1),r.push({start:e,end:o,label:Et[e.getDay()]})}return r}if("month"===e){let t=new Date(i.getTime());for(;t.getTime()<s.getTime();){const e=7-(t.getDay()-o+7)%7,i=new Date(t.getTime());i.setDate(t.getDate()+e);const n=i.getTime()>s.getTime()?new Date(s.getTime()):i;r.push({start:new Date(t.getTime()),end:n,label:String(t.getDate())}),t=n}return r}for(let t=0;t<12;t++){const e=new Date(i.getFullYear(),t,1,0,0,0,0),o=new Date(i.getFullYear(),t+1,1,0,0,0,0);r.push({start:e,end:o,label:Dt[t]})}return r}const Ct=[1,1.2,1.5,2,2.5,3,4,5,6,8,10];function zt(t,e=4){if(!Number.isFinite(t)||t<=0)return e;const o=1.02*t/e,i=Math.pow(10,Math.floor(Math.log10(o))),s=o/i,r=Ct.find(t=>s<=t)??10;return r*i*e}function Ot(t,e=1){if(0===t)return"0";if(Math.abs(t)>=1e3){const e=t/1e3;return Math.round(10*e)/10+"k"}let o=Math.max(0,Math.ceil(-Math.log10(e)));const i=Number((e*Math.pow(10,o)).toFixed(6));return Number.isInteger(i)||(o+=1),t.toFixed(Math.min(4,o))}function Pt(t,e,o){const i=Math.max(1,o-10-22),s=i<110?2:4,r=zt(Math.max(...t.totals,0),s),n=r/s;let a=1;for(let t=0;t<=s;t++)a=Math.max(a,Ot(n*t,n).length);const l=Math.min(60,Math.round(7*a)+8),c=Math.max(1,e-l);return{padLeft:l,plotW:c,plotH:i,slot:c/Math.max(1,t.buckets.length),max:r,divisions:s,step:n}}function Nt(t,e){const{width:o,height:i}=e,{padLeft:s,plotH:r,slot:n,max:a,divisions:l,step:c}=Pt(t,o,i),d=10+r,h=t.buckets.length,u=Math.max(2,.62*n),p=e.rounded?Math.min(u/2,4):0,m=function(t){return t<=8?1:t<=14?2:t<=24?3:Math.ceil(t/8)}(h),g=t=>d-t/a*r,f=[];for(let t=0;t<=l;t++){const e=c*t,i=g(e);f.push(Q`
      <line class="grid" x1=${s} x2=${o} y1=${i} y2=${i} />
      <text class="tick" x="0" y=${i+4} text-anchor="start">${Ot(e,c)}</text>
    `)}const _=t.buckets.map((o,i)=>{const l=s+n*i+n/2-u/2,c=t.totals[i],h=g(c),m=Math.max(0,d-h),f=`clip-${i}`,_=null!==e.activeIndex&&e.activeIndex!==i;let v=d;const b=t.series.map(t=>{const e=t.values[i]/a*r,o=v-e;return v=o,e<=0?Q``:Q`<rect x=${l} y=${o} width=${u} height=${e} fill=${t.color} />`}),y=v-h;return Q`
      <g class=${_?"bar dimmed":"bar"}>
        <defs>
          <clipPath id=${f}>
            <rect x=${l} y=${h} width=${u} height=${m+p} rx=${p} ry=${p} />
          </clipPath>
        </defs>
        <g clip-path=${`url(#${f})`}>
          ${m>0?Q`<rect x=${l} y=${h} width=${u} height=${m} fill="var(--ebc-empty-bar)" />`:Q``}
          ${b}
          ${y>.5?Q`<rect x=${l} y=${h} width=${u} height=${y} fill="var(--ebc-empty-bar)" />`:Q``}
        </g>
        <rect
          class="hit"
          x=${s+n*i}
          y=${10}
          width=${n}
          height=${r}
          @pointerenter=${()=>e.onHover(i)}
          @pointerleave=${()=>e.onHover(null)}
          @click=${()=>e.onSelect(i)}
        />
      </g>
    `}),v=t.buckets.map((t,e)=>{if(e%m!==0)return Q``;return Q`<text class="xlabel" x=${s+n*e+n/2} y=${i-6} text-anchor="middle">${t.label}</text>`});return Q`
    <svg
      viewBox=${`0 0 ${o} ${i}`}
      width=${o}
      height=${i}
      role="img"
      aria-label="Energy consumption by period"
    >
      ${f}
      ${_}
      ${v}
    </svg>
  `}function It(t,e){if(0===t)return"0";const o=Math.abs(t),i=o>=10?0:o>=1?1:2;return new Intl.NumberFormat(e||void 0,{minimumFractionDigits:i,maximumFractionDigits:i}).format(t)}function Ft(t,e){if(null===t||!Number.isFinite(t))return"—";const o=Math.abs(t);if(o<1e3){const i=0===o||o>=1?0:2;return`${new Intl.NumberFormat(e||void 0,{maximumFractionDigits:i}).format(t)} W`}const i=t/1e3,s=Math.abs(i)>=100?0:Math.abs(i)>=10?1:2;return`${new Intl.NumberFormat(e||void 0,{maximumFractionDigits:s}).format(i)} kW`}const Lt=["--energy-grid-consumption-color","--accent-color","--primary-color","--label-badge-blue"];function Ut(t,e){const o=t.getPropertyValue(e).trim();return o.startsWith("var(")?"":o}function Ht(t){const e=t.trim().toLowerCase();if(!e)return null;let o,i,s;const r=e.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);if(r){const t=r[1];3===t.length?(o=parseInt(t[0]+t[0],16),i=parseInt(t[1]+t[1],16),s=parseInt(t[2]+t[2],16)):(o=parseInt(t.slice(0,2),16),i=parseInt(t.slice(2,4),16),s=parseInt(t.slice(4,6),16))}else{const t=e.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/);if(!t)return null;o=Number(t[1]),i=Number(t[2]),s=Number(t[3])}return[o,i,s].every(t=>Number.isFinite(t))?function(t,e,o){const i=Math.max(t,e,o),s=Math.min(t,e,o),r=(i+s)/2,n=i-s;if(0===n)return{h:0,s:0,l:r};const a=r>.5?n/(2-i-s):n/(i+s);let l;l=i===t?60*((e-o)/n+(e<o?6:0)):i===e?60*((o-t)/n+2):60*((t-e)/n+4);return{h:l,s:a,l:r}}(o/255,i/255,s/255):null}function Rt({h:t,s:e,l:o}){const i=(t%360+360)%360,s=(1-Math.abs(2*o-1))*e,r=s*(1-Math.abs(i/60%2-1)),n=o-s/2,[a,l,c]=i<60?[s,r,0]:i<120?[r,s,0]:i<180?[0,s,r]:i<240?[0,r,s]:i<300?[r,0,s]:[s,0,r],d=t=>Math.round(255*(t+n)).toString(16).padStart(2,"0");return`#${d(a)}${d(l)}${d(c)}`}const Bt=(t,e,o)=>Math.min(o,Math.max(e,t));function jt(t,e){const o=[];for(let i=1;i<=Math.max(e,1);i++){const e=Ut(t,`--graph-color-${i}`);if(!e)break;o.push(e)}const i=Lt.map(e=>Ht(Ut(t,e))).find(t=>null!==t)??Ht("#488fc2"),s=[];for(let t=0;t<e;t++)o.length?s.push(o[t%o.length]):s.push(Rt({h:i.h+137.508*t,s:Bt(i.s*(t%2==1?.82:1),.32,.92),l:Bt(i.l+.09*(t%3-1),.34,.74)}));return{series:s,other:null!==Ht(Ut(t,"--graph-color-other"))?Ut(t,"--graph-color-other"):Rt({h:i.h,s:.08,l:Bt(i.l,.42,.62)})}}function Wt(t,e){try{return jt(getComputedStyle(t),e)}catch{return jt({getPropertyValue:()=>""},e)}}async function qt(t){return t.callWS({type:"energy/get_prefs"})}function Gt(t,e){const o=new Date(t.getTime());switch(e){case"hour":return o.setHours(o.getHours()-1),o;case"day":return o.setDate(o.getDate()-1),o;case"week":return o.setDate(o.getDate()-7),o;case"month":return o.setMonth(o.getMonth()-1),o}}async function Yt(t,e,o,i,s){if(!e.length)return{};return function(t){const e={};for(const[o,i]of Object.entries(t)){if(!i?.length){e[o]=i??[];continue}const t=i.some(t=>"number"==typeof t.change&&Number.isFinite(t.change));if(t){e[o]=i;continue}let s=null;e[o]=i.map(t=>{const e="number"==typeof t.sum&&Number.isFinite(t.sum)?t.sum:null,o=null!==e&&null!==s?e-s:0;return null!==e&&(s=e),{...t,change:o}})}return e}(await t.callWS({type:"recorder/statistics_during_period",start_time:Gt(o,s).toISOString(),end_time:i.toISOString(),statistic_ids:e,period:s,types:["change","sum"],units:{energy:"kWh"}}))}function Vt(t){return(t.device_consumption??[]).filter(t=>!t.included_in_stat)}function Zt(t){const e={gridFrom:[],gridTo:[],solarFrom:[],batteryFrom:[],batteryTo:[]};for(const o of t.energy_sources??[])if("grid"===o.type){const t=o.flow_from??[],i=o.flow_to??[];for(const o of t)o?.stat_energy_from&&e.gridFrom.push(o.stat_energy_from);for(const t of i)t?.stat_energy_to&&e.gridTo.push(t.stat_energy_to);!e.gridFrom.length&&o.stat_energy_from&&e.gridFrom.push(o.stat_energy_from),!e.gridTo.length&&o.stat_energy_to&&e.gridTo.push(o.stat_energy_to)}else"solar"===o.type?o.stat_energy_from&&e.solarFrom.push(o.stat_energy_from):"battery"===o.type&&(o.stat_energy_from&&e.batteryFrom.push(o.stat_energy_from),o.stat_energy_to&&e.batteryTo.push(o.stat_energy_to));return e}function Jt(t){return"number"==typeof t?t:new Date(t).getTime()}function Kt(t){const e=t.change;return"number"==typeof e&&Number.isFinite(e)?e:0}function Xt(t,e,o){const i=new Array(o.length).fill(0);if(!o.length)return i;for(const s of e)for(const e of t[s]??[]){const t=Qt(o,Jt(e.start));t>=0&&(i[t]+=Kt(e))}return i}function Qt(t,e){let o=0,i=t.length-1;for(;o<=i;){const s=o+i>>1,r=t[s];if(e<r.start.getTime())i=s-1;else{if(!(e>=r.end.getTime()))return s;o=s+1}}return-1}function te(t,e,o,i){const s=o.getTime(),r=i.getTime();let n=0;for(const o of e)for(const e of t[o]??[]){const t=Jt(e.start),o=void 0!==e.end?Jt(e.end):t;if(o<=s||t>=r)continue;const i=Kt(e),a=o-t;if(a<=0){n+=i;continue}const l=Math.min(o,r)-Math.max(t,s);n+=i*Math.min(1,Math.max(0,l/a))}return n}function ee(t,e){const o=new Map((e.devices??[]).map(t=>[t.stat,t])),i=Vt(t),s=new Map(i.map((t,e)=>[t.stat_consumption,e])),r=[],n=[];for(const t of i){const e=o.get(t.stat_consumption);e?.excluded?r.push(t.stat_consumption):e?.hidden||n.push(t)}return{all:i,visible:n,excludedIds:r,colorIndex:s}}function oe({prefs:t,stats:e,buckets:o,config:i,palette:s}){const r=new Map((i.devices??[]).map(t=>[t.stat,t])),n=i.total_mode??"grid",{visible:l,excludedIds:c,colorIndex:d}=ee(t,i);let h=l.map(t=>{const i=r.get(t.stat_consumption),n=Xt(e,[t.stat_consumption],o),a=d.get(t.stat_consumption)??0;return{key:t.stat_consumption,name:i?.name||t.name||t.stat_consumption,color:i?.color||s.series[a%s.series.length],values:n,total:n.reduce((t,e)=>t+e,0)}});h.sort((t,e)=>e.total-t.total);const u=i.max_devices??8;let p=new Array(o.length).fill(0);if(u>0&&h.length>u){const t=h.slice(u);h=h.slice(0,u),p=o.map((e,o)=>t.reduce((t,e)=>t+e.values[o],0))}const m=o.map((t,e)=>h.reduce((t,o)=>t+o.values[e],0)+p[e]),g=function(t,e,o,i,s){if("devices"===o)return s.slice();const r=Xt(t,e.gridFrom,i);if("grid"===o)return r;const n=Xt(t,e.gridTo,i),a=Xt(t,e.solarFrom,i),l=Xt(t,e.batteryFrom,i),c=Xt(t,e.batteryTo,i);return r.map((t,e)=>Math.max(0,t-n[e]+a[e]+l[e]-c[e]))}(e,Zt(t),n,o,m),f="devices"===n?o.map(()=>0):Xt(e,c,o),_=g.map((t,e)=>Math.max(0,t-f[e])),v=!1!==i.show_other&&"devices"!==n;if(v||p.some(t=>t>0)){const t=_.map((t,e)=>Math.max(0,(v?t-m[e]:0)+p[e])),e=t.reduce((t,e)=>t+e,0);e>0&&h.push({key:a,name:i.other_name||"Other",color:i.other_color||s.other,values:t,total:e})}const b=o.map((t,e)=>h.reduce((t,o)=>t+o.values[e],0));return{buckets:o,series:h,totals:b.map((t,e)=>Math.max(t,_[e])),sourceTotals:_}}let ie=class extends _t{constructor(){super(...arguments),this._period="week",this._total=0,this._comparison=null,this._loading=!0,this._width=0,this._height=0,this._hover=null,this._totalStatIds=[],this._sourceTypes=[],this._usedDeviceFallback=!1,this._offset=0,this._fetchToken=0}static async getConfigElement(){return await Promise.resolve().then(function(){return Me}),document.createElement(e)}static getStubConfig(){return{type:`custom:${t}`,icon:"mdi:lightning-bolt",show_navigation:!0,show_period_button:!0,periods:["day","week","month","year"],default_period:"week",show_comparison:!0,show_legend:!0}}setConfig(t){if(!t)throw new Error("Invalid configuration");const e=(t.periods?.length?t.periods:s).filter(t=>s.includes(t));if(!e.length)throw new Error("At least one time period must be enabled");this._config={...t,periods:e};const o=t.default_period&&e.includes(t.default_period)?t.default_period:e[0];this._period=o,this._loading=!0,this._load()}getCardSize(){return 6}getGridOptions(){return{rows:6,columns:12,min_rows:4,min_columns:6}}getLayoutOptions(){return{grid_rows:6,grid_columns:12,grid_min_rows:4,grid_min_columns:6}}connectedCallback(){super.connectedCallback(),this._resizeObserver??=new ResizeObserver(()=>this._measure()),this.updateComplete.then(()=>this._observe()),this._timer=window.setInterval(()=>{this._load()},3e5)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),this._timer&&window.clearInterval(this._timer),this._timer=void 0}firstUpdated(){this._observe()}_observe(){const t=this.renderRoot?.querySelector(".chart");t&&this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver.observe(t),this._measure())}_measure(){const t=this.renderRoot?.querySelector(".chart");if(!t)return;const e=t.getBoundingClientRect(),o=Math.round(e.width),i=Math.round(e.height);Math.abs(o-this._width)>1&&(this._width=o),Math.abs(i-this._height)>1&&(this._height=i)}updated(t){if(this._measure(),!t.has("hass")||!this.hass)return;const e=t.get("hass");e&&e.themes===this.hass.themes||this._load()}get _firstDayOfWeek(){return function(t,e){if("monday"===t)return 1;if("sunday"===t)return 0;try{const t=new Intl.Locale(e||navigator.language||"en-GB"),o="function"==typeof t.getWeekInfo?t.getWeekInfo():t.weekInfo;if(7===o?.firstDay)return 0;if(1===o?.firstDay)return 1}catch{}return 1}(this._config?.first_day_of_week,this.hass?.locale?.language??this.hass?.language)}async _load(){const t=this.hass,e=this._config;if(!t||!e)return;const o=++this._fetchToken;try{const i=await qt(t),s=e.total_mode??"grid",r=this._period,n=this._firstDayOfWeek,a=new Date,l=function(t,e,o){const i=new Date(t.getTime());switch(e){case"day":i.setDate(i.getDate()-o);break;case"week":i.setDate(i.getDate()-7*o);break;case"month":i.setMonth(i.getMonth()-o);break;case"year":i.setFullYear(i.getFullYear()-o)}return i}(kt(a,r,n),r,this._offset),c=St(l,r),d=0===this._offset?a:c,h=Tt(l,r,n),u=function(t){switch(t){case"day":return"hour";case"week":case"month":return"day";case"year":return"month"}}(r),{all:p,visible:m,excludedIds:g}=ee(i,e),f=p.map(t=>t.stat_consumption),_=m.map(t=>t.stat_consumption),v=Zt(i),b=function(t,e){return"devices"===e?[]:"home"===e?[...t.gridFrom,...t.gridTo,...t.solarFrom,...t.batteryFrom,...t.batteryTo]:t.gridFrom}(v,s);if(!f.length&&!b.length)throw new Error("No energy sources or devices are configured in the Energy dashboard.");this._totalStatIds=b,this._sourceTypes=function(t){return Array.from(new Set((t.energy_sources??[]).map(t=>t?.type).filter(Boolean)))}(i);const y=Array.from(new Set([...f,...b])),w=await Yt(t,y,l,c,u);if(o!==this._fetchToken)return;const x=oe({prefs:i,stats:w,buckets:h,config:e,palette:Wt(this,p.length)}),$=t=>t.reduce((t,e)=>t+e,0),k=$(x.sourceTotals),S=$(x.series.map(t=>t.total));this._usedDeviceFallback="devices"!==s&&k<=0&&S>0;const M=this._usedDeviceFallback?S:$(x.totals);let A=null;if(!1!==e.show_comparison&&(A=await this._loadComparison(t,{start:l,displayedEnd:d,periodEnd:c,period:r,mode:s,sources:v,visibleIds:_,excludedIds:g,totalIds:b,statsPeriod:u,current:M}),o!==this._fetchToken))return;this._data=x,this._periodStart=l,this._total=M,this._comparison=A,this._error=void 0,this._loading=!1}catch(t){if(o!==this._fetchToken)return;this._error=t instanceof Error?t.message:String(t),this._loading=!1}}async _loadComparison(t,e){const o=this._config.comparison_mode??"like_for_like",i=function(t,e,o,i){const s=Mt(t,o);return"like_for_like"===i?{start:s,end:At(Mt(e,o),s,o)}:{start:s,end:St(s,o)}}(e.start,e.displayedEnd,e.period,o),s=St(i.start,e.period),r="devices"===e.mode?e.visibleIds:Array.from(new Set([...e.totalIds,...e.excludedIds]));if(!r.length)return null;const n=function(t,e,o,i,s,r,n=[]){if("devices"===o)return te(t,r,i,s);const a=te(t,n,i,s),l=te(t,e.gridFrom,i,s);return"grid"===o?Math.max(0,l-a):Math.max(0,l-te(t,e.gridTo,i,s)+te(t,e.solarFrom,i,s)+te(t,e.batteryFrom,i,s)-te(t,e.batteryTo,i,s)-a)}(await Yt(t,r,i.start,s,e.statsPeriod),e.sources,e.mode,i.start,i.end,e.visibleIds,e.excludedIds);if(n<=0)return null;return(("projected"===o?e.current/function(t,e,o){const i=o.getTime()-t.getTime();if(i<=0)return 1;const s=(e.getTime()-t.getTime())/i;return Math.min(1,Math.max(1e-6,s))}(e.start,e.displayedEnd,e.periodEnd):e.current)-n)/n*100}_cyclePeriod(){const t=this._config?.periods??s,e=t.indexOf(this._period);this._period=t[(e+1)%t.length],this._offset=0,this._hover=null,this._loading=!0,this._load()}_step(t){const e=this._offset+t;e<0||(this._offset=e,this._hover=null,this._loading=!0,this._load())}_comparisonText(){const t=this._config?.comparison_mode??"like_for_like",e=n[this._period];return"projected"===t?`projected vs ${e}`:`vs ${e}`}render(){const t=this._config;return t?X`
      <ha-card>
        <div class="root">
          ${t.name?X`<div class="card-name">${t.name}</div>`:et}
          <div class="header">
            <div class="summary">
              ${t.icon?X`<ha-icon class="icon" .icon=${t.icon}></ha-icon>`:et}
              <div class="figures">
                <div class="value">
                  <span class="number">${function(t,e){const o=Math.abs(t)>=1e3?1:2;return new Intl.NumberFormat(e||void 0,{minimumFractionDigits:o,maximumFractionDigits:o}).format(t)}(this._total,this.hass?.locale?.language)}</span>
                  <span class="unit">kWh</span>
                </div>
                ${this._renderComparison()}
                ${this._renderPeriodLabel()}
              </div>
            </div>
            ${this._renderControls()}
          </div>
          ${this._renderNotice()}
          ${this._renderBody()}
          ${!1!==t.show_legend?this._renderLegend():et}
        </div>
      </ha-card>
    `:et}_renderControls(){const t=this._config,e=!1!==t.show_navigation,o=!1!==t.show_period_button;return e||o?X`
      <div class="controls">
        ${e?X`
              <button
                class="nav"
                @click=${()=>this._step(1)}
                aria-label=${`Previous ${this._period}`}
                title=${`Previous ${this._period}`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4-4.6-4.6z" />
                </svg>
              </button>
              <button
                class="nav"
                ?disabled=${0===this._offset}
                @click=${()=>this._step(-1)}
                aria-label=${`Next ${this._period}`}
                title=${`Next ${this._period}`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.6 7.4 10 6l6 6-6 6-1.4-1.4 4.6-4.6z" />
                </svg>
              </button>
            `:et}
        ${o?X`
              <button
                class="period"
                @click=${this._cyclePeriod}
                aria-label=${`Time period: ${r[this._period]}. Click to change.`}
              >
                ${r[this._period]}
              </button>
            `:et}
      </div>
    `:et}_renderPeriodLabel(){return 0!==this._offset&&this._periodStart?X`
      <div class="period-label">
        ${function(t,e,o){switch(t){case"day":return e.toLocaleDateString(o,{weekday:"short",day:"numeric",month:"short"});case"week":{const t=new Date(e.getTime());t.setDate(t.getDate()+6);const i=e.getMonth()===t.getMonth();return`${e.toLocaleDateString(o,{day:"numeric",...i?{}:{month:"short"}})} – ${t.toLocaleDateString(o,{day:"numeric",month:"short"})}`}case"month":return e.toLocaleDateString(o,{month:"long",year:"numeric"});default:return String(e.getFullYear())}}(this._period,this._periodStart,this.hass?.locale?.language)}
      </div>
    `:et}_renderComparison(){if(!1===this._config?.show_comparison)return et;if(null===this._comparison)return et;const t=this._comparison>0?"up":this._comparison<0?"down":"flat";return X`
      <div class="comparison ${t}">
        <span class="delta">${function(t){const e=Math.round(t);return`${e>0?"+":""}${e}%`}(this._comparison)}</span>
        <span class="against">${this._comparisonText()}</span>
      </div>
    `}_renderNotice(){if(this._error||!this._data||!this._usedDeviceFallback)return et;const t=this._totalStatIds.length?X`no data came back for <code>${this._totalStatIds.join(", ")}</code>`:X`no grid consumption source was found${this._sourceTypes.length?X` (configured sources: ${this._sourceTypes.join(", ")})`:et}`;return X`
      <div class="notice">Showing the device total only — ${t}.</div>
    `}_renderBody(){if(this._error)return X`<div class="chart error"><div class="message">${this._error}</div></div>`;const t=this._height,e=this._data;return X`
      <div class="chart">
        ${e&&this._width>0&&t>0?Nt(e,{width:this._width,height:t,rounded:!1!==this._config?.rounded_bars,activeIndex:this._hover,onHover:t=>{this._hover=t},onSelect:t=>{this._hover=this._hover===t?null:t}}):X`<div class="message">${this._loading?"Loading…":""}</div>`}
        ${this._renderTooltip()}
      </div>
    `}_renderTooltip(){const t=this._data,e=this._hover;if(!t||null===e||!this._width)return et;const o=t.buckets[e];if(!o)return et;const{padLeft:i,slot:s}=Pt(t,this._width,this._height),r=i+s*e+s/2,n=Math.min(Math.max(r,90),Math.max(90,this._width-90)),a=t.series.filter(t=>t.values[e]>0),l=this.hass?.locale?.language;return X`
      <div class="tooltip" style=${`left:${n}px`}>
        <div class="tt-head">
          <span>${this._tooltipTitle(o.start)}</span>
          <span class="tt-total">${It(t.totals[e],l)} kWh</span>
        </div>
        ${a.length?a.map(t=>X`
                <div class="tt-row">
                  <span class="swatch" style=${`background:${t.color}`}></span>
                  <span class="tt-name">${t.name}</span>
                  <span class="tt-value">${It(t.values[e],l)}</span>
                </div>
              `):X`<div class="tt-row tt-empty">No consumption</div>`}
      </div>
    `}_tooltipTitle(t){const e=this.hass?.locale?.language;switch(this._period){case"day":return t.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"});case"week":return t.toLocaleDateString(e,{weekday:"long"});case"month":return t.toLocaleDateString(e,{day:"numeric",month:"short"});case"year":return t.toLocaleDateString(e,{month:"long"})}}_renderLegend(){const t=this._data;return t&&t.series.length?X`
      <div class="legend">
        ${t.series.map(t=>X`
            <div class=${t.total>0?"legend-item":"legend-item idle"}>
              <span class="swatch" style=${`background:${t.color}`}></span>
              <span class="legend-name">${t.name}</span>
              <span class="legend-value">${It(t.total,this.hass?.locale?.language)}</span>
            </div>
          `)}
      </div>
    `:et}};function se(t){const e={positive:[],negative:[]},o=t.power_config;if(o?.stat_rate_from||o?.stat_rate_to)return o.stat_rate_from&&e.positive.push({entity:o.stat_rate_from}),o.stat_rate_to&&e.negative.push({entity:o.stat_rate_to}),e;if(o?.stat_rate_inverted)return e.positive.push({entity:o.stat_rate_inverted,invert:!0}),e;const i=o?.stat_rate??t.stat_rate;return i&&e.positive.push({entity:i}),e}function re(t,e){t.positive.push(...e.positive),t.negative.push(...e.negative)}function ne(t,e){const o={positive:[],negative:[]};if("devices"===e)return o;for(const i of t.energy_sources??[])"grid"===i.type?re(o,se(i)):"home"===e&&"solar"===i.type?i.stat_rate&&o.positive.push({entity:i.stat_rate}):"home"===e&&"battery"===i.type&&re(o,se(i));return o}function ae(t,e){const o=new Map((e.devices??[]).map(t=>[t.stat,t]));return Vt(t).map(t=>{const e=o.get(t.stat_consumption);return{stat:t.stat_consumption,name:e?.name||t.name||t.stat_consumption,entity:e?.power_entity||t.stat_rate}})}ie.styles=m`
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
      --ebc-icon-size: 2.2em;
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
      container-type: inline-size;
    }
    .card-name {
      flex: 0 0 auto;
      font-size: 1.05em;
      font-weight: 500;
      line-height: 1.2;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
      margin-top: 0.02em;
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
      font-size: 2.2em;
      font-weight: 300;
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
    .controls {
      flex: 0 0 auto;
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 2px;
    }
    button.nav {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 0;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      color: var(--ebc-period-color);
      background: transparent;
    }
    button.nav svg {
      width: 22px;
      height: 22px;
      fill: currentColor;
    }
    button.nav:hover:not([disabled]) {
      background: var(--ebc-period-background);
    }
    button.nav[disabled] {
      opacity: 0.32;
      cursor: default;
    }
    button.nav:focus-visible {
      outline: 2px solid var(--primary-text-color);
      outline-offset: 1px;
    }
    .period-label {
      margin-top: 3px;
      font-size: 0.85em;
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
      border-radius: 50%;
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
    /* A device that used nothing this period should not compete for attention. */
    .legend-item.idle {
      opacity: 0.45;
    }
    .legend-name {
      color: var(--secondary-text-color);
    }
    .legend-value {
      font-variant-numeric: tabular-nums;
      color: var(--primary-text-color);
    }
    @container (max-width: 330px) {
      .number {
        font-size: 1.6em;
      }
      .icon {
        --ebc-icon-size: 1.6em;
      }
      .unit,
      .comparison,
      .period-label {
        font-size: 0.78em;
      }
      button.period {
        padding: 6px 12px;
        font-size: 0.85em;
      }
      button.nav {
        width: 24px;
        height: 24px;
      }
      button.nav svg {
        width: 19px;
        height: 19px;
      }
    }
  `,l([xt({attribute:!1})],ie.prototype,"hass",void 0),l([$t()],ie.prototype,"_config",void 0),l([$t()],ie.prototype,"_period",void 0),l([$t()],ie.prototype,"_data",void 0),l([$t()],ie.prototype,"_total",void 0),l([$t()],ie.prototype,"_comparison",void 0),l([$t()],ie.prototype,"_error",void 0),l([$t()],ie.prototype,"_loading",void 0),l([$t()],ie.prototype,"_width",void 0),l([$t()],ie.prototype,"_height",void 0),l([$t()],ie.prototype,"_hover",void 0),l([$t()],ie.prototype,"_totalStatIds",void 0),l([$t()],ie.prototype,"_sourceTypes",void 0),l([$t()],ie.prototype,"_usedDeviceFallback",void 0),l([$t()],ie.prototype,"_offset",void 0),l([$t()],ie.prototype,"_periodStart",void 0),ie=l([bt(t)],ie);const le={W:1,kW:1e3,MW:1e6,GW:1e9,mW:.001};function ce(t,e){return t*(le[e??"W"]??1)}function de(t,e){if(!e)return null;const o=t.states?.[e];if(!o||"unavailable"===o.state||"unknown"===o.state)return null;const i=Number.parseFloat(o.state);return Number.isFinite(i)?ce(i,o.attributes?.unit_of_measurement):null}function he(t){const e=t.lu??t.last_updated??t.last_changed;if(void 0===e)return null;if("number"==typeof e)return e<1e12?1e3*e:e;const o=new Date(e).getTime();return Number.isFinite(o)?o:null}function ue(t,e){const o=[];for(const i of t??[]){const t=he(i);if(null===t)continue;const s=i.s??i.state;if(void 0===s||"unavailable"===s||"unknown"===s){o.push({t:t,v:null});continue}const r=Number.parseFloat(s);o.push({t:t,v:Number.isFinite(r)?ce(r,e):null})}return o.sort((t,e)=>t.t-e.t)}async function pe(t,e,o,i){if(!e.length)return{};const s=await t.callWS({type:"history/history_during_period",start_time:o.toISOString(),end_time:i.toISOString(),entity_ids:e,minimal_response:!0,no_attributes:!0,significant_changes_only:!1}),r={};for(const o of e){const e=t.states?.[o]?.attributes?.unit_of_measurement;r[o]=ue(s?.[o]??[],e)}return r}async function me(t,e,o,i){if(!e.length)return{};const s=await t.callWS({type:"recorder/statistics_during_period",start_time:o.toISOString(),end_time:i.toISOString(),statistic_ids:e,period:"5minute",types:["mean"],units:{power:"W"}}),r={};for(const t of e)r[t]=(s?.[t]??[]).map(t=>{const e="number"==typeof t.start?t.start:new Date(t.start).getTime(),o=t.mean;return{t:e,v:"number"==typeof o&&Number.isFinite(o)?o:null}});return r}function ge(t,e,o){const i=new Array(o).fill(null);for(let s=0;s<o;s++){let o=0,r=!1;for(const e of t){const t=e[s];null!=t&&(o+=t,r=!0)}for(const t of e){const e=t[s];null!=e&&(o-=e,r=!0)}i[s]=r?o:null}return i}const fe=[{value:0,color:"#4caf50"},{value:1500,color:"#ffa726"},{value:4e3,color:"#f44336"}];function _e(t){const e=(t??fe).filter(t=>t&&Number.isFinite(t.value)&&"string"==typeof t.color&&t.color).map(t=>({value:Math.max(0,t.value),color:t.color})).sort((t,e)=>t.value-e.value);return e.length?e:fe}function ve(t){const{width:e,height:o,values:i}=t,s=function(t,e,o,i){const s=t.reduce((t,e)=>null!==e&&e>t?e:t,0),r=i.showAxes?18:0,n=Math.max(0,i.extraBottom??0),a=Math.max(1,o-6-r-n),l=a<110?2:4,c=i.yMax&&i.yMax>0?i.yMax:zt(s>0?s:1,l),d=c/l,h=[];if(i.showAxes)for(let t=0;t<=l;t++){const e=d*t;h.push({value:e,label:Ft(e,i.language)})}const u=h.reduce((t,e)=>Math.max(t,e.label.length),0),p=i.showAxes?Math.min(64,Math.round(7*u)+8):0,m=Math.max(1,e-p);return{padLeft:p,padBottom:r,plotW:m,plotH:a,baseline:6+a,areaBottom:6+a+n,max:c,divisions:l,step:d,slot:m/Math.max(1,t.length),ticks:h}}(i,e,o,{showAxes:t.showAxes,yMax:t.yMax,language:t.language,extraBottom:t.extraBottom}),{padLeft:r,plotH:n,baseline:a,areaBottom:l,max:c}=s,d=function(t,e,o){const{padLeft:i,plotH:s,baseline:r,areaBottom:n,max:a,slot:l}=e,c=t=>r-Math.min(Math.max(t,0),a)/a*s,d=[],h=[];let u=[];const p=()=>{if(!u.length)return void(u=[]);if(1===u.length){const t=u[0],e=Math.max(l/2,.5);return d.push(`M ${t.x-e} ${t.y} L ${t.x+e} ${t.y}`),h.push(`M ${t.x-e} ${n} L ${t.x-e} ${t.y} L ${t.x+e} ${t.y} L ${t.x+e} ${n} Z`),void(u=[])}const t=u.map(t=>`${t.x} ${t.y}`);d.push(`M ${t.join(" L ")}`);const e=u[0],o=u[u.length-1];h.push(`M ${e.x} ${n} L ${t.join(" L ")} L ${o.x} ${n} Z`),u=[]};for(let e=0;e<t.length;e++){const s=t[e];if(null===s){p();continue}const r=i+l*e,n=r+l,a=c(s);o?u.push({x:r+l/2,y:a}):(u.push({x:r,y:a}),u.push({x:n,y:a}))}return p(),{line:d.join(" "),area:h.join(" ")}}(i,s,t.smooth),h=function(t,e){const o=_e(t),i=e>0?e:1,s=o.map(t=>({offset:Math.min(1,Math.max(0,t.value/i)),color:t.color}));s[0].offset>0&&s.unshift({offset:0,color:s[0].color});const r=s[s.length-1];return r.offset<1&&s.push({offset:1,color:r.color}),s}(t.thresholds,c),u=`${t.gradientId}-area`,p=`${t.gradientId}-fade`,m=s.ticks.map(t=>{const o=a-t.value/c*n;return Q`
      <line class="grid" x1=${r} x2=${e} y1=${o} y2=${o} />
      <text class="tick" x="0" y=${o+4} text-anchor="start">${t.label}</text>
    `}),g=t.showAxes?function(t,e,o){const i=Math.max(2,Math.min(6,Math.floor(o/90))),s=[];for(let o=0;o<=i;o++){const r=o/i;s.push({offset:r,t:t+(e-t)*r})}return s}(t.start,t.end,s.plotW).map(({offset:e,t:i})=>{const n=r+s.plotW*e;return Q`
          <text class="xlabel" x=${n} y=${o-5} text-anchor=${0===e?"start":1===e?"end":"middle"}>
            ${new Date(i).toLocaleTimeString(t.language,{hour:"2-digit",minute:"2-digit"})}
          </text>
        `}):[];return Q`
    <svg
      viewBox=${`0 0 ${e} ${o}`}
      width=${e}
      height=${o}
      role="img"
      aria-label="Power consumption over time"
    >
      <defs>
        <linearGradient
          id=${t.gradientId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1=${a}
          x2="0"
          y2=${6}
        >
          ${h.map(t=>Q`<stop offset=${t.offset} stop-color=${t.color} />`)}
        </linearGradient>
        <linearGradient
          id=${u}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1=${a}
          x2="0"
          y2=${6}
        >
          ${h.map(t=>Q`<stop offset=${t.offset} stop-color=${t.color} stop-opacity="0.28" />`)}
        </linearGradient>
        <linearGradient
          id=${p}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1=${a}
          x2="0"
          y2=${l}
        >
          <stop class="fade-from" offset="0" />
          <stop class="fade-to" offset="1" />
        </linearGradient>
      </defs>
      ${m}
      ${d.area?Q`<path class="area" d=${d.area} fill=${`url(#${u})`} />`:Q``}
      ${l>a?Q`<rect
            class="fade"
            x="0"
            y=${a}
            width=${e}
            height=${l-a}
            fill=${`url(#${p})`}
          />`:Q``}
      ${d.line?Q`<path
            class="line"
            d=${d.line}
            fill="none"
            stroke=${`url(#${t.gradientId})`}
            stroke-width=${t.lineWidth}
          />`:Q``}
      ${g}
    </svg>
  `}let be=class extends _t{constructor(){super(...arguments),this._values=[],this._windowStart=0,this._windowEnd=0,this._loading=!0,this._width=0,this._height=0,this._bleedBottom=0,this._fetchToken=0,this._signature="",this._gradientId=`pbc-${Math.random().toString(36).slice(2,9)}`}static async getConfigElement(){return await Promise.resolve().then(function(){return Te}),document.createElement(i)}static getStubConfig(){return{type:`custom:${o}`,icon:"mdi:flash",hours:3,thresholds:fe,show_distribution:!0,show_legend:!0,show_axes:!0}}setConfig(t){if(!t)throw new Error("Invalid configuration");const e=t.hours??3;if(!(e>0))throw new Error("Hours must be greater than zero");this._config={...t,hours:e},this._loading=!0,this._load()}getCardSize(){return 5}getGridOptions(){return{rows:5,columns:12,min_rows:3,min_columns:6}}getLayoutOptions(){return{grid_rows:5,grid_columns:12,grid_min_rows:3,grid_min_columns:6}}connectedCallback(){super.connectedCallback(),this._resizeObserver??=new ResizeObserver(()=>this._measure()),this.updateComplete.then(()=>this._observe()),this._timer=window.setInterval(()=>{this._load()},6e4)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),this._timer&&window.clearInterval(this._timer),this._timer=void 0}firstUpdated(){this._observe()}_observe(){const t=this.renderRoot?.querySelector(".chart");t&&this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver.observe(t),this._measure())}_measure(){const t=this.renderRoot?.querySelector(".chart");if(!t)return;const e=t.getBoundingClientRect(),o=Math.round(e.width),i=Math.round(e.height);Math.abs(o-this._width)>1&&(this._width=o),Math.abs(i-this._height)>1&&(this._height=i)}shouldUpdate(t){if(t.size>1||!t.has("hass"))return!0;const e=this._liveSignature();return e!==this._signature&&(this._signature=e,!0)}updated(t){if(this._measure(),this._measureBleed(),!t.has("hass")||!this.hass)return;t.get("hass")||this._load()}get _hours(){return this._config?.hours??3}get _mode(){return this._config?.total_mode??"grid"}_sources(){return this._prefs?ne(this._prefs,this._mode):{positive:[],negative:[]}}_devices(){if(!this._prefs||!this._config)return[];const t=new Set((this._config.devices??[]).filter(t=>t.hidden).map(t=>t.stat));return ae(this._prefs,this._config).filter(e=>!t.has(e.stat))}_watchedEntities(){const t=this._sources();return[...t.positive.map(t=>t.entity),...t.negative.map(t=>t.entity),...this._devices().map(t=>t.entity)].filter(t=>Boolean(t))}_liveSignature(){const t=this.hass;return t?this._watchedEntities().map(e=>`${e}=${t.states?.[e]?.state??""}`).join("|"):""}async _load(){const t=this.hass,e=this._config;if(!t||!e)return;const o=++this._fetchToken;try{const i=this._prefs??await qt(t);if(o!==this._fetchToken)return;this._prefs=i;const s=ne(i,this._mode),r=ae(i,e).map(t=>t.entity).filter(t=>Boolean(t)),n=[...s.positive.map(t=>t.entity),...s.negative.map(t=>t.entity)],a="devices"===this._mode?r:n;if(!a.length)throw new Error("devices"===this._mode?"No devices in the Energy dashboard have a power sensor configured.":"No power sensor is configured for your grid connection in the Energy dashboard.");const l=new Date,c=new Date(l.getTime()-36e5*this._hours),d=this._hours>6?me:pe,h=await d(t,Array.from(new Set(a)),c,l);if(o!==this._fetchToken)return;const u=this._bucketCount(),p=t=>function(t,e,o,i){const s=new Array(i).fill(null);if(i<=0||o<=e)return s;const r=(o-e)/i;let n=0,a=null;for(;n<t.length&&t[n].t<e;)a=t[n].v,n++;for(let o=0;o<i;o++){const i=e+r*(o+1);let l=0,c=0,d=!1;for(;n<t.length&&t[n].t<i;){const e=t[n].v;null===e?(d=!0,a=null):(l+=e,c++,a=e),n++}s[o]=c>0?l/c:d?null:a}return s}(h[t]??[],c.getTime(),l.getTime(),u),m="devices"===this._mode?ge(r.map(p),[],u):ge(s.positive.map(t=>t.invert?p(t.entity).map(t=>null===t?null:-t):p(t.entity)),s.negative.map(t=>p(t.entity)),u);this._values=m.map(t=>null===t?null:Math.max(0,t)),this._windowStart=c.getTime(),this._windowEnd=l.getTime(),this._error=void 0,this._loading=!1,this._signature=this._liveSignature()}catch(t){if(o!==this._fetchToken)return;this._error=t instanceof Error?t.message:String(t),this._loading=!1}}_bucketCount(){const t=this._config?.points_per_hour;return t&&t>0?Math.max(2,Math.min(2e3,Math.round(this._hours*t))):Math.max(24,Math.min(600,Math.round((this._width||300)/2)))}_currentTotal(){const t=this.hass;if(!t)return null;if("devices"===this._mode){const e=this._devices().map(e=>de(t,e.entity)),o=e.filter(t=>null!==t);return o.length?o.reduce((t,e)=>t+e,0):null}const e=function(t,e){let o=0,i=!1;for(const s of e.positive){const e=de(t,s.entity);null!==e&&(i=!0,o+=s.invert?-e:e)}for(const s of e.negative){const e=de(t,s.entity);null!==e&&(i=!0,o-=s.invert?-e:e)}return i?o:null}(t,this._sources());return null===e?null:Math.max(0,e)}_segments(){const t=this.hass,e=this._config;if(!t||!e)return[];const o=this._devices(),i=Wt(this,o.length),s=new Map((e.devices??[]).map(t=>[t.stat,t])),r=o.map((e,o)=>({key:e.stat,name:e.name,color:s.get(e.stat)?.color||i.series[o%i.series.length],watts:de(t,e.entity)??0})).sort((t,e)=>e.watts-t.watts),n=e.max_devices??8;let l=0,c=r;if(n>0&&r.length>n&&(l=r.slice(n).reduce((t,e)=>t+e.watts,0),c=r.slice(0,n)),!1!==e.show_other&&"devices"!==this._mode){const t=this._currentTotal();if(null!==t){const o=c.reduce((t,e)=>t+e.watts,0)+l,s=Math.max(0,t-o)+l;c=[...c,{key:a,name:e.other_name||"Other",color:e.other_color||i.other,watts:s}]}}else l>0&&(c=[...c,{key:a,name:e.other_name||"Other",color:e.other_color||i.other,watts:l}]);return c}render(){const t=this._config;if(!t)return et;const e=this._segments();return X`
      <ha-card>
        <div class="root">
          ${t.name?X`<div class="card-name">${t.name}</div>`:et}
          <div class="header">
            <div class="summary">
              ${t.icon?X`<ha-icon class="icon" .icon=${t.icon}></ha-icon>`:et}
              <div class="figures">
                <div class="value">
                  <span class="number">
                    ${Ft(this._currentTotal(),this.hass?.locale?.language)}
                  </span>
                </div>
                ${this._renderPeak()}
              </div>
            </div>
          </div>
          ${this._renderBody()}
          ${!1!==t.show_distribution?this._renderDistribution(e):et}
          ${!1!==t.show_legend?this._renderLegend(e):et}
        </div>
      </ha-card>
    `}get _bleeds(){return!1===this._config?.show_axes}_measureBleed(){if(!this._bleeds)return void(0!==this._bleedBottom&&(this._bleedBottom=0));const t=this.renderRoot.querySelector(".root"),e=this.renderRoot.querySelector(".chart");if(!t||!e)return;const o=Math.max(0,Math.round(t.getBoundingClientRect().bottom-e.getBoundingClientRect().bottom));Math.abs(o-this._bleedBottom)>1&&(this._bleedBottom=o)}_renderPeak(){if(!1===this._config?.show_peak)return et;const t=this._values.filter(t=>null!==t);if(!t.length)return et;const e=Math.max(...t);return X`
      <div class="peak">
        peak ${Ft(e,this.hass?.locale?.language)} over ${this._hours}h
      </div>
    `}_renderBody(){if(this._error)return X`<div class="chart error"><div class="message">${this._error}</div></div>`;const t=this._width>0&&this._height>0&&this._values.length>0,e=this._bleeds,o=this._width+(e?34:0),i=this._height+(e?this._bleedBottom:0);return X`
      <div class=${e?"chart bleed":"chart"}>
        ${t?ve({width:o,height:i,values:this._values,start:this._windowStart,end:this._windowEnd,thresholds:_e(this._config?.thresholds),yMax:this._config?.y_max,showAxes:!1!==this._config?.show_axes,smooth:!0===this._config?.smooth,lineWidth:this._config?.line_width??2.5,extraBottom:e?this._bleedBottom:0,language:this.hass?.locale?.language,gradientId:this._gradientId}):X`<div class="message">${this._loading?"Loading…":""}</div>`}
      </div>
    `}_renderDistribution(t){const e=t.reduce((t,e)=>t+e.watts,0);return X`
      <div
        class="distribution"
        role="img"
        aria-label=${`Power distribution: ${t.map(t=>`${t.name} ${Ft(t.watts)}`).join(", ")}`}
      >
        ${e>0?t.filter(t=>t.watts>0).map(t=>X`
                  <div
                    class="segment"
                    style=${`width:${t.watts/e*100}%; background:${t.color}`}
                    title=${`${t.name} ${Ft(t.watts)}`}
                  ></div>
                `):X`<div class="segment empty"></div>`}
      </div>
    `}_renderLegend(t){const e=this.hass?.locale?.language;return X`
      <div class="legend">
        ${t.map(t=>X`
            <div class=${t.watts>0?"legend-item":"legend-item idle"}>
              <span class="swatch" style=${`background:${t.color}`}></span>
              <span class="legend-name">${t.name}</span>
              <span class="legend-value">${Ft(t.watts,e)}</span>
            </div>
          `)}
      </div>
    `}};be.styles=m`
    :host {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      height: 100%;
      min-height: var(--pbc-min-height, 176px);
      --pbc-bleed-x: 17px;
      --pbc-icon-color: var(--primary-text-color);
      --pbc-icon-size: 2.2em;
      --ebc-grid: color-mix(in srgb, var(--secondary-text-color) 45%, transparent);
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
      container-type: inline-size;
    }
    .card-name {
      flex: 0 0 auto;
      font-size: 1.05em;
      font-weight: 500;
      line-height: 1.2;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .header {
      flex: 0 0 auto;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
    }
    .summary {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      min-width: 0;
    }
    .icon {
      --mdc-icon-size: var(--pbc-icon-size);
      width: var(--pbc-icon-size);
      height: var(--pbc-icon-size);
      color: var(--pbc-icon-color);
      flex: 0 0 auto;
      margin-top: 0.22em;
    }
    .number {
      font-size: 2.2em;
      font-weight: 300;
      line-height: 1.05;
      color: var(--primary-text-color);
      white-space: nowrap;
    }
    .peak {
      margin-top: 3px;
      font-size: 0.85em;
      color: var(--secondary-text-color);
    }
    .chart {
      position: relative;
      flex: 1 1 0;
      min-height: 0;
      width: 100%;
    }
    .chart svg {
      display: block;
    }
    /* Without axes there is nothing to keep clear of, so the plot runs out to
       the card's edges and down behind everything below it. */
    .chart.bleed svg {
      position: absolute;
      top: 0;
      left: calc(-1 * var(--pbc-bleed-x));
    }
    .fade-from {
      stop-color: var(--pbc-fade-color, #000);
      stop-opacity: 0;
    }
    .fade-to {
      stop-color: var(--pbc-fade-color, #000);
      stop-opacity: 0.92;
    }
    .line {
      /* Width comes from the attribute so line_width can set it; a rule here
         would override the attribute. */
      stroke-linejoin: round;
      stroke-linecap: round;
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
    .message {
      color: var(--secondary-text-color);
      font-size: 0.9em;
      padding: 8px 0;
    }
    .error .message {
      color: var(--error-color, #db4437);
    }
    .distribution {
      position: relative;
      z-index: 1;
      flex: 0 0 auto;
      display: flex;
      height: 14px;
      border-radius: 7px;
      overflow: hidden;
      background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    }
    .segment {
      height: 100%;
      /* Widths are re-computed on every reading, so ease between them. */
      transition: width 400ms ease-in-out, background-color 400ms ease-in-out;
      min-width: 0;
    }
    .segment.empty {
      width: 100%;
      background: transparent;
    }
    .legend {
      position: relative;
      z-index: 1;
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
    /* A device drawing nothing right now should not compete for attention. */
    .legend-item.idle {
      opacity: 0.45;
    }
    .swatch {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      flex: 0 0 auto;
    }
    .legend-name {
      color: var(--secondary-text-color);
    }
    .legend-value {
      font-variant-numeric: tabular-nums;
      color: var(--primary-text-color);
    }
    @container (max-width: 330px) {
      .number {
        font-size: 1.6em;
      }
      .icon {
        --pbc-icon-size: 1.6em;
      }
      .peak {
        font-size: 0.78em;
      }
    }
  `,l([xt({attribute:!1})],be.prototype,"hass",void 0),l([$t()],be.prototype,"_config",void 0),l([$t()],be.prototype,"_prefs",void 0),l([$t()],be.prototype,"_values",void 0),l([$t()],be.prototype,"_windowStart",void 0),l([$t()],be.prototype,"_windowEnd",void 0),l([$t()],be.prototype,"_error",void 0),l([$t()],be.prototype,"_loading",void 0),l([$t()],be.prototype,"_width",void 0),l([$t()],be.prototype,"_height",void 0),l([$t()],be.prototype,"_bleedBottom",void 0),be=l([bt(o)],be);const ye=window;ye.customCards=ye.customCards||[],ye.customCards.push({type:t,name:"Energy Breakdown Card",description:"Stacked per-device energy consumption from the Energy dashboard, with day/week/month/year drill-down.",preview:!0,documentationURL:"https://github.com/fwhitten/energy-breakdown-card"},{type:o,name:"Power Breakdown Card",description:"Live power as a threshold-coloured line, with a per-device distribution bar from the Energy dashboard.",preview:!0,documentationURL:"https://github.com/fwhitten/energy-breakdown-card#power-breakdown-card"}),console.info("%c ENERGY-BREAKDOWN-CARD %c 1.7.2 ","color: white; background: #7c4dff; font-weight: 700;","color: #7c4dff; background: white; font-weight: 700;");const we={name:"Name",icon:"Icon",show_navigation:"Show previous/next buttons",show_period_button:"Show time period button",default_period:"Default time period",periods:"Selectable time periods",total_mode:"Consumption figure",comparison_mode:"Comparison baseline",show_comparison:"Show comparison to previous period",show_legend:"Show legend",show_other:'Show "Other" remainder',other_name:'"Other" label',max_devices:"Maximum devices shown",rounded_bars:"Rounded bars",first_day_of_week:"First day of week"},xe=[{type:"grid",name:"",schema:[{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]},{name:"periods",selector:{select:{multiple:!0,mode:"list",options:s.map(t=>({value:t,label:r[t]}))}}},{type:"grid",name:"",schema:[{name:"default_period",selector:{select:{mode:"dropdown",options:s.map(t=>({value:t,label:r[t]}))}}},{name:"total_mode",selector:{select:{mode:"dropdown",options:[{value:"grid",label:"Grid import"},{value:"home",label:"Home consumption (grid + solar + battery)"},{value:"devices",label:"Sum of devices"}]}}}]},{type:"grid",name:"",schema:[{name:"show_period_button",selector:{boolean:{}}},{name:"show_navigation",selector:{boolean:{}}}]},{name:"show_comparison",selector:{boolean:{}}},{name:"comparison_mode",selector:{select:{mode:"dropdown",options:[{value:"like_for_like",label:"Same elapsed time in previous period"},{value:"full_previous",label:"Whole previous period"},{value:"projected",label:"Projected period vs whole previous period"}]}}},{name:"show_other",selector:{boolean:{}}},{type:"grid",name:"",schema:[{name:"show_legend",selector:{boolean:{}}},{name:"rounded_bars",selector:{boolean:{}}}]},{type:"grid",name:"",schema:[{name:"first_day_of_week",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Follow language"},{value:"monday",label:"Monday"},{value:"sunday",label:"Sunday"}]}}}]},{name:"max_devices",selector:{number:{min:1,max:20,mode:"box"}}}];let $e=class extends _t{constructor(){super(...arguments),this._devices=[]}setConfig(t){this._config=t,this._loadDevices()}async _loadDevices(){if(this.hass&&!this._devices.length)try{const t=await qt(this.hass);this._devices=Vt(t),this._devicesError=void 0}catch(t){this._devicesError="Could not read the Energy dashboard configuration. Set it up under Settings → Dashboards → Energy."}}updated(){this._loadDevices()}get _data(){const t=this._config;return{show_comparison:!0,show_legend:!0,show_navigation:!0,show_period_button:!0,show_other:!0,rounded_bars:!0,comparison_mode:"like_for_like",total_mode:"grid",first_day_of_week:"auto",max_devices:8,periods:s,...t}}_emit(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_valueChanged(t){t.stopPropagation();const e={...t.detail.value};e.periods?.length&&e.default_period&&!e.periods.includes(e.default_period)&&(e.default_period=e.periods[0]),this._emit(e)}_updateDevice(t,e){const o=this._data,i=[...o.devices??[]],s=i.findIndex(e=>e.stat===t),r={...s>=0?i[s]:{stat:t},...e},n=!r.name&&!r.color&&!r.hidden;s>=0?n?i.splice(s,1):i[s]=r:n||i.push(r);const a={...o};i.length?a.devices=i:delete a.devices,this._emit(a)}_updateConfig(t){const e={...this._data,...t};for(const o of Object.keys(t))void 0===e[o]&&delete e[o];this._emit(e)}_override(t){return(this._config?.devices??[]).find(e=>e.stat===t)}render(){return this._config&&this.hass?X`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${xe}
          .computeLabel=${t=>we[t.name]??t.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
        ${this._renderDevices()}
      </div>
    `:et}_renderDevices(){const t=Wt(this,this._devices.length);return X`
      <div class="devices">
        <h4>Devices</h4>
        ${this._devicesError?X`<div class="warning">${this._devicesError}</div>`:0===this._devices.length?X`<div class="hint">
                No individual devices are configured in the Energy dashboard yet.
              </div>`:X`<div class="hint">
                  Rename or recolour any device from the Energy dashboard. &#931; takes a device out
                  of the total consumption figure; the eye hides it from the chart while still
                  counting it towards the total.
                </div>
                ${this._devices.map((e,o)=>this._renderDevice(e,o,t.series))}`}
        ${!1!==this._data.show_other?this._renderOtherRow():et}
      </div>
    `}_renderOtherRow(){const t=this._data;return X`
      <div class="device">
        <input
          class="color"
          type="color"
          .value=${t.other_color||Wt(this,this._devices.length).other}
          title="Colour"
          @change=${t=>this._updateConfig({other_color:t.target.value})}
        />
        <div class="field">
          <span class="dev-name">Other</span>
          <input
            class="rename"
            type="text"
            placeholder="Other"
            .value=${t.other_name??""}
            @change=${t=>this._updateConfig({other_name:t.target.value||void 0})}
          />
        </div>
        <span class="spacer"></span>
      </div>
    `}_renderDevice(t,e,o){const i=t.stat_consumption,s=this._override(i),r=s?.color||o[e%o.length];return X`
      <div class="device ${s?.hidden?"hidden":""}">
        <input
          class="color"
          type="color"
          .value=${r}
          title="Colour"
          @change=${t=>this._updateDevice(i,{color:t.target.value})}
        />
        <div class="field">
          <span class="dev-name" title=${i}>${t.name||i}</span>
          <input
            class="rename"
            type="text"
            placeholder=${t.name||i}
            .value=${s?.name??""}
            @change=${t=>this._updateDevice(i,{name:t.target.value||void 0})}
          />
        </div>
        <button
          class="toggle ${s?.excluded?"off":""}"
          title=${s?.excluded?"Excluded from the total — click to count it again":"Counted in the total — click to exclude it"}
          aria-pressed=${s?.excluded?"true":"false"}
          @click=${()=>this._updateDevice(i,{excluded:!s?.excluded||void 0})}
        >
          &#931;
        </button>
        <button
          class="toggle ${s?.hidden?"off":""}"
          title=${s?.hidden?"Hidden — click to show":"Shown — click to hide"}
          aria-pressed=${s?.hidden?"true":"false"}
          ?disabled=${s?.excluded}
          @click=${()=>this._updateDevice(i,{hidden:!s?.hidden||void 0})}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d=${s?.hidden?Se:ke} />
          </svg>
        </button>
      </div>
    `}};$e.styles=m`
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
      inline-size: 76px;
      flex: 0 0 auto;
    }
    button.toggle {
      flex: 0 0 auto;
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font: inherit;
      font-size: 1.1em;
      background: transparent;
      color: var(--primary-text-color);
    }
    button.toggle svg {
      width: 22px;
      height: 22px;
      fill: currentColor;
    }
    button.toggle:hover:not([disabled]) {
      background: color-mix(in srgb, var(--primary-text-color) 12%, transparent);
    }
    button.toggle.off {
      color: var(--secondary-text-color);
      opacity: 0.55;
    }
    button.toggle[disabled] {
      opacity: 0.25;
      cursor: default;
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
  `,l([$t()],$e.prototype,"_config",void 0),l([$t()],$e.prototype,"_devices",void 0),l([$t()],$e.prototype,"_devicesError",void 0),$e=l([bt(e)],$e);const ke="M12 9a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z",Se="M11.83 9 15 12.16V12a3 3 0 0 0-3-3h-.17m-4.3.8 1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28.46.46A11.8 11.8 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7Z";var Me=Object.freeze({__proto__:null,get EnergyBreakdownCardEditor(){return $e}});const Ae={name:"Name",icon:"Icon",hours:"Hours of history",total_mode:"Power figure",y_max:"Axis maximum in watts (blank to fit the data)",show_axes:"Show axes",smooth:"Smooth the line",line_width:"Line width",points_per_hour:"Data points per hour (blank to fit the card)",show_peak:"Show the period peak",show_distribution:"Show the distribution bar",show_legend:"Show legend",show_other:'Show "Other" remainder',max_devices:"Maximum devices shown"},Ee=[{type:"grid",name:"",schema:[{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]},{type:"grid",name:"",schema:[{name:"hours",selector:{number:{min:1,max:168,mode:"box"}}},{name:"total_mode",selector:{select:{mode:"dropdown",options:[{value:"grid",label:"Grid"},{value:"home",label:"Home (grid + solar + battery)"},{value:"devices",label:"Sum of devices"}]}}}]},{name:"y_max",selector:{number:{min:0,max:1e5,step:100,mode:"box"}}},{type:"grid",name:"",schema:[{name:"show_axes",selector:{boolean:{}}},{name:"smooth",selector:{boolean:{}}}]},{type:"grid",name:"",schema:[{name:"line_width",selector:{number:{min:1,max:10,step:.5,mode:"box"}}},{name:"points_per_hour",selector:{number:{min:1,max:720,mode:"box"}}}]},{type:"grid",name:"",schema:[{name:"show_peak",selector:{boolean:{}}},{name:"show_distribution",selector:{boolean:{}}}]},{type:"grid",name:"",schema:[{name:"show_legend",selector:{boolean:{}}},{name:"show_other",selector:{boolean:{}}}]},{name:"max_devices",selector:{number:{min:1,max:20,mode:"box"}}}];let De=class extends _t{setConfig(t){this._config=t,this._loadPrefs()}async _loadPrefs(){if(this.hass&&!this._prefs)try{this._prefs=await qt(this.hass),this._error=void 0}catch{this._error="Could not read the Energy dashboard configuration. Set it up under Settings → Dashboards → Energy."}}updated(){this._loadPrefs()}get _data(){return{hours:3,total_mode:"grid",show_axes:!0,smooth:!1,line_width:2.5,show_peak:!0,show_distribution:!0,show_legend:!0,show_other:!0,max_devices:8,...this._config}}_emit(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_valueChanged(t){t.stopPropagation(),this._emit({...t.detail.value})}get _thresholds(){return _e(this._config?.thresholds??fe)}_updateThreshold(t,e){const o=this._thresholds.map((o,i)=>i===t?{...o,...e}:o);this._emit({...this._data,thresholds:o})}_removeThreshold(t){const e=this._thresholds.filter((e,o)=>o!==t);this._emit({...this._data,thresholds:e.length?e:fe})}_addThreshold(){const t=this._thresholds,e=t[t.length-1];this._emit({...this._data,thresholds:[...t,{value:e.value+1e3,color:e.color}]})}_updateDevice(t,e){const o=this._data,i=[...o.devices??[]],s=i.findIndex(e=>e.stat===t),r={...s>=0?i[s]:{stat:t},...e},n=!(r.name||r.color||r.hidden||r.power_entity);s>=0?n?i.splice(s,1):i[s]=r:n||i.push(r);const a={...o};i.length?a.devices=i:delete a.devices,this._emit(a)}render(){return this._config&&this.hass?X`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${Ee}
          .computeLabel=${t=>Ae[t.name]??t.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
        ${this._renderThresholds()}
        ${this._renderDevices()}
      </div>
    `:et}_renderThresholds(){const t=this._thresholds;return X`
      <div class="section">
        <h4>Thresholds</h4>
        <div class="hint">
          The colour the line and the area take at each power level. Values in between shade
          smoothly from one to the next.
        </div>
        ${t.map((e,o)=>X`
            <div class="row">
              <input
                class="color"
                type="color"
                .value=${e.color}
                @change=${t=>this._updateThreshold(o,{color:t.target.value})}
              />
              <input
                class="number"
                type="number"
                min="0"
                step="100"
                .value=${String(e.value)}
                @change=${t=>this._updateThreshold(o,{value:Number(t.target.value)})}
              />
              <span class="unit">W</span>
              <button
                class="toggle"
                title="Remove threshold"
                ?disabled=${t.length<=1}
                @click=${()=>this._removeThreshold(o)}
              >
                &times;
              </button>
            </div>
          `)}
        <button class="add" @click=${this._addThreshold}>Add threshold</button>
      </div>
    `}_renderDevices(){const t=this._prefs?ae(this._prefs,this._data):[],e=Wt(this,Math.max(t.length,1)),o=new Map((this._config?.devices??[]).map(t=>[t.stat,t]));return X`
      <div class="section">
        <h4>Devices</h4>
        ${this._error?X`<div class="warning">${this._error}</div>`:0===t.length?X`<div class="hint">
                No individual devices are configured in the Energy dashboard yet.
              </div>`:X`<div class="hint">
                  Power sensors come from each device's Energy dashboard entry. A device with no
                  power sensor there can be given one here.
                </div>
                ${t.map((t,i)=>{const s=o.get(t.stat);return X`
                    <div class="row device ${s?.hidden?"off":""}">
                      <input
                        class="color"
                        type="color"
                        .value=${s?.color||e.series[i%e.series.length]}
                        @change=${e=>this._updateDevice(t.stat,{color:e.target.value})}
                      />
                      <div class="field">
                        <span class="dev-name">${t.name}</span>
                        <input
                          class="text"
                          type="text"
                          .value=${s?.power_entity??""}
                          placeholder=${t.entity||"No power sensor — enter an entity id"}
                          @change=${e=>this._updateDevice(t.stat,{power_entity:e.target.value||void 0})}
                        />
                      </div>
                      <button
                        class="toggle ${s?.hidden?"off":""}"
                        title=${s?.hidden?"Hidden — click to show":"Shown — click to hide"}
                        @click=${()=>this._updateDevice(t.stat,{hidden:!s?.hidden||void 0})}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M12 9a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z"
                          />
                        </svg>
                      </button>
                    </div>
                  `})}`}
      </div>
    `}};De.styles=m`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    h4 {
      margin: 4px 0 2px;
    }
    .hint,
    .warning {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
    }
    .warning {
      color: var(--error-color, #db4437);
    }
    .row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }
    .row.off .field {
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
    input.text,
    input.number {
      font: inherit;
      padding: 7px 9px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #444);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
      color: var(--primary-text-color);
      box-sizing: border-box;
    }
    input.text {
      width: 100%;
    }
    input.number {
      flex: 1 1 auto;
      min-width: 0;
    }
    input.text:focus,
    input.number:focus {
      outline: none;
      border-color: var(--primary-color);
    }
    .unit {
      color: var(--secondary-text-color);
      font-size: 0.85em;
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
    button.toggle {
      flex: 0 0 auto;
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font: inherit;
      font-size: 1.2em;
      background: transparent;
      color: var(--primary-text-color);
    }
    button.toggle svg {
      width: 22px;
      height: 22px;
      fill: currentColor;
    }
    button.toggle:hover:not([disabled]) {
      background: color-mix(in srgb, var(--primary-text-color) 12%, transparent);
    }
    button.toggle.off {
      color: var(--secondary-text-color);
      opacity: 0.55;
    }
    button.toggle[disabled] {
      opacity: 0.25;
      cursor: default;
    }
    button.add {
      align-self: flex-start;
      font: inherit;
      font-size: 0.9em;
      padding: 7px 14px;
      border: none;
      border-radius: 999px;
      cursor: pointer;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--primary-text-color) 9%, transparent);
    }
    button.add:hover {
      background: color-mix(in srgb, var(--primary-text-color) 16%, transparent);
    }
  `,l([$t()],De.prototype,"_config",void 0),l([$t()],De.prototype,"_prefs",void 0),l([$t()],De.prototype,"_error",void 0),De=l([bt(i)],De);var Te=Object.freeze({__proto__:null,get PowerBreakdownCardEditor(){return De}});
