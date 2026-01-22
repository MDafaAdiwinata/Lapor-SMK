<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        // dd($users);
        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function create() {
        return Inertia::render('Admin/Users/Create', []);
    }
}
