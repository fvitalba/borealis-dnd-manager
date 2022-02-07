(this["webpackJsonpborealis-webclient"]=this["webpackJsonpborealis-webclient"]||[]).push([[0],{14:function(e,t,a){},15:function(e,t,a){},17:function(e,t,a){"use strict";a.r(t);var n=a(2),o=a.n(n),r=a(6),s=a.n(r),i=(a(14),a(15),a(3)),c=a(0),l=a(4),u=function(e,t,a,n,o,r){return e&&0!==e.trim().length?new Promise((function(s,i){var c=n,l=new Image;l.onload=function(){var e=a.width,t=a.height;e||t?e?t||(t=e*l.height/l.width):e=t*l.width/l.height:(e=l.width,t=l.height),(o?o(e,t):Promise.resolve()).then((function(){c.drawImage(l,a.x||0,a.y||0,e,t),s(e,t)}))},l.onerror=function(e){console.error("Unable to draw image.",l.src),t&&(console.error("Deleting ".concat(t,"Url...")),r((function(e){return delete e["".concat(t,"Url")]}))),i("Unable to draw ".concat(t,"Url"))},l.src=e})):(o&&o(),Promise.resolve(a.width,a.height))},d=a(9),g=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=Object(n.useRef)(null);return Object(n.useEffect)((function(){var t=o.current.getContext(a.context||"2d");e(t)}),[e]),o},m=a(1),b=["id","draw","options"],j=function(e){var t=e.id,a=e.draw,n=(e.options,Object(d.a)(e,b)),o=g(a);return Object(m.jsx)("canvas",Object(c.a)({id:t,ref:o},n))},p=function(e){var t=e.gameState,a=(e.setGameState,e.controlPanelState),n=e.setControlPanelState,o=e.updateTokens,r=e.updateMap,s=t.game.maps?t.game.maps[t.game.mapId]:void 0;return Object(m.jsx)(j,{id:"background",onClick:function(e){n(Object(c.a)(Object(c.a)({},a),{},{toggleOnMaps:!1,toggleOnTokens:!1}),(function(){return o((function(e){return e.$selected=!1}))}))},width:s?s.width:0,height:s?s.height:0,draw:function(e){s&&u(s.imageUrl,s.name,s,e,null,r)}})},f=function(e){var t=e.gameState,a=t.game.width,n=t.game.height,o=function(){if(0!==t.game.maps.length){var e=t.game.maps.filter((function(e){return parseInt(e.$id)===parseInt(t.game.mapId)}));return e.length>0?e[0]:t.game.maps[0]}}(),r=function(e,t){e.globalCompositeOperation="source-over",e.beginPath();for(var a=0;a<t.length;a++)e.lineCap="round",e.fillStyle=t[a].drawColor,e.lineWidth=t[a].drawSize,e.strokeStyle=t[a].drawColor,0===a?e.moveTo(t[a].x,t[a].y):e.lineTo(t[a].x,t[a].y)},s=function(e,t){e.globalCompositeOperation="destination-out",e.beginPath();for(var a=0;a<t.length;a++)e.lineCap="round",e.lineWidth=t[a].drawSize,0===a?e.moveTo(t[a].x,t[a].y):e.lineTo(t[a].x,t[a].y)};return Object(m.jsx)(j,{id:"drawing",className:"passthrough",width:a,height:n,draw:function(e){if(o&&e){e.beginPath(),e.clearRect(0,0,a,n);for(var t=0;t<o.drawPaths.length;t++){var i=o.drawPaths[t];switch(i.length>0?i[0].tool:""){case"draw":r(e,i);break;case"erease":s(e,i)}e.stroke()}}}})},h=function(e){var t=e.gameState,a=t.metadata.isHost?t.settings.fogOpacity:1,n=t.game.width,o=t.game.height,r=function(){if(0!==t.game.maps.length){var e=t.game.maps.filter((function(e){return parseInt(e.$id)===parseInt(t.game.mapId)}));return e.length>0?e[0]:t.game.maps[0]}}(),s=function(e,t){var a;e.beginPath(),e.globalCompositeOperation="destination-out";for(var n=0;n<t.length;n++)(a=e.createRadialGradient(t[n].x,t[n].y,t[n].r2||1,t[n].x,t[n].y,.75*t[n].r)).addColorStop(0,"rgba(0,0,0,255)"),a.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=a,e.fillRect(t[n].x-t[n].r,t[n].y-t[n].r,t[n].x+t[n].r,t[n].y+t[n].r)};return Object(m.jsx)(j,{id:"fog",className:"passthrough",style:{opacity:a},width:n,height:o,draw:function(e){if(r&&e){e.beginPath(),e.globalCompositeOperation="destination-over",e.fillStyle="black",e.fillRect(0,0,n,o);for(var t=0;t<r.fogPaths.length;t++){var a=r.fogPaths[t];s(e,a),e.stroke()}}}})},O=function(e){var t=e.gameState,a=t.game.maps[t.game.mapId]||void 0,n=a?a.width:t.game.width,o=a?a.height:t.game.height,r=t.overlayRef;return Object(m.jsx)("canvas",{id:"overlay",ref:r,width:n,height:o})},v=function(e){var t=e.divStyle,a=e.token,n=e.classes,o=e.imgStyle,r=(e.onMouseUp,e.onMouseDown);return Object(m.jsx)("div",{style:t,title:a.name,className:n.join(" "),onMouseDown:function(e){return r(e)},children:Object(m.jsx)("img",{src:a.url,alt:a.name||"",style:o})})},w=function(e){var t=e.gameState,a=e.token,n=e.selectGameToken,o=t.metadata.isHost,r=t.game.mapId,s=!1;if(!a.url||!a.url.trim())return null;var i=["token",a.ko&&"dead",a.pc?"pc":"npc",a.$selected&&"selected",o&&!a.pc&&"grabbable"],c={left:a.x||0,top:a.y||0},l={width:a.width||void 0,height:a.height||void 0};return([void 0,null].indexOf(a.mapId)>=0||r===a.mapId)&&(s=!0),s?Object(m.jsx)(v,{divStyle:c,token:a,classes:i,imgStyle:l,onMouseDown:function(e){"move"===t.settings.tool&&(a.$selected||n(a,!0,e.metaKey))}}):null},x=function(e){var t=e.cursor,a=e.size,n=e.name,o={top:t.y,left:t.x},r={fontSize:a||void 0};return Object(m.jsxs)("div",{style:o,className:"cursor",children:[Object(m.jsx)("span",{role:"img","aria-label":"pointer",style:r,children:"\ud83d\udde1"}),t.u||n]})},k=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=window.crypto.getRandomValues(new Uint32Array(1))[0]*Math.pow(2,-32)*16|0;return("x"===e?t:3&t|8).toString(16)}))};var S=function(e){var t=e.title,a=e.value,n=e.onClick,o=e.isSelected,r=e.style,s=e.disabled;return Object(m.jsx)("button",{title:t,onClick:n,className:o?"selected":null,style:r,disabled:s,children:Object(m.jsx)("span",{role:"img","aria-label":t,children:a})})};var y=function(e){var t=e.controlPanelState,a=e.setControlPanelState,n=e.title,o=e.value,r="toggleOn".concat(n),s=t[r];return Object(m.jsx)(S,{title:n,value:o,onClick:function(){a(Object(c.a)(Object(c.a)({},t),{},Object(i.a)({},r,!t[r])))},isSelected:s})};var C=function(e){var t=e.gameState,a=e.setGameState,n=e.title,o=e.value,r=n===t.settings.tool;return Object(m.jsx)(S,{title:n,value:o.toString(),onClick:function(){a(Object(c.a)(Object(c.a)({},t),{},{settings:Object(c.a)(Object(c.a)({},t.settings),{},{tool:n})}))},isSelected:r})},T=function(e){var t=e.gameState,a=e.setGameState;return Object(m.jsxs)("span",{id:"tools",children:[Object(m.jsx)(C,{title:"move",value:"\ud83e\uddf3",gameState:t,setGameState:a}),Object(m.jsx)(C,{title:"draw",value:"\ud83d\udd8d",gameState:t,setGameState:a}),Object(m.jsx)(C,{title:"fog",value:"\ud83c\udf2c",gameState:t,setGameState:a})]})},P=function(e){var t=e.gameState,a=e.onTextChangeGame,n=e.setFogOpacity,o=e.setSubtool,r=e.resetFog,s=e.resetDrawing;switch(t.settings.tool){case"draw":return Object(m.jsxs)("span",{children:[Object(m.jsx)(S,{title:"eraser",value:"\ud83e\uddfd",onClick:function(){return o("eraser")},isSelected:"eraser"===t.settings.subtool}),Object(m.jsx)(S,{title:"pencil",value:"\ud83d\udd8d",onClick:function(){return o("pencil")},isSelected:"pencil"===t.settings.subtool}),Object(m.jsx)("input",{size:"3",title:"draw size",value:t.settings.drawSize,onChange:function(e){return a("drawSize",e)},type:"number",step:"3",min:"1"}),Object(m.jsx)("input",{size:"3",title:"draw color",value:t.settings.drawColor,onChange:function(e){return a("drawColor",e)}}),Object(m.jsx)(S,{style:{backgroundColor:t.settings.drawColor},value:"\ud83d\udd8c",disabled:!0}),Object(m.jsx)(S,{title:"reset drawing",onClick:s,value:"\ud83c\udf00"})]});case"move":return null;case"fog":return Object(m.jsxs)("span",{children:[Object(m.jsx)(S,{title:"reset fog",onClick:r,value:"\ud83c\udf00"}),Object(m.jsx)("input",{size:"3",title:"fog radius",value:t.settings.fogRadius||0,onChange:function(e){return a("fogRadius",e)},type:"number",step:"5",min:"1"}),Object(m.jsx)("input",{size:"3",title:"fog opacity",step:"0.05",min:"0",max:"1",value:t.settings.fogOpacity,onChange:function(e){return n(e)},type:"number"})]});default:return null}},I=function(e){var t=e.gameState,a=e.setGameState,n=e.resetFog,o=e.resetDrawing;return Object(m.jsx)("span",{children:Object(m.jsx)(P,{gameState:t,onTextChangeGame:function(e,n){a(Object(c.a)(Object(c.a)({},t),{},{settings:Object(c.a)(Object(c.a)({},t.settings),{},Object(i.a)({},e,n.target.value))}))},setFogOpacity:function(e){var n=e.target.value;isNaN(n)||a(Object(c.a)(Object(c.a)({},t),{},{settings:Object(c.a)(Object(c.a)({},t.settings),{},{fogOpacity:n})}))},setSubtool:function(e){a(Object(c.a)(Object(c.a)({},t),{},{settings:Object(c.a)(Object(c.a)({},t.settings),{},{subtool:e})}))},resetFog:n,resetDrawing:o})})},G=function(e){var t=e.isSelected,a=e.mapConfigState,n=e.mapId,o=e.load,r=e.onTextChange,s=e.onIntegerChange,i=e.deleteMap;return Object(m.jsxs)("div",{className:t?"selected":null,children:[n," - ",a.name,Object(m.jsx)("input",{value:a.imageUrl||"",placeholder:"Map url",size:"8",onChange:function(e){return r("imageUrl",e)}}),"w:",Object(m.jsx)("input",{value:a.width||0,placeholder:"width",className:"text3",onChange:function(e){return s("width",e)},type:"number",min:"0",step:"10",title:"width"}),"h:",Object(m.jsx)("input",{value:a.height||0,placeholder:"height",className:"text3",onChange:function(e){return s("height",e)},type:"number",min:"0",step:"10",title:"height"}),Object(m.jsx)(S,{title:"Save & load map",value:"\ud83d\udcc0",onClick:o}),Object(m.jsx)(S,{title:"Delete map",value:"\ud83d\uddd1",onClick:i})]})},N=function(e){var t=e.gameState,a=e.setGameState,o=e.map,r=e.mapId,s=(e.websocket,Object(n.useState)(function(e,t){var a=e.game.maps.filter((function(e){return e.$id===t.$id}))||{name:void 0,url:void 0,w:void 0,h:void 0};return{$id:t.$id,name:a.name?a.name:t.name,imageUrl:a.imageUrl?a.imageUrl:"",width:a.width?a.width:window.innerWidth,height:a.height?a.height:window.innerHeight,x:0,y:0}}(t,o))),u=Object(l.a)(s,2),d=u[0],g=u[1],b=t.game.mapId===r;return o?Object(m.jsx)(G,{isSelected:b,mapConfigState:d,mapId:r,load:function(){var e=t.game.maps.map((function(e){return parseInt(r)===e.$id?Object(c.a)(Object(c.a)({},e),{},{imageUrl:d.imageUrl,width:d.width,height:d.height}):e}));a(Object(c.a)(Object(c.a)({},t),{},{game:Object(c.a)(Object(c.a)({},t.game),{},{maps:e,mapId:parseInt(r),isFirstLoadDone:!0,isFogLoaded:!0})}))},onTextChange:function(e,t){g(Object(c.a)(Object(c.a)({},d),{},Object(i.a)({},e,t.target.value)))},onIntegerChange:function(e,t){var a=parseInt(t.target.value)||void 0;g(Object(c.a)(Object(c.a)({},d),{},Object(i.a)({},e,a)))},deleteMap:function(){if(window.confirm("Delete map?")){var e=t.game.maps.filter((function(e){return parseInt(e.$id)!==parseInt(r)}));a(Object(c.a)(Object(c.a)({},t),{},{game:Object(c.a)(Object(c.a)({},t.game),{},{maps:e,mapId:parseInt(r)===t.game.mapId?void 0:t.game.mapId})}))}}}):null},U=function(e){var t=e.gameState,a=e.setGameState,n=e.controlPanelState,o=e.onTextChange,r=e.createMap,s=e.websocket;if(!n.toggleOnMaps)return null;var i=t.game.maps,c=i&&Object.keys(i);return Object(m.jsxs)("div",{children:[Object(m.jsx)("hr",{}),Object(m.jsxs)("div",{children:[Object(m.jsx)("input",{placeholder:"New map name",onChange:function(e){return o("newMapName",e)},value:n.newMapName}),Object(m.jsx)(S,{title:"Create new map",value:"\u2795",onClick:r,disabled:!n.newMapName||""===n.newMapName}),c&&c.map((function(e,n){return Object(m.jsx)(N,{gameState:t,setGameState:a,map:i[e],mapId:e,websocket:s},"map".concat(n))}))]})]})},$=function(e){var t=e.maps,a=e.token,n=e.copy,o=e.onToggle,r=e.selectToken,s=e.onTextChange,i=e.onIntegerChange,c=e.onMapSelect,l=e.deleteToken;return Object(m.jsxs)("div",{className:"tokenConfig",children:[Object(m.jsx)(S,{title:"Duplicate token",value:"\ud83d\udc6f",onClick:n}),Object(m.jsx)(S,{value:a.pc?"\ud83d\udda5":"\ud83d\udc64",onClick:function(e){return o("pc",e)},title:"pc/npc"}),Object(m.jsx)(S,{value:a.$selected?"\u2705":"\u274c",onClick:function(e){return r(a,e)},title:"(un)select"}),Object(m.jsx)(S,{value:a.ko?"\ud83e\udd40":"\ud83c\udf39",onClick:function(e){return o("ko",e)},title:"alive/dead"}),Object(m.jsx)("input",{value:a.name||"",placeholder:"Name",size:"8",onChange:function(e){return s("name",e)}}),Object(m.jsx)("input",{value:a.url||"",placeholder:"Url",size:"8",onChange:function(e){return s("url",e)}}),"wh:",Object(m.jsx)("input",{value:a.width||"",placeholder:"w",className:"text2",onChange:function(e){return i("width",e)},type:"number",step:"5",min:"0",title:"width"}),Object(m.jsx)("input",{value:a.height||"",placeholder:"h",className:"text2",onChange:function(e){return i("height",e)},type:"number",step:"5",min:"0",title:"height"}),"xy:",Object(m.jsx)("input",{value:a.x||"",placeholder:"x",className:"text3",onChange:function(e){return i("x",e)},type:"number",step:"5",title:"x coord"}),Object(m.jsx)("input",{value:a.y||"",placeholder:"y",className:"text3",onChange:function(e){return i("y",e)},type:"number",step:"5",title:"y coord"}),Object(m.jsxs)("select",{defaultValue:a.mapId,onChange:function(e){return c(e)},title:"which map(s)",children:[Object(m.jsx)("option",{children:"(all)"}),Object.keys(t).map((function(e,a){return Object(m.jsx)("option",{value:e,children:t[e].name||t[e].imageUrl||"(unnamed)"},a)}))]}),Object(m.jsx)(S,{title:"Delete token",value:"\ud83d\uddd1",onClick:l})]})},M=function(e){var t=e.token,a=e.onTextChange,n=e.onIntegerChange;return Object(m.jsxs)("div",{className:"tokenConfig",children:[Object(m.jsx)("input",{value:t.name||"",placeholder:"Name",size:"8",onChange:function(e){return a("name",e)}}),Object(m.jsx)("input",{value:t.url||"",placeholder:"Url",size:"8",onChange:function(e){return a("url",e)}}),"wh:",Object(m.jsx)("input",{value:t.width||"",placeholder:"w",className:"text2",onChange:function(e){return n("width",e)},type:"number",step:"5",min:"0",title:"width"}),Object(m.jsx)("input",{value:t.height||"",placeholder:"h",className:"text2",onChange:function(e){return n("height",e)},type:"number",step:"5",min:"0",title:"height"}),"xy:",Object(m.jsx)("input",{value:t.x||"",placeholder:"x",className:"text3",onChange:function(e){return n("x",e)},type:"number",step:"5",title:"x coord"}),Object(m.jsx)("input",{value:t.y||"",placeholder:"y",className:"text3",onChange:function(e){return n("y",e)},type:"number",step:"5",title:"y coord"})]})},R=function(e){var t=e.gameState,a=e.setGameState,n=e.token,o=e.updateGameToken,r=e.selectGameToken,s=function(e){o(n,e)},i=function(e,t){s((function(a){return a[e]=parseInt(t.target.value)||void 0}))},l=function(e,t){s((function(a){return a[e]=t.target.value}))},u=t.game.maps;return Object(m.jsx)("div",{children:n?t.metadata.isHost?Object(m.jsx)($,{maps:u,token:n,copy:function e(){var o=t.game.tokens.map((function(e){return e})),r=o.indexOf(n);o.splice(r+1,0,e),a(Object(c.a)(Object(c.a)({},t),{},{game:Object(c.a)(Object(c.a)({},t.game),{},{tokens:o})}))},onToggle:function(e){s((function(t){return t[e]=!t[e]}))},selectToken:function(e,t){r(e,void 0,!0)},onTextChange:l,onIntegerChange:i,onMapSelect:function(e){var a=e.target.value;Object.keys(t.game.maps).indexOf(a)<0&&(a=void 0),s((function(e){return e.mapId=a}))},deleteToken:function(){var e=t.game.tokens.map((function(e){return e})),o=e.indexOf(n);e.splice(o,1),a(Object(c.a)(Object(c.a)({},t),{},{game:Object(c.a)(Object(c.a)({},t.game),{},{tokens:e})}))}}):Object(m.jsx)(M,{token:n,onTextChange:l,onIntegerChange:i}):null})},D=function(e){var t=e.gameState,a=e.setGameState,n=e.updateGameToken,o=e.selectGameToken,r=t.game.tokens.filter((function(e){return e.$selected}));return Object(m.jsx)("div",{children:r.map((function(e,r){return Object(m.jsx)(R,{token:e,gameState:t,setGameState:a,updateGameToken:n,selectGameToken:o},"token".concat(r))}))})},z=function(e){var t=e.gameState,a=e.setGameState,n=e.toggleOnTokens,o=e.onTextChange,r=e.newTokenUrl,s=e.createToken,i=e.updateGameToken,c=e.selectGameToken;return t.metadata.isHost?n?Object(m.jsxs)("div",{children:[Object(m.jsx)("hr",{}),Object(m.jsx)("input",{placeholder:"New token url",onChange:function(e){return o("newTokenUrl",e)},value:r||""}),Object(m.jsx)(S,{title:"Create new token",value:"\u2795",onClick:s}),t.game.tokens.length,t.game.tokens.map((function(e,n){return Object(m.jsx)(R,{token:e,gameState:t,setGameState:a,updateGameToken:i,selectGameToken:c},"token".concat(n))}))]}):Object(m.jsx)(D,{gameState:t,setGameState:a,updateGameToken:i,selectGameToken:c}):null},E=function(e){var t=e.gameState,a=e.controlPanelState,n=e.setControlPanelState,o=e.initAsDev,r=e.toggleOnUser,s=e.copyJson,i=e.pasteJson,c=e.setGameSettingsInt,l=e.setGameSettingsText;return r?Object(m.jsxs)("div",{children:[Object(m.jsx)("hr",{}),Object(m.jsx)("input",{title:"User name",placeholder:"User name",value:t.settings.username||"",onChange:function(e){return l("username",e)}}),Object(m.jsx)(y,{title:"Share mouse (cursor)",value:"\ud83d\udc01",controlPanelState:a,setControlPanelState:n}),Object(m.jsx)("input",{title:"Cursor size",value:t.metadata.cursorsize||"",onChange:function(e){return c("cursorSize",e)},type:"number",min:"0"}),Object(m.jsx)("hr",{}),Object(m.jsx)(S,{title:"Redo as dev",value:"\ud83d\udd30",onClick:o}),Object(m.jsx)(S,{title:"Copy JSON to clipboard",value:"\ud83d\udc6f",onClick:s}),Object(m.jsx)(S,{title:"Paste JSON from clipboard",value:"\ud83d\udccb",onClick:i})]}):null},J=function(e){var t=e.gameState,a=e.setGameState,n=e.controlPanelState,o=e.setControlPanelState,r=e.websocket,s=e.hidden,i=e.toggleHidden,c=e.setGameSettingsInt,l=e.setGameSettingsText,u=e.socketRequestRefresh,d=e.initAsDev,g=e.toggleOnUser,b=e.toggleOnTokens,j=e.copyJson,p=e.pasteJson,f=e.onTextChange,h=e.createMap,O=e.updateGameToken,v=e.selectGameToken,w=e.newTokenUrl,x=e.createToken,k=e.resetFog,C=e.resetDrawing;return s?Object(m.jsxs)("div",{id:"control-panel",children:["\xa0\xa0\xa0\xa0",Object(m.jsx)(S,{value:"\ud83d\udc41",onClick:i,title:"show/hide control panel"}),"\xa0\xa0\xa0\xa0"]}):t.metadata.isHost?Object(m.jsxs)("div",{id:"control-panel",children:["\xa0\xa0\xa0\xa0",Object(m.jsx)(S,{value:"\ud83d\udc41",onClick:i,title:"show/hide control panel"}),"\xa0\xa0\xa0\xa0",Object(m.jsx)(y,{title:"User",value:"\ud83e\uddd9\u200d\u2642\ufe0f",controlPanelState:n,setControlPanelState:o}),Object(m.jsx)(y,{title:"Maps",value:"\ud83d\uddfa",controlPanelState:n,setControlPanelState:o}),Object(m.jsx)(y,{title:"Tokens",value:"\u265f",controlPanelState:n,setControlPanelState:o}),Object(m.jsx)(S,{title:"Push refresh to players",value:"\ud83d\udcab",onClick:function(){return r.pushRefresh(t)}}),"\xa0\xa0\xa0\xa0",Object(m.jsx)(T,{gameState:t,setGameState:a}),"\xa0\xa0\xa0\xa0",Object(m.jsx)(I,{gameState:t,setGameState:a,resetFog:k,resetDrawing:C}),Object(m.jsx)(U,{gameState:t,setGameState:a,controlPanelState:n,onTextChange:f,createMap:h,websocket:r}),Object(m.jsx)(z,{gameState:t,setGameState:a,toggleOnTokens:b,onTextChange:f,newTokenUrl:w,createToken:x,updateGameToken:O,selectGameToken:v}),Object(m.jsx)(E,{gameState:t,setGameState:a,controlPanelState:n,setControlPanelState:o,initAsDev:d,toggleOnUser:g,copyJson:j,pasteJson:p,setGameSettingsInt:c,setGameSettingsText:l})]}):Object(m.jsxs)("div",{id:"control-panel",children:[Object(m.jsx)(S,{value:"\ud83d\udc41",onClick:i,title:"show/hide control panel"}),Object(m.jsx)("input",{title:"User name",placeholder:"User name",value:t.settings.username||"",onChange:function(e){return l("username",e)}}),Object(m.jsx)(y,{title:"Share mouse (cursor)",value:"\ud83d\udc01",controlPanelState:n,setControlPanelState:o}),Object(m.jsx)("input",{title:"Cursor size",value:t.metadata.cursorsize||"",onChange:function(e){return c("cursorSize",e)},type:"number",min:"0"}),Object(m.jsx)(S,{title:"Request gameboard refresh from host",onClick:u,value:"\ud83d\udcab"}),Object(m.jsx)(D,{gameState:t,setGameState:a,updateGameToken:O,selectGameToken:v})]})},F=function(e){var t=e.gameState,a=e.setGameState,n=e.controlPanelState,o=e.setControlPanelState,r=e.websocket,s=e.notify,l=e.fromJson,u=e.initAsDev,d=e.updateGameToken,g=e.selectGameToken,b=e.resetFog,j=e.resetDrawing;return Object(m.jsx)(J,{gameState:t,setGameState:a,controlPanelState:n,setControlPanelState:o,websocket:r,hidden:n.hidden,toggleHidden:function(){o(Object(c.a)(Object(c.a)({},n),{},{hidden:!n.hidden}))},setGameSettingsInt:function(e,n){a(Object(c.a)(Object(c.a)({},t),{},{settings:Object(c.a)(Object(c.a)({},t.settings),{},Object(i.a)({},e,parseInt(n.target.value)||void 0))}))},setGameSettingsText:function(e,n){a(Object(c.a)(Object(c.a)({},t),{},{settings:Object(c.a)(Object(c.a)({},t.settings),{},Object(i.a)({},e,n.target.value))}))},socketRequestRefresh:function(){r.requestRefresh()},initAsDev:u,toggleOnUser:n.toggleOnUser,toggleOnTokens:n.toggleOnTokens,copyJson:function(){var e=t.toJson();window.navigator.clipboard.writeText(e).then((function(){s("copied to clipboard")})).catch((function(e){console.error("failed to write to clipboard: ",e),s("failed to write to clipboard: ".concat(e),2e3)}))},pasteJson:function(){var e=s("reading clipboard...");window.navigator.clipboard.readText().then((function(t){window.confirm("Do you really want to overwrite this game with what's in your clipboard? ".concat(t.slice(0,99),"..."))&&(l(t),s("pasted from clipboard")),e&&e.close()})).catch((function(e){console.error("failed to read clipboard: ",e),s("failed to read clipboard: ".concat(e),2e3)}))},onTextChange:function(e,t){o(Object(c.a)(Object(c.a)({},n),{},Object(i.a)({},e,t.target.value)))},createMap:function(){var e=t.game.maps,r=e.length,s={name:n.newMapName,$id:r,imageUrl:"",x:0,y:0,width:window.innerWidth,height:window.innerHeight,drawPaths:[],fogPaths:[]};e[r]=s;var i=e.filter((function(e){return e}));a(Object(c.a)(Object(c.a)({},t),{},{game:Object(c.a)(Object(c.a)({},t.game),{},{maps:i,mapId:t.game.mapId?t.game.mapId:parseInt(r)})})),o(Object(c.a)(Object(c.a)({},n),{},{newMapName:""}))},updateGameToken:d,selectGameToken:g,newTokenUrl:n.newTokenUrl,createToken:function(){var e=JSON.parse(JSON.stringify(t.game.tokens||[]));n.newTokenUrl&&(e.push({url:n.newTokenUrl,guid:k(),mapId:t.game.mapId,$selected:void 0,name:void 0,$x0:0,$y0:0,x:0,y:0,ko:void 0,pc:void 0,w:0,h:0}),a(Object(c.a)(Object(c.a)({},t),{},{game:Object(c.a)(Object(c.a)({},t.game),{},{tokens:e})})),o(Object(c.a)(Object(c.a)({},n),{},{newTokenUrl:void 0})))},resetFog:b,resetDrawing:j})},H=function(e){var t=e.gameState,a=e.setGameState,n=e.controlPanelState,o=e.setControlPanelState,r=e.websocket,s=e.onMouseMove,i=e.onMouseUp,c=e.onMouseDown,l=e.fromJson,u=e.notify,d=e.initAsDev,g=e.updateTokens,b=e.updateGameToken,j=e.selectGameToken,v=e.resetFog,k=e.resetDrawing,S=t.game.isFogLoaded?null:"gone",y=new Date-3e4,C=Object.assign({},t.metadata.cursors),T=t.game.tokens.map((function(e){return e}));for(var P in C){var I=C[P].time;(!I||I<y)&&delete C[P]}return Object(m.jsxs)("div",{id:"game",onMouseMove:function(e){return s(e)},onMouseDown:function(e){return c(e)},onMouseUp:function(e){return i(e)},children:[Object(m.jsxs)("div",{className:S,children:[Object(m.jsx)(p,{gameState:t,setGameState:a,controlPanelState:n,setControlPanelState:o,updateTokens:g,className:S}),Object(m.jsx)(f,{gameState:t}),T?Object(m.jsx)("div",{id:"tokens",children:T.map((function(e,a){return Object(m.jsx)(w,{token:e,gameState:t,selectGameToken:j},"Token".concat(a))}))}):null,Object(m.jsx)(h,{gameState:t}),C?Object(m.jsx)("div",{id:"cursors",children:Object.keys(C).map((function(e,a){return Object(m.jsx)(x,{name:e,cursor:t.metadata.cursors[e],size:t.metadata.cursorsize},"cursor".concat(a))}))}):null,Object(m.jsx)(O,{gameState:t})]}),Object(m.jsx)(F,{gameState:t,setGameState:a,controlPanelState:n,setControlPanelState:o,websocket:r,notify:u,fromJson:l,initAsDev:d,updateGameToken:b,selectGameToken:j,resetFog:v,resetDrawing:k})]})},L=function(){return{name:void 0,url:void 0,newTokenUrl:void 0,newMapName:void 0,hidden:!1,toggleOnMaps:!1,toggleOnUser:!1,toggleOnTokens:!1,fogDiameter:33}},W=function(e){var t=e.websocket,a=o.a.useRef(),r=Object(n.useState)(function(e){var t=new URLSearchParams(window.location.href.replace(/.*\?/,""));return{websocket:null,overlayRef:e,settings:{cursorSize:50,fogOpacity:.5,fogRadius:33,drawColor:"purple",drawSize:8,tool:"move",subtool:void 0,username:t.get("host")?"DM":"PC",shareMouse:!0},metadata:{isHost:t.get("host"),room:t.get("room"),cursors:[],lastX:void 0,lastY:void 0,downX:void 0,downY:void 0},game:{mapId:void 0,gen:0,width:window.innerWidth,height:window.innerHeight,isFogLoaded:!1,isFirstLoadDone:!1,maps:[],tokens:[]}}}(a)),s=Object(l.a)(r,2),u=s[0],d=s[1],g=Object(n.useState)(L),b=Object(l.a)(g,2),j=b[0],p=b[1],f=[];Object(n.useEffect)((function(){return window.addEventListener("beforeunload",G),window.addEventListener("resize",x),window.addEventListener("keypress",y),window.addEventListener("keydown",S),t.addCallbacks(u.metadata.isHost,T),N(),function(){G(),window.removeEventListener("beforeunload",G),window.removeEventListener("resize",x),window.removeEventListener("keypress",y),window.removeEventListener("keydown",S)}}),[]),Object(n.useEffect)((function(){}),[u.game.tokens]),Object(n.useEffect)((function(){t&&u.metadata.isHost&&t.pushMaps(u.game.maps,u.game.mapId)}),[u.game.mapId]);var h=function(){if(0!==u.game.maps.length){var e=u.game.maps.filter((function(e){return parseInt(e.$id)===parseInt(u.game.mapId)}));return e.length>0?e[0]:u.game.maps[0]}},O=function(e,t,a){var n=JSON.parse(JSON.stringify(u.game.tokens||[]));if(n&&Array.isArray(n)){var o=n.map(e);d(Object(c.a)(Object(c.a)({},u),{},{game:Object(c.a)(Object(c.a)(Object(c.a)({},u.game),a),{},{tokens:o})}))}},v=function(e){p(Object(c.a)(Object(c.a)({},j),{},Object(i.a)({},e,!j[e])))},w=function(e,t,a,n){if(null!=a){var o=u.overlayRef.current.getContext("2d");o.strokeStyle=a,o.lineWidth="3",o.beginPath(),o.arc(e,t,n,0,2*Math.PI),o.stroke(),o.closePath()}},x=function(){},S=function(e){for(var t=0,a=[document.activeElement,e.target];t<a.length;t++){var n=a[t];if("INPUT"==n.tagName&&("text"===n.type||"number"===n.type))return e}var o=e.shiftKey?100:10;switch(e.keyCode){case 27:case 37:case 38:case 39:case 40:O((function(t){if(t.$selected){switch(e.keyCode){case 27:t.$selected=!1;break;case 37:t.x-=o;break;case 38:t.y-=o;break;case 39:t.x+=o;break;case 40:t.y+=o;break;default:return}e.preventDefault()}return t}));break;default:return}},y=function(e){if(!u.metadata.isHost)return e;for(var t=0,a=[document.activeElement,e.target];t<a.length;t++){var n=a[t];if("INPUT"==n.tagName&&("text"===n.type||"number"===n.type)||"BUTTON"==n.tagName)return e}var o=u.cpRef.current;switch(e.code){case"KeyC":e.shiftKey&&o.copyJson();break;case"KeyH":v("hidden");break;case"KeyG":d(Object(c.a)(Object(c.a)({},u),{},{settings:Object(c.a)(Object(c.a)({},u.settings),{},{tool:"fog"})}));break;case"KeyL":e.shiftKey?N():G();break;case"KeyM":v("toggleOnMaps");break;case"KeyP":d(Object(c.a)(Object(c.a)({},u),{},{settings:Object(c.a)(Object(c.a)({},u.settings),{},{tool:"draw"})}));break;case"KeyT":v("toggleOnTokens");break;case"KeyV":e.shiftKey?o.pasteJson():d(Object(c.a)(Object(c.a)({},u),{},{settings:Object(c.a)(Object(c.a)({},u.settings),{},{tool:"move"})}));break;default:return}},C=function(){var e="eraser"===u.settings.subtool;switch(u.settings.tool){case"draw":return e?"erease":"draw";default:return u.settings.tool}},T=function(e){var a=JSON.parse(e.data);if(a.from!==t.guid&&(!a.to||a.to===t.guid)){var n=h();switch(a.messageType){case"cursor":break;case"draw":var o=u.game.maps.map((function(e){return e.$id===n.$id?Object(c.a)(Object(c.a)({},n),{},{drawPaths:a.drawPath}):e}));d(Object(c.a)(Object(c.a)({},u),{},{game:Object(c.a)(Object(c.a)({},u.game),{},{maps:o})}));break;case"fog":var r=u.game.maps.map((function(e){return e.$id===n.$id?Object(c.a)(Object(c.a)({},n),{},{fogPaths:a.fogPath}):e}));d(Object(c.a)(Object(c.a)({},u),{},{game:Object(c.a)(Object(c.a)({},u.game),{},{maps:r})}));break;case"fogReset":var s=u.game.maps.map((function(e){return e.$id===n.$id?Object(c.a)(Object(c.a)({},n),{},{fogPaths:[]}):e}));d(Object(c.a)(Object(c.a)({},u),{},{game:Object(c.a)(Object(c.a)({},u.game),{},{maps:s})}));break;case"drawReset":var i=u.game.maps.map((function(e){return e.$id===n.$id?Object(c.a)(Object(c.a)({},n),{},{drawPaths:[]}):e}));d(Object(c.a)(Object(c.a)({},u),{},{game:Object(c.a)(Object(c.a)({},u.game),{},{maps:i})}));break;case"t":case"ts":break;case"map":d(Object(c.a)(Object(c.a)({},u),{},{game:Object(c.a)(Object(c.a)({},u.game),{},{mapId:parseInt(a.id)})}));break;case"maps":d(Object(c.a)(Object(c.a)({},u),{},{game:Object(c.a)(Object(c.a)({},u.game),{},{maps:a.maps})}));break;case"refresh":if(a.to&&a.to!==t.guid)return void console.log("Will not apply refresh from ".concat(a.to," (self)"));var l=Object(c.a)(Object(c.a)({},u),{},{game:Object(c.a)(Object(c.a)({},u.game),a.game)});d(l);break;case"refreshRequest":u.metadata.isHost&&t.pushRefresh(u,{to:a.from});break;default:console.error("Unrecognized websocket message type: ".concat(a.t))}}},P=function(e){var a=h(),n=1+(u.game.gen||0);u.metadata.isHost&&d(Object(c.a)(Object(c.a)({},u),{},{game:Object(c.a)(Object(c.a)({},u.game),{},{gen:n})}));var o=u.game.tokens.map((function(e){return Object(c.a)({},e)}));o.forEach((function(e){return t.scrubObject(e)}));var r=function(){var e=h();return u.game.maps.map((function(t){return t.$id===e.$id?e:t}))}();Object.values(r).forEach((function(e){return t.scrubObject(e)}));var s=Object.assign({gen:n,maps:r,mapId:a&&a.$id,tokens:o},e);return JSON.stringify(s)},I=function(e){var t=Object.assign(JSON.parse(e)||{});return t.tokens&&t.tokens.forEach((function(e){e.guid||(e.guid=k())})),new Promise((function(e){d(Object(c.a)(Object(c.a)({},u),{},{game:Object(c.a)(Object(c.a)({},u.game),{},{data:t})})),e()}))},G=function(){u.game.isFirstLoadDone&&(console.log("Saving game to local storage"),localStorage.setItem(u.room,P()))},N=function(){return console.log("Loading game from local storage"),I(localStorage.getItem(u.room))};try{return Object(m.jsx)(H,{gameState:u,setGameState:d,controlPanelState:j,setControlPanelState:p,websocket:t,onMouseMove:function(e){if(u.overlayRef){!function(){var e=u.overlayRef.current.getContext("2d");e&&e.clearRect(0,0,u.game.width,u.game.height)}();var t=e.pageX,a=e.pageY;switch(u.metadata.isHost?u.settings.tool:"move"){case"fog":!function(){var e,t=u.overlayRef.current.getContext("2d");t.beginPath();for(var a=0;a<f.length;a++)e=t.createRadialGradient(f[a].x,f[a].y,f[a].r2||1,f[a].x,f[a].y,.75*f[a].r),t.lineCap="round",e.addColorStop(0,"rgba(255,255,255,255)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(f[a].x-f[a].r,f[a].y-f[a].r,f[a].x+f[a].r,f[a].y+f[a].r);t.stroke()}(),w(t,a,"yellow",u.settings.fogRadius);break;case"draw":!function(){var e=u.overlayRef.current.getContext("2d");e.beginPath();for(var t=0;t<f.length;t++)e.lineCap="round",e.fillStyle=f[t].drawColor,e.lineWidth=f[t].drawSize,e.strokeStyle=f[t].drawColor,0===t?e.moveTo(f[t].x,f[t].y):e.lineTo(f[t].x,f[t].y);e.stroke()}(),w(t,a,u.settings.drawColor,u.settings.drawSize);break;case"move":1&e.buttons&&function(e){if("move"===u.settings.tool){var t=u.metadata.downX,a=u.metadata.downY;O((function(n){return n.$selected&&(n.x=n.$x0+e.pageX-t,n.y=n.$y0+e.pageY-a),n}),0,void 0)}}(e)}("fog"===u.settings.tool||"draw"===u.settings.tool)&&1&e.buttons&&f.push({x:t,y:a,r:u.settings.fogRadius,r2:void 0,tool:C(),drawColor:u.settings.drawColor,drawSize:u.settings.drawSize})}},onMouseUp:function(e){var a=h();if(a&&u.metadata.isHost){var n=a.fogPaths,o=a.drawPaths;switch(u.settings.tool){case"fog":n.push(f),t.pushFog(f);break;case"draw":o.push(f),t.pushDraw(f)}f=[];var r=u.game.maps.map((function(e){return e.$id===a.$id?Object(c.a)(Object(c.a)({},a),{},{fogPaths:n,drawPaths:o}):e}));d(Object(c.a)(Object(c.a)({},u),{},{settings:Object(c.a)(Object(c.a)({},u.settings),{},{maps:r})}))}},onMouseDown:function(e){for(var t=0,a=[document.activeElement,e.target];t<a.length;t++){var n=a[t];if("INPUT"==n.tagName&&("text"===n.type||"number"===n.type)||"BUTTON"==n.tagName)return e}1&e.buttons&&(/(\s|^)token(\s|$)/.test(e.target.getAttribute("class"))||O((function(e){delete e.$selected})),(f=[]).push({x:e.pageX,y:e.pageY,r:u.settings.fogRadius,r2:void 0,tool:C(),drawColor:u.settings.drawColor,drawSize:u.settings.drawSize}))},fromJson:I,notify:function(e,t,a){if(console.log(e),window.Notification){if("granted"===window.Notification.permission){var n=new window.Notification(e,{tag:a});return setTimeout((function(){return n.close()}),t||1e3),n}window.Notification.requestPermission()}},initAsDev:function(){if(!window.confirm("Reset?"))return null;var e=[{name:"bar",pc:0},{name:"foo",url:"/dev/belmont.jpg"},{name:"arr",pc:1},{name:"win",pc:1,url:"/dev/redhead.jpg",y:50,x:90,w:64,h:64}],t=[{name:"kiwi",imageUrl:"/dev/kiwi.jpeg",$id:0,width:500,height:500,x:0,y:0,drawPaths:[],fogPaths:[]},{name:"default",imageUrl:"/dev/FFtri9T.png",spawnX:40,spawnY:80,$id:1,x:0,y:0,drawPaths:[],fogPaths:[]}];return new Promise((function(a){d(Object(c.a)(Object(c.a)({},u),{},{game:Object(c.a)(Object(c.a)({},u.game),{},{maps:t,tokens:e,mapId:0})})),a()}))},updateTokens:O,updateGameToken:function(e,t,a){var n=u.game.tokens.indexOf(e),o=JSON.parse(JSON.stringify(u.game.tokens||[]));t(o[n],n,o),d(Object(c.a)(Object(c.a)({},u),{},{game:Object(c.a)(Object(c.a)({},u.game),{},{tokens:o})}))},selectGameToken:function(e,t,a){if(e.pc||u.metadata.isHost){var n=u.game.tokens.indexOf(e);O((function(e,o){return n===o?(void 0!==t&&null!==t||(t=!e.$selected),e.$selected=t):a||(e.$selected=!1),e.$selected&&(e.$x0=e.x,e.$y0=e.y),e}))}},updateMap:function(e){return new Promise((function(t){var a=u.game.maps;e(a[u.game.mapId]),d(Object(c.a)(Object(c.a)({},u),{},{game:Object(c.a)(Object(c.a)({},u.game),{},{maps:a})}),t)}))},resetFog:function(){var e=h();if(e&&u.metadata.isHost){f=[];var t=u.game.maps.map((function(t){return t.$id===e.$id?Object(c.a)(Object(c.a)({},e),{},{fogPaths:[]}):t}));d(Object(c.a)(Object(c.a)({},u),{},{game:Object(c.a)(Object(c.a)({},u.game),{},{maps:t})}))}},resetDrawing:function(){var e=h();if(e&&u.metadata.isHost){f=[];var t=u.game.maps.map((function(t){return t.$id===e.$id?Object(c.a)(Object(c.a)({},e),{},{drawPaths:[]}):t}));d(Object(c.a)(Object(c.a)({},u),{},{game:Object(c.a)(Object(c.a)({},u.game),{},{maps:t})}))}}})}catch(U){!function(e){console.error(e),console.error("Exception in `render`. Clearing localStorage..."),localStorage.removeItem(u.room),window.alert("Fatal error. Local storage cleared.")}(U)}},K=a(7),A=a(8),q="gameWebSocket",_="gameWebSocketInterval",X=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).PORT||8e3,Y=function(){function e(){Object(K.a)(this,e)}return Object(A.a)(e,[{key:"setup",value:function(e){var t=window.location.host.replace(/:\d+$/,""),a=/https/.test(window.location.protocol)?"wss":"ws";if(this.guid=k(),window[_]&&clearInterval(window[_]),window[q]){var n=window[q];delete window[q],n.close()}window[q]=new WebSocket("".concat(a,"://").concat(t,":").concat(X,"/").concat(e,"?guid=").concat(this.guid))}},{key:"addCallbacks",value:function(e,t){var a=this,n=window[q];n.addEventListener("open",(function(t,n,o){window[_]&&clearInterval(window[_]),e||a.requestRefresh()})),n.addEventListener("message",t);var o=this.setup.bind(this);n.addEventListener("close",(function(){window[_]=setInterval(o,2500)}))}},{key:"send",value:function(e){e.from=this.guid,console.log("sending the following data:",e),window[q]&&window[q].readyState===WebSocket.OPEN?window[q].send(JSON.stringify(e)):console.error("no websocket")}},{key:"pushCursor",value:function(e,t,a){this.send({messageType:"cursor",x:e,y:t,u:a})}},{key:"pushDraw",value:function(e){this.send({messageType:"draw",drawPath:e})}},{key:"pushFog",value:function(e){this.send({messageType:"fog",fogPath:e})}},{key:"pushMaps",value:function(e,t){this.send({messageType:"maps",maps:e,mapId:t})}},{key:"pushMapId",value:function(e){this.send({messageType:"map",id:e})}},{key:"pushRefresh",value:function(e){this.send({messageType:"refresh",game:e.game})}},{key:"pushToken",value:function(e,t){}},{key:"pushTokens",value:function(e){}},{key:"requestRefresh",value:function(){this.send({messageType:"refreshRequest"})}},{key:"scrubObject",value:function(e){for(var t in e)/^\$/.test(t)&&"$id"!==t&&delete e[t]}}]),e}();Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var B=new URLSearchParams(window.location.href.replace(/.*\?/,"")),V=new Y;V.setup(B.get("room")),s.a.render(Object(m.jsx)(o.a.StrictMode,{children:Object(m.jsx)(W,{websocket:V})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[17,1,2]]]);
//# sourceMappingURL=main.e50691fd.chunk.js.map