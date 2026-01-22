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
}
