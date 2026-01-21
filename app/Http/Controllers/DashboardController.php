<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Laporan;
use App\Models\Kategori;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function admin() {
        $totalKategori = Kategori::count();
        $totalLaporan = Laporan::count();
        return Inertia::render('Admin/Dashboard', [
            'totalKategori' => $totalKategori,
            'totalLaporan' => $totalLaporan,
        ]);
    }

    public function user() {
        return Inertia::render('User/Dashboard');
    }
}
