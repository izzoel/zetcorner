import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Wifi,
    Droplets,
    Zap,
    Bed,
    Bath,
    ShieldCheck,
    MapPin,
    Phone,
    CheckCircle2,
    Clock,
    Sparkles,
    Calendar,
    ArrowRight,
    LogIn,
    LayoutDashboard,
    X,
    ExternalLink,
    ChevronRight,
    Check,
    Sun,
    Moon
} from 'lucide-react';
import { dashboard, login } from '@/routes';
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

interface WelcomeProps {
    kosts: Kost[];
}

const MAPS_URL = "https://share.google/DEfmqT5pQKgXtXQqR";
const WHATSAPP_NUMBER = "6281234567890";

const ROOM_IMAGES: Record<string, string> = {
    'K-01': '/images/room1.jpg',
    'K-02': '/images/room2.jpg',
    'K-03': '/images/room3.jpg',
};

const FACILITIES = [
    {
        icon: Wifi,
        title: 'WIFI 24 Jam',
        desc: 'Akses internet cepat & stabil untuk kebutuhan kerja, belajar, dan hiburan.',
        badge: 'High Speed',
        color: 'from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/50',
    },
    {
        icon: Droplets,
        title: 'Air PDAM',
        desc: 'Pasokan air jernih, bersih, dan lancar 24 jam nonstop untuk setiap kamar.',
        badge: 'Bersih & Jernih',
        color: 'from-sky-500/10 to-cyan-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-900/50',
    },
    {
        icon: Zap,
        title: 'Listrik Token',
        desc: 'Setiap kamar dilengkapi meteran token listrik sendiri, lebih hemat & mandiri.',
        badge: 'Meteran Sendiri',
        color: 'from-amber-500/10 to-yellow-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50',
    },
    {
        icon: Bed,
        title: 'Tempat Tidur',
        desc: 'Kasur springbed berkualitas, nyaman lengkap dengan bantal & siap ditempati.',
        badge: 'Siap Huni',
        color: 'from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50',
    },
    {
        icon: Bath,
        title: 'Kamar Mandi Dalam',
        desc: 'Privasi maksimal dengan kamar mandi pribadi bersih di dalam masing-masing kamar.',
        badge: 'Private En-Suite',
        color: 'from-purple-500/10 to-violet-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/50',
    },
    {
        icon: ShieldCheck,
        title: 'Keamanan CCTV',
        desc: 'Lingkungan terpantau kamera CCTV 24/7 untuk rasa aman dan ketenangan Anda.',
        badge: 'Security 24/7',
        color: 'from-rose-500/10 to-pink-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50',
    },
];

