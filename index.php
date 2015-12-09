<?php if ( is_front_page() ) {/*wp_redirect( get_permalink( 1 ));*/} ?>


<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="description" content="My Name Is Luis - Is all about me and my work" >
	<meta property="og:description" content="My Name Is Luis - Is all about me and my work" >
	<meta property="og:type" content="article" >
	<meta property="og:title" content="My Name Is Luis" >
	<meta property="og:url" content="<?php echo site_url() ?>" >
	<meta property="og:image" content="<?php echo site_url() ?>/wp-content/themes/mnslv3/images/share.png" >
	<meta property="og:site_name" content="My Name Is Luis" >
	<meta property="fb:app_id" content="1073930582657999">
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>

<div id="page" class="hfeed site">


	<div id="content" class="site-content">
		<div id="primary" class="content-area">
			<main id="main" class="site-main" role="main">

			</main><!-- #main -->
		</div><!-- #primary -->
	</div><!-- #content -->

</div><!-- #page -->

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-38333259-1', 'auto');
  ga('send', 'pageview');

</script>


<?php wp_footer(); ?>

</body>
</html>