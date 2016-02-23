$(window).load(function(){
	$('.btn-menu').on('click', function(){
		$(this).parent().toggleClass('is-active');
	});
});