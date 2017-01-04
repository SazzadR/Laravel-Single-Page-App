<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
        	'name' => 'Shuvo',
        	'email' => 'sazzad.rahman.bd@gmail.com',
        	'password' => bcrypt('123456'),
        	'created_at' => Carbon::now(),
        	'updated_at' => Carbon::now()
    	]);
    }
}
