<?php

namespace App\Http\Controllers;

use App\Models\Kost;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KostController extends Controller
{
    /**
     * Display the public landing page with 3 kost units.
     */
    public function landing(): Response
    {
        $kosts = Kost::orderBy('code', 'asc')->get();

        return Inertia::render('welcome', [
            'kosts' => $kosts,
        ]);
    }

    /**
     * Display the admin panel for managing kost units.
     */
    public function adminIndex(): Response
    {
        $kosts = Kost::orderBy('code', 'asc')->get();

        return Inertia::render('admin/kosts/index', [
            'kosts' => $kosts,
        ]);
    }

    /**
     * Update kost tenant info and status.
     */
    public function update(Request $request, Kost $kost): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:available,occupied,maintenance',
            'tenant_name' => 'nullable|string|max:255',
            'tenant_phone' => 'nullable|string|max:50',
            'rent_type' => 'nullable|string|in:harian,mingguan,bulanan',
            'rent_start' => 'nullable|date',
            'rent_end' => 'nullable|date|after_or_equal:rent_start',
            'notes' => 'nullable|string|max:1000',
        ]);

        if ($validated['status'] === 'available') {
            $validated['tenant_name'] = null;
            $validated['tenant_phone'] = null;
            $validated['rent_type'] = null;
            $validated['rent_start'] = null;
            $validated['rent_end'] = null;
        }

        $kost->update($validated);

        return back()->with('success', 'Status sewa '.$kost->name.' berhasil diperbarui.');
    }
}
