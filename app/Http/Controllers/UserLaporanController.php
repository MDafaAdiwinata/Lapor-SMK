<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Laporan;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserLaporanController extends Controller
{
    public function create()
    {
        return Inertia::render('User/Laporans/Create', [
            'kategoris' => Kategori::select('id_kategori', 'nama_kategori')->orderBy('nama_kategori')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul_laporan' => 'required|string|max:255',
            'isi_laporan' => 'required|string',
            'tgl_laporan' => 'required|date',
            'id_kategori' => 'required|exists:kategori,id_kategori',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = $request->only([
            'judul_laporan',
            'isi_laporan',
            'tgl_laporan',
            'id_kategori',
        ]);

        // ambil user login
        $data['id_user'] = Auth::id();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('laporans', 'public');
        }

        Laporan::create($data);

        return redirect()
            ->route('laporans.create')
            ->with('message', 'Laporan berhasil dikirim! 🥳');
    }
}
