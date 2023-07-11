// DBScorpion/ColinGlover cards.js library
// version 2
//base64 (atob btoa) card arrays
const cb='a234567890jqk';
const cc='234567890jqka';
const sc='ctsd';
var deck=[];
var pile=[];
var hand=[];
var style=[cb,cc];

function clrcan(canv){
 var ctx = canv.getContext("2d");
 ctx.clearRect(0, 0, canv.width, canv.height);
}
function dnm(canv,x,y,sz,nm,c){
 var ctx = canv.getContext("2d");
 ctx.fillStyle = c==1 ? "red" : 'black';
 ctx.font = sz+"px Arial";
 ctx.fillText(Number.isInteger(nm) ? nm:nm.toUpperCase(), x-(sz/2), y+(sz/2));
}
function dsh(canv,x,y,sz,s){
 var ctx = canv.getContext("2d");
 if (s=='c' || s=='t') { c=1; }
 if (s=='d' || s=='s') { c=2; }
 if (s==1 || s=='c') {
  //draw circle
  ctx.beginPath();
  ctx.arc(x, y,sz/2, 0, 2 * Math.PI);
  ctx.fillStyle = c==1 ? "red" : 'black';
  ctx.fill();
  ctx.stroke(); 
 }
 if (s==2 || s=='s') {
  //draw square
  ctx.beginPath();
  ctx.rect(x - (sz/2), y - (sz/2),sz,sz);
  ctx.fillStyle = c==1 ? "red" : 'black';
  ctx.fill();
  ctx.stroke();
 }
 if (s==3 || s=='d') {
  //draw diamond
  ctx.beginPath();
  ctx.moveTo(x, y-(sz/2));
  ctx.lineTo(x - sz/2, y);
  ctx.lineTo(x, y+(sz/2));
  ctx.lineTo(x + sz/2, y);
  ctx.closePath();
  ctx.fillStyle = c==1 ? "red" : 'black';
  ctx.fill();
  ctx.stroke();
 }
 if (s==4 || s=='t') {
  //draw triangle
  ctx.beginPath();
  ctx.moveTo(x, y-(sz/2));
  ctx.lineTo(x-(sz/2), y+(sz/2));
  ctx.lineTo(x+(sz/2), y+(sz/2));
  ctx.closePath();
  ctx.fillStyle = c==1 ? "red" : 'black';
  ctx.fill();
  ctx.stroke();
 }
}

function dcd(canv,x,y,c='',s=200,co1='lime',co2='green'){
 c=Array.isArray(c) ? c[0] : c;
 var ctx = canv.getContext("2d");
 //draw single card on screen
 // c = b/r - h/s/d/c - 2-9/j/k/q/a
 // ex; c= 'd2' diamond 2 OR '' blank OR 'bx' draw back
 // circle, square, diamond, triangle ?
 //console.log(x,y,c,s);
 w=s; h=s*1.5; rad=s/4; //console.log(rad);
 //draw card rectangle
 ctx.beginPath();
 ctx.moveTo(x + rad, y);
 ctx.lineTo(x + w - rad, y);
 ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
 ctx.lineTo(x + w, y + h - rad);
 ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
 ctx.lineTo(x + rad, y + h);
 ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
 ctx.lineTo(x, y + rad);
 ctx.quadraticCurveTo(x, y, x + rad, y);
 ctx.strokeStyle = 'black';
 ctx.fillStyle = 'white';
 ctx.closePath();
 ctx.fill();
 if (c.length<2) {
  ctx.setLineDash([3, 3]);
 } else {
  ctx.setLineDash([0, 0]);
 }
 ctx.stroke();
 if (c!=""){
  //console.log(c);
  if (c.charAt(0)=='b'){
   ctx.beginPath();
   ctx.rect(x+rad,y+rad,w-rad*2,h-rad*2);
   ctx.strokeStyle = 'black';
   var grd = ctx.createLinearGradient(x+rad,y+rad,x+rad,y+h-rad);
   grd.addColorStop(0, co1);
   grd.addColorStop(1, co2);
   ctx.fillStyle = grd;
   //ctx.fillStyle = 'lime';
   ctx.fill();
   ctx.stroke();
  }else{
   //draw number
   tmp= c.charAt(1)=='0' ? '10' : ' '+c.charAt(1);
   if (c.length>1) {
    dnm(canv,x+(rad/1.1),y+(rad/1.3),rad,tmp);
   //draw suit
    dsh(canv,x+(rad*2),y+(rad/1.1),rad/1.5,c.charAt(0));
   }
   dsh(canv,x+(s/2),y+(s/1.3),rad*2,c.charAt(0));
  }
 }
}
function shf(zz=1){
 //shuffle cards
 // z= number of decks.
 deck=[];
 pile=[];
 hand=[];
 //nmcd=cc.length*sc.length*z;
 //console.log(nmcd);
 for (z=0;z<zz;z++){
  for (y=0;y<sc.length;y++){
   for (x=0;x<cc.length;x++){
    //deck.push(btoa(sc.charAt(y)+cc.charAt(x)));
    deck.push(sc.charAt(y)+cc.charAt(x));
   }
  }
 }
 //console.log('b',deck);
 deck.sort(function(a, b){return 0.5 - Math.random()});
 deck.sort(function(a, b){return 0.5 - Math.random()});
 //console.log('a',deck);
 //return deck;
}
function dr(zz=1){
 //draw z cards from deck
 tmp=[];
 for (z=0;z<zz;z++){
  var pop=deck.pop();
  if (pop) {
   tmp.push(pop);
  }
 }
 return tmp;
}

function crdval(card,sty){
 // card either two [s3] or one [3] digit.
 // sty[le] either 0 [ace low] or 1 [ace high]
 if (card==undefined){
  return -1
 }
 if (card.length==2) {
  card=card.substr(1);
 }
 //console.log('card:',card);
 return style[sty].indexOf(card);
}

function crdcol(crd1,crd2){
 // crd either two [s3] or one [s] digit.
 // returns frue false array:
 //  [same shape,0-3,0-3,same colour]
  // 0=s 1=d [0-1 = black]
  // 2=t 3=c [2-3 = red]

 if (crd1==undefined || crd2==undefined){
  return -1
 }
 ocard=[];
 crd1=crd1.length>1 ? crd1.substr(0,1) : crd1;
 crd2=crd2.length>1 ? crd2.substr(0,1) : crd2;
 //same shape
 if (crd1==crd2){
  ocard.push(true)
 }else{
  ocard.push(false)
 }
 //shape numbers
 ocard.push( crdc(crd1) );
 ocard.push( crdc(crd2) );

 if ( (ocard[1]>1 && ocard[2]>1) || (ocard[1]<2 && ocard[2]<2) ){
  ocard.push(true)
 }else{
  ocard.push(false)
 }
 
 //console.log(" out:",ocard);
 return ocard;
}

function crdc(card){
 if (card=="c"){out=0;}
 if (card=="t"){out=1;}
 if (card=="s"){out=2;}
 if (card=="d"){out=3;}
 return out;
}
