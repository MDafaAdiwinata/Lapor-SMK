<?php

namespace App\Models;

use App\Models\Laporan;
use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    protected $table = 'kategori';
    protected $primaryKey = 'id_kategori';
    protected $fillable = [
        'nama_kategori',
        'keterangan',
    ];

    // Relasi ke tabel laporan
    public function laporan()
    {
        return $this->hasMany(Laporan::class, 'id_kategori', 'id_kategori');
    }
}
