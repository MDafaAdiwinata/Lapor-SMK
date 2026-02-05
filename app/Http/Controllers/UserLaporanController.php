<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Laporan;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class UserLaporanController extends Controller
{
    public function index()
    {
        $laporans = Laporan::with(['user:id_user,nama_user', 'kategori:id_kategori,nama_kategori'])->where('id_user', Auth::id())->get();
        $kategoris = Kategori::orderBy('nama_kategori', 'asc')->get();
        return Inertia::render('User/Laporans/Histori', [
            'laporans' => $laporans,
            'kategoris' => $kategoris,
        ]);
    }

    public function create()
    {
        return Inertia::render('User/Laporans/Create', [
            'kategoris' => Kategori::select('id_kategori', 'nama_kategori')->orderBy('nama_kategori')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul_laporan' => 'required|string|max:255',
            'isi_laporan'   => 'required|string',
            'tgl_laporan'   => 'required|date',
            'id_kategori'   => 'required|exists:kategori,id_kategori',
            'image'         => 'nullable|image|max:2048',
        ]);

        // data wajib
        $validated['id_user'] = Auth::id();
        $validated['status'] = 'pending';

        // default null
        $validated['image'] = null;
        $validated['image_public_id'] = null;

        // upload ke cloudinary
        if ($request->hasFile('image')) {

            $path = Storage::disk('cloudinary')->put(
                'laporans',
                $request->file('image')
            );

            $validated['image'] = $path;
            $validated['image_public_id'] = $path;
        }

        Laporan::create($validated);

        return redirect()
            ->route('laporans.histori')
            ->with('message', 'Laporan berhasil dikirim! 🥳');
    }
}
