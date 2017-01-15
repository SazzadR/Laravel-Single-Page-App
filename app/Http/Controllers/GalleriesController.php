<?php

namespace App\Http\Controllers;

use Auth;
use Storage;
use App\File;
use App\Gallery;
use App\GalleryImages;
use Illuminate\Http\Request;
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

        $galleryId = $request->input('galleryID');
        $mimeType = $request->file('file')->getClientMimeType();
        $fileType = $request->file('file')->guessClientExtension();
        $uploadedFileName = 'gallery_' . $galleryId . '_' . uniqid() . '.' . $request->file('file')->guessClientExtension();

        $storage = Storage::disk('public');
        if ($storage->put($uploadedFileName, file_get_contents(request()->file('file')), 'public')) {
            $file = File::create([
                'mime_type' => $mimeType,
                'file_type' => $fileType,
                'file_name' => $uploadedFileName,
                'file_path' => 'storage',
                'type' => 'local',
                'status' => true
            ]);

            GalleryImages::create([
                'gallery_id' => $galleryId,
                'image_id' => $file->id
            ]);

            return asset('storage/' . $file->file_name);
        }

        return response('File upload failed', 409);
    }
}
