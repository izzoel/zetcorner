import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {
    Home,
    User,
    Phone,
    Calendar,
    Clock,
    CheckCircle2,
    XCircle,
    Wrench,
    Edit3,
    Sparkles,
    DollarSign,
    Save,
    X,
    Building2,
    Sun,
    Moon
} from 'lucide-react';
import { toast } from 'sonner';
import { useAppearance } from '@/hooks/use-appearance';

interface Kost {
    id: number;
    name: string;
    code: string;
    status: 'available' | 'occupied' | 'maintenance';
    tenant_name?: string | null;
    tenant_phone?: string | null;
    rent_type?: string | null;
    rent_start?: string | null;
    rent_end?: string | null;
    daily_price: number;
    weekly_price: number;
    monthly_price: number;
    notes?: string | null;
}

interface AdminIndexProps {
    kosts: Kost[];
}

export default function AdminKostsIndex({ kosts = [] }: AdminIndexProps) {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const [editingKost, setEditingKost] = useState<Kost | null>(null);

    const toggleTheme = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    // Inertia form hook for editing modal
    const { data, setData, put, processing, errors, reset } = useForm({
        status: 'available',
        tenant_name: '',
        tenant_phone: '',
        rent_type: 'bulanan',
        rent_start: '',
        rent_end: '',
        notes: '',
    });

    const openEditModal = (kost: Kost) => {
        setEditingKost(kost);
        setData({
            status: kost.status || 'available',
            tenant_name: kost.tenant_name || '',
            tenant_phone: kost.tenant_phone || '',
            rent_type: kost.rent_type || 'bulanan',
            rent_start: kost.rent_start ? kost.rent_start.split('T')[0] : '',
            rent_end: kost.rent_end ? kost.rent_end.split('T')[0] : '',
            notes: kost.notes || '',
        });
    };

    const handleQuickStatusChange = (kost: Kost, newStatus: 'available' | 'occupied' | 'maintenance') => {
        router.put(
            `/admin/kosts/${kost.id}`,
            {
                status: newStatus,
                tenant_name: newStatus === 'available' ? '' : kost.tenant_name || '',
                tenant_phone: newStatus === 'available' ? '' : kost.tenant_phone || '',
                rent_type: newStatus === 'available' ? '' : kost.rent_type || 'bulanan',
                rent_start: newStatus === 'available' ? '' : (kost.rent_start ? kost.rent_start.split('T')[0] : ''),
                rent_end: newStatus === 'available' ? '' : (kost.rent_end ? kost.rent_end.split('T')[0] : ''),
                notes: kost.notes || '',
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(`Status ${kost.name} berhasil diubah ke ${newStatus === 'available' ? 'Tersedia' : newStatus === 'occupied' ? 'Terisi' : 'Perbaikan'}`);
                },
            }
        );
    };

    const handleSubmitModal = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingKost) return;

        put(`/admin/kosts/${editingKost.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setEditingKost(null);
                toast.success(`Data ${editingKost.name} berhasil disimpan!`);
            },
        });
    };

    // Calculate metrics
    const totalUnits = kosts.length;
    const occupiedUnits = kosts.filter((k) => k.status === 'occupied').length;
    const availableUnits = kosts.filter((k) => k.status === 'available').length;
    const maintenanceUnits = kosts.filter((k) => k.status === 'maintenance').length;
    const totalEstMonthlyRevenue = occupiedUnits * 750000;

    const formatRupiah = (val: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(val);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard Admin', href: '#' },
                { title: 'Manajemen Status Sewa Kost', href: '#' },
            ]}
        >
            <Head title="Admin Panel - Status Sewa Kost Rahayu" />

            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 font-sans">
                {/* Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white shadow-xl">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                            <Sparkles className="w-3.5 h-3.5" />
                            Admin Panel Kost Rahayu
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                            Manajemen Nama & Status Sewa Kost
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-300">
                            Kelola ketersediaan 3 unit kamar, nama penyewa, kontak, dan tanggal sewa secara real-time.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 self-start sm:self-center">
                        <button
                            onClick={toggleTheme}
                            className="px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 flex items-center gap-2 transition-all shadow-sm"
                            title={resolvedAppearance === 'dark' ? 'Ganti ke Light Mode' : 'Ganti ke Dark Mode'}
                        >
                            {resolvedAppearance === 'dark' ? (
                                <>
                                    <Sun className="w-4 h-4 text-amber-400" />
                                    <span>Light Mode</span>
                                </>
                            ) : (
                                <>
                                    <Moon className="w-4 h-4 text-indigo-400" />
                                    <span>Dark Mode</span>
                                </>
                            )}
                        </button>

                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all"
                        >
                            <Building2 className="w-4 h-4" />
                            Pratinjau Landing Page
                        </a>
                    </div>
                </div>

                {/* Summary Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                            <Home className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Total Kost</span>
                            <span className="text-2xl font-black text-slate-900 dark:text-white">{totalUnits} Unit</span>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Tersedia</span>
                            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{availableUnits} Unit</span>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Status Terisi</span>
                            <span className="text-2xl font-black text-rose-600 dark:text-rose-400">{occupiedUnits} Unit</span>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Est. Pendapatan</span>
                            <span className="text-lg font-black text-slate-900 dark:text-white">{formatRupiah(totalEstMonthlyRevenue)}</span>
                        </div>
                    </div>
                </div>

                {/* Main Table / Room Cards List */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                Daftar 3 Unit Kost Rahayu (Zet Corner)
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Klik tombol edit untuk memperbarui status sewa, nama penyewa, no HP, atau masa sewa.
                            </p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                                    <th className="py-4 px-6">Nama Kost / Kode</th>
                                    <th className="py-4 px-6">Status Sewa</th>
                                    <th className="py-4 px-6">Nama Penyewa</th>
                                    <th className="py-4 px-6">Kontak / Tipe Sewa</th>
                                    <th className="py-4 px-6">Periode Sewa</th>
                                    <th className="py-4 px-6 text-right">Aksi Manajemen</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                                {kosts.map((kost) => {
                                    const isAvailable = kost.status === 'available';
                                    const isOccupied = kost.status === 'occupied';

                                    return (
                                        <tr key={kost.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                                            {/* Nama & Kode */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                                        {kost.code}
                                                    </div>
                                                    <div>
                                                        <span className="font-bold text-slate-900 dark:text-white block">
                                                            {kost.name}
                                                        </span>
                                                        <span className="text-xs text-slate-400">
                                                            Rp 750k / bln • Rp 25k / hr
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Status Sewa */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    {isAvailable ? (
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                                                            <CheckCircle2 className="w-3.5 h-3.5" /> Tersedia
                                                        </span>
                                                    ) : isOccupied ? (
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                                                            <XCircle className="w-3.5 h-3.5" /> Terisi / Disewa
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                                                            <Wrench className="w-3.5 h-3.5" /> Perbaikan
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Nama Penyewa */}
                                            <td className="py-4 px-6">
                                                {isOccupied && kost.tenant_name ? (
                                                    <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                                                        <User className="w-4 h-4 text-slate-400" />
                                                        {kost.tenant_name}
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-slate-400 italic">Belum Ada (Kosong)</span>
                                                )}
                                            </td>

                                            {/* Kontak & Tipe Sewa */}
                                            <td className="py-4 px-6">
                                                {isOccupied ? (
                                                    <div className="space-y-1">
                                                        {kost.tenant_phone ? (
                                                            <a
                                                                href={`https://wa.me/${kost.tenant_phone.replace(/\D/g, '')}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                                                            >
                                                                <Phone className="w-3.5 h-3.5" /> {kost.tenant_phone}
                                                            </a>
                                                        ) : (
                                                            <span className="text-xs text-slate-400">No telp -</span>
                                                        )}
                                                        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">
                                                            {kost.rent_type || 'Bulanan'}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-slate-400">-</span>
                                                )}
                                            </td>

                                            {/* Periode Sewa */}
                                            <td className="py-4 px-6">
                                                {isOccupied && (kost.rent_start || kost.rent_end) ? (
                                                    <div className="text-xs space-y-0.5 font-medium">
                                                        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                                                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                            Mulai: {kost.rent_start ? String(kost.rent_start).split('T')[0] : '-'}
                                                        </div>
                                                        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                                                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                            Selesai: {kost.rent_end ? String(kost.rent_end).split('T')[0] : '-'}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-slate-400">-</span>
                                                )}
                                            </td>

                                            {/* Aksi */}
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {isOccupied ? (
                                                        <button
                                                            onClick={() => handleQuickStatusChange(kost, 'available')}
                                                            className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
                                                            title="Setel Ketersediaan Kosong"
                                                        >
                                                            Set Kosong
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleQuickStatusChange(kost, 'occupied')}
                                                            className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 transition-colors"
                                                            title="Setel Terisi"
                                                        >
                                                            Set Terisi
                                                        </button>
                                                    )}

                                                    <button
                                                        onClick={() => openEditModal(kost)}
                                                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 flex items-center gap-1.5 shadow-sm transition-all"
                                                    >
                                                        <Edit3 className="w-3.5 h-3.5" /> Edit Status
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal Form Edit Status & Nama Penyewa */}
                {editingKost && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl relative">
                            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                                        {editingKost.code}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                            Edit {editingKost.name}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            Perbarui status sewa & detail penyewa
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setEditingKost(null)}
                                    className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmitModal} className="p-6 space-y-4">
                                {/* Status Sewa */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                                        Status Sewa Kamar *
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value as any)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option value="available">Tersedia (Kosong & Siap Huni)</option>
                                        <option value="occupied">Terisi (Disewa Penyewa)</option>
                                        <option value="maintenance">Perbaikan / Maintenance</option>
                                    </select>
                                </div>

                                {data.status === 'occupied' && (
                                    <>
                                        {/* Nama Penyewa */}
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                                                Nama Penyewa *
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Contoh: Budi Santoso"
                                                value={data.tenant_name}
                                                onChange={(e) => setData('tenant_name', e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-emerald-500"
                                            />
                                        </div>

                                        {/* No HP / WA Penyewa & Tipe Sewa */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                                                    No. WhatsApp
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="081234567890"
                                                    value={data.tenant_phone}
                                                    onChange={(e) => setData('tenant_phone', e.target.value)}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-emerald-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                                                    Tipe Sewa
                                                </label>
                                                <select
                                                    value={data.rent_type}
                                                    onChange={(e) => setData('rent_type', e.target.value)}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-emerald-500"
                                                >
                                                    <option value="bulanan">Bulanan (Rp 750k)</option>
                                                    <option value="mingguan">Mingguan (Rp 175k)</option>
                                                    <option value="harian">Harian (Rp 25k)</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Tanggal Sewa */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                                                    Tanggal Mulai
                                                </label>
                                                <input
                                                    type="date"
                                                    value={data.rent_start}
                                                    onChange={(e) => setData('rent_start', e.target.value)}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-emerald-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                                                    Tanggal Selesai
                                                </label>
                                                <input
                                                    type="date"
                                                    value={data.rent_end}
                                                    onChange={(e) => setData('rent_end', e.target.value)}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-emerald-500"
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Notes */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                                        Catatan / Notes
                                    </label>
                                    <textarea
                                        rows={2}
                                        placeholder="Catatan tambahan kamar atau penyewa..."
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>

                                <div className="pt-4 flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setEditingKost(null)}
                                        className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 shadow-lg shadow-emerald-600/20 disabled:opacity-50 transition-all"
                                    >
                                        <Save className="w-4 h-4" />
                                        Simpan Perubahan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
