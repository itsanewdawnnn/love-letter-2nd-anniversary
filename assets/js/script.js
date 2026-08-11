/**
 * Anniversary Gift Website - Main Script
 * Vanilla JS ES6
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Generate Floating Particles (Hati & Cahaya Melayang)
    const particlesContainer = document.getElementById('particles');
    const particleCount = 25; // Jumlah partikel yang beterbangan

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Randomize ukuran, posisi, durasi, dan jeda
        const size = Math.random() * 15 + 5; // 5px - 20px
        const left = Math.random() * 100; // 0% - 100% dari lebar layar
        const duration = Math.random() * 15 + 10; // 10s - 25s mengambang ke atas
        const delay = Math.random() * 10; // 0s - 10s jeda awal
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Sebagian partikel diubah menjadi simbol hati (❤)
        if (Math.random() > 0.6) {
            particle.style.backgroundColor = 'transparent';
            particle.innerHTML = '❤';
            particle.style.color = 'rgba(212, 163, 163, 0.4)';
            particle.style.fontSize = `${size + 10}px`;
            particle.style.display = 'flex';
            particle.style.alignItems = 'center';
            particle.style.justifyContent = 'center';
        }

        particlesContainer.appendChild(particle);
    }

    // 2. Logika Interaksi Surat
    const btnOpen = document.getElementById('btnOpen');
    const envelope = document.getElementById('envelope');
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const introScreen = document.getElementById('introScreen');
    const letterScreen = document.getElementById('letterScreen');
    const bgBlur = document.getElementById('bgBlur');
    const typewriterText = document.getElementById('typewriterText');
    const letterStamp = document.getElementById('letterStamp');
    const bgMusic = document.getElementById('bgMusic');
    const letterContainer = document.getElementById('letterContainer');

    // 3. Logika Auto-Scroll (surat bergulir turun perlahan mengikuti teks yang diketik)
    let autoScrollRunning = false;
    let autoScrollPaused = false;
    let resumeScrollTimeout = null;

    function runAutoScrollStep() {
        if (autoScrollPaused) {
            autoScrollRunning = false;
            return;
        }
        const target = letterContainer.scrollHeight - letterContainer.clientHeight;
        const current = letterContainer.scrollTop;
        const diff = target - current;

        if (Math.abs(diff) < 0.5) {
            letterContainer.scrollTop = target;
            autoScrollRunning = false;
            return;
        }

        // Easing lembut agar gerakan scroll terasa perlahan, bukan menyentak
        letterContainer.scrollTop = current + diff * 0.045;
        requestAnimationFrame(runAutoScrollStep);
    }

    function requestAutoScroll() {
        if (autoScrollPaused) return;
        if (!autoScrollRunning) {
            autoScrollRunning = true;
            requestAnimationFrame(runAutoScrollStep);
        }
    }

    // Jika pengguna scroll manual (ingin membaca ulang bagian atas), jeda auto-scroll sejenak
    function handleManualScrollIntent() {
        autoScrollPaused = true;
        clearTimeout(resumeScrollTimeout);
        resumeScrollTimeout = setTimeout(() => {
            autoScrollPaused = false;
            requestAutoScroll();
        }, 3500);
    }
    letterContainer.addEventListener('wheel', handleManualScrollIntent, { passive: true });
    letterContainer.addEventListener('touchmove', handleManualScrollIntent, { passive: true });

    // 4. Efek Burst Kelopak/Confetti saat transisi amplop -> surat
    const burstContainer = document.getElementById('burstContainer');
    const burstSymbols = ['❤', '✿', '❀', '✦', '⋆'];

    function triggerPetalBurst() {
        const count = 36;
        for (let i = 0; i < count; i++) {
            const petal = document.createElement('span');
            petal.classList.add('burst-particle');
            petal.textContent = burstSymbols[Math.floor(Math.random() * burstSymbols.length)];

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 180 + 90;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            petal.style.setProperty('--x', `${x}px`);
            petal.style.setProperty('--y', `${y}px`);
            petal.style.left = '50%';
            petal.style.top = '38%';
            petal.style.fontSize = `${Math.random() * 14 + 10}px`;
            petal.style.color = `hsl(${340 + Math.random() * 25}, 60%, ${72 + Math.random() * 15}%)`;
            petal.style.animationDelay = `${Math.random() * 0.25}s`;

            burstContainer.appendChild(petal);
            setTimeout(() => petal.remove(), 3200);
        }
    }

    // Teks romantis yang akan diketik (Silakan sesuaikan nanti)
    const textContent = `Tak sadar ku temukan, arti kebahagiaan yang selama ini kucari ternyata ada pada seseorang yang kini dengan bangga kupanggil istriku.

Kehadiranmu mengubah banyak hal yang ada dalam hidupku. Bersamamu, aku belajar bahwa cinta bukan sekadar tentang rasa, melainkan tentang memilih untuk tetap bertahan dan tetap saling menggenggam dalam setiap keadaan.

Dia buatku nyaman.
Bukan karena dunia terasa indah saat bersamanya, melainkan karena di sisinya aku selalu merasa pulang.

Bersamamu, aku bisa menjadi diriku sendiri, dengan segala kekurangan dan kelemahanku.
Di setiap langkah yang kita tempuh bersama, aku selalu menemukan alasan baru untuk semakin mencintaimu.

Tak terasa, dua tahun sudah kita mengarungi perjalanan ini.
Rasanya seperti baru kemarin kita mengucapkan janji untuk saling menjaga, namun kini begitu banyak kenangan indah yang telah kita ukir bersama.

Dua tahun ini mengajarkanku bahwa kebahagiaan tidak selalu hadir dalam bentuk hal-hal besar. Terkadang, kebahagiaan hadir lewat percakapan sederhana atau sekadar menikmati waktu bersamamu. Dari semua itu, aku belajar bahwa kebersamaan denganmu adalah anugerah yang tak pernah ingin kusia-siakan.

Terima kasih telah menjadi rumah bagi hatiku, tempat di mana aku selalu ingin pulang.
Terima kasih telah mencintaiku dengan sabar, melengkapi setiap bagian hidupku, dan mewarnai hari-hariku yang dulu hanyalah hitam putih.

Aku mungkin masih jauh dari sempurna, tetapi setiap hari aku terus belajar untuk menjadi suami yang lebih baik untukmu.

Mungkin belum semua impian kita dapat terwujud hari ini. Masih ada banyak hal yang sedang kita perjuangkan bersama.
Percayalah bahwa apa yang selama ini engkau inginkan sedang suamimu usahakan. Namun, maafkan suamimu ini jika masih belum bisa memberikan apa yang selama ini engkau impikan.

Aku tidak tau apa yang akan terjadi di masa depan. Mungkin akan ada banyak ujian yang harus kita lewati dan banyak hal yang harus kita perjuangkan bersama. Namun, satu hal yang aku tau, apa pun yang terjadi nanti, aku ingin melewati semuanya bersamamu.

Aku bahagia telah melewati dua tahun ini bersamamu, dan aku tidak akan pernah lelah menciptakan kenangan indah yang kelak akan kita kenang bersama.

Semoga cinta yang kita miliki hari ini tidak pernah berhenti bertumbuh.
Selamat hari jadi pernikahan kita yang kedua, Sayang.

Aku akan selalu mencintaimu, hari ini, esok, dan selama-lamanya.`;

    // Frasa yang ingin ditonjolkan (highlight) saat diketik
    const highlightPhrases = ['Tak sadar ku temukan,', 'Dia buatku nyaman.'];
    const highlightRanges = highlightPhrases
        .map((phrase) => {
            const start = textContent.indexOf(phrase);
            if (start === -1) return null;
            return { start, end: start + phrase.length - 1 }; // end = index karakter terakhir frasa
        })
        .filter(Boolean);

    // Container aktif tempat karakter berikutnya ditambahkan (span highlight atau teks utama)
    let activeHighlightSpan = null;

    // Menambahkan satu karakter ke DOM secara langsung (bukan lewat string innerHTML +=)
    // agar tag <span> highlight tidak ikut ter-parse ulang/ditutup paksa oleh browser.
    function appendChar(container, char) {
        if (char === '\n') {
            container.appendChild(document.createElement('br'));
            return;
        }
        const lastNode = container.lastChild;
        if (lastNode && lastNode.nodeType === Node.TEXT_NODE) {
            lastNode.nodeValue += char;
        } else {
            container.appendChild(document.createTextNode(char));
        }
    }

    btnOpen.addEventListener('click', () => {
        // Putar musik latar (dipicu oleh klik agar tidak diblokir browser)
        bgMusic.volume = 0;
        bgMusic.play().catch(() => {});
        // Fade in volume musik secara perlahan
        let vol = 0;
        const fadeInMusic = setInterval(() => {
            vol += 0.05;
            if (vol >= 1) {
                vol = 1;
                clearInterval(fadeInMusic);
            }
            bgMusic.volume = vol;
        }, 150);

        // Hentikan animasi floating/napas amplop agar transisi pembukaan stabil
        envelopeWrapper.style.animation = 'none';
        
        // Sembunyikan tombol dengan efek turun perlahan
        btnOpen.style.transform = 'translateY(15px)';
        btnOpen.style.opacity = '0';
        btnOpen.style.pointerEvents = 'none';

        // Buka penutup amplop & hilangkan segel wax
        envelope.classList.add('open');

        // Keluarkan surat dari amplop (delay agar tutup terbuka penuh dahulu)
        setTimeout(() => {
            envelope.classList.add('extract');
            triggerPetalBurst(); // Ledakan kelopak/confetti sebagai transisi ke layar surat
        }, 800);

        // Transisi pindah ke layar surat penuh
        setTimeout(() => {
            introScreen.classList.add('fade-out');
            bgBlur.classList.add('active'); // Latar belakang menjadi blur perlahan
            letterScreen.classList.remove('hidden');
            
            setTimeout(() => {
                letterScreen.classList.add('active');
                
                // Mulai efek pengetikan surat
                setTimeout(() => {
                    typeWriter(textContent, 0);
                }, 1000);
            }, 50);
            
        }, 2500); // Tunggu animasi surat ditarik keluar selesai
    });

    /**
     * Fungsi Efek Mesin Tik (Typewriter)
     */
    function typeWriter(text, i) {
        if (i < text.length) {
            const char = text.charAt(i);

            // Buka span highlight (elemen DOM nyata) jika index ini awal frasa yang ditandai
            if (highlightRanges.some((r) => r.start === i)) {
                const span = document.createElement('span');
                span.className = 'highlight-word';
                typewriterText.appendChild(span);
                activeHighlightSpan = span;
            }

            appendChar(activeHighlightSpan || typewriterText, char);

            // Tutup highlight (kembali menulis ke teks utama) jika index ini akhir frasa
            if (highlightRanges.some((r) => r.end === i)) {
                activeHighlightSpan = null;
            }

            // Ikuti teks yang baru diketik dengan auto-scroll perlahan
            requestAutoScroll();

            // Kecepatan ketik dinamis seperti manusia
            const minSpeed = 40;
            const maxSpeed = 80;
            let speed = Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed;
            
            // Jeda lebih lama di titik atau koma untuk kesan emosional
            if (char === '.' || char === ',') {
                speed += 400; 
            }

            setTimeout(() => typeWriter(text, i + 1), speed);
        } else {
            // Animasi selesai, tampilkan tanda tangan setelah teks selesai diketik
            letterStamp.classList.add('show');
            requestAutoScroll(); // Pastikan tanda tangan ikut terlihat di akhir scroll
            // Kursor bisa dihilangkan jika mau:
            // document.querySelector('.cursor').style.opacity = '0';
        }
    }
});
