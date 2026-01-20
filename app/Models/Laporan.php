<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Laporan extends Model
{
    protected $table = 'laporan';
    protected $primaryKey = 'id_laporan';
    protected $fillable = [
        'judul_laporan',
        'isi_laporan',
        'tgl_laporan',
        'image',
        'id_user',
        'id_kategori',
    ];
}