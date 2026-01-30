<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $feedbacks = Feedback::lazy();
        return Inertia::render('Admin/Feedbacks/Index', compact('feedbacks'));
    }

    public function create()
    {
        return Inertia::render('Admin/Feedbacks/Create');
    }

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
            ->route('admin.feedbacks.index')
            ->with('message', 'Feedback Berhasil ditambahkan! 🥳');
    }

    public function edit(Feedback $feedback)
    {
        return Inertia::render('Admin/Feedbacks/Edit', compact('feedback'));
    }

    public function update(Request $request, Feedback $feedback)
    {
        $request->validate([
            'nama_depan' => 'required|string',
            'nama_belakang' => 'required|string',
            'email' => 'required|email',
            'subjek' => 'required|string|max:100',
            'isi_feedback' => 'required|string',
        ]);

        $feedback->update([
            'nama_depan' => $request->nama_depan,
            'nama_belakang' => $request->nama_belakang,
            'email' => $request->email,
            'subjek' => $request->subjek,
            'isi_feedback' => $request->isi_feedback,
        ]);

        return redirect()
            ->route('admin.feedbacks.index')
            ->with('message', 'Feedback Berhasil diperbarui! 🎉');
    }

    public function destroy(Feedback $feedback)
    {
        $feedback->delete();

        return redirect()
            ->route('admin.feedbacks.index')
            ->with('message', 'Feedback Berhasil dihapus! 🗑️');
    }
}
