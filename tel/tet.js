// =========================================================
// 🤖 FUNGSI BOT TELEGRAM
// =========================================================
const { BOT_TOKEN, CHAT_ID, NEXT_URL } = TELEGRAM_CONFIG;

// =========================================================
// 📤 KIRIM PESAN KE TELEGRAM
// =========================================================
async function kirimPesanTelegram(pesan) {
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: pesan,
        parse_mode: "Markdown"
      })
    });
    const data = await res.json();
    return data.ok === true;
  } catch (err) {
    console.error("❌ Telegram Error:", err);
    return false;
  }
}

// =========================================================
// 📝 NOTIFIKASI HALAMAN DIBUKA
// =========================================================
function notifikasiHalamanDibuka(namaHalaman) {
  const pesan = `
🌐 HALAMAN DIBUKA
━━━━━━━━━━━━━━━━━━━━
📄 Halaman: ${namaHalaman}
🕐 Waktu: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}
━━━━━━━━━━━━━━━━━━━━
  `.trim();
  kirimPesanTelegram(pesan);
}

// =========================================================
// 🔀 PINDAH HALAMAN BERIKUTNYA
// =========================================================
function lanjutKeHalamanBerikutnya() {
  window.location.href = NEXT_URL;
}
