<?php if ( is_front_page() ) {/*wp_redirect( get_permalink( 1 ));*/} ?>


<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
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
  // get Form var url ="http://wpapi.dev/gravityformsapi/forms/1?_gf_json_nonce=2313c35de9"
  // post var url ='http://wpapi.dev/gravityformsapi/forms/1/submissions';// apiVars['root_url'] + 'forms/' + apiVars['form_id'] +  '/submissions';

  $ = jQuery;

  $('#submit_button').click(function () {
    var url ="http://wpapi.dev/gravityformsapi/forms/1?_gf_json_nonce=2313c35de9"
    var url ='http://wpapi.dev/gravityformsapi/forms/1/submissions';// apiVars['root_url'] + 'forms/' + apiVars['form_id'] +  '/submissions';
    submitForm( url );
});

function submitForm(url){

  var inputValues = {
      input_1: $('#input_1').val(),
      input_4: $('#input_4').val(),
      input_3: $('#input_3').val()
  };

  var data = {
      input_values: inputValues
  };

  $.ajax({
      url: url,
      type: 'POST',
      data: JSON.stringify(data),
      beforeSend: function (xhr, opts) {
          //$sending.show();
      }
  })
  .done(function (data, textStatus, xhr) {
      //$sending.hide();
      var response = JSON.stringify(data.response, null, '\t');
      //$results.val(response);
      console.log(response);
  })
}
</script>

<?php wp_footer(); ?>

</body>
</html>