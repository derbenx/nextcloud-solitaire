<div id="app-content">
<center><b>Solitaire v1.0 &nbsp&nbsp&nbsp by DerBen</b>&nbsp&nbsp&nbsp
<button id='soltogsetup'>-Settings Toggle-</button>
<button id='solstart'>-New Game-</button>
</center>
<div id="solsetup" style="display:none">
<center>
<br>Description<p>
Classic solitaire<p>
Works on Chrome and Firefox. No promises on any other browser.
<h3>choose your options:</h3>
<!-- <form action='game.php' method='post'> -->
<table border='2'>
<tr><td><b>Choice</b></td><td><b>Input</b></td><td><b>Meaning</b></td></tr>
<tr><td>Drawn cards:</td><td>
 <select id='soldrw'>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
 </select>
</td><td>How many cards are drawn</td></tr>
<tr><td>Colour 1:</td><td>
 <select id="co1">
  <option value="red">red</option>
  <option value="orange">orange</option>
  <option value="yellow">yellow</option>
  <option value="green">green</option>
  <option value="blue">blue</option>
  <option value="violet">violet</option>
  <option value="lime" selected>lime</option>
  <option value="cyan">cyan</option>
  <option value="pink">pink</option>
 </select>
</td><td>Card back colour 1</td></tr>
<tr><td>Colour 2:</td><td>
 <select id="co2">
  <option value="red">red</option>
  <option value="orange">orange</option>
  <option value="yellow">yellow</option>
  <option value="green" selected>green</option>
  <option value="blue">blue</option>
  <option value="violet">violet</option>
  <option value="lime">lime</option>
  <option value="cyan">cyan</option>
  <option value="pink">pink</option>
 </select>
</td><td>Card back colour 2</td></tr>
<tr><td>Free play:</td><td>
 <select id="solfre">
  <option value="0">yes</option>
  <option value="1" selected>no</option>
 </select>
</td><td>Place cards as you like.</td></tr>
</table><br>
<!-- </form> -->
</center><p><br></p>
</div>
<div id="game"><canvas id='can'></canvas><canvas id='spr'></canvas></div>
</div>