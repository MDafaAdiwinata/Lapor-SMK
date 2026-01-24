<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Laporan;
use App\Models\Kategori;
use Illuminate\Http\Request;

class LaporanController extends Controller
{
    public function index()
    {
        $laporans = Laporan::with(['user:id_user,nama_user', 'kategori:id_kategori,nama_kategori'])->get();
        $kategoris = Kategori::orderBy('nama_kategori', 'asc')->get();
        return Inertia::render('Admin/Laporans/Index', [
            'laporans' => $laporans,
            'kategoris' => $kategoris,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Laporans/Create', [
            'users' => User::select('id_user', 'nama_user')->orderBy('nama_user')->get(),
            'kategoris' => Kategori::select('id_kategori', 'nama_kategori')->orderBy('nama_kategori')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul_laporan' => 'required|string',
            'isi_laporan' => 'required|string',
            'tgl_laporan' => 'required|date',
            'id_user' => 'required|exists:users,id_user',
            'id_kategori' => 'required|exists:kategori,id_kategori',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Upload image
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('laporans', 'public');
        }

        Laporan::create([
            'judul_laporan' => $request->judul_laporan,
            'isi_laporan' => $request->isi_laporan,
            'tgl_laporan' => $request->tgl_laporan,
            'id_user' => $request->id_user,
            'id_kategori' => $request->id_kategori,
            'image' => $imagePath,
        ]);

        return redirect()
            ->route('laporans.index')
            ->with('message', 'Laporan Berhasil ditambahkan! 🥳');
    }

    // Form Edit Data
    public function edit(Laporan $laporan)
    {
        return inertia('Admin/Laporans/Edit', [
            'laporan' => $laporan->load(['user', 'kategori']),
            'users' => User::all(),
            'kategoris' => Kategori::all(),
        ]);
    }
}
