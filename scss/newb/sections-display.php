<div class="row">	
	<!-- <div class='plb_close'>x</div> -->
	<div class="edit-area col-md-6">
		<h3>Template Builder</h3>
		<form class="plb_form" action="#">
			<div class="form-group">
				<label>Template Name</label><br>
				<input type="text" name="title" id="title">
			</div>
			<div class="form-group">
				<label>Template Content</label><br>
				<textarea name="content" id="content" class="plb_content"></textarea>
			</div>
			<input type="submit" name="submit">
		</form>
		<div class="row tpl-row">
		</div>
	</div>
	<div class="display-area col-md-6">
		<h3>Template Preview</h3>
		<div class="display fullPage"></div>
	</div>
	<div class="col-md-12">
		<?php
			$basePath  = realpath(dirname(__FILE__));

			$files = array_slice(scandir($basePath), 2);
			
			////////// function parses the templates folder creating an organized menu for admin page 
			$builderHTML = '<h4>Edit/Add Fullpage Layouts</h4>';
			foreach ($files as $file)  {
				if(strpos($file, '.tpl')){
					$link = preg_replace('/.tpl/', '', $file);
					$title = preg_replace('/-/', ' ', $link);
					$my_folder = preg_replace('/\/home2\/semaphor\/public_html\/poplab\/wp-content\/themes\/poplab\/popLabBuilder\/templates\//', '', $basePath);

					$builderHTML .= '<span class="pl_build_btn btn btn-default" data-title="'.$title.'" data-tpl="'.$my_folder.'/'.$link.'">'.$title.'<div class="hoverBox"><a rel="edit">edit</a><a rel="add">add</a><a rel="delete">delete</a></div></span>';
				}
			}
			echo $builderHTML;
		?>
		<?php
			$basePath  = '/home2/semaphor/public_html/poplab/wp-content/themes/poplab/popLabBuilder/templates';
			$files = array_slice(scandir($basePath), 2);
			
			////////// function parses the templates folder creating an organized menu for admin page 
			$builderHTML = '';
			foreach ($files as $file)  {
				if(strpos($file, '.tpl')){
					$link = preg_replace('/.tpl/', '', $file);
					$title = preg_replace('/-/', ' ', $link);
					$builderHTML .='<div class="plb_category plb_wrap"><h4>uncatagorized</h4><a class="pl_tpl btn btn-default" data-tpl="'.$link.'">'.$title.'</a></div>';
				}else{
					$title = preg_replace('/-/', ' ', $file);
					$builderHTML .= '<div class="plb_category col-md-4"><h4>'.$title.'</h4>';
					$files2 = array_slice(scandir($basePath.'/'.$file), 2);
					foreach ($files2 as $file2)  {
						if(strpos($file2, '.tpl')){
							$link = preg_replace('/.tpl/', '', $file2);
							$title = preg_replace('/-/', ' ', $link);
							$builderHTML .='<a class="pl_tpl btn btn-default" data-tpl="'.$file.'/'.$link.'">'.$title.'</a>';
						}
					}
					$builderHTML .= '</div>';
				}
				
			}
			echo '<h4>Add Template</h4><div class="row">'.$builderHTML.'</div>';	

			?>
	</div>
</div>
