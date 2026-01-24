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
            'stats' => [
                'total' => Laporan::count(),
                'pending' => Laporan::where('status', 'pending')->count(),
                'proses' => Laporan::where('status', 'proses')->count(),
                'selesai' => Laporan::where('status', 'selesai')->count(),
            ],
            'latestLaporans' => Laporan::with(['user', 'kategori'])
                ->orderByDesc('created_at')
                ->limit(5)
                ->get(),
        ]);
    }

    public function user()
    {
        $userId = Auth::id();

        $laporanQuery = Laporan::where('id_user', $userId);

        return Inertia::render('User/Dashboard', [
            'laporanTerbaru' => Laporan::with('kategori:id_kategori,nama_kategori')
                ->where('id_user', $userId)
                ->latest()
                ->limit(5)
                ->get(),

            'stats' => [
                'total' => $laporanQuery->count(),
                'pending' => (clone $laporanQuery)->where('status', 'pending')->count(),
                'proses' => (clone $laporanQuery)->where('status', 'proses')->count(),
                'selesai' => (clone $laporanQuery)->where('status', 'selesai')->count(),
            ],
        ]);
    }
}
