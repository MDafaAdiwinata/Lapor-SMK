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
        'status',
        'id_user',
        'id_kategori',
    ];

    public function user() {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    public function kategori()
    {
        return $this->belongsTo(Kategori::class, 'id_kategori', 'id_kategori');
    }
}