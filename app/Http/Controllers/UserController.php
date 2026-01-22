<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::lazy();
        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Create', []);
    }

    public function store(Request $request)
    {
        $request->validate(
            [
                'nama_user' => 'required|string|max:50',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:8',
            ],
            [
                'nama_user.max' => 'Nama maksimal 50 Karakter.',
                'email.unique' => 'Email sudah digunakan.',
                'password.min' => 'Password minimal 8 karakter.',
            ]
        );
        User::create([
            'nama_user' => $request->nama_user,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'user',
        ]);

        return redirect()->route('users.index')->with('message', 'User berhasil ditambahkan! 🥳');
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/Users/Edit', compact('user'));
    }

    public function update(Request $request, User $user)
    {
        // Validasi dengan custom message
        $request->validate([
            'nama_user' => 'required|string|max:100',
            'email'        => 'required|email|max:255',
            'password'     => 'nullable|string|min:8',
            'role'         => 'required|string',
        ], [
            // Custom error messages
            'nama_user.required' => 'Nama wajib diisi.',
            'nama_user.max'      => 'Nama tidak boleh lebih dari 100 karakter.',

            'email.required'        => 'Email wajib diisi.',
            'email.email'           => 'Format email tidak valid.',
            'email.max'             => 'Email tidak boleh lebih dari 255 karakter.',

            'role.required'         => 'Role wajib dipilih.',

            'password.min'          => 'Password minimal 8 karakter.',
        ]);

        // Update data
        $user->nama_user = $request->nama_user;
        $user->email        = $request->email;
        $user->role         = $request->role;

        // Jika password diisi baru → hashing
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return redirect()->route('users.index')->with('message', 'User berhasil di ubah! 🤩');
    }

    // Delete data
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index')->with('message', 'User berhasil dihapus! 🤩');
    }
}
