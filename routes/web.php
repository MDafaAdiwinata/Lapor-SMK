<?php

use Inertia\Inertia;
use App\Models\Kategori;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserFeedbackController;
use App\Http\Controllers\UserLaporanController;

Route::get('/', function () {
    return Inertia::render('Index');
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
});

Route::post('contact', [UserFeedbackController::class, 'store'])->name('contact.store');

Route::middleware('auth')->group(function () {
    // Route default dashboard (akan redirect sesuai role)
    Route::get('/dashboard', function () {
        $user = Auth::user();
        if ($user->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }
        return redirect()->route('user.dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// role->admin
Route::middleware(['auth', 'verified'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        Route::get('/dashboard', [DashboardController::class, 'admin'])
            ->name('dashboard');

        Route::resource('users', UserController::class);
        Route::resource('kategoris', KategoriController::class);
        Route::resource('laporans', LaporanController::class);
        Route::resource('feedbacks', FeedbackController::class);
    });


// role->user
Route::middleware(['auth', 'verified'])->prefix('user')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'user'])->name('user.dashboard');
    Route::get('/laporans/create', [UserLaporanController::class, 'create'])->name('laporans.create');
    Route::post('/laporans', [UserLaporanController::class, 'store'])->name('user.laporans.store');
    Route::get('/laporans/histori', [UserLaporanController::class, 'index'])->name('laporans.histori');
});

require __DIR__ . '/auth.php';
