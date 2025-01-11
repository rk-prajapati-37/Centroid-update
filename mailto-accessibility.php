<?php

session_start();

ini_set("display_errors",FALSE);

$var =  rtrim(dirname(str_replace(array('"', '<', '>', "'",'blog'), '', $_SERVER["PHP_SELF"])), '/\\');

$siteurl = 'http://'.$_SERVER['HTTP_HOST'].$var.'/';

define('SITE_PATH',$siteurl);

include dirname(__FILE__).DIRECTORY_SEPARATOR.'phpmailer'.DIRECTORY_SEPARATOR."smtp.php";
if(isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response']))
{
$secret = "6Lfn5CYgAAAAAF7n_BwAbiNhmJBoCZjVXb6B9qoV";

//

$ch = curl_init();

curl_setopt_array($ch, [

    CURLOPT_URL => 'https://www.google.com/recaptcha/api/siteverify',

    CURLOPT_POST => true,

    CURLOPT_POSTFIELDS => ['secret' => $secret, 'response' => $_POST['g-recaptcha-response'], 'remoteip' => $_SERVER['REMOTE_ADDR']

    ],

    CURLOPT_RETURNTRANSFER => true

]);

$output = curl_exec($ch);

curl_close($ch);

$responseData = json_decode($output);

//

if((!empty($_POST['frmname'])) && ($responseData->success)) 

{ 

$frmname	=	$_POST['frmname'];

// $frmemail	=	$_POST['frmemail'];

$frmmobile	=	$_POST['frmmobile'];

$frmcourse	=	$_POST['frmcourse'];

//$frmsubject	=	$_POST['frmsubject'];

$frmcomment	=	$_POST['frmcomment'];

$frmcheck	=	$_POST['frmcheck']?'Yes':'No';
				

						$tmp_sub  = "Centroid  - Online Website Enquiry";

						$submsg = '';

						$message ="<table border='0' cellspacing='0' cellpadding='0' width='80%'>".

		   "<tr><td colspan='2'><font face='Verdana' size='3' color='black'><b><div align='center'>Centroid - Online Website Enquiry</div></b></font></td></tr>".

	   	   "<tr><td colspan='2'><font face='Verdana' size='3' color='black'><b>&nbsp;</b></font></td></tr>".

	   	   "<tr><td width='33%'><font face='Verdana' size='2' color='#3A4368'><b>"."<font face='Verdana' size='2' color='#000000'>"."<b>"."</b></font>User Name</b></font><font face='Verdana' size='2' color='#000000'><b>"."</b>"."</font>"."</td><td width='67%'><font face='Verdana' size='2' color='#0556BF'>"."$frmname"."</font></td></tr>".

	   	  "<tr><td width='33%'><font face='Verdana' size='2' color='#3A4368'><b>"."<font face='Verdana' size='2' color='#000000'>"."<b>"."</b></font>Course</b></font><font face='Verdana' size='2' color='#000000'><b>"."</b>"."</font>"."</td><td width='67%'><font face='Verdana' size='2' color='#0556BF'>"."$frmcourse"."</font></td></tr>".

		  "<tr><td width='33%'><font face='Verdana' size='2' color='#3A4368'><b>"."<font face='Verdana' size='2' color='#000000'>"."<b>"."</b></font>Mobile No</b></font><font face='Verdana' size='2' color='#000000'><b>"."</b>"."</font>"."</td><td width='67%'><font face='Verdana' size='2' color='#0556BF'>"."$frmmobile"."</font></td></tr>".

		  //"<tr><td width='33%'><font face='Verdana' size='2' color='#3A4368'><b>"."<font face='Verdana' size='2' color='#000000'>"."<b>"."</b></font>Subject</b></font><font face='Verdana' size='2' color='#000000'><b>"."</b>"."</font>"."</td><td width='67%'><font face='Verdana' size='2' color='#0556BF'>"."$frmsubject"."</font></td></tr>".

	   	   "<tr><td width='33%'><font face='Verdana' size='2' color='#3A4368'><b>"."<font face='Verdana' size='2' color='#000000'>"."<b>"."</b></font>Your Comments</b></font><font face='Verdana' size='2' color='#000000'><b>"."</b>"."</font>"."</td><td width='67%'><font face='Verdana' size='2' color='#0556BF'>"."$frmcomment"."</font></td></tr>".

		   "<tr><td width='33%'><font face='Verdana' size='2' color='#3A4368'><b>"."<font face='Verdana' size='2' color='#000000'>"."<b>"."</b></font>If you do not wish to receive further emails from us, please check the box, and you will be removed from our mailing.</b></font><font face='Verdana' size='2' color='#000000'><b>"."</b>"."</font>"."</td><td width='67%'><font face='Verdana' size='2' color='#0556BF'>"."$frmcheck"."</font></td></tr>".

			"</table>".			

		  "<br>";



	 

		$tmp_arr_to  	= array("centroidthane@gmail.com");
		$tmp_cc_array 	= array("arekars@gmail.com", "chandan.105101@gmail.com");

		

		$tmp_arr_file 	= array();

		$adminemail 	= 'centroidthane@gmail.com';

		$adminname  	= 'Admin Centroid';

		

		$tmp_str_ret = sendmsg_function($tmp_arr_to, $tmp_sub, $message, $adminemail,$adminname,$tmp_cc_array,$tmp_arr_file); //function to send mail

		

				if(count($tmp_arr_file) > 0)

		{

			foreach($tmp_arr_file as $tmpfile)

			{

				unlink($tmpfile);

			}

		}

		

		header("Location:index.html");

				

	}

}



else{ header("Location:error-captcha.html");}

exit;

?>