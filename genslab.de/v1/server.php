<?php
/**
 * open session
 */
session_start();

/**
 * check pending commands
 */
if (!empty($_POST['input'])) {
  $input = $_POST['input'];
  if (isset($_SESSION['terminal']['command'])) {
    $command = $_SESSION['terminal']['command'];
    if ($input == 'quit') {
      $command = $input;
      $statement = '';
    }
    else {
      $statement = $input;
    }
  }
  else {
    $command = $input;
    $statement = '';
    $_SESSION['terminal']['history'][] = $command;
  }
}

/**
 * handle commands
 */
//if (!empty($_POST['input'])) {
if ($command) {

	switch($command) {
//		case 'numbers':
//			print join("\n",array(1,2,3,4,5,6,7,8,9,10));
//			break;
//		case 'sleep':
//			print "sleeping...\n";
//			sleep(2);
//			print "slept!";
//			break;
		case 'error':
			header('HTTP/1.0 Internal Server Error');
			print 'AAAAAAAAAHHHHHHHHHH!!! That hurt!!!';
			break;
			
		case 'help':
		case 'hilfe':
			print <<<HELP
Known commands:
&gt;&nbsp; help (hilfe)  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  - this help
&gt;&nbsp; impressum (imprint) - show imprint informations
HELP;
			break;
			
    case 'test':
      if ($statement) {
        print 'you have entered ' . $statement;
        unset($_SESSION['terminal']['command']);
      }
      else {
        $_SESSION['terminal']['command'] = 'test';
        print 'please enter your statement:';
//        print <<<ARRAY
//[array]
//erster wert
//zweiter wert
//ARRAY;
      }
      break;

    case 'goto' == substr($command, 0, 4):
    case 'download' == substr($command, 0, 8):
    case 'shack7':
    case 'phpinfo':
    case 'blog':
      if ('goto' == substr($command, 0, 4)) {
        $dest_action = 'goto';
        $dest_name = trim(substr($command, 5));
      }
      elseif ('download' == substr($command, 0, 8)) {
        $dest_action = 'download';
        $dest_name = trim(substr($command, 9));
      }
      else {
        $dest_action = 'goto';
        $dest_name = trim($command);
      }
      $dest_array = destinations();

      if (!$dest_array[$dest_name]) {
        print "Sorry, destination unknown.";
        break;
      }

      if ($dest_array[$dest_name]['pass']) {
        if ($statement) {
          if ($statement == $dest_array[$dest_name]['pass']) {
            print '[destination]'."\n";
            print $dest_action . ' ' . $dest_array[$dest_name]['url']."\n";
            print $dest_array[$dest_name]['url']."\n";
            unset($_SESSION['terminal']['command']);
          }
          else {
            print 'Sorry, wrong password.'."\n";
            print 'Please enter your password:';
          }
        }
        else {
          $_SESSION['terminal']['command'] = $command;
          print 'Please enter your password:';
          break;
        }
      }
      else {
        print '[destination]'."\n";
        print $dest_action . ' ' . $dest_array[$dest_name]['url']."\n";
        print $dest_array[$dest_name]['url']."\n";
      }
      break;
      
    case 'imprint':
    case 'impressum':
      print <<<IMP
Dies ist die private Homepage von:
&gt;&nbsp; Andreas Gensmantel
&gt;&nbsp; Damm 62
&gt;&nbsp; 25421 Pinneberg
&gt;&nbsp; gensmantel@genslab.de
IMP;
      break;

    case 'history':
      print_r($_SESSION['terminal']['history']);
      break;

    case 'reset':
      unset($_SESSION['terminal']['history']);
      unset($_SESSION['terminal']['command']);
      print 'history cleared';
      break;

    case 'quit':
      unset($_SESSION['terminal']['command']);
      break;
      
//		case 'reverse':
//		default:
//			print strrev($_POST['input']);
	}
}
else {
	print 'I need some input';
}
//print "\n";

/**
 * destinations array
 */
function destinations() {
  return array(
    'blog' => array(
      'url' => 'http://genslab.drupalgardens.com/',
    ),
    'shack7' => array(
      'url' => 'http://www.shack7.de',
    ),
    'phpinfo' => array(
      'url' => 'phpinfo.php',
    ),

    /* downloads */
    'fotos tine' => array(
      'url' => 'http://downloads.genslab.de/20110404_hattersheim.zip',
      'pass' => 'wyoming',
    ),
    'fotos schmidtti' => array(
      'url' => 'http://downloads.genslab.de/20110404_schmidtti.zip',
      'pass' => 'kangaroo',
    ),
  );
}
?>
