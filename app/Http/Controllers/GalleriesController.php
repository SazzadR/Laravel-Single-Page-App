<?php

namespace App\Http\Controllers;

use Auth;
use DB;
use Storage;
use App\File;
use App\Gallery;
use App\GalleryImages;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Validator;

class GalleriesController extends Controller
{
	public function index()
	{
		$galleries = Gallery::with('user')
							->where('user_id', Auth::user()->id)
							->orderBy('created_at', 'desc')
							->get();

		return response($galleries, 200);
	}

    public function show($galleryID)
    {
        $gallery = Gallery::with('user')->find($galleryID);

        $images =
        DB::table('gallery_images')
            ->where('gallery_id', $galleryID)
            ->join('files', 'gallery_images.image_id', '=', 'files.id')
            ->get();

        $imageArray = [];
        foreach ($images as $key => $image) {
            $imageArray[$key] = [
                'thumbUrl' => asset("storage/gallery_{$galleryID}/thumb/" . $image->file_name),
                'url' => asset("storage/gallery_{$galleryID}/medium/" . $image->file_name),
                'main' => asset("storage/gallery_{$galleryID}/main/" . $image->file_name)
            ];
        }

        $gallery->images = $imageArray;

        return response($gallery, 200);
	}

	public function store(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'name' => 'required|min:3'
		]);

		if ($validator->fails()) {
			return response($validator->errors(), 422);
		}

		$gallery = Gallery::create([
			'name' => $request->input('name'),
			'user_id' => 1
		]);

		return response($gallery, 201);
	}

	public function uploadImage(Request $request)
	{
	    if (!$request->hasFile('file')) {
            return response('No file sent', 400);
        }

        if (!$request->file('file')->isValid()) {
            return response('File is not valid', 400);
        }

        $validator = Validator::make($request->all(), [
            'galleryID' => 'required|integer',
            'file' => 'required|mimes:jpeg,jpg,png|max:6000'
        ]);

	    if ($validator->fails()) {
            return response('There are errors in form', 400);
        }

        $storage = Storage::disk('public');
        $file = $request->file('file');
        $galleryId = $request->input('galleryID');
        $mimeType = $file->getClientMimeType();
        $fileType = $file->guessClientExtension();
        $fileName = uniqid() . '.' . $file->guessClientExtension();
        $image = Image::make($file);

        // Main image
        $imageMain = $image->encode();

        // Generate thumb
        $imageThumb = Image::make($file)->fit(320)->crop(320, 240, 0, 0);
        $imageThumb->encode();

        // Generate medium size
        $imageMedium = Image::make($file)->resize(800, null, function ($constrain) {
            $constrain->aspectRatio();
        });
        $imageMedium->encode();

        // Upload images
        $storage->put("gallery_{$galleryId}/main/" . $fileName, $imageMain, 'public');
        $storage->put("gallery_{$galleryId}/medium/" . $fileName, $imageMedium, 'public');
        $storage->put("gallery_{$galleryId}/thumb/" . $fileName, $imageThumb, 'public');

        // DB entry
        $file = File::create([
            'mime_type' => $mimeType,
            'file_type' => $fileType,
            'file_name' => $fileName,
            'file_path' => 'storage',
            'type' => 'local'
        ]);

        GalleryImages::create([
            'gallery_id' => $galleryId,
            'image_id' => $file->id
        ]);

        $fileImage = File::find($file->id);
        $fileImage->status = true;
        $fileImage->save();

        return [
            'thumbUrl' => asset("storage/gallery_{$galleryId}/thumb/" . $fileName),
            'url' => asset("storage/gallery_{$galleryId}/medium/" . $fileName),
            'main' => asset("storage/gallery_{$galleryId}/main/" . $fileName)
        ];
    }
}
