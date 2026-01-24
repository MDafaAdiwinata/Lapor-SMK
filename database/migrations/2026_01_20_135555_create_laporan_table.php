<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('laporan', function (Blueprint $table) {
            $table->id('id_laporan');
            $table->string('judul_laporan');
            $table->text('isi_laporan');
            $table->date('tgl_laporan');
            $table->string('image')->nullable();
            $table->enum('status', ['pending', 'proses', 'selesai'])->default('pending');
            $table->foreignId('id_user')->constrained('users', 'id_user')->onDelete('cascade');
            $table->foreignId('id_kategori')->constrained('kategori', 'id_kategori')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporan');
    }
};
