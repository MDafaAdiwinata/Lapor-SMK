<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Kategori;
use Illuminate\Http\Request;

class KategoriController extends Controller
{
    public function index()
    {
        $kategoris = Kategori::all();
        return Inertia::render('Admin/Kategoris/Index', [
            'kategoris' => $kategoris,
        ]);
    }
}
