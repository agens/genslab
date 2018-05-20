<?php
/**
 * genslab homepage - terminal
 */

/**
 * open session
 */
session_start();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
	  
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Web-based terminal : Example</title>
  <link rel="stylesheet" type="text/css" href="terminal.css" />
  <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
  <style type="text/css">
body {
	margin: 0;
}
  </style>
</head>
<body>

<div id="terminal-container"></div>
<div id="foms-container">
  <form id="frm-redirect-new" action="#" target="_blank">
    <input type="hidden" value="" />
  </form>
</div>
<div id="impressum">
Dies ist die private Homepage von:<br/>
Andreas Gensmantel<br/>
Damm 62<br/>
25421 Pinneberg<br/>
gensmantel(at)genslab.de<br/>
</div>

<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="jquery.terminal.js"></script>

<script type="text/javascript">
$('#terminal-container').height($(document).height());
$('#terminal-container').terminal('server.php', {
  custom_prompt : "genslab.de&gt; ",
  hello_message : 'Bitte gehen Sie weiter! Hier gibt es nichts zu sehen!'
//  hello_message : Welcome! Type \'help\' for, well, help.'
});
</script>
</body>
</html>

