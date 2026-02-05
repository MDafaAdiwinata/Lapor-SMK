<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Laporan;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class LaporanController extends Controller
{
    public function index()
    {
        $laporans = Laporan::with(['user:id_user,nama_user', 'kategori:id_kategori,nama_kategori'])->get();
        $kategoris = Kategori::orderBy('nama_kategori', 'asc')->get();
        return Inertia::render('Admin/Laporans/Index', [
            'laporans' => $laporans,
            'kategoris' => $kategoris,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Laporans/Create', [
            'users' => User::select('id_user', 'nama_user')->orderBy('nama_user')->get(),
            'kategoris' => Kategori::select('id_kategori', 'nama_kategori')->orderBy('nama_kategori')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul_laporan' => 'required|string|alpha_num',
            'isi_laporan' => 'required|string|alpha_num',
            'tgl_laporan' => 'required|date',
            'id_kategori' => 'required|exists:kategori,id_kategori',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Default Nilai
        $validated['status'] = 'pending';
        $validated['id_user'] = Auth::id();

        // upload ke cloudinary
        if ($request->hasFile('image')) {

            $path = Storage::disk('cloudinary')->put(
                'laporans',
                $request->file('image')
            );

            $validated['image'] = $path;
            $validated['image_public_id'] = $path;
        }

        Laporan::create($validated);

        return redirect()
            ->route('admin.laporans.index')
            ->with('message', 'Laporan Berhasil ditambahkan! 🥳');
    }

    // Form Edit Data
    public function edit(Laporan $laporan)
    {
        return inertia('Admin/Laporans/Edit', [
            'laporan' => $laporan->load(['user', 'kategori']),
            'users' => User::all(),
            'kategoris' => Kategori::all(),
        ]);
    }

    public function update(Request $request, Laporan $laporan)
    {
        $validated = $request->validate([
            'judul_laporan' => 'required|string|max:255',
            'isi_laporan'   => 'required|string',
            'tgl_laporan'   => 'required|date',
            'status'        => 'required|in:pending,proses,selesai',
            'id_user' => 'required|exists:users,id_user',
            'id_kategori'   => 'required|exists:kategori,id_kategori',
            'image'         => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {

            // hapus gambar lama
            if ($laporan->image) {
                Storage::disk('cloudinary')->delete($laporan->image_public_id);
            }

            $path = Storage::disk('cloudinary')->put(
                'laporans',
                $request->file('image')
            );

            $validated['image'] = $path;
            $validated['image_public_id'] = $path;
        }

        // update ke database
        $laporan->update($validated);

        return redirect()
            ->route('admin.laporans.index')
            ->with('message', 'Laporan berhasil diperbarui ✨');
    }

    public function destroy(Laporan $laporan)
    {

        // Jika image ada, maka hapus
        if ($laporan->image) {
            if (Storage::disk('public')->exists($laporan->image)) {
                Storage::disk('public')->delete($laporan->image);
            }
        }

        $laporan->delete();
        return redirect()->route('admin.laporans.index')->with('message', 'Laporan berhasil dihapus! 🥳.');
    }
}
