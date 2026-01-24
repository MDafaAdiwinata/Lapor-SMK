<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Laporan;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    public function user()
    {
        $userId = Auth::id();

        $laporanTerbaru = Laporan::with('kategori:id_kategori,nama_kategori')
            ->where('id_user', $userId)
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('User/Dashboard', [
            'laporanTerbaru' => $laporanTerbaru,
        ]);
    }
}
