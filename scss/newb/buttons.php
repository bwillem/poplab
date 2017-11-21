<?php 
	$errors         = array();    
    $data           = array(); 
	if($_POST['delete']){
		$filename =  preg_replace('/ /', '-', $_POST['title']);
		$filename = $filename.'.tpl';
		unlink($filename);
		$data['success'] = true; 
		$data['message'] = 'Success!';
	}else{
		if (empty($_POST['title']))
	        $errors['title'] = 'Title is required.';
	    if (empty($_POST['content']))
	        $errors['content'] = 'Content is required.';

	    if (!empty($errors)) {
	        $data['success'] = false;
	        $data['errors']  = $errors;

	    }else {
	        $data['success'] = true;
	        $data['message'] = 'Success!';
	        $filename =  preg_replace('/ /', '-', $_POST['title']);
	        $filename = $filename.'.tpl';
	        $content = stripslashes($_POST['content']);
	        $data['content'] = $content;
	        $template =  fopen($filename, 'w+');
	        fwrite($template, $content);
	        fclose($template);
	    }
	}
	
    
    echo json_encode($data);



?>