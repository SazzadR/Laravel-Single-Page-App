<!DOCTYPE html>
<html ng-app="myApp">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Gallery Application in Laravel and AngularJS</title>
	<link rel="stylesheet" type="text/css" href="{{ asset('bower_components/bootstrap/dist/css/bootstrap.min.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ asset('bower_components/dropzone/dist/min/dropzone.min.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ asset('bower_components/angular-bootstrap/ui-bootstrap-csp.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ asset('bower_components/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ asset('bower_components/dropzone/dist/min/basic.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('bower_components/angular-loading-bar/build/loading-bar.css') }}">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
	<script type="text/javascript">
		var baseUrl = "{{ url('/') }}/";
		var csrfToken = "{{ csrf_token() }}";
	</script>
</head>
<body>

	<div ng-controller="globalController">
		<div ng-view></div>
	</div>

	<script src="{{ asset('bower_components/jquery/dist/jquery.min.js') }}" type="text/javascript"></script>
	<script src="{{ asset('bower_components/bootstrap/dist/js/bootstrap.min.js') }}" type="text/javascript"></script>
	<script src="{{ asset('bower_components/angular/angular.min.js') }}" type="text/javascript"></script>
	<script src="{{ asset('bower_components/angular-route/angular-route.min.js') }}" type="text/javascript"></script>
	<script src="{{ asset('bower_components/angular-cookies/angular-cookies.min.js') }}" type="text/javascript"></script>
	<script src="{{ asset('bower_components/dropzone/dist/min/dropzone.min.js') }}" type="text/javascript"></script>
    <script src="{{ asset('bower_components/angular-bootstrap/ui-bootstrap.js') }}" type="text/javascript"></script>
    <script src="{{ asset('bower_components/angular-bootstrap/ui-bootstrap-tpls.js') }}" type="text/javascript"></script>
	<script src="{{ asset('bower_components/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.js') }}" type="text/javascript"></script>
    <script src="{{ asset('bower_components/angular-loading-bar/build/loading-bar.js') }}" type="text/javascript"></script>
	<script src="{{ asset('js/app.js') }}" type="text/javascript"></script>
	<script src="{{ asset('js/models.js') }}" type="text/javascript"></script>
	<script src="{{ asset('js/controllers.js') }}" type="text/javascript"></script>
</body>
</html>