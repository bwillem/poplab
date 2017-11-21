<?php
get_header(); ?>
<div class="pop_clouds"></div>
<div class="pop_main no-scroll">
	
	
		<div class="content">
		<?php

			if ( have_posts() ) : while ( have_posts() ) : the_post();  
    			echo '<span class="pid hidden" data-pid="'.get_the_ID().'"></span>';
			 	the_content(); 
			endwhile; endif;
		?>
		</div>grrr!
	
</div>


<?php
get_footer();
?>