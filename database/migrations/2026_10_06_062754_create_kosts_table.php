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
        Schema::create('kosts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->enum('status', ['available', 'occupied', 'maintenance'])->default('available');
            $table->string('tenant_name')->nullable();
            $table->string('tenant_phone')->nullable();
            $table->string('rent_type')->nullable(); // harian, mingguan, bulanan
            $table->date('rent_start')->nullable();
            $table->date('rent_end')->nullable();
            $table->integer('daily_price')->default(25000);
            $table->integer('weekly_price')->default(175000);
            $table->integer('monthly_price')->default(750000);
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kosts');
    }
};
