<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Laporan;
use App\Models\Kategori;
use Illuminate\Http\Request;

class LaporanController extends Controller
{
    public function index() {
        $laporans = Laporan::with(['user:id_user,nama_user', 'kategori:id_kategori,nama_kategori'])->latest()->get();
        $kategoris = Kategori::orderBy('nama_kategori', 'asc')->get();
        return Inertia::render('Admin/Laporans/Index', [
            'laporans' => $laporans,
            'kategoris' => $kategoris,
        ]);
    }

    public function create() {
        return Inertia::render('Admin/Laporans/Create', [
            'users' => User::select('id_user', 'nama_user')->orderBy('nama_user')->get(),
            'kategoris' => Kategori::select('id_kategori', 'nama_kategori')->orderBy('nama_kategori')->get(),
        ]);
    }
}
