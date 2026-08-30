const t="energy-breakdown-card",e="energy-breakdown-card-editor",o=["day","week","month","year"],s={day:"Day",week:"Week",month:"Month",year:"Year"},i={day:"yesterday",week:"last week",month:"last month",year:"last year"};function r(t,e,o,s){var i,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,o):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,s);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(n=(r<3?i(n):r>3?i(e,o,n):i(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n}"function"==typeof SuppressedError&&SuppressedError;const n=globalThis,a=n.ShadowRoot&&(void 0===n.ShadyCSS||n.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,c=Symbol(),l=new WeakMap;let d=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==c)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(a&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=l.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&l.set(e,t))}return t}toString(){return this.cssText}};const h=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,o,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[s+1],t[0]);return new d(o,t,c)},u=a?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new d("string"==typeof t?t:t+"",void 0,c))(e)})(t):t,{is:p,defineProperty:m,getOwnPropertyDescriptor:g,getOwnPropertyNames:f,getOwnPropertySymbols:_,getPrototypeOf:v}=Object,y=globalThis,b=y.trustedTypes,$=b?b.emptyScript:"",w=y.reactiveElementPolyfillSupport,x=(t,e)=>t,k={toAttribute(t,e){switch(e){case Boolean:t=t?$:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},A=(t,e)=>!p(t,e),S={attribute:!0,type:String,converter:k,reflect:!1,useDefault:!1,hasChanged:A};Symbol.metadata??=Symbol("metadata"),y.litPropertyMetadata??=new WeakMap;let E=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=S){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),s=this.getPropertyDescriptor(t,o,e);void 0!==s&&m(this.prototype,t,s)}}static getPropertyDescriptor(t,e,o){const{get:s,set:i}=g(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);i?.call(this,e),this.requestUpdate(t,r,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??S}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const t=v(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const t=this.properties,e=[...f(t),..._(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(u(t))}else void 0!==t&&e.push(u(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(a)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const o of e){const e=document.createElement("style"),s=n.litNonce;void 0!==s&&e.setAttribute("nonce",s),e.textContent=o.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,o);if(void 0!==s&&!0===o.reflect){const i=(void 0!==o.converter?.toAttribute?o.converter:k).toAttribute(e,o.type);this._$Em=t,null==i?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(t,e){const o=this.constructor,s=o._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=o.getPropertyOptions(s),i="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:k;this._$Em=s;const r=i.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,o,s=!1,i){if(void 0!==t){const r=this.constructor;if(!1===s&&(i=this[t]),o??=r.getPropertyOptions(t),!((o.hasChanged??A)(i,e)||o.useDefault&&o.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,o))))return;this.C(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:s,wrapped:i},r){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==i||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t){const{wrapped:t}=o,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,o,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[x("elementProperties")]=new Map,E[x("finalized")]=new Map,w?.({ReactiveElement:E}),(y.reactiveElementVersions??=[]).push("2.1.2");const D=globalThis,M=t=>t,T=D.trustedTypes,C=T?T.createPolicy("lit-html",{createHTML:t=>t}):void 0,P="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+O,N=`<${z}>`,I=document,F=()=>I.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,R="[ \t\n\f\r]",j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,B=/>/g,W=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Y=/'/g,V=/"/g,q=/^(?:script|style|textarea|title)$/i,J=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),G=J(1),Z=J(2),K=Symbol.for("lit-noChange"),X=Symbol.for("lit-nothing"),Q=new WeakMap,tt=I.createTreeWalker(I,129);function et(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const ot=(t,e)=>{const o=t.length-1,s=[];let i,r=2===e?"<svg>":3===e?"<math>":"",n=j;for(let e=0;e<o;e++){const o=t[e];let a,c,l=-1,d=0;for(;d<o.length&&(n.lastIndex=d,c=n.exec(o),null!==c);)d=n.lastIndex,n===j?"!--"===c[1]?n=L:void 0!==c[1]?n=B:void 0!==c[2]?(q.test(c[2])&&(i=RegExp("</"+c[2],"g")),n=W):void 0!==c[3]&&(n=W):n===W?">"===c[0]?(n=i??j,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?W:'"'===c[3]?V:Y):n===V||n===Y?n=W:n===L||n===B?n=j:(n=W,i=void 0);const h=n===W&&t[e+1].startsWith("/>")?" ":"";r+=n===j?o+N:l>=0?(s.push(a),o.slice(0,l)+P+o.slice(l)+O+h):o+O+(-2===l?e:h)}return[et(t,r+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class st{constructor({strings:t,_$litType$:e},o){let s;this.parts=[];let i=0,r=0;const n=t.length-1,a=this.parts,[c,l]=ot(t,e);if(this.el=st.createElement(c,o),tt.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=tt.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(P)){const e=l[r++],o=s.getAttribute(t).split(O),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:i,name:n[2],strings:o,ctor:"."===n[1]?ct:"?"===n[1]?lt:"@"===n[1]?dt:at}),s.removeAttribute(t)}else t.startsWith(O)&&(a.push({type:6,index:i}),s.removeAttribute(t));if(q.test(s.tagName)){const t=s.textContent.split(O),e=t.length-1;if(e>0){s.textContent=T?T.emptyScript:"";for(let o=0;o<e;o++)s.append(t[o],F()),tt.nextNode(),a.push({type:2,index:++i});s.append(t[e],F())}}}else if(8===s.nodeType)if(s.data===z)a.push({type:2,index:i});else{let t=-1;for(;-1!==(t=s.data.indexOf(O,t+1));)a.push({type:7,index:i}),t+=O.length-1}i++}}static createElement(t,e){const o=I.createElement("template");return o.innerHTML=t,o}}function it(t,e,o=t,s){if(e===K)return e;let i=void 0!==s?o._$Co?.[s]:o._$Cl;const r=U(e)?void 0:e._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),void 0===r?i=void 0:(i=new r(t),i._$AT(t,o,s)),void 0!==s?(o._$Co??=[])[s]=i:o._$Cl=i),void 0!==i&&(e=it(t,i._$AS(t,e.values),i,s)),e}class rt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,s=(t?.creationScope??I).importNode(e,!0);tt.currentNode=s;let i=tt.nextNode(),r=0,n=0,a=o[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new nt(i,i.nextSibling,this,t):1===a.type?e=new a.ctor(i,a.name,a.strings,this,t):6===a.type&&(e=new ht(i,this,t)),this._$AV.push(e),a=o[++n]}r!==a?.index&&(i=tt.nextNode(),r++)}return tt.currentNode=I,s}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class nt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,s){this.type=2,this._$AH=X,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=it(this,t,e),U(t)?t===X||null==t||""===t?(this._$AH!==X&&this._$AR(),this._$AH=X):t!==this._$AH&&t!==K&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==X&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(I.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,s="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=st.createElement(et(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new rt(s,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=Q.get(t.strings);return void 0===e&&Q.set(t.strings,e=new st(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,s=0;for(const i of t)s===e.length?e.push(o=new nt(this.O(F()),this.O(F()),this,this.options)):o=e[s],o._$AI(i),s++;s<e.length&&(this._$AR(o&&o._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=M(t).nextSibling;M(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class at{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,s,i){this.type=1,this._$AH=X,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=i,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=X}_$AI(t,e=this,o,s){const i=this.strings;let r=!1;if(void 0===i)t=it(this,t,e,0),r=!U(t)||t!==this._$AH&&t!==K,r&&(this._$AH=t);else{const s=t;let n,a;for(t=i[0],n=0;n<i.length-1;n++)a=it(this,s[o+n],e,n),a===K&&(a=this._$AH[n]),r||=!U(a)||a!==this._$AH[n],a===X?t=X:t!==X&&(t+=(a??"")+i[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===X?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ct extends at{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===X?void 0:t}}class lt extends at{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==X)}}class dt extends at{constructor(t,e,o,s,i){super(t,e,o,s,i),this.type=5}_$AI(t,e=this){if((t=it(this,t,e,0)??X)===K)return;const o=this._$AH,s=t===X&&o!==X||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,i=t!==X&&(o===X||s);s&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ht{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){it(this,t)}}const ut=D.litHtmlPolyfillSupport;ut?.(st,nt),(D.litHtmlVersions??=[]).push("3.3.3");const pt=globalThis;class mt extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const s=o?.renderBefore??e;let i=s._$litPart$;if(void 0===i){const t=o?.renderBefore??null;s._$litPart$=i=new nt(e.insertBefore(F(),t),t,void 0,o??{})}return i._$AI(t),i})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}mt._$litElement$=!0,mt.finalized=!0,pt.litElementHydrateSupport?.({LitElement:mt});const gt=pt.litElementPolyfillSupport;gt?.({LitElement:mt}),(pt.litElementVersions??=[]).push("4.2.2");const ft=t=>(e,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},_t={attribute:!0,type:String,converter:k,reflect:!1,hasChanged:A},vt=(t=_t,e,o)=>{const{kind:s,metadata:i}=o;let r=globalThis.litPropertyMetadata.get(i);if(void 0===r&&globalThis.litPropertyMetadata.set(i,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(o.name,t),"accessor"===s){const{name:s}=o;return{set(o){const i=e.get.call(this);e.set.call(this,o),this.requestUpdate(s,i,t,!0,o)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=o;return function(o){const i=this[s];e.call(this,o),this.requestUpdate(s,i,t,!0,o)}}throw Error("Unsupported decorator location: "+s)};function yt(t){return(e,o)=>"object"==typeof o?vt(t,e,o):((t,e,o)=>{const s=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),s?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}function bt(t){return yt({...t,state:!0,attribute:!1})}function $t(t,e,o=1){const s=new Date(t.getTime());switch(s.setHours(0,0,0,0),e){case"day":return s;case"week":{const t=(s.getDay()-o+7)%7;return s.setDate(s.getDate()-t),s}case"month":return s.setDate(1),s;case"year":return s.setMonth(0,1),s}}function wt(t,e){const o=new Date(t.getTime());switch(e){case"day":o.setDate(o.getDate()+1);break;case"week":o.setDate(o.getDate()+7);break;case"month":o.setMonth(o.getMonth()+1);break;case"year":o.setFullYear(o.getFullYear()+1)}return o}function xt(t,e){const o=new Date(t.getTime());switch(e){case"day":return o.setDate(o.getDate()-1),o;case"week":return o.setDate(o.getDate()-7),o;case"month":{const t=o.getDate();o.setDate(1),o.setMonth(o.getMonth()-1);const e=new Date(o.getFullYear(),o.getMonth()+1,0).getDate();return o.setDate(Math.min(t,e)),o}case"year":{const t=o.getDate();o.setDate(1),o.setFullYear(o.getFullYear()-1);const e=new Date(o.getFullYear(),o.getMonth()+1,0).getDate();return o.setDate(Math.min(t,e)),o}}}function kt(t,e,o){const s=wt(e,o);return t.getTime()>s.getTime()?s:t.getTime()<e.getTime()?e:t}const At=["S","M","T","W","T","F","S"],St=["J","F","M","A","M","J","J","A","S","O","N","D"];function Et(t,e,o){const{start:s,end:i}=function(t,e,o){const s=$t(t,e,o);return{start:s,end:wt(s,e)}}(t,e,o),r=[];if("day"===e){for(let t=0;t<24;t++){const e=new Date(s.getTime());e.setHours(t,0,0,0);const o=new Date(e.getTime());o.setHours(t+1,0,0,0),r.push({start:e,end:o,label:String(t).padStart(2,"0")})}return r}if("week"===e){for(let t=0;t<7;t++){const e=new Date(s.getTime());e.setDate(s.getDate()+t);const o=new Date(e.getTime());o.setDate(e.getDate()+1),r.push({start:e,end:o,label:At[e.getDay()]})}return r}if("month"===e){let t=new Date(s.getTime());for(;t.getTime()<i.getTime();){const e=7-(t.getDay()-o+7)%7,s=new Date(t.getTime());s.setDate(t.getDate()+e);const n=s.getTime()>i.getTime()?new Date(i.getTime()):s;r.push({start:new Date(t.getTime()),end:n,label:String(t.getDate())}),t=n}return r}for(let t=0;t<12;t++){const e=new Date(s.getFullYear(),t,1,0,0,0,0),o=new Date(s.getFullYear(),t+1,1,0,0,0,0);r.push({start:e,end:o,label:St[t]})}return r}function Dt(t,e=1){if(0===t)return"0";if(Math.abs(t)>=1e3){const e=t/1e3;return Math.round(10*e)/10+"k"}const o=e>=10?0:e>=1?Number.isInteger(e)?0:1:Math.min(4,Math.ceil(-Math.log10(e))+1);return t.toFixed(o)}const Mt=38,Tt=6,Ct=Mt,Pt=Tt,Ot=10,zt=22;function Nt(t,e){const{width:o,height:s}=e,i=Math.max(1,o-Ct-Pt),r=Math.max(1,s-Ot-zt),n=Ot+r,a=t.buckets.length,c=r<110?2:4,l=function(t,e=4){if(!Number.isFinite(t)||t<=0)return e;const o=t/e,s=Math.pow(10,Math.floor(Math.log10(o))),i=o/s;return(i<=1?1:i<=2?2:i<=2.5?2.5:i<=5?5:10)*s*e}(Math.max(...t.totals,0),c),d=i/Math.max(1,a),h=Math.max(2,.62*d),u=e.rounded?Math.min(h/2,4):0,p=function(t){return t<=8?1:t<=14?2:t<=24?3:Math.ceil(t/8)}(a),m=t=>n-t/l*r,g=[];for(let t=0;t<=c;t++){const o=l/c,s=o*t,r=m(s);g.push(Z`
      <line class="grid" x1=${Ct} x2=${Ct+i} y1=${r} y2=${r} />
      <text class="tick" x=${Ct-8} y=${r+4} text-anchor="end">
        ${0===t?e.unit:Dt(s,o)}
      </text>
    `)}const f=t.buckets.map((o,s)=>{const i=Ct+d*s+d/2-h/2,a=t.totals[s],c=m(a),p=Math.max(0,n-c),g=`clip-${s}`,f=null!==e.activeIndex&&e.activeIndex!==s;let _=n;const v=t.series.map(t=>{const e=t.values[s]/l*r,o=_-e;return _=o,e<=0?Z``:Z`<rect x=${i} y=${o} width=${h} height=${e} fill=${t.color} />`}),y=_-c;return Z`
      <g class=${f?"bar dimmed":"bar"}>
        <defs>
          <clipPath id=${g}>
            <rect x=${i} y=${c} width=${h} height=${p+u} rx=${u} ry=${u} />
          </clipPath>
        </defs>
        <g clip-path=${`url(#${g})`}>
          ${p>0?Z`<rect x=${i} y=${c} width=${h} height=${p} fill="var(--ebc-empty-bar)" />`:Z``}
          ${v}
          ${y>.5?Z`<rect x=${i} y=${c} width=${h} height=${y} fill="var(--ebc-empty-bar)" />`:Z``}
        </g>
        <rect
          class="hit"
          x=${Ct+d*s}
          y=${Ot}
          width=${d}
          height=${r}
          @pointerenter=${()=>e.onHover(s)}
          @pointerleave=${()=>e.onHover(null)}
          @click=${()=>e.onSelect(s)}
        />
      </g>
    `}),_=t.buckets.map((t,e)=>{if(e%p!==0)return Z``;return Z`<text class="xlabel" x=${Ct+d*e+d/2} y=${s-6} text-anchor="middle">${t.label}</text>`});return Z`
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
  `}function It(t,e){const o=Math.abs(t)>=1e3?1:2;return new Intl.NumberFormat(e||void 0,{minimumFractionDigits:o,maximumFractionDigits:o}).format(t)}const Ft=["--energy-grid-consumption-color","--accent-color","--primary-color","--label-badge-blue"];function Ut(t,e){const o=t.getPropertyValue(e).trim();return o.startsWith("var(")?"":o}function Ht(t){const e=t.trim().toLowerCase();if(!e)return null;let o,s,i;const r=e.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);if(r){const t=r[1];3===t.length?(o=parseInt(t[0]+t[0],16),s=parseInt(t[1]+t[1],16),i=parseInt(t[2]+t[2],16)):(o=parseInt(t.slice(0,2),16),s=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16))}else{const t=e.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/);if(!t)return null;o=Number(t[1]),s=Number(t[2]),i=Number(t[3])}return[o,s,i].every(t=>Number.isFinite(t))?function(t,e,o){const s=Math.max(t,e,o),i=Math.min(t,e,o),r=(s+i)/2,n=s-i;if(0===n)return{h:0,s:0,l:r};const a=r>.5?n/(2-s-i):n/(s+i);let c;c=s===t?60*((e-o)/n+(e<o?6:0)):s===e?60*((o-t)/n+2):60*((t-e)/n+4);return{h:c,s:a,l:r}}(o/255,s/255,i/255):null}function Rt({h:t,s:e,l:o}){const s=(t%360+360)%360,i=(1-Math.abs(2*o-1))*e,r=i*(1-Math.abs(s/60%2-1)),n=o-i/2,[a,c,l]=s<60?[i,r,0]:s<120?[r,i,0]:s<180?[0,i,r]:s<240?[0,r,i]:s<300?[r,0,i]:[i,0,r],d=t=>Math.round(255*(t+n)).toString(16).padStart(2,"0");return`#${d(a)}${d(c)}${d(l)}`}const jt=(t,e,o)=>Math.min(o,Math.max(e,t));function Lt(t,e){const o=[];for(let s=1;s<=Math.max(e,1);s++){const e=Ut(t,`--graph-color-${s}`);if(!e)break;o.push(e)}const s=Ft.map(e=>Ht(Ut(t,e))).find(t=>null!==t)??Ht("#488fc2"),i=[];for(let t=0;t<e;t++)o.length?i.push(o[t%o.length]):i.push(Rt({h:s.h+137.508*t,s:jt(s.s*(t%2==1?.82:1),.32,.92),l:jt(s.l+.09*(t%3-1),.34,.74)}));return{series:i,other:null!==Ht(Ut(t,"--graph-color-other"))?Ut(t,"--graph-color-other"):Rt({h:s.h,s:.08,l:jt(s.l,.42,.62)})}}function Bt(t,e){try{return Lt(getComputedStyle(t),e)}catch{return Lt({getPropertyValue:()=>""},e)}}async function Wt(t){return t.callWS({type:"energy/get_prefs"})}function Yt(t,e){const o=new Date(t.getTime());switch(e){case"hour":return o.setHours(o.getHours()-1),o;case"day":return o.setDate(o.getDate()-1),o;case"week":return o.setDate(o.getDate()-7),o;case"month":return o.setMonth(o.getMonth()-1),o}}async function Vt(t,e,o,s,i){if(!e.length)return{};return function(t){const e={};for(const[o,s]of Object.entries(t)){if(!s?.length){e[o]=s??[];continue}const t=s.some(t=>"number"==typeof t.change&&Number.isFinite(t.change));if(t){e[o]=s;continue}let i=null;e[o]=s.map(t=>{const e="number"==typeof t.sum&&Number.isFinite(t.sum)?t.sum:null,o=null!==e&&null!==i?e-i:0;return null!==e&&(i=e),{...t,change:o}})}return e}(await t.callWS({type:"recorder/statistics_during_period",start_time:Yt(o,i).toISOString(),end_time:s.toISOString(),statistic_ids:e,period:i,types:["change","sum"],units:{energy:"kWh"}}))}function qt(t){return(t.device_consumption??[]).filter(t=>!t.included_in_stat)}function Jt(t){const e={gridFrom:[],gridTo:[],solarFrom:[],batteryFrom:[],batteryTo:[]};for(const o of t.energy_sources??[])if("grid"===o.type){const t=o.flow_from??[],s=o.flow_to??[];for(const o of t)o?.stat_energy_from&&e.gridFrom.push(o.stat_energy_from);for(const t of s)t?.stat_energy_to&&e.gridTo.push(t.stat_energy_to);!e.gridFrom.length&&o.stat_energy_from&&e.gridFrom.push(o.stat_energy_from),!e.gridTo.length&&o.stat_energy_to&&e.gridTo.push(o.stat_energy_to)}else"solar"===o.type?o.stat_energy_from&&e.solarFrom.push(o.stat_energy_from):"battery"===o.type&&(o.stat_energy_from&&e.batteryFrom.push(o.stat_energy_from),o.stat_energy_to&&e.batteryTo.push(o.stat_energy_to));return e}function Gt(t){return"number"==typeof t?t:new Date(t).getTime()}function Zt(t){const e=t.change;return"number"==typeof e&&Number.isFinite(e)?e:0}function Kt(t,e,o){const s=new Array(o.length).fill(0);if(!o.length)return s;for(const i of e)for(const e of t[i]??[]){const t=Xt(o,Gt(e.start));t>=0&&(s[t]+=Zt(e))}return s}function Xt(t,e){let o=0,s=t.length-1;for(;o<=s;){const i=o+s>>1,r=t[i];if(e<r.start.getTime())s=i-1;else{if(!(e>=r.end.getTime()))return i;o=i+1}}return-1}function Qt(t,e,o,s){const i=o.getTime(),r=s.getTime();let n=0;for(const o of e)for(const e of t[o]??[]){const t=Gt(e.start),o=void 0!==e.end?Gt(e.end):t;if(o<=i||t>=r)continue;const s=Zt(e),a=o-t;if(a<=0){n+=s;continue}const c=Math.min(o,r)-Math.max(t,i);n+=s*Math.min(1,Math.max(0,c/a))}return n}function te(t,e,o,s,i,r,n=[]){if("devices"===o)return Qt(t,r,s,i);const a=Qt(t,n,s,i),c=Qt(t,e.gridFrom,s,i);return"grid"===o?Math.max(0,c-a):Math.max(0,c-Qt(t,e.gridTo,s,i)+Qt(t,e.solarFrom,s,i)+Qt(t,e.batteryFrom,s,i)-Qt(t,e.batteryTo,s,i)-a)}function ee(t,e){const o=new Map((e.devices??[]).map(t=>[t.stat,t])),s=qt(t),i=new Map(s.map((t,e)=>[t.stat_consumption,e])),r=[],n=[];for(const t of s){const e=o.get(t.stat_consumption);e?.excluded?r.push(t.stat_consumption):e?.hidden||n.push(t)}return{all:s,visible:n,excludedIds:r,colorIndex:i}}function oe({prefs:t,stats:e,buckets:o,config:s,palette:i}){const r=new Map((s.devices??[]).map(t=>[t.stat,t])),n=s.total_mode??"grid",{visible:a,excludedIds:c,colorIndex:l}=ee(t,s);let d=a.map(t=>{const s=r.get(t.stat_consumption),n=Kt(e,[t.stat_consumption],o),a=l.get(t.stat_consumption)??0;return{key:t.stat_consumption,name:s?.name||t.name||t.stat_consumption,color:s?.color||i.series[a%i.series.length],values:n,total:n.reduce((t,e)=>t+e,0)}});d.sort((t,e)=>e.total-t.total);const h=s.max_devices??8;let u=new Array(o.length).fill(0);if(h>0&&d.length>h){const t=d.slice(h);d=d.slice(0,h),u=o.map((e,o)=>t.reduce((t,e)=>t+e.values[o],0))}const p=o.map((t,e)=>d.reduce((t,o)=>t+o.values[e],0)+u[e]),m=function(t,e,o,s,i){if("devices"===o)return i.slice();const r=Kt(t,e.gridFrom,s);if("grid"===o)return r;const n=Kt(t,e.gridTo,s),a=Kt(t,e.solarFrom,s),c=Kt(t,e.batteryFrom,s),l=Kt(t,e.batteryTo,s);return r.map((t,e)=>Math.max(0,t-n[e]+a[e]+c[e]-l[e]))}(e,Jt(t),n,o,p),g="devices"===n?o.map(()=>0):Kt(e,c,o),f=m.map((t,e)=>Math.max(0,t-g[e])),_=!1!==s.show_other&&"devices"!==n;if(_||u.some(t=>t>0)){const t=f.map((t,e)=>Math.max(0,(_?t-p[e]:0)+u[e])),e=t.reduce((t,e)=>t+e,0);e>0&&d.push({key:"__other__",name:s.other_name||"Other",color:s.other_color||i.other,values:t,total:e})}const v=o.map((t,e)=>d.reduce((t,o)=>t+o.values[e],0));return{buckets:o,series:d,totals:v.map((t,e)=>Math.max(t,f[e]))}}let se=class extends mt{constructor(){super(...arguments),this._period="week",this._total=0,this._comparison=null,this._loading=!0,this._width=0,this._height=0,this._hover=null,this._totalStatIds=[],this._sourceTypes=[],this._usedDeviceFallback=!1,this._offset=0,this._fetchToken=0}static async getConfigElement(){return await Promise.resolve().then(function(){return de}),document.createElement(e)}static getStubConfig(){return{type:`custom:${t}`,icon:"mdi:lightning-bolt",periods:["day","week","month","year"],default_period:"week",show_comparison:!0,show_legend:!0}}setConfig(t){if(!t)throw new Error("Invalid configuration");const e=(t.periods?.length?t.periods:o).filter(t=>o.includes(t));if(!e.length)throw new Error("At least one time period must be enabled");this._config={...t,periods:e};const s=t.default_period&&e.includes(t.default_period)?t.default_period:e[0];this._period=s,this._loading=!0,this._load()}getCardSize(){return 6}getGridOptions(){return{rows:6,columns:12,min_rows:4,min_columns:6}}getLayoutOptions(){return{grid_rows:6,grid_columns:12,grid_min_rows:4,grid_min_columns:6}}connectedCallback(){super.connectedCallback(),this._resizeObserver=new ResizeObserver(t=>{for(const e of t)this._width=Math.floor(e.contentRect.width),this._height=Math.floor(e.contentRect.height)}),this._timer=window.setInterval(()=>{this._load()},3e5)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),this._resizeObserver=void 0,this._timer&&window.clearInterval(this._timer),this._timer=void 0}firstUpdated(){const t=this.renderRoot.querySelector(".chart");t&&this._resizeObserver&&this._resizeObserver.observe(t)}updated(t){if(!t.has("hass")||!this.hass)return;const e=t.get("hass");e&&e.themes===this.hass.themes||this._load()}get _firstDayOfWeek(){return function(t,e){if("monday"===t)return 1;if("sunday"===t)return 0;try{const t=new Intl.Locale(e||navigator.language||"en-GB"),o="function"==typeof t.getWeekInfo?t.getWeekInfo():t.weekInfo;if(7===o?.firstDay)return 0;if(1===o?.firstDay)return 1}catch{}return 1}(this._config?.first_day_of_week,this.hass?.locale?.language??this.hass?.language)}async _load(){const t=this.hass,e=this._config;if(!t||!e)return;const o=++this._fetchToken;try{const s=await Wt(t),i=e.total_mode??"grid",r=this._period,n=this._firstDayOfWeek,a=new Date,c=function(t,e,o){const s=new Date(t.getTime());switch(e){case"day":s.setDate(s.getDate()-o);break;case"week":s.setDate(s.getDate()-7*o);break;case"month":s.setMonth(s.getMonth()-o);break;case"year":s.setFullYear(s.getFullYear()-o)}return s}($t(a,r,n),r,this._offset),l=wt(c,r),d=0===this._offset?a:l,h=Et(c,r,n),u=function(t){switch(t){case"day":return"hour";case"week":case"month":return"day";case"year":return"month"}}(r),{all:p,visible:m,excludedIds:g}=ee(s,e),f=p.map(t=>t.stat_consumption),_=m.map(t=>t.stat_consumption),v=Jt(s),y=function(t,e){return"devices"===e?[]:"home"===e?[...t.gridFrom,...t.gridTo,...t.solarFrom,...t.batteryFrom,...t.batteryTo]:t.gridFrom}(v,i);if(!f.length&&!y.length)throw new Error("No energy sources or devices are configured in the Energy dashboard.");this._totalStatIds=y,this._sourceTypes=function(t){return Array.from(new Set((t.energy_sources??[]).map(t=>t?.type).filter(Boolean)))}(s);const b=Array.from(new Set([...f,...y])),$=await Vt(t,b,c,l,u);if(o!==this._fetchToken)return;const w=oe({prefs:s,stats:$,buckets:h,config:e,palette:Bt(this,p.length)});let x=te($,v,i,c,d,_,g);const k=Qt($,_,c,d);this._usedDeviceFallback=x<=0&&k>0,this._usedDeviceFallback&&(x=k);let A=null;if(!1!==e.show_comparison&&(A=await this._loadComparison(t,{start:c,displayedEnd:d,periodEnd:l,period:r,mode:i,sources:v,visibleIds:_,excludedIds:g,totalIds:y,statsPeriod:u,current:x}),o!==this._fetchToken))return;this._data=w,this._periodStart=c,this._total=x,this._comparison=A,this._error=void 0,this._loading=!1}catch(t){if(o!==this._fetchToken)return;this._error=t instanceof Error?t.message:String(t),this._loading=!1}}async _loadComparison(t,e){const o=this._config.comparison_mode??"like_for_like",s=function(t,e,o,s){const i=xt(t,o);return"like_for_like"===s?{start:i,end:kt(xt(e,o),i,o)}:{start:i,end:wt(i,o)}}(e.start,e.displayedEnd,e.period,o),i=wt(s.start,e.period),r="devices"===e.mode?e.visibleIds:Array.from(new Set([...e.totalIds,...e.excludedIds]));if(!r.length)return null;const n=te(await Vt(t,r,s.start,i,e.statsPeriod),e.sources,e.mode,s.start,s.end,e.visibleIds,e.excludedIds);if(n<=0)return null;return(("projected"===o?e.current/function(t,e,o){const s=o.getTime()-t.getTime();if(s<=0)return 1;const i=(e.getTime()-t.getTime())/s;return Math.min(1,Math.max(1e-6,i))}(e.start,e.displayedEnd,e.periodEnd):e.current)-n)/n*100}_cyclePeriod(){const t=this._config?.periods??o,e=t.indexOf(this._period);this._period=t[(e+1)%t.length],this._offset=0,this._hover=null,this._loading=!0,this._load()}_step(t){const e=this._offset+t;e<0||(this._offset=e,this._hover=null,this._loading=!0,this._load())}_comparisonText(){const t=this._config?.comparison_mode??"like_for_like",e=i[this._period];return"projected"===t?`projected vs ${e}`:`vs ${e}`}render(){const t=this._config;return t?G`
      <ha-card>
        <div class="root">
          <div class="header">
            <div class="summary">
              ${t.icon?G`<ha-icon class="icon" .icon=${t.icon}></ha-icon>`:X}
              <div class="figures">
                <div class="value">
                  <span class="number">${It(this._total,this.hass?.locale?.language)}</span>
                  <span class="unit">kWh</span>
                </div>
                ${this._renderComparison()}
                ${this._renderPeriodLabel()}
              </div>
            </div>
            <div class="controls">
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
              <button
                class="period"
                @click=${this._cyclePeriod}
                aria-label=${`Time period: ${s[this._period]}. Click to change.`}
              >
                ${s[this._period]}
              </button>
            </div>
          </div>
          ${this._renderNotice()}
          ${this._renderBody()}
          ${!1!==t.show_legend?this._renderLegend():X}
        </div>
      </ha-card>
    `:X}_renderPeriodLabel(){return 0!==this._offset&&this._periodStart?G`
      <div class="period-label">
        ${function(t,e,o){switch(t){case"day":return e.toLocaleDateString(o,{weekday:"short",day:"numeric",month:"short"});case"week":{const t=new Date(e.getTime());t.setDate(t.getDate()+6);const s=e.getMonth()===t.getMonth();return`${e.toLocaleDateString(o,{day:"numeric",...s?{}:{month:"short"}})} – ${t.toLocaleDateString(o,{day:"numeric",month:"short"})}`}case"month":return e.toLocaleDateString(o,{month:"long",year:"numeric"});default:return String(e.getFullYear())}}(this._period,this._periodStart,this.hass?.locale?.language)}
      </div>
    `:X}_renderComparison(){if(!1===this._config?.show_comparison)return X;if(null===this._comparison)return X;const t=this._comparison>0?"up":this._comparison<0?"down":"flat";return G`
      <div class="comparison ${t}">
        <span class="delta">${function(t){const e=Math.round(t);return`${e>0?"+":""}${e}%`}(this._comparison)}</span>
        <span class="against">${this._comparisonText()}</span>
      </div>
    `}_renderNotice(){if(this._error||!this._data||!this._usedDeviceFallback)return X;const t=this._totalStatIds.length?G`no data came back for <code>${this._totalStatIds.join(", ")}</code>`:G`no grid consumption source was found${this._sourceTypes.length?G` (configured sources: ${this._sourceTypes.join(", ")})`:X}`;return G`
      <div class="notice">Showing the device total only — ${t}.</div>
    `}_renderBody(){if(this._error)return G`<div class="chart error"><div class="message">${this._error}</div></div>`;const t=this._height,e=this._data;return G`
      <div class="chart">
        ${e&&this._width>0&&t>0?Nt(e,{width:this._width,height:t,rounded:!1!==this._config?.rounded_bars,unit:"kWh",activeIndex:this._hover,onHover:t=>{this._hover=t},onSelect:t=>{this._hover=this._hover===t?null:t}}):G`<div class="message">${this._loading?"Loading…":""}</div>`}
        ${this._renderTooltip()}
      </div>
    `}_renderTooltip(){const t=this._data,e=this._hover;if(!t||null===e||!this._width)return X;const o=t.buckets[e];if(!o)return X;const s=Math.max(1,this._width-Mt-Tt)/Math.max(1,t.buckets.length),i=Mt+s*e+s/2,r=Math.min(Math.max(i,90),Math.max(90,this._width-90)),n=t.series.filter(t=>t.values[e]>0);return G`
      <div class="tooltip" style=${`left:${r}px`}>
        <div class="tt-head">
          <span>${this._tooltipTitle(o.start)}</span>
          <span class="tt-total">${It(t.totals[e])} kWh</span>
        </div>
        ${n.length?n.map(t=>G`
                <div class="tt-row">
                  <span class="swatch" style=${`background:${t.color}`}></span>
                  <span class="tt-name">${t.name}</span>
                  <span class="tt-value">${It(t.values[e])}</span>
                </div>
              `):G`<div class="tt-row tt-empty">No consumption</div>`}
      </div>
    `}_tooltipTitle(t){const e=this.hass?.locale?.language;switch(this._period){case"day":return t.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"});case"week":return t.toLocaleDateString(e,{weekday:"long"});case"month":return t.toLocaleDateString(e,{day:"numeric",month:"short"});case"year":return t.toLocaleDateString(e,{month:"long"})}}_renderLegend(){const t=this._data;return t&&t.series.length?G`
      <div class="legend">
        ${t.series.map(t=>G`
            <div class="legend-item">
              <span class="swatch" style=${`background:${t.color}`}></span>
              <span class="legend-name">${t.name}</span>
              <span class="legend-value">${It(t.total)}</span>
            </div>
          `)}
      </div>
    `:X}};se.styles=h`
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
      container-type: inline-size;
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
    @container (max-width: 330px) {
      .number {
        font-size: 1.6em;
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
  `,r([yt({attribute:!1})],se.prototype,"hass",void 0),r([bt()],se.prototype,"_config",void 0),r([bt()],se.prototype,"_period",void 0),r([bt()],se.prototype,"_data",void 0),r([bt()],se.prototype,"_total",void 0),r([bt()],se.prototype,"_comparison",void 0),r([bt()],se.prototype,"_error",void 0),r([bt()],se.prototype,"_loading",void 0),r([bt()],se.prototype,"_width",void 0),r([bt()],se.prototype,"_height",void 0),r([bt()],se.prototype,"_hover",void 0),r([bt()],se.prototype,"_totalStatIds",void 0),r([bt()],se.prototype,"_sourceTypes",void 0),r([bt()],se.prototype,"_usedDeviceFallback",void 0),r([bt()],se.prototype,"_offset",void 0),r([bt()],se.prototype,"_periodStart",void 0),se=r([ft(t)],se);const ie=window;ie.customCards=ie.customCards||[],ie.customCards.push({type:t,name:"Energy Breakdown Card",description:"Stacked per-device energy consumption from the Energy dashboard, with day/week/month/year drill-down.",preview:!0,documentationURL:"https://github.com/fwhitten/energy-breakdown-card"}),console.info("%c ENERGY-BREAKDOWN-CARD %c 1.4.0 ","color: white; background: #7c4dff; font-weight: 700;","color: #7c4dff; background: white; font-weight: 700;");const re={icon:"Icon",default_period:"Default time period",periods:"Selectable time periods",total_mode:"Consumption figure",comparison_mode:"Comparison baseline",show_comparison:"Show comparison to previous period",show_legend:"Show legend",show_other:'Show "Other" remainder',other_name:'"Other" label',max_devices:"Maximum devices shown",rounded_bars:"Rounded bars",first_day_of_week:"First day of week"},ne=[{name:"icon",selector:{icon:{}}},{name:"periods",selector:{select:{multiple:!0,mode:"list",options:o.map(t=>({value:t,label:s[t]}))}}},{type:"grid",name:"",schema:[{name:"default_period",selector:{select:{mode:"dropdown",options:o.map(t=>({value:t,label:s[t]}))}}},{name:"total_mode",selector:{select:{mode:"dropdown",options:[{value:"grid",label:"Grid import"},{value:"home",label:"Home consumption (grid + solar + battery)"},{value:"devices",label:"Sum of devices"}]}}}]},{name:"show_comparison",selector:{boolean:{}}},{name:"comparison_mode",selector:{select:{mode:"dropdown",options:[{value:"like_for_like",label:"Same elapsed time in previous period"},{value:"full_previous",label:"Whole previous period"},{value:"projected",label:"Projected period vs whole previous period"}]}}},{name:"show_other",selector:{boolean:{}}},{type:"grid",name:"",schema:[{name:"show_legend",selector:{boolean:{}}},{name:"rounded_bars",selector:{boolean:{}}}]},{type:"grid",name:"",schema:[{name:"first_day_of_week",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Follow language"},{value:"monday",label:"Monday"},{value:"sunday",label:"Sunday"}]}}}]},{name:"max_devices",selector:{number:{min:1,max:20,mode:"box"}}}];let ae=class extends mt{constructor(){super(...arguments),this._devices=[]}setConfig(t){this._config=t,this._loadDevices()}async _loadDevices(){if(this.hass&&!this._devices.length)try{const t=await Wt(this.hass);this._devices=qt(t),this._devicesError=void 0}catch(t){this._devicesError="Could not read the Energy dashboard configuration. Set it up under Settings → Dashboards → Energy."}}updated(){this._loadDevices()}get _data(){const t=this._config;return{show_comparison:!0,show_legend:!0,show_other:!0,rounded_bars:!0,comparison_mode:"like_for_like",total_mode:"grid",first_day_of_week:"auto",max_devices:8,periods:o,...t}}_emit(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_valueChanged(t){t.stopPropagation();const e={...t.detail.value};e.periods?.length&&e.default_period&&!e.periods.includes(e.default_period)&&(e.default_period=e.periods[0]),this._emit(e)}_updateDevice(t,e){const o=this._data,s=[...o.devices??[]],i=s.findIndex(e=>e.stat===t),r={...i>=0?s[i]:{stat:t},...e},n=!r.name&&!r.color&&!r.hidden;i>=0?n?s.splice(i,1):s[i]=r:n||s.push(r);const a={...o};s.length?a.devices=s:delete a.devices,this._emit(a)}_updateConfig(t){const e={...this._data,...t};for(const o of Object.keys(t))void 0===e[o]&&delete e[o];this._emit(e)}_override(t){return(this._config?.devices??[]).find(e=>e.stat===t)}render(){return this._config&&this.hass?G`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${ne}
          .computeLabel=${t=>re[t.name]??t.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
        ${this._renderDevices()}
      </div>
    `:X}_renderDevices(){const t=Bt(this,this._devices.length);return G`
      <div class="devices">
        <h4>Devices</h4>
        ${this._devicesError?G`<div class="warning">${this._devicesError}</div>`:0===this._devices.length?G`<div class="hint">
                No individual devices are configured in the Energy dashboard yet.
              </div>`:G`<div class="hint">
                  Rename or recolour any device from the Energy dashboard. &#931; takes a device out
                  of the total consumption figure; the eye hides it from the chart while still
                  counting it towards the total.
                </div>
                ${this._devices.map((e,o)=>this._renderDevice(e,o,t.series))}`}
        ${!1!==this._data.show_other?this._renderOtherRow():X}
      </div>
    `}_renderOtherRow(){const t=this._data;return G`
      <div class="device">
        <input
          class="color"
          type="color"
          .value=${t.other_color||Bt(this,this._devices.length).other}
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
    `}_renderDevice(t,e,o){const s=t.stat_consumption,i=this._override(s),r=i?.color||o[e%o.length];return G`
      <div class="device ${i?.hidden?"hidden":""}">
        <input
          class="color"
          type="color"
          .value=${r}
          title="Colour"
          @change=${t=>this._updateDevice(s,{color:t.target.value})}
        />
        <div class="field">
          <span class="dev-name" title=${s}>${t.name||s}</span>
          <input
            class="rename"
            type="text"
            placeholder=${t.name||s}
            .value=${i?.name??""}
            @change=${t=>this._updateDevice(s,{name:t.target.value||void 0})}
          />
        </div>
        <button
          class="toggle ${i?.excluded?"off":""}"
          title=${i?.excluded?"Excluded from the total — click to count it again":"Counted in the total — click to exclude it"}
          aria-pressed=${i?.excluded?"true":"false"}
          @click=${()=>this._updateDevice(s,{excluded:!i?.excluded||void 0})}
        >
          &#931;
        </button>
        <button
          class="toggle ${i?.hidden?"off":""}"
          title=${i?.hidden?"Hidden — click to show":"Shown — click to hide"}
          aria-pressed=${i?.hidden?"true":"false"}
          ?disabled=${i?.excluded}
          @click=${()=>this._updateDevice(s,{hidden:!i?.hidden||void 0})}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d=${i?.hidden?le:ce} />
          </svg>
        </button>
      </div>
    `}};ae.styles=h`
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
  `,r([bt()],ae.prototype,"_config",void 0),r([bt()],ae.prototype,"_devices",void 0),r([bt()],ae.prototype,"_devicesError",void 0),ae=r([ft(e)],ae);const ce="M12 9a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z",le="M11.83 9 15 12.16V12a3 3 0 0 0-3-3h-.17m-4.3.8 1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28.46.46A11.8 11.8 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7Z";var de=Object.freeze({__proto__:null,get EnergyBreakdownCardEditor(){return ae}});
