$(window).load(function(){
	var $body      = $('body'),
		$menu      = $('.btn-menu'),
		$showTime  = $('.show-time'),
		$tourList  = $('.tour-list'),
		$albumList = $('.album-list'),
		$videoList = $('.video-list'),
		$btnMore   = $('.btn-more');

	$menu.on('click', function(){
		$(this).parent().toggleClass('is-active');
	});

	if ($body.hasClass('index')) {
		$.getJSON('/json/tour.json' , function(Ajax){
			indexItem(Ajax);
		});
	}

	if ($body.hasClass('tour')) {
		$.getJSON('/json/tour.json' , function(Ajax){
			tourItem(Ajax);
		});

		$btnMore.on('click', function(){
			$tourList.addClass('show-all');
		});
	}

	if ($body.hasClass('music')) {
		$.getJSON('/json/music.json' , function(Ajax){
			musicItem(Ajax);
		});
	}

	if ($body.hasClass('video')) {
		$.getJSON('/json/video.json' , function(Ajax){
			videoItem(Ajax);
		});
	}

	function indexItem(Ajax) {
		var _Str = '';
		
		for (var i = 0; i < 4; i++) {
			_Str += '<li class="list">';
			_Str += '	<span class="date">' + Ajax.response[i].date + '</span>';
			_Str += '	<span class="place">' + Ajax.response[i].place + '</span>';
			_Str += '	<span class="city">' + Ajax.response[i].city + '</span>';
			_Str += '</li>';
		}

		$showTime.append(_Str);
	}

	function tourItem(Ajax) {
		var _Str = '';
		
		$.each(Ajax.response, function (index, value) {
			var _date   = value.date,
				_place  = value.place,
				_city   = value.city,
				_link   = value.link,
				_status = value.status;

			_Str += '<li class="list ' + _status + '">';
			_Str += '	<span class="date">' + _date + '</span>';
			_Str += '	<span class="place">' + _place + '</span>';
			_Str += '	<span class="city">' + _city + '</span>';
			_Str += '	<a class="link" href="' + _link + '" target="_blank"></a>';
			_Str += '</li>';
		});

		$tourList.append(_Str);
	}

	function musicItem(Ajax) {
		var _Str = '';
		
		$.each(Ajax.response, function (index, value) {
			var _title     = value.title,
				_issue     = value.issue,
				_list      = value.list,
				_image     = value.image,
				_linkLtues = value.linkLtues,
				_linkBooks = value.linkBooks;

			_Str += '<li class="list">';
			_Str += 	'<h3 class="album-title">' + _title + '</h3>';
			_Str += 	'<span class="issue-date">' + _issue + '</span>';
			_Str += 	'<ol class="song-list">';

			for (var i = 0; i < _list.length; i++) {
				_Str += 		'<li class="list">' + _list[i] + '</li>';
			}

			_Str += 	'</ol>';
			_Str += 	'<figure class="img-wrap">';
			_Str += 		'<img src="img/music/' + _image + '" alt="' + _title + '">';
			_Str += 	'</figure>';

			if (_linkLtues !== '') {
				_Str += 	'<a class="shop-link itues" href="' + _linkLtues + '" target="_blank"></a>';
			}

			if (_linkBooks !== '') {
				_Str += 	'<a class="shop-link books" href="' + _linkBooks + '" target="_blank"></a>';
			}

			_Str += '</li>';
		});

		$albumList.append(_Str);
	}

	function videoItem(Ajax) {
		var _Str = '';
		
		$.each(Ajax.response, function (index, value) {
			var _id    = value.id,
				_title = value.title;

			_Str += '<li class="list">';
			_Str += '	<iframe class="video-frame" src="https://www.youtube.com/embed/' + _id + '?controls=0&showinfo=0" frameborder="0" allowfullscreen></iframe>';
			_Str += '	<h3 class="video-title">' + _title + '</h3>';
			_Str += '</li>';
		});

		$videoList.append(_Str);
	}
});