<?php

use App\Models\Kost;
use App\Models\User;
use Database\Seeders\KostSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(KostSeeder::class);
});

test('landing page loads successfully with kosts data', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('welcome')
        ->has('kosts', 3)
    );
});

test('admin can view dashboard and update room status sewa', function () {
    $user = User::factory()->create();
    $kost = Kost::first();

    $this->actingAs($user);

    $response = $this->get('/dashboard');
    $response->assertStatus(200);

    $updateResponse = $this->put("/admin/kosts/{$kost->id}", [
        'status' => 'occupied',
        'tenant_name' => 'Ahmad Subandi',
        'tenant_phone' => '081299887766',
        'rent_type' => 'bulanan',
        'rent_start' => now()->toDateString(),
        'rent_end' => now()->addMonth()->toDateString(),
        'notes' => 'Sewa bulanan terverifikasi',
    ]);

    $updateResponse->assertRedirect();
    $this->assertDatabaseHas('kosts', [
        'id' => $kost->id,
        'status' => 'occupied',
        'tenant_name' => 'Ahmad Subandi',
    ]);
});
