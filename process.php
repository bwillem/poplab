<?php

function stripcleantohtml($s){//// on everything thats not text area
        return htmlentities(trim(strip_tags(stripslashes($s))), ENT_NOQUOTES, "UTF-8");
}
// process.php
    $whitelist = array('name','email','message','feedMe','popVal');
    foreach ($_POST as $key=>$item) {
        if (!in_array($key, $whitelist)) {
            writeLog('Unknown form fields');
            die("Hack-Attempt detected. No Funky fields Brah");           
        }
    }

    $errors         = array();    
    $data           = array(); 
    if (!empty($_POST['feedMe']))
        die("Hack-Attempt detected. That was scrum-didly-umcious");
    if (empty($_POST['name']))
        $errors['name'] = 'Name is required.';
    if (empty($_POST['email']))
        $errors['email'] = 'Email is required.';
    if (empty($_POST['message']))
        $errors['message'] = 'Message is required.';    
    if (($_POST['popVal']) == 'nv44a99d')
        $errors['popVal'] = 'Validation is required.';


    if (!empty($errors)) {
        $data['success'] = false;
        $data['errors']  = $errors;
    } else {
        $data['success'] = true;
        $data['message'] = 'Success!';
        $to      = 'kdevant@gmail.com';
        $subject = 'Poplab Contact';
        $message .= "Name: ".stripcleantohtml( $_POST['name'])."<br> \n";
        $message .= "Message: ".stripcleantohtml($_POST['message']). "\n";
        $headers = "From:<".$_POST['email']."> \r\n". 
               "MIME-Version: 1.0" . "\r\n" . 
               "Content-type: text/html; charset=UTF-8" . "\r\n"; 
        mail($to, $subject, $message, $headers);
       
    }
    echo json_encode($data);
?>