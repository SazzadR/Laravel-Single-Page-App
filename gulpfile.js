const elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(mix => {
	mix.sass([
        'app.scss'
    ], 'public/css');

    mix.scripts([
    	'app.js'
	], 'public/js/app.js');

	mix.scripts([
		'models/usersModel.js'
	], 'public/js/models.js');

	mix.scripts([
		'controllers/globalController.js',
		'controllers/usersController.js',
		'controllers/navController.js',
	], 'public/js/controllers.js');
});
