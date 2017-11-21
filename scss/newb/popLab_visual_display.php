<?php
	$basePath  = '/home2/semaphor/public_html/poplab/wp-content/themes/poplab/popLabBuilder/templates';
	$files = array_slice(scandir($basePath), 2);
	
	////////// function parses the templates folder creating an organized menu for admin page 
	$builderHTML = '';
	foreach ($files as $file)  {
		if(strpos($file, '.tpl')){
			$link = preg_replace('/.tpl/', '', $file);
			$title = preg_replace('/-/', ' ', $link);
			$builderHTML .='<div class="plb_category"><h4>uncatagorized</h4><a class="pl_tpl btn btn-default" data-tpl="'.$link.'">'.$title.'</a></div>';
		}else{
			$title = preg_replace('/-/', ' ', $file);
			$builderHTML .= '<div class="plb_category '.$file.'"><h4>'.$title.'</h4>';
			$files2 = array_slice(scandir($basePath.'/'.$file), 2);
			foreach ($files2 as $file2)  {
				if(strpos($file2, '.tpl')){
					$link = preg_replace('/.tpl/', '', $file2);
					$title = preg_replace('/-/', ' ', $link);
					$builderHTML .='<a class="pl_tpl btn btn-default" data-tpl="'.$file.'/'.$link.'">'.$title.'</a>';
				}elseif (strpos($file2,'display.php')) {
					$link = preg_replace('/.php/', '', $file2);
					$title = preg_replace('/-/', ' ', $link);
					$builderHTML .= '<a class="pl_build btn btn-primary" data-category="'.$file.'" data-build="'.$file.'/'.$link.'">Build '.preg_replace('/display/','',$title).'</a>';
				}
			}
			$builderHTML .= '</div>';
		}
		
	}
	echo '<div class="plb_wrap">'.$builderHTML.'</div>';	

	?>