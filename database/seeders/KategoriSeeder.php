<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class KategoriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('kategori')->insert([
            [
                'nama_kategori' => 'Kerusakan Fasilitas',
                'keterangan' => 'Laporan kerusakan fasilitas seperti gedung, jalan, atau sarana umum',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_kategori' => 'Gangguan Sistem',
                'keterangan' => 'Masalah pada sistem aplikasi, server, atau jaringan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_kategori' => 'Kehilangan Barang',
                'keterangan' => 'Laporan kehilangan barang milik pribadi atau inventaris',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_kategori' => 'Keamanan',
                'keterangan' => 'Laporan terkait keamanan lingkungan atau tindakan mencurigakan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_kategori' => 'Lain-lain',
                'keterangan' => 'Laporan di luar kategori yang telah ditentukan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
