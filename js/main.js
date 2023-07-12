//https://www.youtube.com/watch?v=TZWI0wqewXc

var game,can,spr,bw,bh;
//var dbug,dbtm;
var done=0;
var mx,my;// current pointer location
var gx,gy;// grabbed square
var fx=fy=-1;// mouse grabbed coords
var px,py,pz;// phone/touch grabbed
var drag=0; //draggable
var xx=7; //cards across
var yy=25; //vertical sections
var cs=5; //card grid length
var sprd=[]; // main area
var flow=[]; // dragged cards
var aces=[[],[],[],[]]; // aces storage
// deck[] and pile[] in cards.js
var flox=[];var floy=[];
var flod=0;
var flower;
var bgsk;
co1='lime';co2='green';drw=1;fre=1;
start();
 
document.getElementById("soldrw").onchange = function(){
 drw=document.getElementById("soldrw").value*1;
}
document.getElementById("solfre").onchange = function(){
 fre=document.getElementById("solfre").value*1;
}
document.getElementById("co1").onchange = function(){
 co1=document.getElementById("co1").value;
 redraw();
}
document.getElementById("co2").onchange = function(){
 co2=document.getElementById("co2").value;
 redraw();
}


document.getElementById("soltogsetup").onclick = function(){
 var soltog=document.getElementById("solsetup");
 if (soltog.style.display !== "none") {
  soltog.style.display = "none";
 } else {
  soltog.style.display = "block";
 }
}
document.getElementById("solstart").onclick = function(){
 done=0;
 aces=[[],[],[],[]]
 start();
}
/*
function debug(t){
// use debug(time-in-ms,arg,arg,etc) to display popup messages
 clearTimeout(dbtm);
 if (!dbug){
  dbug=document.createElement('div'); dbug.id="dbug";document.body.appendChild(dbug);
 }
 for (var x in arguments){
  if (x!=0){dbug.innerHTML+=arguments[x]+'<br>';}
 }
 dbtm=setTimeout(function(){dbug.remove();dbug='';}, t);
}
*/