export default function Welcome({ kosts = [] }: WelcomeProps) {
    const { auth } = usePage<{ auth: { user: any } }>().props;
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const [selectedKost, setSelectedKost] = useState<Kost | null>(null);

    const toggleTheme = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    const availableCount = kosts.filter((k) => k.status === 'available').length;

    const formatRupiah = (val: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(val);
    };

    const getWhatsappLink = (kostName?: string, rentType: string = 'Bulanan') => {
        const message = kostName
            ? `Halo Admin Kost Rahayu (Zet Corner Rental), saya ingin menanyakan ketersediaan ${kostName} untuk sewa ${rentType}.`
            : `Halo Admin Kost Rahayu (Zet Corner Rental), saya berminat sewa kamar kost. Boleh info detailnya?`;
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
            <Head title="Kost Rahayu (Zet Corner Rental) - Hunian Nyaman & Strategis" />

            {/* Top Navigation */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                                Kost Rahayu
                                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-semibold">
                                    Zet Corner
                                </span>
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
                                Rental Modern & Nyaman
                            </span>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
                        <a href="#kamar" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                            Unit Kamar
                        </a>
                        <a href="#fasilitas" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                            Fasilitas
                        </a>
                        <a href="#harga" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                            Tarif Sewa
                        </a>
                        <a href="#lokasi" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                            Lokasi Maps
                        </a>
                    </nav>

                    <div className="flex items-center gap-3">
                        {/* Dark / Light Mode Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2 text-xs font-semibold"
                            title={resolvedAppearance === 'dark' ? 'Ganti ke Light Mode' : 'Ganti ke Dark Mode'}
                        >
                            {resolvedAppearance === 'dark' ? (
                                <>
                                    <Sun className="w-4 h-4 text-amber-400" />
                                    <span className="hidden sm:inline">Light Mode</span>
                                </>
                            ) : (
                                <>
                                    <Moon className="w-4 h-4 text-indigo-500" />
                                    <span className="hidden sm:inline">Dark Mode</span>
                                </>
                            )}
                        </button>

                        <a
                            href={getWhatsappLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all hover:shadow-lg"
                        >
                            <Phone className="w-4 h-4" />
                            Hubungi Admin
                        </a>

                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-sm transition-all"
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Admin Panel
                            </Link>
                        ) : (
                            <Link
                                href={login()}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                            >
                                <LogIn className="w-4 h-4" />
                                Admin Login
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-emerald-500/20 via-teal-500/10 to-transparent blur-3xl -z-10 pointer-events-none rounded-full" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-medium">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                {availableCount > 0 ? (
                                    <span>Tersedia {availableCount} dari {kosts.length || 3} Kamar Kosong</span>
                                ) : (
                                    <span>Semua 3 Kamar Penuh (Daftar Tunggu)</span>
                                )}
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                                Kost Rahayu{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500">
                                    (Zet Corner Rental)
                                </span>
                            </h1>

                            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                                Hunian kost eksklusif 3 kamar dengan fasilitas serba lengkap: WIFI kencang, Air PDAM, Listrik Token, Tempat Tidur Springbed, Kamar Mandi Dalam, dan Pengawasan CCTV 24 Jam.
                            </p>

                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                                <a
                                    href="#kamar"
                                    className="px-6 py-3.5 rounded-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xl shadow-emerald-600/25 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    Pilih Unit Kamar
                                    <ArrowRight className="w-5 h-5" />
                                </a>

                                <a
                                    href={MAPS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3.5 rounded-xl font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 shadow-sm transition-all"
                                >
                                    <MapPin className="w-5 h-5 text-rose-500" />
                                    Petunjuk Lokasi Maps
                                </a>
                            </div>

                            <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
                                <div>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Biaya Harian</span>
                                    <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">Rp 25.000</span>
                                    <span className="text-[11px] text-slate-400 block font-normal">(Maks. 7 Hari)</span>
                                </div>
                                <div className="border-x border-slate-200 dark:border-slate-800 px-2">
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Biaya Mingguan</span>
                                    <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">Rp 175.000</span>
                                    <span className="text-[11px] text-slate-400 block font-normal">(Maks. 2 Minggu)</span>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Biaya Bulanan</span>
                                    <span className="text-lg sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400">Rp 750.000</span>
                                    <span className="text-[11px] text-slate-400 block font-normal">(Terfavorit)</span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5 relative">
                            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 shadow-2xl bg-white dark:bg-slate-900 p-3 group">
                                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                                    <img
                                        src="/images/room1.jpg"
                                        alt="Kost Rahayu Room Preview"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4 text-white">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-bold text-lg">Kost Rahayu 01</h3>
                                                <p className="text-xs text-slate-300 flex items-center gap-1">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Kamar Mandi Dalam & Wi-Fi
                                                </p>
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-md">
                                                Tersedia
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center justify-between text-xs font-medium">
                                    <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> Lingkungan Nyaman & Aman
                                    </span>
                                    <a
                                        href={MAPS_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                                    >
                                        Buka Maps <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: 3 Kost Units */}
            <section id="kamar" className="py-20 bg-white dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                            Unit Eksklusif
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
                            Daftar 3 Unit Kost Rahayu
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mt-2 text-base">
                            Setiap kamar dirancang identik dengan kenyamanan tinggi, kamar mandi pribadi, serta akses fasilitas penuh.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {(kosts.length > 0 ? kosts : [
                            { id: 1, name: 'Kost Rahayu 01', code: 'K-01', status: 'available', daily_price: 25000, weekly_price: 175000, monthly_price: 750000, notes: 'Kamar bersih & nyaman di Lantai 1' },
                            { id: 2, name: 'Kost Rahayu 02', code: 'K-02', status: 'occupied', daily_price: 25000, weekly_price: 175000, monthly_price: 750000, notes: 'Terisi sewa bulanan' },
                            { id: 3, name: 'Kost Rahayu 03', code: 'K-03', status: 'available', daily_price: 25000, weekly_price: 175000, monthly_price: 750000, notes: 'Kamar sudut dengan pencahayaan maksimal' },
                        ]).map((kost) => {
                            const isAvailable = kost.status === 'available';
                            const imgSrc = ROOM_IMAGES[kost.code] || '/images/room1.jpg';

                            return (
                                <div
                                    key={kost.id}
                                    className="bg-slate-50 dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group"
                                >
                                    {/* Image & Status Badge */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={imgSrc}
                                            alt={kost.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />

                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-white backdrop-blur-md border border-white/20">
                                                {kost.code}
                                            </span>
                                        </div>

                                        <div className="absolute top-4 right-4">
                                            {isAvailable ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-md animate-pulse">
                                                    <span className="w-2 h-2 rounded-full bg-white"></span>
                                                    Tersedia
                                                </span>
                                            ) : kost.status === 'occupied' ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white shadow-md">
                                                    <span className="w-2 h-2 rounded-full bg-white"></span>
                                                    Terisi
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-md">
                                                    Perbaikan
                                                </span>
                                            )}
                                        </div>

                                        <div className="absolute bottom-4 left-4 right-4 text-white">
                                            <h3 className="text-xl font-bold">{kost.name}</h3>
                                            <p className="text-xs text-slate-300 font-medium">Zet Corner Rental</p>
                                        </div>
                                    </div>

                                    {/* Content & Specs */}
                                    <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                                        <div>
                                            <div className="flex items-baseline justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
                                                <div>
                                                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                                                        {formatRupiah(kost.monthly_price)}
                                                    </span>
                                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">
                                                        / Bulan
                                                    </span>
                                                </div>
                                                <div className="text-right text-xs text-slate-500 dark:text-slate-400">
                                                    <div>Harian: <strong className="text-slate-700 dark:text-slate-200">{formatRupiah(kost.daily_price)}</strong></div>
                                                    <div>Mingguan: <strong className="text-slate-700 dark:text-slate-200">{formatRupiah(kost.weekly_price)}</strong></div>
                                                </div>
                                            </div>

                                            <div className="space-y-2.5">
                                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fasilitas Kamar:</div>
                                                <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                                                    <div className="flex items-center gap-2">
                                                        <Wifi className="w-3.5 h-3.5 text-blue-500" /> WIFI 24 Jam
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Bath className="w-3.5 h-3.5 text-purple-500" /> Kamar Mandi Dalam
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Bed className="w-3.5 h-3.5 text-emerald-500" /> Kasur Springbed
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Zap className="w-3.5 h-3.5 text-amber-500" /> Listrik Token
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Droplets className="w-3.5 h-3.5 text-sky-500" /> Air PDAM
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <ShieldCheck className="w-3.5 h-3.5 text-rose-500" /> CCTV 24/7
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-2 space-y-2">
                                            {isAvailable ? (
                                                <a
                                                    href={getWhatsappLink(kost.name)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full py-3 px-4 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
                                                >
                                                    <Phone className="w-4 h-4" />
                                                    Pesan via WhatsApp
                                                </a>
                                            ) : (
                                                <a
                                                    href={getWhatsappLink(kost.name, 'Berikutnya')}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full py-3 px-4 rounded-xl font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 transition-all"
                                                >
                                                    <Clock className="w-4 h-4" />
                                                    Tanya Tanggal Kosong
                                                </a>
                                            )}

                                            <button
                                                onClick={() => setSelectedKost(kost)}
                                                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-1"
                                            >
                                                Lihat Rincian Kamar <ChevronRight className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Section: 6 Fasilitas Utama */}
            <section id="fasilitas" className="py-20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                            Fasilitas Lengkap
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
                            6 Fasilitas Utama Kost Rahayu
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mt-2 text-base">
                            Semua fasilitas sudah dirancang untuk kenyamanan, kelancaran, dan ketenangan hidup penghuni sehari-hari.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {FACILITIES.map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                                <div
                                    key={index}
                                    className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center border shadow-sm group-hover:scale-110 transition-transform`}>
                                                <IconComponent className="w-6 h-6" />
                                            </div>
                                            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                                {item.badge}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                        <CheckCircle2 className="w-4 h-4" /> Termasuk dalam sewa
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Section: Biaya Sewa */}
            <section id="harga" className="py-20 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
                            Skema Harga Transparan
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
                            Pilihan Tarif Sewa Kost Rahayu
                        </h2>
                        <p className="text-slate-400 mt-2 text-base">
                            Fleksibel sesuai kebutuhan Anda: Harian, Mingguan, atau Bulanan.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Harian */}
                        <div className="p-8 rounded-3xl bg-slate-800/60 border border-slate-700 backdrop-blur-sm flex flex-col justify-between">
                            <div>
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Sewa Harian</div>
                                <div className="text-4xl font-black text-white mb-1">
                                    Rp 25.000 <span className="text-sm font-normal text-slate-400">/ hari</span>
                                </div>
                                <p className="text-xs text-amber-400 font-semibold mb-6 flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" /> Maksimal 7 Hari
                                </p>

                                <ul className="space-y-3 text-sm text-slate-300">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-emerald-400" /> Fasilitas Lengkap Langsung Siap Pakai
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-emerald-400" /> Kamar Mandi Dalam & Wi-Fi Free
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-emerald-400" /> Cocok untuk Transit & Kunjungan Singkat
                                    </li>
                                </ul>
                            </div>

                            <a
                                href={getWhatsappLink(undefined, 'Harian')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-8 py-3 px-4 rounded-xl font-bold bg-slate-700 hover:bg-slate-600 text-white text-center transition-all block"
                            >
                                Sewa Harian
                            </a>
                        </div>

                        {/* Mingguan */}
                        <div className="p-8 rounded-3xl bg-slate-800/60 border border-slate-700 backdrop-blur-sm flex flex-col justify-between">
                            <div>
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Sewa Mingguan</div>
                                <div className="text-4xl font-black text-white mb-1">
                                    Rp 175.000 <span className="text-sm font-normal text-slate-400">/ minggu</span>
                                </div>
                                <p className="text-xs text-amber-400 font-semibold mb-6 flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" /> Maksimal 2 Minggu
                                </p>

                                <ul className="space-y-3 text-sm text-slate-300">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-emerald-400" /> Hemat & Praktis Tanpa Komitmen Lama
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-emerald-400" /> Bebas Akses CCTV & Air PDAM
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-emerald-400" /> Pilihan Ideal Kegiatan Dinas / Proyek
                                    </li>
                                </ul>
                            </div>

                            <a
                                href={getWhatsappLink(undefined, 'Mingguan')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-8 py-3 px-4 rounded-xl font-bold bg-slate-700 hover:bg-slate-600 text-white text-center transition-all block"
                            >
                                Sewa Mingguan
                            </a>
                        </div>

                        {/* Bulanan (Featured) */}
                        <div className="p-8 rounded-3xl bg-gradient-to-b from-emerald-950 to-slate-900 border-2 border-emerald-500 backdrop-blur-sm shadow-2xl relative flex flex-col justify-between">
                            <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg">
                                Terfavorit
                            </div>

                            <div>
                                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Sewa Bulanan</div>
                                <div className="text-4xl font-black text-white mb-1">
                                    Rp 750.000 <span className="text-sm font-normal text-slate-400">/ bulan</span>
                                </div>
                                <p className="text-xs text-emerald-400 font-semibold mb-6 flex items-center gap-1">
                                    <Sparkles className="w-3.5 h-3.5" /> Pilihan Terhemat & Paling Diminati
                                </p>

                                <ul className="space-y-3 text-sm text-slate-200">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-emerald-400" /> Garansi Hunian Nyaman Jangka Panjang
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-emerald-400" /> Bebas Tambahan Biaya Air PDAM & Wi-Fi
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-emerald-400" /> Pengamanan CCTV 24 Jam Terjamin
                                    </li>
                                </ul>
                            </div>

                            <a
                                href={getWhatsappLink(undefined, 'Bulanan')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-8 py-3 px-4 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-center shadow-lg shadow-emerald-500/25 transition-all block"
                            >
                                Sewa Bulanan Sekarang
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: Lokasi & Maps */}
            <section id="lokasi" className="py-20 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-6 space-y-6">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                                Lokasi Strategis
                            </span>

                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                Alamat & Petunjuk Lokasi Kost Rahayu
                            </h2>

                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                                Kost Rahayu (Zet Corner Rental) berlokasi sangat strategis, aman, quiet, dan mudah diakses oleh kendaraan roda dua maupun roda empat.
                            </p>

                            <div className="space-y-4 pt-2">
                                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Link Petunjuk Maps Google</h4>
                                        <a
                                            href={MAPS_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium break-all flex items-center gap-1 mt-1"
                                        >
                                            {MAPS_URL} <ExternalLink className="w-3 h-3 shrink-0" />
                                        </a>
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Kontak Pengelola / Admin</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                            WhatsApp: <strong className="text-slate-800 dark:text-slate-200">+62 812-3456-7890</strong> (Fast Response)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <a
                                    href={MAPS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3.5 rounded-xl font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 inline-flex items-center gap-2 transition-all shadow-md"
                                >
                                    <MapPin className="w-4 h-4 text-rose-500" />
                                    Buka Google Maps
                                </a>
                            </div>
                        </div>

                        <div className="lg:col-span-6">
                            <div className="rounded-3xl p-6 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-4">
                                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                                    <MapPin className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Peta Lokasi Google Maps</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                                    Klik tombol di bawah ini untuk melihat navigasi langsung ke titik lokasi Kost Rahayu (Zet Corner Rental) melalui Google Maps.
                                </p>
                                <a
                                    href={MAPS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-4 px-6 rounded-2xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                                >
                                    Navigasi ke Google Maps <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-slate-950 text-slate-400 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                            KR
                        </div>
                        <span className="font-semibold text-slate-200">
                            Kost Rahayu — Zet Corner Rental
                        </span>
                    </div>

                    <p className="text-xs text-slate-500 text-center md:text-left">
                        © {new Date().getFullYear()} Kost Rahayu (Zet Corner Rental). All rights reserved.
                    </p>

                    <div className="flex items-center gap-4 text-xs font-semibold">
                        <a href="#kamar" className="hover:text-emerald-400 transition-colors">Unit Kamar</a>
                        <a href="#fasilitas" className="hover:text-emerald-400 transition-colors">Fasilitas</a>
                        <Link href={dashboard()} className="hover:text-emerald-400 transition-colors">Admin Panel</Link>
                    </div>
                </div>
            </footer>

            {/* Room Detail Modal */}
            {selectedKost && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl relative">
                        <button
                            onClick={() => setSelectedKost(null)}
                            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/60 text-white flex items-center justify-center hover:bg-slate-900 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="relative aspect-video">
                            <img
                                src={ROOM_IMAGES[selectedKost.code] || '/images/room1.jpg'}
                                alt={selectedKost.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-500 text-white mr-2">
                                    {selectedKost.code}
                                </span>
                                <h3 className="text-2xl font-bold inline-block">{selectedKost.name}</h3>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                                <div>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Status Sewa saat ini</span>
                                    <span className={`font-extrabold text-sm ${
                                        selectedKost.status === 'available' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
                                    }`}>
                                        {selectedKost.status === 'available' ? 'Tersedia (Siap Huni)' : 'Sedang Terisi'}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Tarif Bulanan</span>
                                    <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                                        {formatRupiah(selectedKost.monthly_price)}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Fasilitas Lengkap Kamar Ini:</h4>
                                <ul className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> WIFI High Speed 24h</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Kamar Mandi Dalam</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Air PDAM Bersih</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Listrik Token Sendiri</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Springbed & Sprei</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Pemantauan CCTV 24/7</li>
                                </ul>
                            </div>

                            <div className="pt-2">
                                <a
                                    href={getWhatsappLink(selectedKost.name)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3.5 px-4 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                                >
                                    <Phone className="w-4 h-4" />
                                    Pesan Kamar Ini via WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
