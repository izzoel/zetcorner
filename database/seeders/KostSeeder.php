<?php

namespace Database\Seeders;

use App\Models\Kost;
use Illuminate\Database\Seeder;

class KostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Kost::firstOrCreate(
            ['code' => 'K-01'],
            [
                'name' => 'Kost Rahayu 01',
                'status' => 'available',
                'daily_price' => 25000,
                'weekly_price' => 175000,
                'monthly_price' => 750000,
                'notes' => 'Kamar bersih, siap huni di lantai 1',
            ]
        );

        Kost::firstOrCreate(
            ['code' => 'K-02'],
            [
                'name' => 'Kost Rahayu 02',
                'status' => 'occupied',
                'tenant_name' => 'Budi Santoso',
                'tenant_phone' => '081234567890',
                'rent_type' => 'bulanan',
                'rent_start' => now()->startOfMonth()->toDateString(),
                'rent_end' => now()->endOfMonth()->toDateString(),
                'daily_price' => 25000,
                'weekly_price' => 175000,
                'monthly_price' => 750000,
                'notes' => 'Disewa bulanan',
            ]
        );

        Kost::firstOrCreate(
            ['code' => 'K-03'],
            [
                'name' => 'Kost Rahayu 03',
                'status' => 'available',
                'daily_price' => 25000,
                'weekly_price' => 175000,
                'monthly_price' => 750000,
                'notes' => 'Kamar sudut dengan pencahayaan maksimal',
            ]
        );
    }
}
