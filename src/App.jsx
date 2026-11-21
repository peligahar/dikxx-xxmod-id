import React, { useState, useEffect } from 'react';
import { 
  Shield, Crown, Download, Search, Plus, Trash2, Edit, Check, X, 
  Lock, Unlock, Sparkles, Smartphone, Key, MessageCircle, Copy, 
  ExternalLink, Settings, Star, Upload, CheckCircle2, AlertCircle, 
  Filter, Package, Zap, Gift, Menu
} from 'lucide-react';

const INITIAL_MODS = [
  {
    id: 1,
    title: "Mobile Legends Bang Bang Mod VIP",
    category: "MOBA",
    version: "1.8.50",
    size: "165 MB",
    downloads: "142.5K",
    rating: 4.9,
    isVip: true,
    price: 15000,
    icon: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150&auto=format&fit=crop&q=80",
    description: "Drone View Ultrawide, MapHack Radar musuh, Skin Unlocked Permanen, Anti Ban Aman 100%.",
    link: "https://catbox.moe/example1.apk"
  },
  {
    id: 2,
    title: "Free Fire Max Mega Mod VIP",
    category: "Battle Royale",
    version: "2.109.1",
    size: "520 MB",
    downloads: "289.1K",
    rating: 4.8,
    isVip: true,
    price: 15000,
    icon: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=150&auto=format&fit=crop&q=80",
    description: "Auto Headshot 100%, Aimbot Stabil, WallHack Anti Grass, No Recoil & Speed Hack.",
    link: "https://catbox.moe/example2.apk"
  },
  {
    id: 3,
    title: "WhatsApp Aero iOS Style v10",
    category: "Sosial",
    version: "v10.2",
    size: "75 MB",
    downloads: "512.4K",
    rating: 4.9,
    isVip: false,
    price: 0,
    icon: "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=150&auto=format&fit=crop&q=80",
    description: "Tampilan iOS iPhone penuh, Anti Hapus Pesan, Sembunyikan Status Online & Kustom Tema Mewah.",
    link: "https://catbox.moe/example3.apk"
  },
  {
    id: 4,
    title: "Minecraft Pocket Edition Mod Premium",
    category: "Survival",
    version: "1.20.70",
    size: "620 MB",
    downloads: "98.3K",
    rating: 4.7,
    isVip: false,
    price: 0,
    icon: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=150&auto=format&fit=crop&q=80",
    description: "Unlocked All Premium Skins, God Mode, Unlimited Items & Custom Shader Support.",
    link: "https://catbox.moe/example4.apk"
  }
];

const INITIAL_VOUCHERS = [
  { id: 1, code: "DIKXZ-VIP-2026", type: "permanent", used: false },
  { id: 2, code: "WELCOMEPRO30", type: "30days", used: false }
];

