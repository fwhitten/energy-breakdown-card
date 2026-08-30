const e="energy-breakdown-card",t="energy-breakdown-card-editor",s=["day","week","month","year"],o={day:"Day",week:"Week",month:"Month",year:"Year"},i={day:"yesterday",week:"last week",month:"last month",year:"last year"},r={vibrant:["#e040fb","#f2a6ff","#7c4dff","#b388ff","#00e5ff","#1de9b6","#ffab40","#ff5252","#69f0ae","#ffd740"],colorblind:["#0072b2","#e69f00","#009e73","#cc79a7","#56b4e9","#d55e00","#f0e442","#8c8c8c","#004c6d","#a05195"],cool:["#00bcd4","#3f51b5","#009688","#673ab7","#03a9f4","#4caf50","#7e57c2","#26a69a"],warm:["#ff7043","#ffa726","#ec407a","#ffca28","#ef5350","#ff8a65","#d81b60","#f4511e"]},n="#7a7aa0";function a(e,t,s,o){var i,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,s):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,s,o);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(n=(r<3?i(n):r>3?i(t,s,n):i(t,s))||n);return r>3&&n&&Object.defineProperty(t,s,n),n}"function"==typeof SuppressedError&&SuppressedError;const c=globalThis,l=c.ShadowRoot&&(void 0===c.ShadyCSS||c.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,d=Symbol(),h=new WeakMap;let p=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==d)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(l&&void 0===e){const s=void 0!==t&&1===t.length;s&&(e=h.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&h.set(t,e))}return e}toString(){return this.cssText}};const u=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,s,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[o+1],e[0]);return new p(s,e,d)},m=l?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return(e=>new p("string"==typeof e?e:e+"",void 0,d))(t)})(e):e,{is:f,defineProperty:g,getOwnPropertyDescriptor:_,getOwnPropertyNames:v,getOwnPropertySymbols:y,getPrototypeOf:$}=Object,b=globalThis,w=b.trustedTypes,x=w?w.emptyScript:"",A=b.reactiveElementPolyfillSupport,E=(e,t)=>e,S={toAttribute(e,t){switch(t){case Boolean:e=e?x:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},k=(e,t)=>!f(e,t),C={attribute:!0,type:String,converter:S,reflect:!1,useDefault:!1,hasChanged:k};Symbol.metadata??=Symbol("metadata"),b.litPropertyMetadata??=new WeakMap;let D=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=C){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),o=this.getPropertyDescriptor(e,s,t);void 0!==o&&g(this.prototype,e,o)}}static getPropertyDescriptor(e,t,s){const{get:o,set:i}=_(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const r=o?.call(this);i?.call(this,t),this.requestUpdate(e,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??C}static _$Ei(){if(this.hasOwnProperty(E("elementProperties")))return;const e=$(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(E("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(E("properties"))){const e=this.properties,t=[...v(e),...y(e)];for(const s of t)this.createProperty(s,e[s])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const s=this._$Eu(e,t);void 0!==s&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(m(e))}else void 0!==e&&t.push(m(e));return t}static _$Eu(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(l)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const s of t){const t=document.createElement("style"),o=c.litNonce;void 0!==o&&t.setAttribute("nonce",o),t.textContent=s.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,s);if(void 0!==o&&!0===s.reflect){const i=(void 0!==s.converter?.toAttribute?s.converter:S).toAttribute(t,s.type);this._$Em=e,null==i?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(e,t){const s=this.constructor,o=s._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=s.getPropertyOptions(o),i="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:S;this._$Em=o;const r=i.fromAttribute(t,e.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(e,t,s,o=!1,i){if(void 0!==e){const r=this.constructor;if(!1===o&&(i=this[e]),s??=r.getPropertyOptions(e),!((s.hasChanged??k)(i,t)||s.useDefault&&s.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,s))))return;this.C(e,t,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:o,wrapped:i},r){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==i||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,s]of e){const{wrapped:e}=s,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,s,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};D.elementStyles=[],D.shadowRootOptions={mode:"open"},D[E("elementProperties")]=new Map,D[E("finalized")]=new Map,A?.({ReactiveElement:D}),(b.reactiveElementVersions??=[]).push("2.1.2");const M=globalThis,T=e=>e,O=M.trustedTypes,P=O?O.createPolicy("lit-html",{createHTML:e=>e}):void 0,U="$lit$",R=`lit$${Math.random().toFixed(9).slice(2)}$`,H="?"+R,N=`<${H}>`,z=document,F=()=>z.createComment(""),I=e=>null===e||"object"!=typeof e&&"function"!=typeof e,j=Array.isArray,L="[ \t\n\f\r]",W=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,B=/-->/g,Y=/>/g,q=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),V=/'/g,J=/"/g,G=/^(?:script|style|textarea|title)$/i,Z=e=>(t,...s)=>({_$litType$:e,strings:t,values:s}),K=Z(1),X=Z(2),Q=Symbol.for("lit-noChange"),ee=Symbol.for("lit-nothing"),te=new WeakMap,se=z.createTreeWalker(z,129);function oe(e,t){if(!j(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==P?P.createHTML(t):t}const ie=(e,t)=>{const s=e.length-1,o=[];let i,r=2===t?"<svg>":3===t?"<math>":"",n=W;for(let t=0;t<s;t++){const s=e[t];let a,c,l=-1,d=0;for(;d<s.length&&(n.lastIndex=d,c=n.exec(s),null!==c);)d=n.lastIndex,n===W?"!--"===c[1]?n=B:void 0!==c[1]?n=Y:void 0!==c[2]?(G.test(c[2])&&(i=RegExp("</"+c[2],"g")),n=q):void 0!==c[3]&&(n=q):n===q?">"===c[0]?(n=i??W,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?q:'"'===c[3]?J:V):n===J||n===V?n=q:n===B||n===Y?n=W:(n=q,i=void 0);const h=n===q&&e[t+1].startsWith("/>")?" ":"";r+=n===W?s+N:l>=0?(o.push(a),s.slice(0,l)+U+s.slice(l)+R+h):s+R+(-2===l?t:h)}return[oe(e,r+(e[s]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};class re{constructor({strings:e,_$litType$:t},s){let o;this.parts=[];let i=0,r=0;const n=e.length-1,a=this.parts,[c,l]=ie(e,t);if(this.el=re.createElement(c,s),se.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=se.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(U)){const t=l[r++],s=o.getAttribute(e).split(R),n=/([.?@])?(.*)/.exec(t);a.push({type:1,index:i,name:n[2],strings:s,ctor:"."===n[1]?de:"?"===n[1]?he:"@"===n[1]?pe:le}),o.removeAttribute(e)}else e.startsWith(R)&&(a.push({type:6,index:i}),o.removeAttribute(e));if(G.test(o.tagName)){const e=o.textContent.split(R),t=e.length-1;if(t>0){o.textContent=O?O.emptyScript:"";for(let s=0;s<t;s++)o.append(e[s],F()),se.nextNode(),a.push({type:2,index:++i});o.append(e[t],F())}}}else if(8===o.nodeType)if(o.data===H)a.push({type:2,index:i});else{let e=-1;for(;-1!==(e=o.data.indexOf(R,e+1));)a.push({type:7,index:i}),e+=R.length-1}i++}}static createElement(e,t){const s=z.createElement("template");return s.innerHTML=e,s}}function ne(e,t,s=e,o){if(t===Q)return t;let i=void 0!==o?s._$Co?.[o]:s._$Cl;const r=I(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),void 0===r?i=void 0:(i=new r(e),i._$AT(e,s,o)),void 0!==o?(s._$Co??=[])[o]=i:s._$Cl=i),void 0!==i&&(t=ne(e,i._$AS(e,t.values),i,o)),t}class ae{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,o=(e?.creationScope??z).importNode(t,!0);se.currentNode=o;let i=se.nextNode(),r=0,n=0,a=s[0];for(;void 0!==a;){if(r===a.index){let t;2===a.type?t=new ce(i,i.nextSibling,this,e):1===a.type?t=new a.ctor(i,a.name,a.strings,this,e):6===a.type&&(t=new ue(i,this,e)),this._$AV.push(t),a=s[++n]}r!==a?.index&&(i=se.nextNode(),r++)}return se.currentNode=z,o}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class ce{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,o){this.type=2,this._$AH=ee,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ne(this,e,t),I(e)?e===ee||null==e||""===e?(this._$AH!==ee&&this._$AR(),this._$AH=ee):e!==this._$AH&&e!==Q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>j(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ee&&I(this._$AH)?this._$AA.nextSibling.data=e:this.T(z.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,o="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=re.createElement(oe(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===o)this._$AH.p(t);else{const e=new ae(o,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=te.get(e.strings);return void 0===t&&te.set(e.strings,t=new re(e)),t}k(e){j(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,o=0;for(const i of e)o===t.length?t.push(s=new ce(this.O(F()),this.O(F()),this,this.options)):s=t[o],s._$AI(i),o++;o<t.length&&(this._$AR(s&&s._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=T(e).nextSibling;T(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class le{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,o,i){this.type=1,this._$AH=ee,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=i,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=ee}_$AI(e,t=this,s,o){const i=this.strings;let r=!1;if(void 0===i)e=ne(this,e,t,0),r=!I(e)||e!==this._$AH&&e!==Q,r&&(this._$AH=e);else{const o=e;let n,a;for(e=i[0],n=0;n<i.length-1;n++)a=ne(this,o[s+n],t,n),a===Q&&(a=this._$AH[n]),r||=!I(a)||a!==this._$AH[n],a===ee?e=ee:e!==ee&&(e+=(a??"")+i[n+1]),this._$AH[n]=a}r&&!o&&this.j(e)}j(e){e===ee?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class de extends le{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ee?void 0:e}}class he extends le{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ee)}}class pe extends le{constructor(e,t,s,o,i){super(e,t,s,o,i),this.type=5}_$AI(e,t=this){if((e=ne(this,e,t,0)??ee)===Q)return;const s=this._$AH,o=e===ee&&s!==ee||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,i=e!==ee&&(s===ee||o);o&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ue{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){ne(this,e)}}const me=M.litHtmlPolyfillSupport;me?.(re,ce),(M.litHtmlVersions??=[]).push("3.3.3");const fe=globalThis;class ge extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{const o=s?.renderBefore??t;let i=o._$litPart$;if(void 0===i){const e=s?.renderBefore??null;o._$litPart$=i=new ce(t.insertBefore(F(),e),e,void 0,s??{})}return i._$AI(e),i})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Q}}ge._$litElement$=!0,ge.finalized=!0,fe.litElementHydrateSupport?.({LitElement:ge});const _e=fe.litElementPolyfillSupport;_e?.({LitElement:ge}),(fe.litElementVersions??=[]).push("4.2.2");const ve=e=>(t,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ye={attribute:!0,type:String,converter:S,reflect:!1,hasChanged:k},$e=(e=ye,t,s)=>{const{kind:o,metadata:i}=s;let r=globalThis.litPropertyMetadata.get(i);if(void 0===r&&globalThis.litPropertyMetadata.set(i,r=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),r.set(s.name,e),"accessor"===o){const{name:o}=s;return{set(s){const i=t.get.call(this);t.set.call(this,s),this.requestUpdate(o,i,e,!0,s)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){const{name:o}=s;return function(s){const i=this[o];t.call(this,s),this.requestUpdate(o,i,e,!0,s)}}throw Error("Unsupported decorator location: "+o)};function be(e){return(t,s)=>"object"==typeof s?$e(e,t,s):((e,t,s)=>{const o=t.hasOwnProperty(s);return t.constructor.createProperty(s,e),o?Object.getOwnPropertyDescriptor(t,s):void 0})(e,t,s)}function we(e){return be({...e,state:!0,attribute:!1})}function xe(e,t,s=1){const o=new Date(e.getTime());switch(o.setHours(0,0,0,0),t){case"day":return o;case"week":{const e=(o.getDay()-s+7)%7;return o.setDate(o.getDate()-e),o}case"month":return o.setDate(1),o;case"year":return o.setMonth(0,1),o}}function Ae(e,t){const s=new Date(e.getTime());switch(t){case"day":s.setDate(s.getDate()+1);break;case"week":s.setDate(s.getDate()+7);break;case"month":s.setMonth(s.getMonth()+1);break;case"year":s.setFullYear(s.getFullYear()+1)}return s}function Ee(e,t){const s=new Date(e.getTime());switch(t){case"day":return s.setDate(s.getDate()-1),s;case"week":return s.setDate(s.getDate()-7),s;case"month":{const e=s.getDate();s.setDate(1),s.setMonth(s.getMonth()-1);const t=new Date(s.getFullYear(),s.getMonth()+1,0).getDate();return s.setDate(Math.min(e,t)),s}case"year":{const e=s.getDate();s.setDate(1),s.setFullYear(s.getFullYear()-1);const t=new Date(s.getFullYear(),s.getMonth()+1,0).getDate();return s.setDate(Math.min(e,t)),s}}}function Se(e,t,s){const o=xe(e,t,s);return{start:o,end:Ae(o,t)}}function ke(e,t,s){const o=Ae(t,s);return e.getTime()>o.getTime()?o:e.getTime()<t.getTime()?t:e}const Ce=["S","M","T","W","T","F","S"],De=["J","F","M","A","M","J","J","A","S","O","N","D"];function Me(e,t=1){if(0===e)return"0";if(Math.abs(e)>=1e3){const t=e/1e3;return Math.round(10*t)/10+"k"}const s=t>=10?0:t>=1?Number.isInteger(t)?0:1:Math.min(4,Math.ceil(-Math.log10(t))+1);return e.toFixed(s)}const Te=38,Oe=6,Pe=Te,Ue=Oe,Re=10,He=22;function Ne(e,t){const{width:s,height:o}=t,i=Math.max(1,s-Pe-Ue),r=Math.max(1,o-Re-He),n=Re+r,a=e.buckets.length,c=function(e,t=4){if(!Number.isFinite(e)||e<=0)return t;const s=e/t,o=Math.pow(10,Math.floor(Math.log10(s))),i=s/o;return(i<=1?1:i<=2?2:i<=2.5?2.5:i<=5?5:10)*o*t}(Math.max(...e.totals,0)),l=i/Math.max(1,a),d=Math.max(2,.62*l),h=t.rounded?Math.min(d/2,14):0,p=function(e){return e<=8?1:e<=14?2:e<=24?3:Math.ceil(e/8)}(a),u=e=>n-e/c*r,m=[];for(let e=0;e<=4;e++){const s=c/4,o=s*e,r=u(o);m.push(X`
      <line class="grid" x1=${Pe} x2=${Pe+i} y1=${r} y2=${r} />
      <text class="tick" x=${Pe-8} y=${r+4} text-anchor="end">
        ${0===e?t.unit:Me(o,s)}
      </text>
    `)}const f=e.buckets.map((s,o)=>{const i=Pe+l*o+l/2-d/2,a=e.totals[o],p=u(a),m=Math.max(0,n-p),f=`clip-${o}`,g=null!==t.activeIndex&&t.activeIndex!==o;let _=n;const v=e.series.map(e=>{const t=e.values[o]/c*r,s=_-t;return _=s,t<=0?X``:X`<rect x=${i} y=${s} width=${d} height=${t} fill=${e.color} />`}),y=_-p;return X`
      <g class=${g?"bar dimmed":"bar"}>
        <defs>
          <clipPath id=${f}>
            <rect x=${i} y=${p} width=${d} height=${m+h} rx=${h} ry=${h} />
          </clipPath>
        </defs>
        <g clip-path=${`url(#${f})`}>
          ${m>0?X`<rect x=${i} y=${p} width=${d} height=${m} fill="var(--ebc-empty-bar)" />`:X``}
          ${v}
          ${y>.5?X`<rect x=${i} y=${p} width=${d} height=${y} fill="var(--ebc-empty-bar)" />`:X``}
        </g>
        <rect
          class="hit"
          x=${Pe+l*o}
          y=${Re}
          width=${l}
          height=${r}
          @pointerenter=${()=>t.onHover(o)}
          @pointerleave=${()=>t.onHover(null)}
          @click=${()=>t.onSelect(o)}
        />
      </g>
    `}),g=e.buckets.map((e,t)=>{if(t%p!==0)return X``;return X`<text class="xlabel" x=${Pe+l*t+l/2} y=${o-6} text-anchor="middle">${e.label}</text>`});return X`
    <svg
      viewBox=${`0 0 ${s} ${o}`}
      width=${s}
      height=${o}
      role="img"
      aria-label="Energy consumption by period"
    >
      ${m}
      ${f}
      ${g}
    </svg>
  `}function ze(e,t){const s=Math.abs(e)>=1e3?1:2;return new Intl.NumberFormat(t||void 0,{minimumFractionDigits:s,maximumFractionDigits:s}).format(e)}async function Fe(e){return e.callWS({type:"energy/get_prefs"})}async function Ie(e,t,s,o,i){return t.length?e.callWS({type:"recorder/statistics_during_period",start_time:s.toISOString(),end_time:o.toISOString(),statistic_ids:t,period:i,types:["change"]}):{}}function je(e){return(e.device_consumption??[]).filter(e=>!e.included_in_stat)}function Le(e){const t={gridFrom:[],gridTo:[],solarFrom:[],batteryFrom:[],batteryTo:[]};for(const s of e.energy_sources??[])if("grid"===s.type){for(const e of s.flow_from??[])e.stat_energy_from&&t.gridFrom.push(e.stat_energy_from);for(const e of s.flow_to??[])e.stat_energy_to&&t.gridTo.push(e.stat_energy_to)}else"solar"===s.type?s.stat_energy_from&&t.solarFrom.push(s.stat_energy_from):"battery"===s.type&&(s.stat_energy_from&&t.batteryFrom.push(s.stat_energy_from),s.stat_energy_to&&t.batteryTo.push(s.stat_energy_to));return t}function We(e){return"number"==typeof e?e:new Date(e).getTime()}function Be(e){const t=e.change;return"number"==typeof t&&Number.isFinite(t)?t:0}function Ye(e,t,s){const o=new Array(s.length).fill(0);if(!s.length)return o;for(const i of t)for(const t of e[i]??[]){const e=qe(s,We(t.start));e>=0&&(o[e]+=Be(t))}return o}function qe(e,t){let s=0,o=e.length-1;for(;s<=o;){const i=s+o>>1,r=e[i];if(t<r.start.getTime())o=i-1;else{if(!(t>=r.end.getTime()))return i;s=i+1}}return-1}function Ve(e,t,s,o){const i=s.getTime(),r=o.getTime();let n=0;for(const s of t)for(const t of e[s]??[]){const e=We(t.start),s=void 0!==t.end?We(t.end):e;if(s<=i||e>=r)continue;const o=Be(t),a=s-e;if(a<=0){n+=o;continue}const c=Math.min(s,r)-Math.max(e,i);n+=o*Math.min(1,Math.max(0,c/a))}return n}function Je(e,t,s,o,i,r){if("devices"===s)return Ve(e,r,o,i);const n=Ve(e,t.gridFrom,o,i);return"grid"===s?n:Math.max(0,n-Ve(e,t.gridTo,o,i)+Ve(e,t.solarFrom,o,i)+Ve(e,t.batteryFrom,o,i)-Ve(e,t.batteryTo,o,i))}function Ge(e){return r[e??"vibrant"]??r.vibrant}function Ze({prefs:e,stats:t,buckets:s,config:o}){const i=new Map((o.devices??[]).map(e=>[e.stat,e])),r=Ge(o.color_scheme),a=o.total_mode??"grid",c=je(e).filter(e=>!i.get(e.stat_consumption)?.hidden);let l=c.map((e,o)=>{const n=i.get(e.stat_consumption),a=Ye(t,[e.stat_consumption],s);return{key:e.stat_consumption,name:n?.name||e.name||e.stat_consumption,color:n?.color||r[o%r.length],values:a,total:a.reduce((e,t)=>e+t,0)}});l.sort((e,t)=>t.total-e.total);const d=o.max_devices??8;let h=new Array(s.length).fill(0);if(d>0&&l.length>d){const e=l.slice(d);l=l.slice(0,d),h=s.map((t,s)=>e.reduce((e,t)=>e+t.values[s],0))}const p=s.map((e,t)=>l.reduce((e,s)=>e+s.values[t],0)+h[t]),u=function(e,t,s,o,i){if("devices"===s)return i.slice();const r=Ye(e,t.gridFrom,o);if("grid"===s)return r;const n=Ye(e,t.gridTo,o),a=Ye(e,t.solarFrom,o),c=Ye(e,t.batteryFrom,o),l=Ye(e,t.batteryTo,o);return r.map((e,t)=>Math.max(0,e-n[t]+a[t]+c[t]-l[t]))}(t,Le(e),a,s,p),m=!1!==o.show_other&&"devices"!==a;if(m||h.some(e=>e>0)){const e=u.map((e,t)=>Math.max(0,(m?e-p[t]:0)+h[t])),t=e.reduce((e,t)=>e+t,0);t>0&&l.push({key:"__other__",name:o.other_name||"Other",color:o.other_color||n,values:e,total:t})}const f=s.map((e,t)=>l.reduce((e,s)=>e+s.values[t],0));return{buckets:s,series:l,totals:f.map((e,t)=>Math.max(e,u[t]))}}let Ke=class extends ge{constructor(){super(...arguments),this._period="week",this._total=0,this._comparison=null,this._loading=!0,this._width=0,this._hover=null,this._fetchToken=0}static async getConfigElement(){return await Promise.resolve().then(function(){return it}),document.createElement(t)}static getStubConfig(){return{type:`custom:${e}`,icon:"mdi:lightning-bolt",label:"Used",periods:["day","week","month","year"],default_period:"week",show_comparison:!0,show_legend:!0}}setConfig(e){if(!e)throw new Error("Invalid configuration");const t=(e.periods?.length?e.periods:s).filter(e=>s.includes(e));if(!t.length)throw new Error("At least one time period must be enabled");this._config={...e,periods:t};const o=e.default_period&&t.includes(e.default_period)?e.default_period:t[0];this._period=o,this._loading=!0,this._load()}getCardSize(){return 6}getGridOptions(){return{rows:6,columns:12,min_rows:4,min_columns:6}}getLayoutOptions(){return{grid_rows:6,grid_columns:12,grid_min_rows:4,grid_min_columns:6}}connectedCallback(){super.connectedCallback(),this._resizeObserver=new ResizeObserver(e=>{for(const t of e)this._width=Math.floor(t.contentRect.width)}),this._timer=window.setInterval(()=>{this._load()},3e5)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),this._resizeObserver=void 0,this._timer&&window.clearInterval(this._timer),this._timer=void 0}firstUpdated(){const e=this.renderRoot.querySelector(".chart");e&&this._resizeObserver&&this._resizeObserver.observe(e)}updated(e){e.has("hass")&&!e.get("hass")&&this.hass&&this._load()}get _firstDayOfWeek(){return function(e,t){if("monday"===e)return 1;if("sunday"===e)return 0;try{const e=new Intl.Locale(t||navigator.language||"en-GB"),s="function"==typeof e.getWeekInfo?e.getWeekInfo():e.weekInfo;if(7===s?.firstDay)return 0;if(1===s?.firstDay)return 1}catch{}return 1}(this._config?.first_day_of_week,this.hass?.locale?.language??this.hass?.language)}async _load(){const e=this.hass,t=this._config;if(!e||!t)return;const s=++this._fetchToken;try{const o=await Fe(e),i=t.total_mode??"grid",r=this._period,n=this._firstDayOfWeek,a=new Date,c=function(e,t,s){const{start:o,end:i}=Se(e,t,s),r=[];if("day"===t){for(let e=0;e<24;e++){const t=new Date(o.getTime());t.setHours(e,0,0,0);const s=new Date(t.getTime());s.setHours(e+1,0,0,0),r.push({start:t,end:s,label:String(e).padStart(2,"0")})}return r}if("week"===t){for(let e=0;e<7;e++){const t=new Date(o.getTime());t.setDate(o.getDate()+e);const s=new Date(t.getTime());s.setDate(t.getDate()+1),r.push({start:t,end:s,label:Ce[t.getDay()]})}return r}if("month"===t){let e=new Date(o.getTime());for(;e.getTime()<i.getTime();){const t=7-(e.getDay()-s+7)%7,o=new Date(e.getTime());o.setDate(e.getDate()+t);const n=o.getTime()>i.getTime()?new Date(i.getTime()):o;r.push({start:new Date(e.getTime()),end:n,label:String(e.getDate())}),e=n}return r}for(let e=0;e<12;e++){const t=new Date(o.getFullYear(),e,1,0,0,0,0),s=new Date(o.getFullYear(),e+1,1,0,0,0,0);r.push({start:t,end:s,label:De[e]})}return r}(a,r,n),{start:l,end:d}=Se(a,r,n),h=function(e){switch(e){case"day":return"hour";case"week":case"month":return"day";case"year":return"month"}}(r),p=je(o).map(e=>e.stat_consumption),u=Le(o),m=function(e,t){return"devices"===t?[]:"home"===t?[...e.gridFrom,...e.gridTo,...e.solarFrom,...e.batteryFrom,...e.batteryTo]:e.gridFrom}(u,i);if(!p.length&&!m.length)throw new Error("No energy sources or devices are configured in the Energy dashboard.");const f=Array.from(new Set([...p,...m])),g=await Ie(e,f,l,d,h);if(s!==this._fetchToken)return;const _=Ze({prefs:o,stats:g,buckets:c,config:t}),v=Je(g,u,i,l,a,p);let y=null;if(!1!==t.show_comparison&&(y=await this._loadComparison(e,{now:a,period:r,fdow:n,mode:i,sources:u,deviceIds:p,totalIds:m,statsPeriod:h,current:v}),s!==this._fetchToken))return;this._data=_,this._total=v,this._comparison=y,this._error=void 0,this._loading=!1}catch(e){if(s!==this._fetchToken)return;this._error=e instanceof Error?e.message:String(e),this._loading=!1}}async _loadComparison(e,t){const s=this._config.comparison_mode??"like_for_like",o=function(e,t,s,o){const i=Ee(xe(e,t,o),t);return"like_for_like"===s?{start:i,end:ke(Ee(e,t),i,t)}:{start:i,end:Ae(i,t)}}(t.now,t.period,s,t.fdow),i=xe(o.start,t.period,t.fdow),r=Ae(i,t.period),n="devices"===t.mode?t.deviceIds:t.totalIds;if(!n.length)return null;const a=Je(await Ie(e,n,i,r,t.statsPeriod),t.sources,t.mode,o.start,o.end,t.deviceIds);if(a<=0)return null;return(("projected"===s?t.current/function(e,t,s){const{start:o,end:i}=Se(e,t,s),r=i.getTime()-o.getTime();if(r<=0)return 1;const n=(e.getTime()-o.getTime())/r;return Math.min(1,Math.max(1e-6,n))}(t.now,t.period,t.fdow):t.current)-a)/a*100}_cyclePeriod(){const e=this._config?.periods??s,t=e.indexOf(this._period);this._period=e[(t+1)%e.length],this._hover=null,this._loading=!0,this._load()}_comparisonText(){const e=this._config?.comparison_mode??"like_for_like",t=i[this._period];return"projected"===e?`projected vs ${t}`:`vs ${t}`}render(){const e=this._config;return e?K`
      <ha-card>
        <div class="root">
          <div class="header">
            <div class="summary">
              ${e.icon?K`<ha-icon class="icon" .icon=${e.icon}></ha-icon>`:ee}
              <div class="figures">
                <div class="value">
                  <span class="number">${ze(this._total,this.hass?.locale?.language)}</span>
                  <span class="unit">kWh</span>
                </div>
                ${e.label?K`<div class="label">${e.label}</div>`:ee}
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
          ${!1!==e.show_legend?this._renderLegend():ee}
        </div>
      </ha-card>
    `:ee}_renderComparison(){if(!1===this._config?.show_comparison)return ee;if(null===this._comparison)return ee;const e=this._comparison>0?"up":this._comparison<0?"down":"flat";return K`
      <div class="comparison ${e}">
        <span class="delta">${function(e){const t=Math.round(e);return`${t>0?"+":""}${t}%`}(this._comparison)}</span>
        <span class="against">${this._comparisonText()}</span>
      </div>
    `}_renderBody(){if(this._error)return K`<div class="chart error"><div class="message">${this._error}</div></div>`;const e=this._config?.chart_height??200,t=this._data;return K`
      <div class="chart" style=${`height:${e}px`}>
        ${t&&this._width>0?Ne(t,{width:this._width,height:e,rounded:!1!==this._config?.rounded_bars,unit:"kWh",activeIndex:this._hover,onHover:e=>{this._hover=e},onSelect:e=>{this._hover=this._hover===e?null:e}}):K`<div class="message">${this._loading?"Loading…":""}</div>`}
        ${this._renderTooltip()}
      </div>
    `}_renderTooltip(){const e=this._data,t=this._hover;if(!e||null===t||!this._width)return ee;const s=e.buckets[t];if(!s)return ee;const o=Math.max(1,this._width-Te-Oe)/Math.max(1,e.buckets.length),i=Te+o*t+o/2,r=Math.min(Math.max(i,90),Math.max(90,this._width-90)),n=e.series.filter(e=>e.values[t]>0);return K`
      <div class="tooltip" style=${`left:${r}px`}>
        <div class="tt-head">
          <span>${this._tooltipTitle(s.start)}</span>
          <span class="tt-total">${ze(e.totals[t])} kWh</span>
        </div>
        ${n.length?n.map(e=>K`
                <div class="tt-row">
                  <span class="swatch" style=${`background:${e.color}`}></span>
                  <span class="tt-name">${e.name}</span>
                  <span class="tt-value">${ze(e.values[t])}</span>
                </div>
              `):K`<div class="tt-row tt-empty">No consumption</div>`}
      </div>
    `}_tooltipTitle(e){const t=this.hass?.locale?.language;switch(this._period){case"day":return e.toLocaleTimeString(t,{hour:"2-digit",minute:"2-digit"});case"week":return e.toLocaleDateString(t,{weekday:"long"});case"month":return e.toLocaleDateString(t,{day:"numeric",month:"short"});case"year":return e.toLocaleDateString(t,{month:"long"})}}_renderLegend(){const e=this._data;return e&&e.series.length?K`
      <div class="legend">
        ${e.series.map(e=>K`
            <div class="legend-item">
              <span class="swatch" style=${`background:${e.color}`}></span>
              <span class="legend-name">${e.name}</span>
              <span class="legend-value">${ze(e.total)}</span>
            </div>
          `)}
      </div>
    `:ee}};Ke.styles=u`
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
    .label {
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-size: 0.85em;
      font-weight: 600;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }
    .comparison {
      display: flex;
      align-items: baseline;
      gap: 5px;
      font-size: 0.85em;
      margin-top: 4px;
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
      color: var(--primary-text-color);
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
  `,a([be({attribute:!1})],Ke.prototype,"hass",void 0),a([we()],Ke.prototype,"_config",void 0),a([we()],Ke.prototype,"_period",void 0),a([we()],Ke.prototype,"_data",void 0),a([we()],Ke.prototype,"_total",void 0),a([we()],Ke.prototype,"_comparison",void 0),a([we()],Ke.prototype,"_error",void 0),a([we()],Ke.prototype,"_loading",void 0),a([we()],Ke.prototype,"_width",void 0),a([we()],Ke.prototype,"_hover",void 0),Ke=a([ve(e)],Ke);const Xe=window;Xe.customCards=Xe.customCards||[],Xe.customCards.push({type:e,name:"Energy Breakdown Card",description:"Stacked per-device energy consumption from the Energy dashboard, with day/week/month/year drill-down.",preview:!0,documentationURL:"https://github.com/fwhitten/energy-breakdown-card"}),console.info("%c ENERGY-BREAKDOWN-CARD %c 1.0.0 ","color: white; background: #7c4dff; font-weight: 700;","color: #7c4dff; background: white; font-weight: 700;");const Qe={icon:"Icon",label:"Caption",default_period:"Default time period",periods:"Selectable time periods",total_mode:"Consumption figure",comparison_mode:"Comparison baseline",show_comparison:"Show comparison to previous period",show_legend:"Show legend",show_other:'Show "Other" remainder',other_name:'"Other" label',color_scheme:"Colour scheme",max_devices:"Maximum devices shown",chart_height:"Chart height (px)",rounded_bars:"Rounded bars",first_day_of_week:"First day of week"},et=[{type:"grid",name:"",schema:[{name:"icon",selector:{icon:{}}},{name:"label",selector:{text:{}}}]},{name:"periods",selector:{select:{multiple:!0,mode:"list",options:s.map(e=>({value:e,label:o[e]}))}}},{type:"grid",name:"",schema:[{name:"default_period",selector:{select:{mode:"dropdown",options:s.map(e=>({value:e,label:o[e]}))}}},{name:"total_mode",selector:{select:{mode:"dropdown",options:[{value:"grid",label:"Grid import"},{value:"home",label:"Home consumption (grid + solar + battery)"},{value:"devices",label:"Sum of devices"}]}}}]},{name:"show_comparison",selector:{boolean:{}}},{name:"comparison_mode",selector:{select:{mode:"dropdown",options:[{value:"like_for_like",label:"Same elapsed time in previous period"},{value:"full_previous",label:"Whole previous period"},{value:"projected",label:"Projected period vs whole previous period"}]}}},{name:"show_other",selector:{boolean:{}}},{type:"grid",name:"",schema:[{name:"show_legend",selector:{boolean:{}}},{name:"rounded_bars",selector:{boolean:{}}}]},{type:"grid",name:"",schema:[{name:"color_scheme",selector:{select:{mode:"dropdown",options:Object.keys(r).map(e=>({value:e,label:e.charAt(0).toUpperCase()+e.slice(1)}))}}},{name:"first_day_of_week",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Follow language"},{value:"monday",label:"Monday"},{value:"sunday",label:"Sunday"}]}}}]},{type:"grid",name:"",schema:[{name:"max_devices",selector:{number:{min:1,max:20,mode:"box"}}},{name:"chart_height",selector:{number:{min:100,max:500,step:10,mode:"box"}}}]}];let tt=class extends ge{constructor(){super(...arguments),this._devices=[]}setConfig(e){this._config=e,this._loadDevices()}async _loadDevices(){if(this.hass&&!this._devices.length)try{const e=await Fe(this.hass);this._devices=je(e),this._devicesError=void 0}catch(e){this._devicesError="Could not read the Energy dashboard configuration. Set it up under Settings → Dashboards → Energy."}}updated(){this._loadDevices()}get _data(){const e=this._config;return{show_comparison:!0,show_legend:!0,show_other:!0,rounded_bars:!0,comparison_mode:"like_for_like",total_mode:"grid",color_scheme:"vibrant",first_day_of_week:"auto",max_devices:8,chart_height:200,periods:s,...e}}_emit(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}_valueChanged(e){e.stopPropagation();const t={...e.detail.value};t.periods?.length&&t.default_period&&!t.periods.includes(t.default_period)&&(t.default_period=t.periods[0]),this._emit(t)}_updateDevice(e,t){const s=this._data,o=[...s.devices??[]],i=o.findIndex(t=>t.stat===e),r={...i>=0?o[i]:{stat:e},...t},n=!r.name&&!r.color&&!r.hidden;i>=0?n?o.splice(i,1):o[i]=r:n||o.push(r);const a={...s};o.length?a.devices=o:delete a.devices,this._emit(a)}_updateConfig(e){const t={...this._data,...e};for(const s of Object.keys(e))void 0===t[s]&&delete t[s];this._emit(t)}_override(e){return(this._config?.devices??[]).find(t=>t.stat===e)}render(){return this._config&&this.hass?K`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${et}
          .computeLabel=${e=>Qe[e.name]??e.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
        ${this._renderDevices()}
      </div>
    `:ee}_renderDevices(){const e=Ge(this._data.color_scheme);return K`
      <div class="devices">
        <h4>Devices</h4>
        ${this._devicesError?K`<div class="warning">${this._devicesError}</div>`:0===this._devices.length?K`<div class="hint">
                No individual devices are configured in the Energy dashboard yet.
              </div>`:K`<div class="hint">
                  Rename, recolour or hide any device from the Energy dashboard. Leave a name blank to
                  use the Energy dashboard's own name.
                </div>
                ${this._devices.map((t,s)=>this._renderDevice(t,s,e))}`}
        ${!1!==this._data.show_other?this._renderOtherRow():ee}
      </div>
    `}_renderOtherRow(){const e=this._data;return K`
      <div class="device">
        <input
          class="color"
          type="color"
          .value=${e.other_color||n}
          title="Colour"
          @change=${e=>this._updateConfig({other_color:e.target.value})}
        />
        <ha-textfield
          class="name"
          .value=${e.other_name??""}
          placeholder="Other"
          @change=${e=>this._updateConfig({other_name:e.target.value||void 0})}
        ></ha-textfield>
        <span class="spacer"></span>
      </div>
    `}_renderDevice(e,t,s){const o=e.stat_consumption,i=this._override(o),r=i?.color||s[t%s.length];return K`
      <div class="device ${i?.hidden?"hidden":""}">
        <input
          class="color"
          type="color"
          .value=${r}
          title="Colour"
          @change=${e=>this._updateDevice(o,{color:e.target.value})}
        />
        <ha-textfield
          class="name"
          .value=${i?.name??""}
          .placeholder=${e.name||o}
          @change=${e=>this._updateDevice(o,{name:e.target.value||void 0})}
        ></ha-textfield>
        <ha-icon-button
          .path=${i?.hidden?ot:st}
          .label=${i?.hidden?"Show device":"Hide device"}
          @click=${()=>this._updateDevice(o,{hidden:!i?.hidden||void 0})}
        ></ha-icon-button>
      </div>
    `}};tt.styles=u`
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
  `,a([we()],tt.prototype,"_config",void 0),a([we()],tt.prototype,"_devices",void 0),a([we()],tt.prototype,"_devicesError",void 0),tt=a([ve(t)],tt);const st="M12 9a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z",ot="M11.83 9 15 12.16V12a3 3 0 0 0-3-3h-.17m-4.3.8 1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28.46.46A11.8 11.8 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7Z";var it=Object.freeze({__proto__:null,get EnergyBreakdownCardEditor(){return tt}});
