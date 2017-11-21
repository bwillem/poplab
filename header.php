<head>
	<?php wp_head();?>
	<!-- <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, maximum-scale=4.0, user-scalable=yes"> -->
	<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
	<link href='https://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
	<link href='https://fonts.googleapis.com/css?family=Libre+Baskerville:400,700,400italic' rel='stylesheet' type='text/css'>
</head>
<body  <?php body_class(); ?>>

	<header>
		<div class="header-wrap">
			<a class="page-link header-logo" href="/" data-id="6">DevantiDigital</a>
			<a class="menu-btn" href="#">
				<span id="line-1" class="btn-line"></span>
				<span id="line-2" class="btn-line"></span>
				<span id="line-3" class="btn-line"></span>
			</a>
		</div>
			<nav class="pop_menu">
				<div class="menu_wrap">
					<?php wp_nav_menu(); ?>
					<a class="btn btn-contact outline">Contact</a>

					<div class="menu-contact">
						<a href="tel:2505505115">+250.550-5115</a>
						<a href="#" data-mailto="team@poplab.io">team <i class="fa fa-at"></i> devantidigital.com</a>
					</div>
				</div>
					<div class="contact-box">
						<form action="/wp-content/themes/process.php"  method="post">
							<div class="form-group">
								<input type="text" name="name" id="name" placeholder="Name">
							</div>
							<div class="form-group">
								<input type="email" name="email" id="email" placeholder="Email">
							</div>
							<input class="feedMe" name="feedMe">
							<div class="form-group">
								<textarea name="message" id="message" placeholder="Message"></textarea>
							</div>
							<button type="submit" id="submit" class="btn">Submit</button>
						</form>
					</div>
			</nav>
	</header>