export default function App() {
  // State dasar
  const [mods, setMods] = useState(() => {
    try {
      const saved = localStorage.getItem('dikxz_mods');
      return saved ? JSON.parse(saved) : INITIAL_MODS;
    } catch {
      return INITIAL_MODS;
    }
  });

  const [vouchers, setVouchers] = useState(() => {
    try {
      const saved = localStorage.getItem('dikxz_vouchers');
      return saved ? JSON.parse(saved) : INITIAL_VOUCHERS;
    } catch {
      return INITIAL_VOUCHERS;
    }
  });

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('dikxz_reviews');
      return saved ? JSON.parse(saved) : [
        { id: 1, modId: 1, name: "Rizky Gamer", rating: 5, comment: "Mantap banget mod ML nya, lancar jaya anti ban!", date: "2026-06-01" },
        { id: 2, modId: 2, name: "Dimas ID", rating: 5, comment: "Auto headshot parah, top markotop admin!", date: "2026-06-02" }
      ];
    } catch {
      return [];
    }
  });

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [isVipMember, setIsVipMember] = useState(() => {
    try {
      return localStorage.getItem('dikxz_is_vip') === 'true';
    } catch {
      return false;
    }
  });

  const [whatsappNumber, setWhatsappNumber] = useState("6285922471521");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals
  const [selectedMod, setSelectedMod] = useState(null);
  const [downloadModal, setDownloadModal] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);

  const [vipModal, setVipModal] = useState(false);
  const [voucherCodeInput, setVoucherCodeInput] = useState("");
  const [voucherMessage, setVoucherMessage] = useState("");

  const [requestModal, setRequestModal] = useState(false);
  const [reqGameName, setReqGameName] = useState("");
  const [reqNotes, setReqNotes] = useState("");

  const [adminModal, setAdminModal] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState("");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminTab, setAdminTab] = useState("mods");

  // Form Admin Mod
  const [editingModId, setEditingModId] = useState(null);
  const [modForm, setModForm] = useState({
    title: "", category: "MOBA", version: "1.0", size: "50 MB", 
    downloads: "10K", rating: 5.0, isVip: false, price: 15000, 
    icon: "", description: "", link: ""
  });

  // Form Voucher Admin
  const [newVoucherCode, setNewVoucherCode] = useState("");
  const [newVoucherType, setNewVoucherType] = useState("permanent");

  // Review Input
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  // Simpan ke localStorage
  useEffect(() => {
    try { localStorage.setItem('dikxz_mods', JSON.stringify(mods)); } catch {}
  }, [mods]);

  useEffect(() => {
    try { localStorage.setItem('dikxz_vouchers', JSON.stringify(vouchers)); } catch {}
  }, [vouchers]);

  useEffect(() => {
    try { localStorage.setItem('dikxz_reviews', JSON.stringify(reviews)); } catch {}
  }, [reviews]);

  useEffect(() => {
    try { localStorage.setItem('dikxz_is_vip', isVipMember); } catch {}
  }, [isVipMember]);

  // Efek Countdown Unduhan
  useEffect(() => {
    let timer;
    if (downloadModal && isDownloading && countdown > 0) {
      timer = setInterval(() => setCountdown(c => c - 1), 1000);
    } else if (countdown === 0 && isDownloading) {
      setDownloadReady(true);
      setIsDownloading(false);
    }
    return () => clearInterval(timer);
  }, [downloadModal, isDownloading, countdown]);

  const startDownloadProcess = (mod) => {
    if (mod.isVip && !isVipMember) {
      setVipModal(true);
      return;
    }
    setDownloadModal(mod);
    setCountdown(5);
    setIsDownloading(true);
    setDownloadReady(false);
  };

  const handleClaimVoucher = (e) => {
    e.preventDefault();
    const found = vouchers.find(v => v.code.trim().toUpperCase() === voucherCodeInput.trim().toUpperCase());
    if (!found) {
      setVoucherMessage("❌ Kode voucher tidak valid atau salah!");
      return;
    }
    if (found.used) {
      setVoucherMessage("⚠️ Kode voucher ini sudah pernah digunakan!");
      return;
    }

    // Update voucher jadi used
    const updated = vouchers.map(v => v.id === found.id ? { ...v, used: true } : v);
    setVouchers(updated);
    setIsVipMember(true);
    setVoucherMessage("🎉 Berhasil! Anda sekarang adalah Anggota VIP DikxzMod.");
    setVoucherCodeInput("");
  };

  const sendCheckoutWhatsApp = (packageName, priceText) => {
    const orderId = "DIKXZ-" + Math.floor(100000 + Math.random() * 900000);
    const message = `Halo Admin DikxzMod, saya ingin membeli akses:

📦 Item: ${packageName}
💰 Harga: ${priceText}
🔖 Kode Pesanan: ${orderId}

Mohon petunjuk pembayaran selanjutnya. Terima kasih!`;
    const url = `https://wa.me/${whatsappNumber}?text=` + encodeURIComponent(message);
    window.open(url, '_blank');
  };

  const submitModRequest = (e) => {
    e.preventDefault();
    if (!reqGameName.trim()) return;
    const message = `Halo Admin DikxzMod, saya ingin request mod aplikasi/game berikut:

🎮 Nama Game/App: ${reqGameName}
📝 Catatan/Fitur: ${reqNotes || '-'}

Tolong segera dihadirkan ya min!`;
    const url = `https://wa.me/${whatsappNumber}?text=` + encodeURIComponent(message);
    window.open(url, '_blank');
    setRequestModal(false);
    setReqGameName("");
    setReqNotes("");
    alert("Request berhasil dikirim ke WhatsApp Admin!");
  };

  const submitReview = (e, modId) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;
    const newRev = {
      id: Date.now(),
      modId,
      name: reviewName,
      rating: Number(reviewRating),
      comment: reviewComment,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([newRev, ...reviews]);
    setReviewName("");
    setReviewComment("");
    alert("Ulasan berhasil dikirim!");
  };

  // Admin Actions
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPinInput === "admin123") {
      setIsAdminLoggedIn(true);
      setAdminPinInput("");
    } else {
      alert("PIN Admin Salah! (Gunakan: admin123)");
    }
  };

  const saveModToDatabase = (e) => {
    e.preventDefault();
    if (!modForm.title || !modForm.link) {
      alert("Judul dan Link Unduhan wajib diisi!");
      return;
    }

    if (editingModId) {
      setMods(mods.map(m => m.id === editingModId ? { ...modForm, id: editingModId } : m));
      alert("Mod berhasil diperbarui!");
    } else {
      const newMod = {
        ...modForm,
        id: Date.now(),
        rating: 5.0,
        downloads: "1.2K"
      };
      setMods([newMod, ...mods]);
      alert("Mod baru berhasil ditambahkan!");
    }

    setModForm({
      title: "", category: "MOBA", version: "1.0", size: "50 MB", 
      downloads: "10K", rating: 5.0, isVip: false, price: 15000, 
      icon: "", description: "", link: ""
    });
    setEditingModId(null);
  };

  const editModItem = (mod) => {
    setModForm(mod);
    setEditingModId(mod.id);
    setAdminTab("mods");
  };

  const deleteModItem = (id) => {
    if (confirm("Yakin ingin menghapus mod ini?")) {
      setMods(mods.filter(m => m.id !== id));
    }
  };

  const createVoucherCode = (e) => {
    e.preventDefault();
    if (!newVoucherCode.trim()) return;
    const item = {
      id: Date.now(),
      code: newVoucherCode.trim().toUpperCase(),
      type: newVoucherType,
      used: false
    };
    setVouchers([item, ...vouchers]);
    setNewVoucherCode("");
    alert("Voucher VIP berhasil dibuat!");
  };

  const deleteVoucherItem = (id) => {
    setVouchers(vouchers.filter(v => v.id !== id));
  };

  const filteredMods = mods.filter(m => {
    const matchCat = selectedCategory === "Semua" || m.category === selectedCategory;
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase()) || m.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col font-sans">
      
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#111622]/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setSelectedMod(null)}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                DIKXZMOD
              </span>
              <span className="block text-[10px] tracking-widest text-indigo-400 font-semibold uppercase">Official Mod Portal</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => setSelectedMod(null)} className="text-sm font-medium hover:text-indigo-400 transition">Katalog</button>
            <button onClick={() => setRequestModal(true)} className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1.5 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20">
              <Sparkles className="w-4 h-4" /> Request Mod
            </button>
            <button onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=Halo%20Admin%20DikxzMod,%20saya%20ingin%20bertanya%20mengenai%20kendala%20dan%20bantuan.`, '_blank')} className="text-sm font-medium hover:text-indigo-400 transition flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-emerald-400" /> Hubungi CS
            </button>
            
            {isVipMember ? (
              <span className="flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm">
                <Crown className="w-4 h-4 text-amber-400 animate-pulse" /> VIP Active
              </span>
            ) : (
              <button onClick={() => setVipModal(true)} className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs hover:opacity-95 shadow-lg shadow-amber-500/20 transition">
                <Crown className="w-4 h-4" /> Beli VIP / Klaim Kode
              </button>
            )}

            <button onClick={() => setAdminModal(true)} className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition" title="Admin Panel">
              <Settings className="w-4 h-4" />
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            {!isVipMember && (
              <button onClick={() => setVipModal(true)} className="bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1">
                <Crown className="w-3.5 h-3.5" /> VIP
              </button>
            )}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-xl bg-slate-800 text-slate-300">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#111622] border-b border-slate-800 px-4 pt-2 pb-4 space-y-3">
            <button onClick={() => { setSelectedMod(null); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm font-medium hover:text-indigo-400">Katalog Mod</button>
            <button onClick={() => { setRequestModal(true); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm font-medium text-indigo-400">Request Mod Game</button>
            <button onClick={() => { window.open(`https://wa.me/${whatsappNumber}`, '_blank'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm font-medium text-emerald-400">Hubungi CS WhatsApp</button>
            {isVipMember ? (
              <div className="py-2 text-amber-400 text-sm font-bold flex items-center gap-2"><Crown className="w-4 h-4" /> Status VIP Anda Aktif</div>
            ) : (
              <button onClick={() => { setVipModal(true); setMobileMenuOpen(false); }} className="w-full bg-amber-500 text-slate-950 font-bold py-2.5 rounded-xl text-center text-sm">Beli Akses VIP</button>
            )}
            <button onClick={() => { setAdminModal(true); setMobileMenuOpen(false); }} className="w-full bg-slate-800 text-slate-200 py-2 rounded-xl text-center text-sm flex items-center justify-center gap-2">
              <Settings className="w-4 h-4" /> Admin Panel
            </button>
          </div>
        )}
      </header>

      {/* HERO BANNER */}
      <section className="relative overflow-hidden py-16 px-4 bg-gradient-to-b from-[#111622] to-[#0a0d14] border-b border-slate-800/60">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-6 shadow-sm">
            <Zap className="w-3.5 h-3.5 text-indigo-400" /> 100% Aman, Anti-Ban & Telah Diuji Coba
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            Download Modifikasi Game & Aplikasi <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Terbaik & Premium</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            Nikmati ribuan game dan aplikasi Android modifikasi pilihan dengan kecepatan unduh maksimal, fitur VIP eksklusif, dan update rutin setiap hari.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto flex gap-2 bg-[#1a2234] p-2 rounded-2xl border border-slate-700/80 shadow-2xl">
            <div className="flex items-center pl-3 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              placeholder="Cari game atau aplikasi mod (contoh: Mobile Legends, WhatsApp)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-none text-slate-100 placeholder-slate-500 px-2 py-2 focus:outline-none text-sm"
            />
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition shadow-lg shadow-indigo-600/30">
              Cari
            </button>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        
        {/* Kategori Filter */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
            {["Semua", "MOBA", "Battle Royale", "Sosial", "Survival"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                    : 'bg-[#111622] hover:bg-[#1a2234] text-slate-300 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-[#111622] px-3.5 py-2 rounded-xl border border-slate-800">
            <Package className="w-4 h-4 text-indigo-400" /> Menampilkan {filteredMods.length} Mod
          </div>
        </div>

        {/* MOD GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMods.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-[#111622] rounded-3xl border border-slate-800">
              <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-300">Mod tidak ditemukan</h3>
              <p className="text-sm text-slate-500 mt-1">Coba kata kunci lain atau buat request mod melalui menu di atas.</p>
            </div>
          ) : (
            filteredMods.map((mod) => (
              <div 
                key={mod.id} 
                className="bg-[#111622] rounded-3xl border border-slate-800/80 overflow-hidden hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  {/* Card Header Image */}
                  <div className="relative h-44 overflow-hidden bg-slate-900 cursor-pointer" onClick={() => setSelectedMod(mod)}>
                    <img 
                      src={mod.icon} 
                      alt={mod.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111622] via-transparent to-transparent"></div>
                    
                    {/* Badge VIP / Free */}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {mod.isVip ? (
                        <span className="bg-amber-500/90 text-slate-950 font-black px-2.5 py-1 rounded-lg text-[10px] flex items-center gap-1 shadow-md">
                          <Crown className="w-3 h-3" /> VIP
                        </span>
                      ) : (
                        <span className="bg-emerald-500/90 text-slate-950 font-black px-2.5 py-1 rounded-lg text-[10px] shadow-md">
                          FREE
                        </span>
                      )}
                      <span className="bg-slate-900/80 backdrop-blur-md text-slate-200 font-semibold px-2.5 py-1 rounded-lg text-[10px]">
                        {mod.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-200 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {mod.rating}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5">
                    <h3 
                      onClick={() => setSelectedMod(mod)}
                      className="font-bold text-base text-slate-100 hover:text-indigo-400 cursor-pointer line-clamp-1 mb-1.5 transition"
                    >
                      {mod.title}
                    </h3>
                    <p className="text-slate-400 text-xs line-clamp-2 mb-4 leading-relaxed">
                      {mod.description}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 py-2 border-t border-slate-800/80">
                      <span>Versi: <strong className="text-slate-200">{mod.version}</strong></span>
                      <span>Ukuran: <strong className="text-slate-200">{mod.size}</strong></span>
                      <span>Unduh: <strong className="text-slate-200">{mod.downloads}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <button 
                    onClick={() => startDownloadProcess(mod)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-md ${
                      mod.isVip && !isVipMember 
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20' 
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                    }`}
                  >
                    {mod.isVip && !isVipMember ? (
                      <>
                        <Lock className="w-4 h-4" /> Buka VIP (Rp {mod.price?.toLocaleString('id-ID')})
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" /> Download Mod
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* MODAL DETAIL & REVIEWS */}
      {selectedMod && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111622] border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button 
              onClick={() => setSelectedMod(null)} 
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4 mb-6">
              <img src={selectedMod.icon} alt={selectedMod.title} className="w-20 h-20 rounded-2xl object-cover shadow-lg" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {selectedMod.isVip ? (
                    <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-md flex items-center gap-1">
                      <Crown className="w-3 h-3" /> VIP EXCLUSIVE
                    </span>
                  ) : (
                    <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-md">
                      FREE MOD
                    </span>
                  )}
                  <span className="text-xs text-slate-400">{selectedMod.category}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">{selectedMod.title}</h2>
                <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                  <span>Versi: <strong className="text-slate-200">{selectedMod.version}</strong></span>
                  <span>Ukuran: <strong className="text-slate-200">{selectedMod.size}</strong></span>
                  <span>Total Unduh: <strong className="text-slate-200">{selectedMod.downloads}</strong></span>
                </div>
              </div>
            </div>

            <div className="bg-[#1a2234] p-4 rounded-2xl border border-slate-700/60 mb-6">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Deskripsi & Fitur Mod:</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{selectedMod.description}</p>
            </div>

            <button 
              onClick={() => { setSelectedMod(null); startDownloadProcess(selectedMod); }}
              className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition ${
                selectedMod.isVip && !isVipMember 
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-amber-500/30' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
              }`}
            >
              {selectedMod.isVip && !isVipMember ? (
                <>
                  <Lock className="w-5 h-5" /> Dapatkan Akses VIP Sekarang (Rp {selectedMod.price?.toLocaleString('id-ID')})
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" /> Download Mod Sekarang ({selectedMod.size})
                </>
              )}
            </button>

            {/* ULASAN & BINTANG SECTION */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> Ulasan & Rating Pengguna
              </h3>

              {/* Form Tulis Ulasan */}
              <form onSubmit={(e) => submitReview(e, selectedMod.id)} className="bg-[#1a2234] p-4 rounded-2xl border border-slate-700/60 mb-6 space-y-3">
                <h4 className="text-xs font-bold text-slate-300">Tulis Ulasan Anda</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input 
                    type="text" 
                    placeholder="Nama Anda" 
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    required
                    className="bg-[#111622] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
                  />
                  <select 
                    value={reviewRating}
                    onChange={(e) => setReviewRating(e.target.value)}
                    className="bg-[#111622] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5 - Sempurna)</option>
                    <option value="4">⭐⭐⭐⭐ (4 - Sangat Bagus)</option>
                    <option value="3">⭐⭐⭐ (3 - Cukup)</option>
                    <option value="2">⭐⭐ (2 - Kurang)</option>
                    <option value="1">⭐ (1 - Buruk)</option>
                  </select>
                </div>
                <textarea 
                  placeholder="Tulis ulasan atau tanggapan Anda tentang mod ini..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  required
                  rows="2"
                  className="w-full bg-[#111622] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
                ></textarea>
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition">
                  Kirim Ulasan
                </button>
              </form>

              {/* Daftar Ulasan */}
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {reviews.filter(r => r.modId === selectedMod.id).length === 0 ? (
                  <p className="text-xs text-slate-500 italic">Belum ada ulasan untuk mod ini. Jadilah yang pertama memberikan ulasan!</p>
                ) : (
                  reviews.filter(r => r.modId === selectedMod.id).map(rev => (
                    <div key={rev.id} className="bg-[#161d2e] p-3.5 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-200">{rev.name}</span>
                        <div className="flex items-center text-amber-400 text-xs">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-400">{rev.comment}</p>
                      <span className="text-[10px] text-slate-600 mt-1 block">{rev.date}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL DOWNLOAD & COUNTDOWN */}
      {downloadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111622] border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 text-center relative shadow-2xl">
            <button onClick={() => setDownloadModal(null)} className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-300">
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4 text-indigo-400">
              <Download className="w-8 h-8 animate-bounce" />
            </div>

            <h3 className="text-lg font-bold text-white mb-1">Menyiapkan Tautan Unduhan</h3>
            <p className="text-xs text-slate-400 mb-6">{downloadModal.title}</p>

            {isDownloading && (
              <div className="py-6">
                <div className="text-4xl font-black text-indigo-400 mb-2">{countdown}</div>
                <p className="text-xs text-slate-500">Mohon tunggu sebentar, file sedang disiapkan...</p>
              </div>
            )}

            {downloadReady && (
              <div className="space-y-3">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs font-semibold mb-4">
                  ✅ File siap diunduh dengan aman!
                </div>
                <a 
                  href={downloadModal.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition"
                >
                  <ExternalLink className="w-4 h-4" /> Unduh File APK Sekarang
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL VIP & VOUCHER */}
      {vipModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111622] border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
            <button onClick={() => setVipModal(false)} className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-300">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-3 text-amber-400">
                <Crown className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-white">Upgrade Keanggotaan VIP</h3>
              <p className="text-xs text-slate-400 mt-1">Buka semua mod eksklusif tanpa hitung mundur iklan selamanya!</p>
            </div>

            {/* Paket Pembelian */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="bg-[#1a2234] border border-slate-700/80 rounded-2xl p-4 text-center flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block mb-1">VIP 7 Hari</span>
                  <div className="text-lg font-black text-white mb-2">Rp 10.000</div>
                  <p className="text-[11px] text-slate-400 mb-4">Akses semua mod eksklusif selama 7 hari.</p>
                </div>
                <button 
                  onClick={() => sendCheckoutWhatsApp("Paket VIP 7 Hari", "Rp 10.000")}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Beli via WA
                </button>
              </div>

              <div className="bg-gradient-to-b from-indigo-950/60 to-[#1a2234] border-2 border-indigo-500/60 rounded-2xl p-4 text-center flex flex-col justify-between relative shadow-lg">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-black text-[9px] px-2.5 py-0.5 rounded-full">
                  TERPOPULER
                </span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block mb-1 mt-1">VIP 30 Hari</span>
                  <div className="text-lg font-black text-white mb-2">Rp 25.000</div>
                  <p className="text-[11px] text-slate-300 mb-4">Akses penuh 1 bulan + update instan.</p>
                </div>
                <button 
                  onClick={() => sendCheckoutWhatsApp("Paket VIP 30 Hari", "Rp 25.000")}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-md"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Beli via WA
                </button>
              </div>

              <div className="bg-[#1a2234] border border-slate-700/80 rounded-2xl p-4 text-center flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block mb-1">VIP Permanen</span>
                  <div className="text-lg font-black text-white mb-2">Rp 50.000</div>
                  <p className="text-[11px] text-slate-400 mb-4">Akses selamanya tanpa biaya tambahan.</p>
                </div>
                <button 
                  onClick={() => sendCheckoutWhatsApp("Paket VIP Permanen (Selamanya)", "Rp 50.000")}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Beli via WA
                </button>
              </div>
            </div>

            {/* Form Voucher */}
            <div className="bg-[#161d2e] p-4 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <Key className="w-4 h-4 text-indigo-400" /> Punya Kode Voucher VIP? (Sekali Pakai)
              </h4>
              <form onSubmit={handleClaimVoucher} className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Masukkan kode voucher..."
                  value={voucherCodeInput}
                  onChange={(e) => setVoucherCodeInput(e.target.value)}
                  className="w-full bg-[#111622] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none uppercase"
                />
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition">
                  Aktifkan
                </button>
              </form>
              {voucherMessage && (
                <p className={`text-xs mt-2 font-medium ${voucherMessage.includes('Berhasil') ? 'text-emerald-400' : 'text-red-400'}`}>
                  {voucherMessage}
                </p>
              )}
            </div>

          </div>
        </div>
      )}

      {/* MODAL REQUEST MOD */}
      {requestModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111622] border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl">
            <button onClick={() => setRequestModal(false)} className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-300">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto mb-3 text-indigo-400">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-white">Request Mod Game / Aplikasi</h3>
              <p className="text-xs text-slate-400 mt-1">Kirimkan permintaan mod game atau aplikasi yang ingin Anda mainkan.</p>
            </div>

            <form onSubmit={submitModRequest} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Nama Game / Aplikasi</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Genshin Impact / CapCut Pro"
                  value={reqGameName}
                  onChange={(e) => setReqGameName(e.target.value)}
                  required
                  className="w-full bg-[#1a2234] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Catatan / Fitur yang Diinginkan (Opsional)</label>
                <textarea 
                  placeholder="Contoh: Minta fitur Damage Tinggi atau Unlocked All Premium..."
                  value={reqNotes}
                  onChange={(e) => setReqNotes(e.target.value)}
                  rows="3"
                  className="w-full bg-[#1a2234] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition">
                <MessageCircle className="w-4 h-4" /> Kirim Request ke WhatsApp Admin
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADMIN PANEL MODAL */}
      {adminModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111622] border border-slate-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto shadow-2xl">
            <button onClick={() => setAdminModal(false)} className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-300">
              <X className="w-5 h-5" />
            </button>

            {!isAdminLoggedIn ? (
              <div className="max-w-sm mx-auto py-10 text-center">
                <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4 text-indigo-400">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white mb-1">Admin Panel Login</h3>
                <p className="text-xs text-slate-400 mb-6">Masukkan PIN keamanan admin untuk mengelola aplikasi.</p>
                
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <input 
                    type="password" 
                    placeholder="Masukkan PIN Admin (admin123)"
                    value={adminPinInput}
                    onChange={(e) => setAdminPinInput(e.target.value)}
                    required
                    className="w-full bg-[#1a2234] border border-slate-700 rounded-xl px-4 py-3 text-center text-sm text-slate-100 focus:outline-none"
                  />
                  <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl text-sm transition">
                    Masuk Panel Admin
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                  <div>
                    <h2 className="text-xl font-black text-white">DikxzMod Admin Dashboard</h2>
                    <p className="text-xs text-slate-400">Kelola database mod, buat kode voucher sekali pakai, dan ulasan pengguna.</p>
                  </div>
                  <button onClick={() => setIsAdminLoggedIn(false)} className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg font-bold">
                    Keluar Admin
                  </button>
                </div>

                {/* Tabs Admin */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  <button 
                    onClick={() => setAdminTab("mods")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${adminTab === 'mods' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                  >
                    📦 Kelola Mod ({mods.length})
                  </button>
                  <button 
                    onClick={() => setAdminTab("vouchers")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${adminTab === 'vouchers' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                  >
                    🔑 Kode Voucher VIP ({vouchers.length})
                  </button>
                  <button 
                    onClick={() => setAdminTab("reviews")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${adminTab === 'reviews' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                  >
                    ⭐ Kelola Ulasan ({reviews.length})
                  </button>
                </div>

                {/* TAB 1: KELOLA MOD */}
                {adminTab === 'mods' && (
                  <div className="space-y-8">
                    {/* Form Tambah/Edit Mod */}
                    <form onSubmit={saveModToDatabase} className="bg-[#161d2e] p-5 rounded-2xl border border-slate-800 space-y-4">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        {editingModId ? <Edit className="w-4 h-4 text-indigo-400" /> : <Plus className="w-4 h-4 text-indigo-400" />}
                        {editingModId ? "Edit Modifikasi" : "Tambah Modifikasi Baru"}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 mb-1">Judul Mod</label>
                          <input 
                            type="text" 
                            placeholder="Contoh: PUBG Mobile Mod VIP"
                            value={modForm.title}
                            onChange={(e) => setModForm({...modForm, title: e.target.value})}
                            required
                            className="w-full bg-[#111622] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 mb-1">Kategori</label>
                          <select 
                            value={modForm.category}
                            onChange={(e) => setModForm({...modForm, category: e.target.value})}
                            className="w-full bg-[#111622] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                          >
                            <option value="MOBA">MOBA</option>
                            <option value="Battle Royale">Battle Royale</option>
                            <option value="Sosial">Sosial</option>
                            <option value="Survival">Survival</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 mb-1">Versi</label>
                          <input 
                            type="text" 
                            placeholder="v1.0"
                            value={modForm.version}
                            onChange={(e) => setModForm({...modForm, version: e.target.value})}
                            className="w-full bg-[#111622] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 mb-1">Ukuran File</label>
                          <input 
                            type="text" 
                            placeholder="120 MB"
                            value={modForm.size}
                            onChange={(e) => setModForm({...modForm, size: e.target.value})}
                            className="w-full bg-[#111622] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 mb-1">URL Gambar / Icon (Catbox / Unsplash)</label>
                          <input 
                            type="url" 
                            placeholder="https://files.catbox.moe/xxxx.png"
                            value={modForm.icon}
                            onChange={(e) => setModForm({...modForm, icon: e.target.value})}
                            required
                            className="w-full bg-[#111622] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 mb-1">Link Unduhan APK</label>
                          <input 
                            type="url" 
                            placeholder="https://files.catbox.moe/xxxx.apk"
                            value={modForm.link}
                            onChange={(e) => setModForm({...modForm, link: e.target.value})}
                            required
                            className="w-full bg-[#111622] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 mb-1">Tipe Akses</label>
                          <div className="flex gap-4 pt-1">
                            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                              <input 
                                type="radio" 
                                name="isVip" 
                                checked={!modForm.isVip} 
                                onChange={() => setModForm({...modForm, isVip: false})} 
                              /> Gratis (Free)
                            </label>
                            <label className="flex items-center gap-2 text-xs text-amber-400 font-bold cursor-pointer">
                              <input 
                                type="radio" 
                                name="isVip" 
                                checked={modForm.isVip} 
                                onChange={() => setModForm({...modForm, isVip: true})} 
                              /> VIP Eksklusif
                            </label>
                          </div>
                        </div>

                        {modForm.isVip && (
                          <div>
                            <label className="block text-[11px] font-bold text-slate-300 mb-1">Harga Satuan Mod (Rp)</label>
                            <input 
                              type="number" 
                              value={modForm.price}
                              onChange={(e) => setModForm({...modForm, price: Number(e.target.value)})}
                              className="w-full bg-[#111622] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">Deskripsi & Fitur Mod</label>
                        <textarea 
                          rows="2"
                          placeholder="Jelaskan fitur mod..."
                          value={modForm.description}
                          onChange={(e) => setModForm({...modForm, description: e.target.value})}
                          className="w-full bg-[#111622] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                        ></textarea>
                      </div>

                      <div className="flex gap-2">
                        <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition">
                          {editingModId ? "Simpan Perubahan" : "Upload Mod Baru"}
                        </button>
                        {editingModId && (
                          <button 
                            type="button" 
                            onClick={() => { setEditingModId(null); setModForm({ title: "", category: "MOBA", version: "1.0", size: "50 MB", downloads: "10K", rating: 5.0, isVip: false, price: 15000, icon: "", description: "", link: "" }); }}
                            className="bg-slate-800 text-slate-300 px-4 py-2.5 rounded-xl text-xs font-bold"
                          >
                            Batal
                          </button>
                        )}
                      </div>
                    </form>

                    {/* Daftar Mod */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-bold text-white">Daftar Mod Tersimpan</h3>
                      {mods.map(m => (
                        <div key={m.id} className="bg-[#161d2e] p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <img src={m.icon} alt={m.title} className="w-12 h-12 rounded-xl object-cover" />
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-xs text-slate-200">{m.title}</h4>
                                {m.isVip ? (
                                  <span className="bg-amber-500 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded">VIP</span>
                                ) : (
                                  <span className="bg-emerald-500 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded">FREE</span>
                                )}
                              </div>
                              <span className="text-[11px] text-slate-400">{m.category} • Versi {m.version}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => editModItem(m)} className="p-2 bg-slate-800 hover:bg-slate-700 text-indigo-400 rounded-xl">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => deleteModItem(m.id)} className="p-2 bg-slate-800 hover:bg-slate-700 text-red-400 rounded-xl">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 2: KODE VOUCHER */}
                {adminTab === 'vouchers' && (
                  <div className="space-y-6">
                    <form onSubmit={createVoucherCode} className="bg-[#161d2e] p-5 rounded-2xl border border-slate-800 space-y-4">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Key className="w-4 h-4 text-indigo-400" /> Buat Kode Voucher VIP Baru (Sekali Pakai)
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 mb-1">Kode Voucher</label>
                          <input 
                            type="text" 
                            placeholder="Contoh: VIPPRO-XYZ789"
                            value={newVoucherCode}
                            onChange={(e) => setNewVoucherCode(e.target.value)}
                            required
                            className="w-full bg-[#111622] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 uppercase focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 mb-1">Tipe VIP</label>
                          <select 
                            value={newVoucherType}
                            onChange={(e) => setNewVoucherType(e.target.value)}
                            className="w-full bg-[#111622] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                          >
                            <option value="permanent">Permanen</option>
                            <option value="30days">30 Hari</option>
                            <option value="7days">7 Hari</option>
                          </select>
                        </div>
                      </div>
                      <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition">
                        Buat & Simpan Voucher
                      </button>
                    </form>

                    <div className="space-y-3">
                      <h3 className="text-sm font-bold text-white">Daftar Voucher & Status Penggunaan</h3>
                      {vouchers.map(v => (
                        <div key={v.id} className="bg-[#161d2e] p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-sm text-indigo-400">{v.code}</span>
                              {v.used ? (
                                <span className="bg-red-500/10 text-red-400 border border-red-500/30 text-[10px] font-bold px-2 py-0.5 rounded">Sudah Digunakan</span>
                              ) : (
                                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded">Aktif (Belum Dipakai)</span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400 mt-1 block">Tipe: {v.type}</span>
                          </div>
                          <button onClick={() => deleteVoucherItem(v.id)} className="p-2 bg-slate-800 hover:bg-slate-700 text-red-400 rounded-xl">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: KELOLA ULASAN */}
                {adminTab === 'reviews' && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-white">Daftar Semua Ulasan Pengguna</h3>
                    {reviews.length === 0 ? (
                      <p className="text-xs text-slate-500">Belum ada ulasan.</p>
                    ) : (
                      reviews.map(rev => (
                        <div key={rev.id} className="bg-[#161d2e] p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-xs text-slate-200">{rev.name}</span>
                              <div className="flex items-center text-amber-400 text-xs">
                                {Array.from({ length: rev.rating }).map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-xs text-slate-300">{rev.comment}</p>
                            <span className="text-[10px] text-slate-500 mt-1 block">Tanggal: {rev.date}</span>
                          </div>
                          <button 
                            onClick={() => setReviews(reviews.filter(r => r.id !== rev.id))}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-red-400 rounded-xl"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#111622] border-t border-slate-800 py-10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-wider text-white">DIKXZMOD</span>
              <p className="text-xs text-slate-400">Pusat Download Modifikasi Game & Aplikasi Android Terpercaya.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <button onClick={() => window.open(`https://wa.me/${whatsappNumber}`, '_blank')} className="hover:text-indigo-400 transition">Bantuan CS WhatsApp</button>
            <button onClick={() => setRequestModal(true)} className="hover:text-indigo-400 transition">Request Mod</button>
            <button onClick={() => setVipModal(true)} className="hover:text-amber-400 transition">Paket VIP</button>
          </div>

          <div className="text-xs text-slate-500">
            &copy; 2026 DikxzMod. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
