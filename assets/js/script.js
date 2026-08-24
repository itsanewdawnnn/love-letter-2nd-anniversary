/**
 * 2nd Anniversary - Main Script
 * Vanilla JS ES6
 */

document.addEventListener('DOMContentLoaded', () => {
    const TARGET_DATE = new Date(2026, 10, 3, 0, 0, 0);

    localStorage.removeItem('suratPreviewUnlocked');

    const lockScreen = document.getElementById('lockScreen');
    const mainContainer = document.getElementById('mainContainer');
    const cdDays = document.getElementById('cdDays');
    const cdHours = document.getElementById('cdHours');
    const cdMinutes = document.getElementById('cdMinutes');
    const cdSeconds = document.getElementById('cdSeconds');
    const urlParams = new URLSearchParams(window.location.search);
    const isPreviewUnlocked = urlParams.get('unlock') === '1';
    const isDateReached = new Date() >= TARGET_DATE;

    let countdownInterval = null;

    function showLetterEntrance() {
        if (countdownInterval) clearInterval(countdownInterval);
        lockScreen.classList.add('hidden');
        mainContainer.classList.remove('hidden');
    }

    function updateCountdown() {
        const now = new Date();
        const diff = TARGET_DATE - now;

        if (diff <= 0) {
            showLetterEntrance();
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        cdDays.textContent = String(days).padStart(2, '0');
        cdHours.textContent = String(hours).padStart(2, '0');
        cdMinutes.textContent = String(minutes).padStart(2, '0');
        cdSeconds.textContent = String(seconds).padStart(2, '0');
    }

    function showLockCountdown() {
        mainContainer.classList.add('hidden');
        lockScreen.classList.remove('hidden');
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    if (isDateReached || isPreviewUnlocked) {
        showLetterEntrance();
    } else {
        showLockCountdown();
    }

    const particlesContainer = document.getElementById('particles');
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 15 + 5;
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 10;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

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

    const textContent = `Tak sadar ku temukan, arti kebahagiaan yang selama ini kucari ternyata ada pada seseorang yang kini dengan bangga kupanggil istriku.

Kehadiranmu mengubah banyak hal dalam hidupku. Bersamamu, aku belajar bahwa cinta bukan sekadar tentang rasa, melainkan tentang memilih untuk tetap bertahan dan saling menggenggam di setiap keadaan.

Dia buatku nyaman.
Bukan karena dunia terasa indah saat bersamanya, melainkan karena di sisinya aku selalu merasa pulang.

Ada rasa tenang yang sulit dijelaskan setiap kali bersamamu. Seakan-akan, sesulit apa pun hari yang telah kulewati, semuanya terasa menjadi lebih ringan ketika aku melihatmu.

Aku bahagia ketika dunia membuatku lelah aku memiliki tempat untuk bersandar.
Bersamamu, aku bisa menjadi diriku sendiri dengan segala kekuranganku.
Di setiap langkah yang kita tempuh bersama, aku selalu menemukan alasan baru untuk semakin mencintaimu.

Tak terasa, dua tahun sudah kita mengarungi perjalanan ini.
Rasanya seperti baru kemarin kita mengucapkan janji untuk saling menjaga, namun kini begitu banyak kenangan indah yang telah kita ukir bersama.

Dua tahun ini mengajarkanku bahwa kebahagiaan tak selalu hadir dalam bentuk hal-hal besar. Terkadang kebahagiaan hadir lewat percakapan sederhana atau sekadar menikmati waktu bersamamu. Dari setiap momen itu aku menyadari bahwa menikahimu adalah anugerah terindah dalam hidupku.

Terima kasih telah menjadi rumah bagi hatiku, tempat di mana aku selalu ingin pulang.
Terima kasih karena telah menerimaku, bukan hanya saat aku berada di titik terbaik, tetapi juga ketika aku sedang lelah, keras kepala, dan masih jauh dari sempurna.
Terima kasih telah mencintaiku dengan sabar, melengkapi setiap bagian hidupku, mewarnai hari-hariku.

Mungkin belum semua impian kita dapat terwujud hari ini, tapi percayalah bahwa apa yang selama ini kamu inginkan sedang suamimu usahakan. Namun, maafkan suamimu ini jika masih belum bisa memberikan apa yang selama ini engkau impikan.

Aku tak tau bagaimana perjalanan kita di masa depan. Mungkin banyak ujian atau hari-hari berat yang harus kita lewati, namun satu yang aku tau, apa pun yang terjadi aku ingin melewati semuanya bersamamu, aku takkan pernah lelah menciptakan kenangan indah yang kelak akan kita kenang bersama.

Jika aku diberi kesempatan untuk mengulang hidupku dari awal, aku akan tetap memilihmu, menggenggam tanganmu, dan berjalan bersamamu.{jeda500}

Karena bersamamu semua terasa indah.{jeda3000}
Gundah gulana hatiku telah hancur sirna.{jeda3000}
Janjiku takkan kulepas wahai kau bidadariku dari surga.{jeda3800}
Tuk selamanya ☺{jeda4000}

Semoga cinta yang kita miliki hari ini tak pernah berhenti bertumbuh. Selamat hari jadi pernikahan kita yang kedua, Sayang.

Terima kasih telah menjadi istriku, rumahku, dan tempat pulangku. Aku akan selalu mencintaimu, hari ini, esok, dan selama-lamanya.`;

    const highlightPhrases = [
        { start: 'Tak sadar ku temukan,', end: 'Tak sadar ku temukan,' },
        { start: 'Dia buatku nyaman.', end: 'Dia buatku nyaman.' },
        { start: 'Karena bersamamu semua terasa indah.', end: 'Tuk selamanya ☺' },
    ];
    const highlightRanges = highlightPhrases
        .map(({ start: startMarker, end: endMarker }) => {
            const start = textContent.indexOf(startMarker);
            if (start === -1) return null;
            const endMarkerIdx = textContent.indexOf(endMarker, start);
            if (endMarkerIdx === -1) return null;
            return { start, end: endMarkerIdx + endMarker.length - 1 };
        })
        .filter(Boolean);

    let activeHighlightSpan = null;

    const PAUSE_TOKEN_REGEX = /^\{jeda(\d+)\}/;

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
        bgMusic.volume = 0;
        bgMusic.play().catch(() => {});
        let vol = 0;
        const fadeInMusic = setInterval(() => {
            vol += 0.05;
            if (vol >= 1) {
                vol = 1;
                clearInterval(fadeInMusic);
            }
            bgMusic.volume = vol;
        }, 150);

        envelopeWrapper.style.animation = 'none';

        btnOpen.style.transform = 'translateY(15px)';
        btnOpen.style.opacity = '0';
        btnOpen.style.pointerEvents = 'none';

        envelope.classList.add('open');

        setTimeout(() => {
            envelope.classList.add('extract');
            triggerPetalBurst();
        }, 800);

        setTimeout(() => {
            introScreen.classList.add('fade-out');
            bgBlur.classList.add('active');
            letterScreen.classList.remove('hidden');

            setTimeout(() => {
                letterScreen.classList.add('active');

                setTimeout(() => {
                    typeWriter(textContent, 0);
                }, 1000);
            }, 50);

        }, 2500);
    });

    function typeWriter(text, i) {
        if (i < text.length) {
            const pauseMatch = text.slice(i).match(PAUSE_TOKEN_REGEX);
            if (pauseMatch) {
                const pauseMs = parseInt(pauseMatch[1], 10);
                setTimeout(() => typeWriter(text, i + pauseMatch[0].length), pauseMs);
                return;
            }

            const char = text.charAt(i);

            if (highlightRanges.some((r) => r.start === i)) {
                const span = document.createElement('span');
                span.className = 'highlight-word';
                typewriterText.appendChild(span);
                activeHighlightSpan = span;
            }

            appendChar(activeHighlightSpan || typewriterText, char);

            if (highlightRanges.some((r) => r.end === i)) {
                activeHighlightSpan = null;
            }

            requestAutoScroll();

            const minSpeed = 40;
            const maxSpeed = 80;
            let speed = Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed;

            if (char === '.' || char === ',') {
                speed += 400;
            }

            setTimeout(() => typeWriter(text, i + 1), speed);
        } else {
            letterStamp.classList.add('show');
            requestAutoScroll();
        }
    }
});
