(this["webpackJsonpborealis-webclient"]=this["webpackJsonpborealis-webclient"]||[]).push([[0],{17:function(e,t,n){},18:function(e,t,n){},30:function(e,t,n){"use strict";n.r(t);var a=n(2),o=n.n(a),r=n(6),i=n.n(r),s=(n(17),n(18),n(9)),c=n(3),u=n(1),l="SETTINGS/CHANGE_CURSORSIZE",d="SETTINGS/CHANGE_FOG_SETTINGS",g="SETTINGS/CHANGE_DRAW_SETTINGS",p="SETTINGS/CHANGE_TOOL",b="SETTINGS/CHANGE_USERNAME",j="SETTINGS/TOGGLE_MOUSESHARING",m="GAME/OVERWRITE_GAME",f="GAME/LOAD_MAP",h="GAME/INCREMENT_GEN",O="GAME/SET_FOG_ENABLED",v="GAME/SET_ISFOGLOADED",w="GAME/SET_ISFIRSTLOADDONE",x="GAME/UPDATE_MAPS",k="GAME/ADD_MAP",S="GAME/DELETE_APP",y="GAME/UPDATE_TOKENS",C="GAME/ADD_TOKEN",E="GAME/DELETE_TOKEN",T="GAME/COPY_TOKEN",I="GAME/UPDATE_TOKEN_VALUE",N="GAME/TOGGLE_TOKEN_VALUE",M="GAME/SET_TOKEN_ORIGIN",P="GAME/RESET_FOG",R="GAME/RESET_DRAW",D="METADATA/SET_GAMESETTINGS",A="METADATA/SET_CURSORS",G="METADATA/SET_LAST_COORDINATES",$="METADATA/SET_DOWN_COORDINATES",U=function(){return{cursorSize:50,fogOpacity:.5,fogRadius:75,drawColor:"white",drawSize:8,tool:"move",subtool:void 0,username:new URLSearchParams(window.location.href.replace(/.*\?/,"")).get("host")?"DM":"PC",shareMouse:!0}},z=function(e){return{type:l,cursorSize:parseInt(e)}},L=function(e,t){return{type:p,tool:e,subtool:t}},F=function(e){return{type:b,username:e}},_=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:U(),t=arguments.length>1?arguments[1]:void 0;switch(t.type){case l:return Object(u.a)(Object(u.a)({},e),{},{cursorSize:t.cursorSize});case d:return Object(u.a)(Object(u.a)({},e),{},{fogOpacity:t.fogOpacity,fogRadius:t.fogRadius});case g:return Object(u.a)(Object(u.a)({},e),{},{drawColor:t.drawColor,drawSize:t.drawSize});case p:return Object(u.a)(Object(u.a)({},e),{},{tool:t.tool,subtool:t.subtool});case b:return Object(u.a)(Object(u.a)({},e),{},{username:t.username});case j:return Object(u.a)(Object(u.a)({},e),{},{shareMouse:!e.shareMouse});default:return e}},H={isHost:void 0,room:void 0,cursors:[],lastX:void 0,lastY:void 0,downX:void 0,downY:void 0},W=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:H,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case D:return Object(u.a)(Object(u.a)({},e),{},{isHost:t.isHost,room:t.room});case A:return Object(u.a)(Object(u.a)({},e),{},{cursors:t.cursors});case G:return Object(u.a)(Object(u.a)({},e),{},{lastX:t.lastX,lastY:t.lastY});case $:return Object(u.a)(Object(u.a)({},e),{},{downX:t.downX,downY:t.downY});default:return e}},J=n(5),X=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=window.crypto.getRandomValues(new Uint32Array(1))[0]*Math.pow(2,-32)*16|0;return("x"===e?t:3&t|8).toString(16)}))},Y={mapId:void 0,gen:0,width:window.innerWidth,height:window.innerHeight,fogEnabled:!1,isFogLoaded:!1,isFirstLoadDone:!1,maps:[],tokens:[]},V=Object(u.a)(Object(u.a)({},Y),{},{mapId:0,isFogLoaded:!0,isFirstLoadDone:!0,width:795,height:555,maps:[{name:"Dragon's Lair",$id:0,imageUrl:"https://mk0a2minutetabl7hq7i.kinstacdn.com/wp-content/uploads/2022/02/Arena-of-Fire-battle-map-Main-preview-Night.jpg",x:0,y:0,width:795,height:555,drawPaths:[],fogPaths:[]},{name:"Mage Tower",$id:1,imageUrl:"https://2minutetabletop.com/wp-content/uploads/2022/01/Wizarding-School-Classroom-Basic-Light-16x22-1.jpg",x:0,y:0,width:795,height:555,drawPaths:[],fogPaths:[]}],tokens:[{guid:X(),name:"Adult Black Dragon",url:"https://i.imgur.com/H2dyKur.png",mapId:0,$selected:!1,$x0:0,$y0:0,x:350,y:210,ko:!1,pc:!1,width:100,height:100},{guid:X(),name:"Mighty Paladin",url:"https://i.imgur.com/ccQxtZ7.png",mapId:0,$selected:!1,$x0:0,$y0:0,x:50,y:180,ko:!1,pc:!0,width:50,height:50},{guid:X(),name:"Misterious Wizard",url:"https://i.imgur.com/82s9UPR.png",mapId:1,$selected:!1,$x0:0,$y0:0,x:620,y:250,ko:!1,pc:!1,width:50,height:50}]}),B=function(e){return{type:f,mapId:parseInt(e)}},K=function(e){return{type:O,fogEnabled:e}},q=function(e){return{type:x,maps:e}},Z=function(e,t,n){return{type:k,map:{name:e,$id:0,imageUrl:"",x:0,y:0,width:t,height:n,drawPaths:[],fogPaths:[]}}},Q=function(e){return{type:y,tokens:e}},ee=function(e,t){return{type:N,tokenGuid:e,key:t}},te=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Y,t=arguments.length>1?arguments[1]:void 0,n=JSON.parse(JSON.stringify(e.maps)),a=JSON.parse(JSON.stringify(e.tokens));switch(t.type){case m:return Object(u.a)(Object(u.a)({},e),t.game);case f:return Object(u.a)(Object(u.a)({},e),{},{mapId:parseInt(t.mapId)});case h:return Object(u.a)(Object(u.a)({},e),{},{gen:e.gen+1});case O:return Object(u.a)(Object(u.a)({},e),{},{fogEnabled:t.fogEnabled});case v:return Object(u.a)(Object(u.a)({},e),{},{isFogLoaded:t.isFogLoaded});case w:return Object(u.a)(Object(u.a)({},e),{},{isFirstLoadDone:t.isFirstLoadDone});case x:return Object(u.a)(Object(u.a)({},e),{},{maps:t.maps,mapId:isNaN(e.mapId)?void 0:e.mapId});case k:var o=e.maps.length,r=n.concat(Object(u.a)(Object(u.a)({},t.map),{},{$id:o}));return Object(u.a)(Object(u.a)({},e),{},{maps:r,mapId:isNaN(e.mapId)?o:e.mapId,isFirstLoadDone:!0,isFogLoaded:!0});case S:var i=n.filter((function(e){return e.$id!==parseInt(t.mapId)}));return Object(u.a)(Object(u.a)({},e),{},{maps:i,mapId:parseInt(t.mapId)===e.mapId?void 0:e.mapId});case y:return Object(u.a)(Object(u.a)({},e),{},{tokens:t.tokens});case C:return Object(u.a)(Object(u.a)({},e),{},{tokens:e.tokens.concat(t.token)});case E:var s=a.filter((function(e){return e.guid!==t.tokenGuid}));return Object(u.a)(Object(u.a)({},e),{},{tokens:s});case T:var c=e.tokens.filter((function(e){return e.guid===t.tokenGuid})),l=Object(u.a)(Object(u.a)({},c[0]),{},{guid:X()});return Object(u.a)(Object(u.a)({},e),{},{tokens:e.tokens.concat(l)});case I:var d=e.tokens.map((function(e){return e.guid!==t.tokenGuid?e:Object(u.a)(Object(u.a)({},e),{},Object(J.a)({},t.key,t.value))}));return Object(u.a)(Object(u.a)({},e),{},{tokens:d});case N:var g=e.tokens.map((function(e){return e.guid!==t.tokenGuid?e:Object(u.a)(Object(u.a)({},e),{},Object(J.a)({},t.key,!e[t.key]))}));return Object(u.a)(Object(u.a)({},e),{},{tokens:g});case M:console.log("setting token origin");var p=e.tokens.map((function(e){return e.guid!==t.tokenGuid?e:Object(u.a)(Object(u.a)({},e),{},{$x0:t.xOrigin,$y0:t.yOrigin})}));return Object(u.a)(Object(u.a)({},e),{},{tokens:p});case P:var b=e.maps.map((function(t){return t.$id===e.mapId?Object(u.a)(Object(u.a)({},t),{},{fogPaths:[]}):t}));return Object(u.a)(Object(u.a)({},e),{},{maps:b});case R:var j=e.maps.map((function(t){return t.$id===e.mapId?Object(u.a)(Object(u.a)({},t),{},{drawPaths:[]}):t}));return Object(u.a)(Object(u.a)({},e),{},{maps:j});default:return e}},ne=n(4),ae=function(){return Object(a.useContext)(ue)},oe=function(e,t){e&&e.readyState===WebSocket.OPEN?e.send(JSON.stringify(t)):console.error("no websocket")},re=function(e,t,n,a){oe(e,Object(u.a)({type:"pushGameRefresh",from:t.guid,username:t.username,game:n},a))},ie=function(e,t){oe(e,{type:"requestRefresh",from:t.guid,username:t.username})},se=n(0);n(26).config();Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_PORT:"8000"}).PORT;var ce=function(e,t){if(e){var n=function(e,t){var n=window.location.host.replace(/:\d+$/,""),a=/https/.test(window.location.protocol)?"wss":"ws";return"".concat(a,"://").concat(n,"/").concat(e,"?guid=").concat(t)}(e,t);return new WebSocket(n)}},ue=Object(a.createContext)(ce("","")),le=Object(c.b)((function(e){return{metadata:e.metadata}}),void 0)((function(e){var t=e.children,n=e.metadata,o=Object(a.useState)({guid:X(),username:""}),r=Object(ne.a)(o,2),i=r[0],s=r[1],c=Object(a.useState)(ce(n.room,i.guid)),u=Object(ne.a)(c,2),l=u[0],d=u[1];return Object(a.useEffect)((function(){d(ce(n.room,i.guid))}),[n.room,i.guid]),Object(a.useEffect)((function(){var e=function(){setTimeout((function(){console.log("Socket Timeout, recreating WebSocket"),d(ce(n.room,i.guid))}),2500)},t=function(){n.isHost||ie(l,i)},a=function(e){console.error("WebSocket could not be created. Error: ",e)};return l&&(l.addEventListener("close",e),l.addEventListener("open",t),l.addEventListener("error",a)),function(){l&&(l.removeEventListener("close",e),l.removeEventListener("open",t),l.removeEventListener("error",a))}}),[l,d,i,n]),Object(se.jsx)(ue.Provider,{value:[l,i,s],children:t})})),de=function(e,t,n,a,o){return e&&0!==e.trim().length?new Promise((function(r,i){var s=a,c=new Image;c.onload=function(){var e=n.width,t=n.height;e||t?e?t||(t=e*c.height/c.width):e=t*c.width/c.height:(e=c.width,t=c.height),(o?o(e,t):Promise.resolve()).then((function(){s.drawImage(c,n.x||0,n.y||0,e,t),r(e,t)}))},c.onerror=function(e){console.error("Unable to draw image.",c.src),i("Unable to draw ".concat(t,"Url"))},c.src=e})):(o&&o(),Promise.resolve(n.width,n.height))},ge=n(12),pe=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=Object(a.useRef)(null);return Object(a.useEffect)((function(){var t=o.current.getContext(n.context||"2d");e(t)}),[e]),o},be=["id","draw","options"],je=function(e){var t=e.id,n=e.draw,a=(e.options,Object(ge.a)(e,be)),o=pe(n);return Object(se.jsx)("canvas",Object(u.a)({id:t,ref:o},a))},me={updateTokens:Q},fe=Object(c.b)((function(e){return{game:e.game}}),me)((function(e){var t=e.game,n=e.updateTokens,a=t.maps?t.maps[t.mapId]:void 0;return Object(se.jsx)(je,{id:"background",onClick:function(e){var a=t.tokens.map((function(e){return e.$selected?Object(u.a)(Object(u.a)({},e),{},{$selected:!1}):e}));n(a)},width:a?a.width:0,height:a?a.height:0,draw:function(e){a&&de(a.imageUrl,a.name,a,e,null)}})})),he=Object(c.b)((function(e){return{game:e.game}}),void 0)((function(e){var t=e.game,n=t.width,a=t.height,o=function(){if(0!==t.maps.length){var e=t.maps.filter((function(e){return parseInt(e.$id)===parseInt(t.mapId)}));return e.length>0?e[0]:t.maps[0]}}(),r=function(e,t){e.globalCompositeOperation="source-over",e.beginPath();for(var n=0;n<t.length;n++)e.lineCap="round",e.fillStyle=t[n].drawColor,e.lineWidth=t[n].drawSize,e.strokeStyle=t[n].drawColor,0===n?e.moveTo(t[n].x,t[n].y):e.lineTo(t[n].x,t[n].y)},i=function(e,t){e.globalCompositeOperation="destination-out",e.beginPath();for(var n=0;n<t.length;n++)e.lineCap="round",e.lineWidth=t[n].drawSize,0===n?e.moveTo(t[n].x,t[n].y):e.lineTo(t[n].x,t[n].y)};return Object(se.jsx)(je,{id:"drawing",className:"passthrough",width:n,height:a,draw:function(e){if(o&&e){e.beginPath(),e.clearRect(0,0,n,a);for(var t=0;t<o.drawPaths.length;t++){var s=o.drawPaths[t];switch(s.length>0?s[0].tool:""){case"draw":r(e,s);break;case"erease":i(e,s)}e.stroke()}}}})})),Oe=Object(c.b)((function(e){return{game:e.game,settings:e.settings,metadata:e.metadata}}),void 0)((function(e){var t=e.game,n=e.metadata,a=e.settings,o=n.isHost?a.fogOpacity:1,r=t.width,i=t.height,s=function(){if(0!==t.maps.length){var e=t.maps.filter((function(e){return parseInt(e.$id)===parseInt(t.mapId)}));return e.length>0?e[0]:t.maps[0]}}(),c=function(e,t){var n;e.beginPath(),e.globalCompositeOperation="destination-out";for(var a=0;a<t.length;a++)(n=e.createRadialGradient(t[a].x,t[a].y,t[a].r2||1,t[a].x,t[a].y,.75*t[a].r)).addColorStop(0,"rgba(0,0,0,255)"),n.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=n,e.fillRect(t[a].x-t[a].r,t[a].y-t[a].r,t[a].x+t[a].r,t[a].y+t[a].r)};return t.fogEnabled?Object(se.jsx)(je,{id:"fog",className:"passthrough",style:{opacity:o},width:r,height:i,draw:function(e){if(s&&e){e.beginPath(),e.globalCompositeOperation="destination-over",e.fillStyle="black",e.fillRect(0,0,r,i);for(var t=0;t<s.fogPaths.length;t++){var n=s.fogPaths[t];c(e,n),e.stroke()}}}}):null})),ve=Object(c.b)((function(e){return{game:e.game}}),void 0)((function(e){var t=e.game,n=e.overlayRef,a=t.maps[t.mapId]||void 0,o=a?a.width:t.width,r=a?a.height:t.height,i=n;return Object(se.jsx)("canvas",{id:"overlay",ref:i,width:o,height:r})})),we=function(e){var t=e.divStyle,n=e.token,a=e.classes,o=e.imgStyle,r=(e.onMouseUp,e.onMouseDown);return Object(se.jsx)("div",{style:t,title:n.name,className:a.join(" "),onMouseDown:function(e){return r(e)},children:Object(se.jsx)("img",{src:n.url,alt:n.name||"",style:o})})},xe={toggleTokenValue:ee,setTokenOrigin:function(e,t,n){return{type:M,tokenGuid:e,xOrigin:parseInt(t),yOrigin:parseInt(n)}}},ke=Object(c.b)((function(e){return{game:e.game,settings:e.settings}}),xe)((function(e){var t=e.token,n=e.isHost,a=e.game,o=e.settings,r=e.toggleTokenValue,i=e.setTokenOrigin;if(!t.url||!t.url.trim())return null;var s=["token",t.ko&&"dead",t.pc?"pc":"npc",t.$selected&&"selected",n&&!t.pc&&"grabbable"],c={left:t.x||0,top:t.y||0},u={width:t.width||void 0,height:t.height||void 0};return void 0===t.mapId||a.mapId===t.mapId?Object(se.jsx)(we,{divStyle:c,token:t,classes:s,imgStyle:u,onMouseDown:function(e){"move"===o.tool&&(t.$selected||r(t.guid,"$selected"),i(t.guid,t.x,t.y))}}):null})),Se=function(e){var t=e.cursor,n=e.size,a=e.name,o={top:t.y,left:t.x},r={fontSize:n||void 0};return Object(se.jsxs)("div",{style:o,className:"cursor",children:[Object(se.jsx)("span",{role:"img","aria-label":"pointer",style:r,children:"\ud83d\udde1"}),t.u||a]})};var ye=function(e){var t=e.title,n=e.value,a=e.onClick,o=e.isSelected,r=e.style,i=e.disabled;return Object(se.jsx)("button",{title:t,onClick:a,className:o?"selected":null,style:r,disabled:i,children:Object(se.jsx)("span",{role:"img","aria-label":t,children:n})})};var Ce=function(e){var t=e.controlPanelState,n=e.setControlPanelState,a=e.title,o=e.value,r="toggleOn".concat(a),i=t[r];return Object(se.jsx)(ye,{title:a,value:o,onClick:function(){n(Object(u.a)(Object(u.a)({},t),{},Object(J.a)({},r,!t[r])))},isSelected:i})},Ee=function(e){var t=e.tool,n=e.subtool,a=e.drawColor,o=e.setDrawColor,r=e.drawSize,i=e.setDrawSize,s=e.fogOpacity,c=e.setFogOpacity,u=e.fogRadius,l=e.setFogRadius,d=e.setSubtool,g=e.resetFog,p=e.resetDrawing;switch(t){case"draw":return Object(se.jsxs)("span",{children:[Object(se.jsx)(ye,{title:"eraser",value:"\ud83e\uddfd",onClick:function(){return d("eraser")},isSelected:"eraser"===n}),Object(se.jsx)(ye,{title:"pencil",value:"\ud83d\udd8d",onClick:function(){return d("pencil")},isSelected:"pencil"===n}),Object(se.jsx)("input",{size:"3",title:"draw size",value:r,onChange:function(e){return i(e.target.value)},type:"number",step:"3",min:"1"}),Object(se.jsx)("input",{size:"3",title:"draw color",value:a,onChange:function(e){return o(e.target.value)}}),Object(se.jsx)(ye,{style:{backgroundColor:a},value:"\ud83d\udd8c",disabled:!0}),Object(se.jsx)(ye,{title:"reset drawing",onClick:p,value:"\ud83c\udf00"})]});case"move":return null;case"fog":return Object(se.jsxs)("span",{children:[Object(se.jsx)(ye,{title:"reset fog",onClick:g,value:"\ud83c\udf00"}),Object(se.jsx)("input",{size:"3",title:"fog radius",value:u,onChange:function(e){return l(e.target.value)},type:"number",step:"5",min:"1"}),Object(se.jsx)("input",{size:"3",title:"fog opacity",step:"0.05",min:"0",max:"1",value:s,onChange:function(e){return c(e.target.value)},type:"number"})]});default:return null}},Te={setToolSettings:L,setDrawToolSettings:function(e,t){return{type:g,drawColor:e,drawSize:parseInt(t)}},setFogToolSettings:function(e,t){return{type:d,fogOpacity:e,fogRadius:parseInt(t)}},resetFog:function(){return{type:P}},resetDraw:function(){return{type:R}}},Ie=Object(c.b)((function(e){return{settings:e.settings}}),Te)((function(e){var t=e.settings,n=e.setToolSettings,a=e.setDrawToolSettings,o=e.setFogToolSettings,r=e.resetFog,i=e.resetDraw;return Object(se.jsx)("span",{children:Object(se.jsx)(Ee,{tool:t.tool,subtool:t.subtool,drawColor:t.drawColor,setDrawColor:function(e){a(e,t.drawSize)},drawSize:t.drawSize,setDrawSize:function(e){var n=e;isNaN(n)||a(t.drawColor,n)},fogOpacity:t.fogOpacity,setFogOpacity:function(e){var n=e;isNaN(n)||o(n,t.fogRadius)},fogRadius:t.fogRadius,setFogRadius:function(e){var n=e;isNaN(n)||o(t.fogOpacity,n)},setSubtool:function(e){n(t.tool,e)},resetFog:function(){r()},resetDrawing:function(){i()}})})})),Ne=function(e){var t=e.isSelected,n=e.mapConfigState,a=e.load,o=e.onTextChange,r=e.onIntegerChange,i=e.deleteMap;return Object(se.jsxs)("div",{className:t?"selected":null,children:[n.name,Object(se.jsx)("input",{value:n.imageUrl||"",placeholder:"Map url",size:"8",onChange:function(e){return o("imageUrl",e)}}),"w:",Object(se.jsx)("input",{value:n.width||0,placeholder:"width",className:"text3",onChange:function(e){return r("width",e)},type:"number",min:"0",step:"10",title:"width"}),"h:",Object(se.jsx)("input",{value:n.height||0,placeholder:"height",className:"text3",onChange:function(e){return r("height",e)},type:"number",min:"0",step:"10",title:"height"}),Object(se.jsx)(ye,{title:"Save & load map",value:"\ud83d\udcc0",onClick:a}),Object(se.jsx)(ye,{title:"Delete map",value:"\ud83d\uddd1",onClick:i})]})},Me={loadMap:B,updateMaps:q,deleteMap:function(e){return{type:S,mapId:e}},setIsFogLoaded:function(e){return{type:v,isFogLoaded:e}},setIsFirstLoadDone:function(e){return{type:w,isFirstLoadDone:e}}},Pe=Object(c.b)((function(e){return{game:e.game}}),Me)((function(e){var t=e.map,n=e.game,o=e.loadMap,r=e.updateMaps,i=e.deleteMap,s=e.setIsFogLoaded,c=e.setIsFirstLoadDone,l=Object(a.useState)(function(e,t){var n=t.maps.filter((function(t){return t.$id===e.$id})),a=n.length>0?n[0]:{name:void 0,imageUrl:void 0,w:void 0,h:void 0};return{$id:parseInt(e.$id),name:a.name?a.name:e.name,imageUrl:a.imageUrl?a.imageUrl:"",width:a.width?a.width:window.innerWidth,height:a.height?a.height:window.innerHeight,x:0,y:0}}(t,n)),d=Object(ne.a)(l,2),g=d[0],p=d[1],b=ae(),j=Object(ne.a)(b,2),m=j[0],f=j[1],h=n.mapId===t.$id;return t?Object(se.jsx)(Ne,{isSelected:h,mapConfigState:g,load:function(){var e=n.maps.map((function(e){return t.$id===e.$id?Object(u.a)(Object(u.a)({},e),{},{imageUrl:g.imageUrl,width:g.width,height:g.height}):e}));r(e),o(t.$id),s(!0),c(!0),function(e,t,n,a){oe(e,{type:"pushMapState",from:t.guid,username:t.username,maps:n,mapId:a})}(m,f,e,t.$id)},onTextChange:function(e,t){p(Object(u.a)(Object(u.a)({},g),{},Object(J.a)({},e,t.target.value)))},onIntegerChange:function(e,t){var n=parseInt(t.target.value)||void 0;p(Object(u.a)(Object(u.a)({},g),{},Object(J.a)({},e,n)))},deleteMap:function(){window.confirm("Delete map?")&&i(t.$id)}}):null})),Re=function(e){var t=e.maps,n=e.newMapName,a=e.setNewMapName,o=e.createMap;return Object(se.jsxs)("div",{children:[Object(se.jsx)("hr",{}),Object(se.jsxs)("div",{children:[Object(se.jsx)("input",{placeholder:"New map name",onChange:function(e){return a(e.target.value)},value:n}),Object(se.jsx)(ye,{title:"Create new map",value:"\u2795",onClick:o,disabled:""===n}),t.map((function(e){return Object(se.jsx)(Pe,{map:e},"map".concat(e.$id))}))]})]})},De={addMap:Z},Ae=Object(c.b)((function(e){return{game:e.game}}),De)((function(e){var t=e.toggleOnMaps,n=e.game,o=e.addMap,r=Object(a.useState)(""),i=Object(ne.a)(r,2),s=i[0],c=i[1],u=ae(),l=Object(ne.a)(u,3),d=l[0],g=l[1],p=(l[2],n.maps);return t?Object(se.jsx)(Re,{maps:p,newMapName:s,setNewMapName:c,createMap:function(){o(s,window.innerWidth,window.innerHeight),c(""),function(e,t,n,a,o){oe(e,{type:"pushCreateMap",from:t.guid,mapName:n,width:a,height:o})}(d,g,s,window.innerWidth,window.innerHeight)}}):null})),Ge=function(e){var t=e.maps,n=e.token,a=e.copy,o=e.onToggle,r=e.selectToken,i=e.onTextChange,s=e.onIntegerChange,c=e.onMapSelect,u=e.deleteToken;return Object(se.jsxs)("div",{className:"tokenConfig",children:[Object(se.jsx)(ye,{title:"Duplicate token",value:"\ud83d\udc6f",onClick:a}),Object(se.jsx)(ye,{value:n.pc?"\ud83d\udda5":"\ud83d\udc64",onClick:function(e){return o("pc",e)},title:"pc/npc"}),Object(se.jsx)(ye,{value:n.$selected?"\u2705":"\u274c",onClick:function(e){return r(n,e)},title:"(un)select"}),Object(se.jsx)(ye,{value:n.ko?"\ud83e\udd40":"\ud83c\udf39",onClick:function(e){return o("ko",e)},title:"alive/dead"}),Object(se.jsx)("input",{value:n.name||"",placeholder:"Name",size:"8",onChange:function(e){return i("name",e)}}),Object(se.jsx)("input",{value:n.url||"",placeholder:"Url",size:"8",onChange:function(e){return i("url",e)}}),"wh:",Object(se.jsx)("input",{value:n.width||"",placeholder:"w",className:"text2",onChange:function(e){return s("width",e)},type:"number",step:"5",min:"0",title:"width"}),Object(se.jsx)("input",{value:n.height||"",placeholder:"h",className:"text2",onChange:function(e){return s("height",e)},type:"number",step:"5",min:"0",title:"height"}),"xy:",Object(se.jsx)("input",{value:n.x||"",placeholder:"x",className:"text3",onChange:function(e){return s("x",e)},type:"number",step:"5",title:"x coord"}),Object(se.jsx)("input",{value:n.y||"",placeholder:"y",className:"text3",onChange:function(e){return s("y",e)},type:"number",step:"5",title:"y coord"}),Object(se.jsxs)("select",{defaultValue:n.mapId,onChange:function(e){return c(e)},title:"which map",children:[Object(se.jsx)("option",{value:-1,children:"(all)"},-1),t.map((function(e){return Object(se.jsx)("option",{value:e.name,children:t.name},e.$id)}))]}),Object(se.jsx)(ye,{title:"Delete token",value:"\ud83d\uddd1",onClick:u})]})},$e=function(e){var t=e.token,n=e.onTextChange,a=e.onIntegerChange;return Object(se.jsxs)("div",{className:"tokenConfig",children:[Object(se.jsx)("input",{value:t.name||"",placeholder:"Name",size:"8",onChange:function(e){return n("name",e)}}),Object(se.jsx)("input",{value:t.url||"",placeholder:"Url",size:"8",onChange:function(e){return n("url",e)}}),"wh:",Object(se.jsx)("input",{value:t.width||"",placeholder:"w",className:"text2",onChange:function(e){return a("width",e)},type:"number",step:"5",min:"0",title:"width"}),Object(se.jsx)("input",{value:t.height||"",placeholder:"h",className:"text2",onChange:function(e){return a("height",e)},type:"number",step:"5",min:"0",title:"height"}),"xy:",Object(se.jsx)("input",{value:t.x||"",placeholder:"x",className:"text3",onChange:function(e){return a("x",e)},type:"number",step:"5",title:"x coord"}),Object(se.jsx)("input",{value:t.y||"",placeholder:"y",className:"text3",onChange:function(e){return a("y",e)},type:"number",step:"5",title:"y coord"})]})},Ue={deleteToken:function(e){return{type:E,tokenGuid:e}},copyToken:function(e){return{type:T,tokenGuid:e}},updateTokenValue:function(e,t,n){return{type:I,tokenGuid:e,key:t,value:n}},toggleTokenValue:ee,updateTokens:Q},ze=Object(c.b)((function(e){return{game:e.game,metadata:e.metadata}}),Ue)((function(e){var t=e.token,n=e.game,a=e.metadata,o=e.deleteToken,r=e.copyToken,i=e.updateTokenValue,s=e.toggleTokenValue,c=function(e,n){i(t.guid,e,parseInt(n.target.value)||void 0)},u=function(e,n){i(t.guid,e,n.target.value)};return Object(se.jsx)("div",{children:t?a.isHost?Object(se.jsx)(Ge,{maps:n.maps,token:t,copy:function(){r(t.guid)},onToggle:function(e){s(t.guid,e)},selectToken:function(e,t){(e.pc||a.isHost)&&s(e.guid,"$selected")},onTextChange:u,onIntegerChange:c,onMapSelect:function(e){var n=parseInt(e.target.value);n<0&&(n=void 0),i(t.guid,"mapId",n)},deleteToken:function(){o(t.guid)}}):Object(se.jsx)($e,{token:t,onTextChange:u,onIntegerChange:c}):null})})),Le=function(e){var t=e.newTokenUrl,n=e.setNewTokenUrl,a=e.createToken,o=e.tokens;return Object(se.jsxs)("div",{children:[Object(se.jsx)("hr",{}),Object(se.jsx)("input",{placeholder:"New token url",onChange:function(e){return n(e.target.value)},value:t}),Object(se.jsx)(ye,{title:"Create new token",value:"\u2795",onClick:a}),o.map((function(e,t){return Object(se.jsx)(ze,{token:e},"token".concat(t))}))]})},Fe=function(e){var t=e.tokens.filter((function(e){return e.$selected}));return Object(se.jsx)("div",{children:t.map((function(e,t){return Object(se.jsx)(ze,{token:e},"token".concat(t))}))})},_e=Object(c.b)((function(e){return{game:e.game}}),void 0)((function(e){var t=e.game.tokens.filter((function(e){return e.$selected}));return Object(se.jsx)(Fe,{tokens:t})})),He={addToken:function(e,t,n){var a={guid:X(),name:e,url:t,mapId:n,$selected:!1,$x0:0,$y0:0,x:0,y:0,ko:!1,pc:!1,w:0,h:0};return{type:C,token:a}}},We=Object(c.b)((function(e){return{game:e.game,metadata:e.metadata}}),He)((function(e){var t=e.toggleOnTokens,n=e.game,o=e.addToken,r=e.metadata,i=Object(a.useState)(""),s=Object(ne.a)(i,2),c=s[0],u=s[1];if(!r.isHost)return null;return t?Object(se.jsx)(Le,{newTokenUrl:c,setNewTokenUrl:u,createToken:function(){c&&(o(void 0,c,n.mapId),u(""))},tokens:n.tokens}):Object(se.jsx)(_e,{tokens:n.tokens})})),Je=function(e){var t=e.initAsDev,n=e.toggleFog,a=e.copyJson,o=e.pasteJson,r=e.username,i=e.updateUsername,s=e.cursorSize,c=e.updateCursorSize;return Object(se.jsxs)("div",{children:[Object(se.jsx)("hr",{}),Object(se.jsx)("input",{title:"User name",placeholder:"User name",value:r,onChange:function(e){return i(e.target.value)}}),Object(se.jsx)("input",{title:"Cursor size",value:s,onChange:function(e){return c(e.target.value)},type:"number",min:"0"}),Object(se.jsx)("hr",{}),Object(se.jsx)(ye,{title:"Redo as dev",value:"\ud83d\udd30",onClick:t}),Object(se.jsx)(ye,{title:"Toggle fog",value:"\ud83c\udf2b",onClick:n}),Object(se.jsx)(ye,{title:"Copy JSON to clipboard",value:"\ud83d\udc6f",onClick:a}),Object(se.jsx)(ye,{title:"Paste JSON from clipboard",value:"\ud83d\udccb",onClick:o})]})},Xe={setUsername:F,setCursorSize:z,setFogEnabled:K,setToolSettings:L,loadDefaultBattleGame:function(){return{type:m,game:V}}},Ye=Object(c.b)((function(e){return{game:e.game,settings:e.settings}}),Xe)((function(e){var t=e.toggleOnUser,n=e.game,a=e.settings,o=e.setFogEnabled,r=e.setUsername,i=e.setCursorSize,s=e.setToolSettings,c=e.loadDefaultBattleGame,l=ae(),d=Object(ne.a)(l,3),g=d[0],p=d[1],b=d[2];if(!t)return null;return t?Object(se.jsx)(Je,{initAsDev:function(){c()},toggleFog:function(){o(!n.fogEnabled),function(e,t,n){oe(e,{type:"pushFogEnabled",from:t.guid,fogEnabled:n})}(g,p,!n.fogEnabled),"fog"===a.tool&&s("move","")},copyJson:function(){},pasteJson:function(){},username:a.username,updateUsername:function(e){r(e),b(Object(u.a)(Object(u.a)({},p),{},{username:e}))},cursorSize:a.cursorSize,updateCursorSize:function(e){var t=e;isNaN(t)||i(t)}}):null}));var Ve={setToolSettings:L},Be=Object(c.b)((function(e){return{settings:e.settings}}),Ve)((function(e){var t=e.title,n=e.value,a=e.settings,o=e.setToolSettings,r=t===a.tool;return Object(se.jsx)(ye,{title:t,value:n.toString(),onClick:function(){o(t,void 0)},isSelected:r})})),Ke=function(e){var t=e.fogEnabled;return Object(se.jsxs)("span",{id:"tools",children:[Object(se.jsx)(Be,{title:"move",value:"\ud83e\uddf3"}),Object(se.jsx)(Be,{title:"draw",value:"\ud83d\udd8d"}),t?Object(se.jsx)(Be,{title:"fog",value:"\ud83c\udf2c"}):null]})},qe=function(e){var t=e.controlPanelState,n=e.setControlPanelState,a=e.hidden,o=e.toggleHidden,r=e.fogEnabled,i=e.isHost,s=e.username,c=e.setUsername,u=e.cursorSize,l=e.setCursorSize,d=e.socketRequestRefresh,g=e.pushRefreshToPlayers;return a?Object(se.jsxs)("div",{id:"control-panel",children:["\xa0\xa0\xa0\xa0",Object(se.jsx)(ye,{value:"\ud83d\udc41",onClick:o,title:"show/hide control panel"}),"\xa0\xa0\xa0\xa0"]}):i?Object(se.jsxs)("div",{id:"control-panel",children:["\xa0\xa0\xa0\xa0",Object(se.jsx)(ye,{value:"\ud83d\udc41",onClick:o,title:"show/hide control panel"}),"\xa0\xa0\xa0\xa0",Object(se.jsx)(Ce,{title:"User",value:"\ud83e\uddd9\u200d\u2642\ufe0f",controlPanelState:t,setControlPanelState:n}),Object(se.jsx)(Ce,{title:"Maps",value:"\ud83d\uddfa",controlPanelState:t,setControlPanelState:n}),Object(se.jsx)(Ce,{title:"Tokens",value:"\u265f",controlPanelState:t,setControlPanelState:n}),Object(se.jsx)(ye,{title:"Push refresh to players",value:"\ud83d\udcab",onClick:g}),"\xa0\xa0\xa0\xa0",Object(se.jsx)(Ke,{fogEnabled:r}),"\xa0\xa0\xa0\xa0",Object(se.jsx)(Ie,{}),Object(se.jsx)(Ae,{toggleOnMaps:t.toggleOnMaps}),Object(se.jsx)(We,{toggleOnTokens:t.toggleOnTokens}),Object(se.jsx)(Ye,{toggleOnUser:t.toggleOnUser})]}):Object(se.jsxs)("div",{id:"control-panel",children:[Object(se.jsx)(ye,{value:"\ud83d\udc41",onClick:o,title:"show/hide control panel"}),Object(se.jsx)("input",{title:"User name",placeholder:"User name",value:s,onChange:function(e){return c(e.target.value)}}),Object(se.jsx)(Ce,{title:"Share mouse (cursor)",value:"\ud83d\udc01",controlPanelState:t,setControlPanelState:n}),Object(se.jsx)("input",{title:"Cursor size",value:u,onChange:function(e){return l(parseInt(e.target.value))},type:"number",min:"0"}),Object(se.jsx)(ye,{title:"Request gameboard refresh from host",onClick:d,value:"\ud83d\udcab"}),Object(se.jsx)(_e,{})]})},Ze=function(){return{hidden:!1,toggleOnMaps:!1,toggleOnUser:!1,toggleOnTokens:!1}},Qe={setUsername:F,setCursorSize:z},et=Object(c.b)((function(e){return{game:e.game,settings:e.settings,metadata:e.metadata}}),Qe)((function(e){var t=e.game,n=e.settings,o=e.metadata,r=e.setUsername,i=e.setCursorSize,s=Object(a.useState)(Ze),c=Object(ne.a)(s,2),l=c[0],d=c[1],g=ae(),p=Object(ne.a)(g,3),b=p[0],j=p[1],m=p[2];return Object(se.jsx)(qe,{controlPanelState:l,setControlPanelState:d,hidden:l.hidden,toggleHidden:function(){d(Object(u.a)(Object(u.a)({},l),{},{hidden:!l.hidden}))},fogEnabled:t.fogEnabled,isHost:o.isHost,username:n.username,setUsername:function(e){r(e),m(Object(u.a)(Object(u.a)({},j),{},{username:e}))},cursorSize:n.cursorSize,setCursorSize:function(e){var t=e;isNaN(t)||i(t)},socketRequestRefresh:function(){ie(b,j)},pushRefreshToPlayers:function(){re(b,j,t)}})})),tt=function(e){var t=e.isHost,n=e.overlayRef,a=e.isFogLoaded,o=e.cursors,r=e.cursorSize,i=e.tokens,s=e.onMouseMove,c=e.onMouseUp,u=e.onMouseDown,l=a?null:"gone";return Object(se.jsxs)("div",{id:"game",onMouseMove:function(e){return s(e)},onMouseDown:function(e){return u(e)},onMouseUp:function(e){return c(e)},children:[Object(se.jsxs)("div",{className:l,children:[Object(se.jsx)(fe,{}),Object(se.jsx)(he,{}),i?Object(se.jsx)("div",{id:"tokens",children:i.map((function(e,n){return Object(se.jsx)(ke,{token:e,isHost:t},"Token".concat(n))}))}):null,Object(se.jsx)(Oe,{}),o?Object(se.jsx)("div",{id:"cursors",children:o.map((function(e){return Object(se.jsx)(Se,{name:e.username,cursor:e,size:r},"cursor".concat(e.$id))}))}):null,Object(se.jsx)(ve,{overlayRef:n})]}),Object(se.jsx)(et,{})]})},nt={setGameSettings:function(e,t){return{type:D,isHost:e,room:t}},overwriteGame:function(e){return{type:m,game:e}},loadMap:B,updateMaps:q,addMap:Z,incrementGen:function(){return{type:h}},setFogEnabled:K,updateTokens:Q},at=Object(c.b)((function(e){return{metadata:e.metadata,game:e.game,settings:e.settings}}),nt)((function(e){var t=e.metadata,n=e.game,r=e.settings,i=e.setGameSettings,s=e.overwriteGame,c=e.loadMap,l=e.updateMaps,d=e.addMap,g=e.updateTokens,p=(e.incrementGen,e.setFogEnabled),b=o.a.useRef(),j=ae(),m=Object(ne.a)(j,3),f=m[0],h=m[1],O=m[2],v=Object(a.useState)({downX:0,downY:0}),w=Object(ne.a)(v,2),x=w[0],k=w[1],S=[],y=function(e,t,n,a){if(null!=n){var o=b.current.getContext("2d");o.strokeStyle=n,o.lineWidth="3",o.beginPath(),o.arc(e,t,a,0,2*Math.PI),o.stroke(),o.closePath()}},C=function(){},E=function(e){},T=function(){var e="eraser"===r.subtool;switch(r.tool){case"draw":return e?"erease":"draw";default:return r.tool}},I=function(){};var N=Object(a.useCallback)((function(e){var a=JSON.parse(e.data);if(a.from!==h.guid&&(!a.to||a.to===h.guid)){var o=function(){if(0!==n.maps.length){var e=n.maps.filter((function(e){return e.$id===n.mapId}));return e.length>0?e[0]:n.maps[0]}}();switch(a.type){case"pushCursor":break;case"pushDrawPath":var r=o.drawPaths?o.drawPaths:[];r.push(a.drawPath);var i=n.maps.map((function(e){return e.$id===o.$id?Object(u.a)(Object(u.a)({},o),{},{drawPaths:r}):e}));l(i);break;case"pushDrawReset":var b=n.maps.map((function(e){return e.$id===o.$id?Object(u.a)(Object(u.a)({},o),{},{drawPaths:[]}):e}));l(b);break;case"pushFogPath":var j=o.fogPaths?o.fogPaths:[];j.push(a.fogPath);var m=n.maps.map((function(e){return e.$id===o.$id?Object(u.a)(Object(u.a)({},o),{},{fogPaths:j}):e}));l(m);break;case"pushFogReset":var O=n.maps.map((function(e){return e.$id===o.$id?Object(u.a)(Object(u.a)({},o),{},{fogPaths:[]}):e}));l(O);break;case"pushSingleToken":var v=n.tokens.map((function(e){return e.guid!==a.token.guid?e:Object(u.a)(Object(u.a)({},a.token),{},{$selected:e.$selected})}));g(v);break;case"pushTokens":var w=a.tokens.map((function(e){var t=!1,a=n.tokens.filter((function(t){return t.guid===e.guid}));return a.length>0&&(t=a.$selected),Object(u.a)(Object(u.a)({},e),{},{$selected:t})}));g(w);break;case"pushMapId":c(a.mapId);break;case"pushMapState":l(a.maps),c(a.mapId);break;case"pushCreateMap":d(a.mapName,a.width,a.height);break;case"pushFogEnabled":console.log("receiving fog enabled",a),p(a.fogEnabled);break;case"pushGameRefresh":s(a.game);break;case"requestRefresh":t.isHost&&re(f,h,n,{to:a.from});break;default:console.error("Unrecognized websocket message type: ".concat(a.type))}}}),[n,t.isHost,c,s,p,l,d,g,f,h]);Object(a.useEffect)((function(){window.addEventListener("beforeunload",I),window.addEventListener("resize",C),window.addEventListener("keydown",E);var e=new URLSearchParams(window.location.href.replace(/.*\?/,""));return i(e.get("host"),e.get("room")),function(){window.removeEventListener("beforeunload",I),window.removeEventListener("resize",C),window.removeEventListener("keydown",E)}}),[]),Object(a.useEffect)((function(){document.title="Borealis D&D, Room: ".concat(t.room)}),[t.room]),Object(a.useEffect)((function(){return f&&(f.addEventListener("message",N),""===h.username&&O(Object(u.a)(Object(u.a)({},h),{},{username:r.username}))),function(){f&&f.removeEventListener("message",N)}}),[f,h,O,N,r.username]);var M=new Date-3e4,P=t.cursors;for(var R in P){var D=P[R].time;(!D||D<M)&&delete P[R]}try{return Object(se.jsx)(tt,{isHost:t.isHost,overlayRef:b,isFogLoaded:n.isFogLoaded,cursors:P,cursorSize:r.cursorSize,tokens:n.tokens,onMouseMove:function(e){if(b){!function(){var e=b.current.getContext("2d");e&&e.clearRect(0,0,n.width,n.height)}();var a=e.pageX,o=e.pageY;switch(t.isHost?r.tool:"move"){case"fog":!function(){var e,t=b.current.getContext("2d");t.beginPath();for(var n=0;n<S.length;n++)e=t.createRadialGradient(S[n].x,S[n].y,S[n].r2||1,S[n].x,S[n].y,.75*S[n].r),t.lineCap="round",e.addColorStop(0,"rgba(255,255,255,255)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(S[n].x-S[n].r,S[n].y-S[n].r,S[n].x+S[n].r,S[n].y+S[n].r);t.stroke()}(),y(a,o,"yellow",r.fogRadius);break;case"draw":!function(){var e=b.current.getContext("2d");e.beginPath();for(var t=0;t<S.length;t++)e.lineCap="round",e.fillStyle=S[t].drawColor,e.lineWidth=S[t].drawSize,e.strokeStyle=S[t].drawColor,0===t?e.moveTo(S[t].x,S[t].y):e.lineTo(S[t].x,S[t].y);e.stroke()}(),y(a,o,r.drawColor,r.drawSize);break;case"move":1&e.buttons&&function(e){if("move"===r.tool){var t=n.tokens.map((function(t){return t.$selected?Object(u.a)(Object(u.a)({},t),{},{x:t.$x0+(e.pageX-x.downX),y:t.$y0+(e.pageY-x.downY)}):t}));g(t)}}(e)}("fog"===r.tool||"draw"===r.tool)&&1&e.buttons&&S.push({x:a,y:o,r:r.fogRadius,r2:void 0,tool:T(),drawColor:r.drawColor,drawSize:r.drawSize})}},onMouseUp:function(e){var a=function(){if(0!==n.maps.length){var e=n.maps.filter((function(e){return e.$id===n.mapId}));return e.length>0?e[0]:n.maps[0]}}();if(a&&t.isHost){var o=a.fogPaths,i=a.drawPaths;switch(r.tool){case"fog":o.push(S),function(e,t,n){oe(e,{type:"pushFogPath",from:t.guid,username:t.username,fogPath:n})}(f,h,S);break;case"draw":i.push(S),function(e,t,n){oe(e,{type:"pushDrawPath",from:t.guid,username:t.username,drawPath:n})}(f,h,S)}S=[];var s=n.maps.map((function(e){return e.$id===a.$id?Object(u.a)(Object(u.a)({},a),{},{fogPaths:o,drawPaths:i}):e}));l(s)}n.tokens.filter((function(e){return e.$selected})).length>0&&function(e,t,n){oe(e,{type:"pushTokens",from:t.guid,tokens:n})}(f,h,n.tokens)},onMouseDown:function(e){for(var n=0,a=[document.activeElement,e.target];n<a.length;n++){var o=a[n];if("INPUT"==o.tagName.toUpperCase()&&("TEXT"===o.type.toUpperCase()||"NUMBER"===o.type.toUpperCase())||"BUTTON"===o.tagName.toUpperCase())return e}t.isHost&&1&e.buttons&&(S=[]).push({x:e.pageX,y:e.pageY,r:r.fogRadius,r2:void 0,tool:T(),drawColor:r.drawColor,drawSize:r.drawSize}),k({downX:parseInt(e.pageX),downY:parseInt(e.pageY)})}})}catch(A){!function(e){console.error(e),console.error("Exception in `render`. Clearing localStorage..."),localStorage.removeItem(t.room),window.alert("Fatal error. Local storage cleared.")}(A)}})),ot=function(){var e=Object(s.a)({settings:_,metadata:W,game:te}),t=Object(s.b)(e);return Object(se.jsx)(c.a,{store:t,children:Object(se.jsx)(le,{children:Object(se.jsx)(at,{})})})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(se.jsx)(o.a.StrictMode,{children:Object(se.jsx)(ot,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[30,1,2]]]);
//# sourceMappingURL=main.9d667018.chunk.js.map