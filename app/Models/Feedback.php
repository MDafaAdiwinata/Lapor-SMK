<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $table = "feedback";
    protected $primaryKey = 'id_feedback';
    protected $fillable = [
        'nama_depan',
        'nama_belakang',
        'email',
        'subjek',
        'isi_feedback',
    ];
}
