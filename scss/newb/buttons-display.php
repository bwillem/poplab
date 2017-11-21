<div class="row">	
	<!-- <div class='plb_close'>x</div> -->
	<div class="edit-area col-md-8">
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
		<?php
			$basePath  = realpath(dirname(__FILE__));

			$files = array_slice(scandir($basePath), 2);
			
			////////// function parses the templates folder creating an organized menu for admin page 
			$builderHTML = '';
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
		</div>
	</div>
	<div class="display-area col-md-4">
		<h3>Template Preview</h3>
		<div class="display"></div>
	</div>
</div>
