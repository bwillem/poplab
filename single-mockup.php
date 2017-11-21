<?php
get_header(); ?>
	
		<div class="content">
		<?php

			if ( have_posts() ) : while ( have_posts() ) : the_post();  
    			echo '<span class="pid hidden" data-pid="'.get_the_ID().'"></span>';
    			?>
	    			<h1><?php the_title();?></h1>
    			<?php
			 	echo "<div class='mock-main'>".get_the_post_thumbnail( get_the_ID(), 'full')."";
			 	?>

				 	<div class="mockup-content">
				 		<?php the_content();?>

				 	</div>
			 	<?php

			endwhile; endif;
		?>
		<script type="text/javascript" src="<?php echo get_template_directory_uri();?>/js/mockup.js"></script>
		</div>


<?php
get_footer();
?>