function flowdn(){
 if (flod<1){return;}
 flod--;
 flox.pop();floy.pop();
 flox.reverse();floy.reverse();
 flox.push(mx-(tmpw/2));
 floy.push(my);
 flox.reverse();floy.reverse();
 clrcan(spr);
 for (i=0;i<flow.length;i++){
   dcd(spr,flox[i],floy[i]+((bw/yy)*i),flow[i],tmpw,co1,co2);
 }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function clku(evn){
 evn.stopPropagation();
 evn.preventDefault();
 //console.log(evn);
 clearInterval(flower);
 clrcan(spr);
 if (done) { return; }


 if (evn.changedTouches){
  var rect = can.getBoundingClientRect();
  mx=Math.floor(evn.changedTouches[0].clientX-rect.left);
  my=Math.floor(evn.changedTouches[0].clientY-rect.top);
 }
 //fx=mx;fy=my;
 tx=Math.floor((mx/bw)*xx); ty=Math.floor((my/bh)*yy);
 
 if (flow.length<1 && tx==0 && ty>=1 && ty<=4){
  //in pile (top left)
  //console.log('in pile',drw);
  tmpw=bw/xxx;
  ccc=dr(drw);

  //animate to show x cards here


  if (ccc.length>0) {
   pile.push(...ccc); //Uses items not arrays
   for (ii=0;ii<drw-1;ii++){
    //console.log('>>',ccc[ii]);
    //pile.push(ccc[ii]);
    //console.log('>',pile);
    dcd(can,(1*(tmpw+(tmpw/xxx)))+(tmpw/xxx),(bw/yy)*(1),ccc[ii],tmpw,co1,co2);
    await sleep(300);
   }


  }else{
   deck=pile;
   deck.reverse();
   pile=[];
   tc='';
  }
  //console.log(deck.length);
  if (deck.length<1) {
   //console.log('poof',(tmpw/xxx),(bw/yy));
  }
   //console.log(pile, deck);
   tc=pile[pile.length-1];
   //console.log(tc,ccc.length);
  
  //dcd(can,(tmpw+(tmpw/xxx))+(tmpw/xxx),(bw/yy),tc,tmpw,co1,co2);
  //return;
 } else if (drag){
  //in spread
  ffx=Math.floor((fx/bw)*xx); ffy=Math.floor((fy/bh)*yy);
  
  //console.log('fy:',fy,'ffy:',ffy);
  
  
  //console.log('>>',tx);
  if (ty<5 && tx>2){
   dbtc=aces[tx-3][aces[tx-3].length-1]; //aces card
   //console.log('>>>',dbtc);
  }else{
   dbtc=sprd[tx][sprd[tx].length-1];
  }
  cvz=[ crdval(flow[0],0), crdval(dbtc,0) ];
  cvz.push( crdcol(flow[0],dbtc) );
  //debug(5000,ffx,flow[0],tx,dbtc);
  //console.log(sprd);


  if (ffy>5){ //split line
   //console.log('taken below');
   var tmp=undefined; //sprd[gx][gy-5];
   for (i=0;i<(cs);i++){
    tmp= tmp===undefined ? sprd[ffx][ffy-6-i] :  tmp;
    if (tmp!=undefined) break;
   }
  }else{
   //console.log('taken above:',flow);
   if (fre){
    //tx=-tx-1;
   }
  }
 
 //console.log('dropped',tx ,ty,flow.length,flow);
  
  if (flow.length==1 && ty<6 && tx>2 && tx<7){
   //console.log('dropped in aces area');

   //console.log('aces in:',flow,'sc:',sc[tx-3],'tx:',tx,'ffx:',ffx);
   //console.log('aces in:',cvz);
   fail=0;
   if (flow[0][0]!=sc[tx-3]){
    //failed shape matches sc[]
    //console.log('aces fail shape');
    fail= !fre ? 0 : 1;
   }
   if (cvz[0]!=cvz[1]+1){
     //console.log('aces fail seq');
     fail= !fre || (cvz[0]==0 && cvz[1]==-1) ? fail : 1; // if not 0-0: fail
   }

   if (fail>0){
    if (ffy<5 && ffx<3){
     pile.push(flow[0]);
    } else if (ffy<5 && ffx>2){
     (aces[ffx-3]).push(flow[0]);
    }else{
     sprd[ffx].push(...flow);
    }
   }else{
    (aces[tx-3]).push(flow[0]);
    flp=0;
   }
  }else if(flow.length && ty>5){
   //console.log('dropped in spread');

   if (flow[0]!=undefined){
    //console.log('flow0:',flow," tx:",tx);
    fail=0;
    if (cvz[2] && cvz[2][3]==true) {
     //console.log('colour fail');
     fail= !fre ? 0 : 1;
    }
    if (cvz[0]!=cvz[1]-1 && cvz[1]!=-1) {
     //console.log('num fail');
     fail= !fre ? 0 : 1;
    }
    
    if (fail){
     if (ffy>5){ //from spread
      sprd[ffx].push(...flow);
     }else if (ffx>2 && ffx<7){ //from aces
      //console.log('tst2');
      (aces[ffx-3]).push(flow[0]);
     } else { // from pile
      pile.push(flow[0]);
     }
    }else{
     //tx=tx<0 && ffy<6 ? tx=-tx-1 : tx;
     sprd[tx].push(...flow);
    }

/*
    if (tx<0 && fre){
     console.log('taken above');
     //console.log('cvz:',cvz,'cvz2:',cvz[2]);
     if (fail){
      
      flow=[];
     } else {
      tx=-tx-1;
     }
    }
    if (flow){
     sprd[tx].push(...flow);
    }
*/
    
   }
   var flp= tx==ffx ? 1:0;
  }else{
   if (flow[0]){
   //console.log('drop invalid');
    if (ffy>5){ //from spread
     sprd[ffx].push(...flow);
    }else if (ffx>2 && ffx<7){ //from aces
     (aces[ffx-3]).push(flow[0]);
    }else{ //from pile
     pile.push(flow[0]);
    }
   }
  }
  clrcan(can);
 }
 drag=0;fx=-1;fy=-1;
 redraw(flp);
 flow=[];
 tc="";

 if (aces[0].length>12 && aces[1].length>12 && aces[2].length>12 && aces[3].length>12){
   done=1;
   //debug(99999,'Congrats!','Congrats!','Congrats!','Congrats!','Congrats!')
   dnm(spr,(bw/4),(bh/3),25,"Congrats, Game Over!",1);
  }
}

function clkd(evn){
 if (flow.length) { return; }
 flox=[];floy=[];
 clrcan(can);
 redraw(1);
 bgsk=0;
 if (done) { return; }
 if (evn.changedTouches){
  var rect = can.getBoundingClientRect();
  mx=Math.floor(evn.changedTouches[0].clientX-rect.left);
  my=Math.floor(evn.changedTouches[0].clientY-rect.top);
 }
 fx=mx;fy=my;
 gx=Math.floor((mx/bw)*xx); gy=Math.floor((my/bh)*yy);
 if (gy>5 && sprd[gx][gy-6] && sprd[gx][gy-6].substr(0,1)=='x'){
  fx=-1;fy=-1;gx=-1;gy=-1;
 }
}

function movr(evn){

 if (done) { return; }
 mx=evn.offsetX; my=evn.offsetY;
 if (!mx && evn.changedTouches!=undefined){
  //console.log("f",fx,fy,"g",gx,gy);
  var rect = can.getBoundingClientRect();
  mx=Math.floor(evn.changedTouches[0].clientX-rect.left);
  my=Math.floor(evn.changedTouches[0].clientY-rect.top);
 }
 //console.log('m:',mx,my,drag,"f",fx,fy,"g",gx,gy);
  
 if (fx==-1){ return; }
 drag=1;
 tmpw=bw/xxx;
 tx=Math.floor((fx/bw)*xx); ty=Math.floor((fy/bh)*yy);
 if (tx>-1){
  if (!tc){
   //console.log('t:',tx,ty); //console.log('f:',fx,fy); //console.log('g:',gx,gy);
   var tc=undefined; //sprd[gx][gy-5];
   if (gy<5 && gx==1){
    tc=pile[pile.length-1];
   } else {
    for (i=0;i<(cs);i++){
     tc= tc===undefined ? sprd[tx][ty-6-i] :  tc;
     if (tc!=undefined) break;
    }
   }
  }
  //console.log('tc:'+tc);

  //collect dragged cards
  if (!flow[0]) {
   if (gy<5 && gx>2 && gx<7 && aces[gx-3]!=undefined){ //aces area
    //console.log('drag aces');
    //console.log('aces',aces[gx-3]);
    //console.log('aces out:',aces);
    flow[0]=aces[gx-3].pop();
   }
   if (gy<5 && gx==1){// drag from pile
    if (pile.length>0){
     flow[0]=pile.pop();
    }else{
     fx=-1;
    }

  } else { // spread
   i=0;
   var tmpz;
   while (tmpz!=tc){
    var tmpz=sprd[tx].pop();
    if (tmpz){
     flow[i]=tmpz;
     flox[i]=mx-(tmpw/2);
     floy[i]=my+((bw/yy)*i);
     i++;
    }
   }
   flow.reverse();
   flox.reverse();
   floy.reverse();
 }
   //console.log(mx,my,tc,flow);
   if (flow[0]==undefined){   
    flow=[];
   }

  } else {
   if (flow.length){
    flox.pop();floy.pop();
    flox.unshift(mx-(tmpw/2));
    floy.unshift(my);
    clearInterval(flower);
    flower=setInterval(flowdn,60);
   }
  }

  //clear spr layer
  clrcan(spr);
  for (i=0;i<flow.length;i++){
   dcd(spr,flox[i],floy[i]+((bw/yy)*i),flow[i],tmpw,co1,co2);
  }
  flod=i;
  }
  if (!bgsk) {
   clrcan(can);
   redraw(1);
   bgsk=1;
  }
}

function redraw(flip=0) {
 //flip 1 = don't flip
 //console.log('flip:'+flip);
 
  xxx=xx+1; //used to add space between cards
 var tmpw=bw/xxx;
 //top row
 for (ii=0;ii<7;ii++) {
  if (ii!=2) {
   var tc='';
   if (ii==0){
    tc=deck.length>0 ? 'b1' : '';
   }
   if (ii==1){
    tc=pile.length>0 ? pile[pile.length-1] : '';
   }
   if (ii==3){
    tmp=aces[0].length;
    //console.log(tmp);
    tc=tmp ? aces[0][tmp-1] : 'c';
   }
   if (ii==4){
    tmp=aces[1].length;
    //console.log(tmp);
    tc=tmp ? aces[1][tmp-1] : 't';
   }
   if (ii==5){
    tmp=aces[2].length;
    //console.log(tmp);
    tc=tmp ? aces[2][tmp-1] : 's';
   }
   if (ii==6){
    tmp=aces[3].length;
    //console.log(tmp);
    tc=tmp ? aces[3][tmp-1] : 'd';

   }
   dcd(can,(ii*(tmpw+(tmpw/xxx)))+(tmpw/xxx),(bw/yy),tc,tmpw,co1,co2);
  }
 }
 //console.log(deck);
 //card tree
 for (ii=0;ii<7;ii++) {
  var tmp=[];
  for (i=0;i<sprd[ii].length;i++) {
   var crd=sprd[ii][i];
   //tc changed based on X substr
   if (crd){
    if (flip==0 && crd.substr(0,1)=='x' && i==sprd[ii].length-1){
     //console.log('flipping ',tc,i,sprd[ii].length-1);
     sprd[ii][i]=crd.substr(1,2);
     crd=sprd[ii][i];
    }
    //console.log(crd);
    crd=crd.substr(0,1)=='x' ? 'b1' : crd;
    dcd(can,(ii*(tmpw+(tmpw/xxx)))+(tmpw/xxx),(bw/yy)*(i+6),crd,tmpw,co1,co2);
   }
  }
 }
return;
 
}

function start(){
 game=document.body; //document.getElementById('game');
 bw=game.clientWidth<game.clientHeight ? game.clientWidth*.8 : game.clientHeight*.8;
 bh=bw;
 can=document.getElementById('can');
 can.width=bw; can.height=bh;
 spr=document.getElementById('spr');
 spr.width=bw; spr.height=bh;
 shf();
 //console.log(deck);
 //draw spread cards
  for (ii=0;ii<7;ii++) {
  var tmp=[];
  for (i=0;i<=ii;i++) {
   tc=dr(1)[0];
   tmp[i]= ii==i ? tc : 'x'+tc;
  }
  sprd[ii]=tmp;
 }

 redraw();
 //console.log(sprd.length,deck.length);
 
 /*for (ii=0;ii<7;ii++) {
  for (i=0;i<=6;i++) {
 dcd((ii*(tmpw+(tmpw/8)))+(tmpw/8),(tmpw*1.5)*i,'b1',tmpw);
  }
 }*/
 spr.onmousedown = clkd;
 spr.onmouseup = clku;
 spr.onmousemove = movr;
 spr.addEventListener("touchstart", clkd, {passive: true});
 spr.addEventListener("touchend", clku, false);
 //spr.addEventListener("touchcancel", handleCancel, false);
 spr.addEventListener("touchmove", movr, {passive: true});
 
 if (1==2) {
  // grid lines
  var spx = spr.getContext("2d");
  for (y = 0; y < yy; y++) {
   for (x = 0; x < xx; x++) {
    spx.beginPath();
    spx.rect(x*(bw/xx), y*(bh/yy), bw/xx, bh/yy);
    spx.stroke();
   }
  }
 }
}
