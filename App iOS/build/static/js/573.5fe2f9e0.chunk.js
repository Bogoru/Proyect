/*! For license information please see 573.5fe2f9e0.chunk.js.LICENSE.txt */
"use strict";(globalThis.webpackChunkionic_app_base=globalThis.webpackChunkionic_app_base||[]).push([[573],{573:(e,t,i)=>{i.r(t),i.d(t,{KEYBOARD_DID_CLOSE:()=>s,KEYBOARD_DID_OPEN:()=>o,copyVisualViewport:()=>f,keyboardDidClose:()=>w,keyboardDidOpen:()=>g,keyboardDidResize:()=>l,resetKeyboardAssist:()=>r,setKeyboardClose:()=>c,setKeyboardOpen:()=>b,startKeyboardAssist:()=>h,trackViewportChanges:()=>D});const o="ionKeyboardDidShow",s="ionKeyboardDidHide";let a={},d={},n=!1;const r=()=>{a={},d={},n=!1},h=e=>{p(e),e.visualViewport&&(d=f(e.visualViewport),e.visualViewport.onresize=()=>{D(e),g()||l(e)?b(e):w(e)&&c(e)})},p=e=>{e.addEventListener("keyboardDidShow",(t=>b(e,t))),e.addEventListener("keyboardDidHide",(()=>c(e)))},b=(e,t)=>{u(e,t),n=!0},c=e=>{y(e),n=!1},g=()=>{const e=(a.height-d.height)*d.scale;return!n&&a.width===d.width&&e>150},l=e=>n&&!w(e),w=e=>n&&d.height===e.innerHeight,u=(e,t)=>{const i=t?t.keyboardHeight:e.innerHeight-d.height,s=new CustomEvent(o,{detail:{keyboardHeight:i}});e.dispatchEvent(s)},y=e=>{const t=new CustomEvent(s);e.dispatchEvent(t)},D=e=>{a=Object.assign({},d),d=f(e.visualViewport)},f=e=>({width:Math.round(e.width),height:Math.round(e.height),offsetTop:e.offsetTop,offsetLeft:e.offsetLeft,pageTop:e.pageTop,pageLeft:e.pageLeft,scale:e.scale})}}]);
//# sourceMappingURL=573.5fe2f9e0.chunk.js.map