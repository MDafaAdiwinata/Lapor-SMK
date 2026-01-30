<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;

class UserFeedbackController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nama_depan' => 'required|string',
            'nama_belakang' => 'required|string',
            'email' => 'required|email',
            'subjek' => 'required|string|max:100',
            'isi_feedback' => 'required|string',
        ]);

        Feedback::create([
            'nama_depan' => $request->nama_depan,
            'nama_belakang' => $request->nama_belakang,
            'email' => $request->email,
            'subjek' => $request->subjek,
            'isi_feedback' => $request->isi_feedback,
        ]);

        return redirect()
            ->back()
            ->with('message', 'Feedback Berhasil dikirim! Terima kasih yaa 🥳');
    }
}
