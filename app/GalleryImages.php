<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GalleryImages extends Model
{
    protected $table = 'gallery_images';

    protected $fillable = ['gallery_id', 'image_id'];
}
