<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Kategori;
use Illuminate\Http\Request;

class KategoriController extends Controller
{
    public function index()
    {
        $kategoris = Kategori::all();
        return Inertia::render('Admin/Kategoris/Index', [
            'kategoris' => $kategoris,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Kategoris/Create', []);
    }

    public function store(Request $request)
    {
        $request->validate(
            [
                'nama_kategori' => 'required|string|max:50',
                'keterangan' => 'required|string',
            ],
        );
        Kategori::create([
            'nama_kategori' => $request->nama_kategori,
            'keterangan' => $request->keterangan,
        ]);

        return redirect()->route('kategoris.index')->with('message', 'Kategori Laporan berhasil ditambahkan! 🥳');
    }

    public function edit(Kategori $kategori)
    {
        return Inertia::render('Admin/Kategoris/Edit', compact('kategori'));
    }

    public function update(Request $request, Kategori $kategori)
    {
        // Validasi dengan custom message
        $request->validate([
            'nama_kategori' => 'required|string|max:50',
            'keterangan'        => 'required|string',
        ], [
            'nama_kategori.max'      => 'Nama Kategori tidak boleh lebih dari 50 karakter.',
        ]);

        // Update data
        $kategori->nama_kategori = $request->nama_kategori;
        $kategori->keterangan        = $request->keterangan;

        $kategori->save();

        return redirect()->route('kategoris.index')->with('message', 'Kategori Laporan berhasil di ubah! 🤩');
    }
}
