<?php

use App\Http\Controllers\KostController;
use Illuminate\Support\Facades\Route;

Route::get('/', [KostController::class, 'landing'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [KostController::class, 'adminIndex'])->name('dashboard');
    Route::put('/admin/kosts/{kost}', [KostController::class, 'update'])->name('admin.kosts.update');
});

require __DIR__.'/settings.php';
