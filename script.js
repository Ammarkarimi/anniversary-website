(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const rand = (min, max) => Math.random() * (max - min) + min;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const HEARTS = ["💖", "💕", "💗", "💓", "💘", "💝", "❤️", "🩷", "🌸", "✨"];

  /* ---------------- names from config ---------------- */
  $$(".to-name").forEach((el) => (el.textContent = CONFIG.to));
  $$(".from-name").forEach((el) => (el.textContent = CONFIG.from));
  $$(".to-full").forEach((el) => (el.textContent = CONFIG.toFull));
  $$(".from-full").forEach((el) => (el.textContent = CONFIG.fromFull));
  $("#init-to").textContent = CONFIG.to.charAt(0);
  $("#init-from").textContent = CONFIG.from.charAt(0);
  $("#anniv-num").textContent = CONFIG.anniversaryNumber ? CONFIG.anniversaryNumber + " " : "";
  $("#year").textContent = new Date().getFullYear();

  /* ---------------- floating hearts background ---------------- */
  const heartBg = $("#heart-bg");
  function spawnFloatingHeart() {
    const h = document.createElement("span");
    h.className = "float-heart";
    h.textContent = pick(HEARTS);
    h.style.left = rand(0, 100) + "vw";
    h.style.fontSize = rand(14, 34) + "px";
    h.style.animationDuration = rand(9, 18) + "s";
    h.addEventListener("animationend", () => h.remove());
    heartBg.appendChild(h);
  }
  if (!reducedMotion) {
    for (let i = 0; i < 10; i++) setTimeout(spawnFloatingHeart, i * 400);
    setInterval(spawnFloatingHeart, 900);
  }

  /* ---------------- cursor sparkle trail ---------------- */
  let lastSparkle = 0;
  function sparkleAt(x, y, count = 1, chars = ["✨", "💖", "💕", "⭐"]) {
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      s.className = "sparkle";
      s.textContent = pick(chars);
      s.style.left = x + "px";
      s.style.top = y + "px";
      s.style.setProperty("--dx", rand(-40, 40) + "px");
      s.style.setProperty("--dy", rand(-50, 30) + "px");
      s.style.fontSize = rand(10, 20) + "px";
      s.addEventListener("animationend", () => s.remove());
      document.body.appendChild(s);
    }
  }
  if (!reducedMotion) {
    window.addEventListener("pointermove", (e) => {
      const now = performance.now();
      if (now - lastSparkle < 45) return;
      lastSparkle = now;
      sparkleAt(e.clientX, e.clientY);
    });
  }
  window.addEventListener("click", (e) => {
    if (!reducedMotion) sparkleAt(e.clientX, e.clientY, 8, HEARTS);
  });

  /* ---------------- confetti ---------------- */
  const canvas = $("#confetti");
  const ctx = canvas.getContext("2d");
  let pieces = [];
  let confettiRunning = false;
  function resizeCanvas() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function confetti(amount = 160, originY = 0.35) {
    if (reducedMotion) return;
    const colors = ["#ff5fa2", "#e6337f", "#ffd1e3", "#ffb38a", "#c9a7ff", "#ffffff", "#ffe066"];
    const w = window.innerWidth;
    const h = window.innerHeight;
    for (let i = 0; i < amount; i++) {
      const heart = Math.random() < 0.2;
      pieces.push({
        x: w / 2 + rand(-w * 0.15, w * 0.15),
        y: h * originY,
        vx: rand(-9, 9),
        vy: rand(-14, -4),
        size: heart ? rand(14, 24) : rand(6, 11),
        color: pick(colors),
        rot: rand(0, Math.PI * 2),
        vr: rand(-0.2, 0.2),
        heart,
        life: 0,
      });
    }
    if (!confettiRunning) {
      confettiRunning = true;
      requestAnimationFrame(drawConfetti);
    }
  }
  function drawConfetti() {
    const dpr = devicePixelRatio;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    pieces.forEach((p) => {
      p.vy += 0.28;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life++;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      if (p.heart) {
        ctx.font = `${p.size}px serif`;
        ctx.fillText("💖", -p.size / 2, p.size / 2);
      } else {
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }
      ctx.restore();
    });
    pieces = pieces.filter((p) => p.y < window.innerHeight + 40 && p.life < 400);
    if (pieces.length) requestAnimationFrame(drawConfetti);
    else {
      confettiRunning = false;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  /* ---------------- music (only if the file exists) ---------------- */
  const music = $("#music");
  const musicBtn = $("#music-btn");
  if (CONFIG.music) {
    fetch(CONFIG.music, { method: "HEAD" })
      .then((r) => {
        if (!r.ok) return;
        music.src = CONFIG.music;
        musicBtn.hidden = false;
      })
      .catch(() => {});
  }
  function playMusic() {
    if (!music.src) return;
    music.play().then(() => musicBtn.classList.add("playing")).catch(() => {});
  }
  musicBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (music.paused) playMusic();
    else {
      music.pause();
      musicBtn.classList.remove("playing");
    }
  });

  /* ---------------- envelope intro ---------------- */
  const intro = $("#intro");
  const envelope = $("#envelope");
  const site = $("#site");
  envelope.addEventListener("click", () => {
    if (envelope.classList.contains("open")) return;
    envelope.classList.add("open");
    playMusic();
    setTimeout(() => {
      site.hidden = false;
      document.body.classList.remove("locked");
      intro.classList.add("gone");
      confetti(140, 0.7);
      initReveal();
    }, 1300);
    setTimeout(() => intro.remove(), 2300);
  });

  /* ---------------- scroll reveal ---------------- */
  function initReveal() {
    const targets = $$(".section-title, .section-sub, .count-box, .stat, .tl-item, .polaroid, .reason-machine, .flip, .game-board, .paper, .question-card");
    targets.forEach((t) => t.classList.add("reveal"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.15 }
    );
    targets.forEach((t) => io.observe(t));
  }

  /* ---------------- together counter ---------------- */
  const since = new Date(CONFIG.togetherSince + "T00:00:00");
  function tick() {
    const now = new Date();
    let years = now.getFullYear() - since.getFullYear();
    const anniv = new Date(since);
    anniv.setFullYear(since.getFullYear() + years);
    if (anniv > now) {
      years--;
      anniv.setFullYear(since.getFullYear() + years);
    }
    let diff = Math.max(0, now - anniv);
    const days = Math.floor(diff / 864e5); diff -= days * 864e5;
    const hours = Math.floor(diff / 36e5); diff -= hours * 36e5;
    const mins = Math.floor(diff / 6e4); diff -= mins * 6e4;
    const secs = Math.floor(diff / 1e3);
    $("#c-years").textContent = Math.max(0, years);
    $("#c-days").textContent = days;
    $("#c-hours").textContent = hours;
    $("#c-mins").textContent = mins;
    $("#c-secs").textContent = secs;

    const totalDays = Math.max(0, Math.floor((now - since) / 864e5));
    $("#s-hugs").textContent = (totalDays * 7).toLocaleString();
    $("#s-kisses").textContent = (totalDays * 12).toLocaleString();
    $("#s-fights").textContent = Math.max(1, Math.floor(totalDays / 3)).toLocaleString();
  }
  tick();
  setInterval(tick, 1000);

  /* ---------------- timeline ---------------- */
  $("#timeline").innerHTML = CONFIG.timeline
    .map(
      (t) => `
      <div class="tl-item">
        <div class="tl-dot">${t.emoji}</div>
        <div class="tl-card">
          <span class="tl-date">${t.date}</span>
          <h3>${t.title}</h3>
          <p>${t.text}</p>
        </div>
      </div>`
    )
    .join("");

  /* ---------------- gallery ---------------- */
  const PH_EMOJI = ["📷", "🥰", "💑", "🌷", "🧸", "🍓", "🎀", "🌈", "🦋", "💐", "🌙", "🍰"];
  const PH_BG = [
    "linear-gradient(135deg,#ffd1e3,#e7d6ff)",
    "linear-gradient(135deg,#ffe0cc,#ffd1e3)",
    "linear-gradient(135deg,#e7d6ff,#d4f0ff)",
    "linear-gradient(135deg,#fff1b8,#ffd1e3)",
    "linear-gradient(135deg,#d6ffe9,#e7d6ff)",
  ];
  const placeholderHTML = (i) =>
    `<div class="placeholder" style="--ph-bg:${PH_BG[i % PH_BG.length]}">
       <span class="ph-emoji">${PH_EMOJI[i % PH_EMOJI.length]}</span>
       <span class="ph-text">photo coming soon</span>
     </div>`;
  const loaded = {}; // index -> true when the real photo loaded

  const grid = $("#gallery-grid");
  CONFIG.photos.forEach((p, i) => {
    const fig = document.createElement("button");
    fig.className = "polaroid";
    fig.style.setProperty("--rot", rand(-6, 6).toFixed(1) + "deg");
    fig.innerHTML = `<div class="polaroid-img">${placeholderHTML(i)}</div><figcaption>${p.caption}</figcaption>`;
    const img = new Image();
    img.alt = p.caption;
    img.onload = () => {
      loaded[i] = true;
      const box = $(".polaroid-img", fig);
      box.innerHTML = "";
      box.appendChild(img);
    };
    img.src = p.src;
    fig.addEventListener("click", () => openLightbox(i));
    grid.appendChild(fig);
  });

  /* lightbox */
  const lb = $("#lightbox");
  const lbMedia = $("#lb-media");
  const lbCaption = $("#lb-caption");
  let lbIndex = 0;
  function renderLightbox() {
    const p = CONFIG.photos[lbIndex];
    if (loaded[lbIndex]) {
      lbMedia.classList.add("has-img");
      lbMedia.innerHTML = `<img src="${p.src}" alt="">`;
      $("img", lbMedia).alt = p.caption;
    } else {
      lbMedia.classList.remove("has-img");
      lbMedia.innerHTML = placeholderHTML(lbIndex);
    }
    lbCaption.textContent = p.caption;
  }
  function openLightbox(i) {
    lbIndex = i;
    renderLightbox();
    lb.hidden = false;
  }
  const step = (d) => {
    lbIndex = (lbIndex + d + CONFIG.photos.length) % CONFIG.photos.length;
    renderLightbox();
  };
  $("#lb-close").addEventListener("click", () => (lb.hidden = true));
  $("#lb-prev").addEventListener("click", (e) => { e.stopPropagation(); step(-1); });
  $("#lb-next").addEventListener("click", (e) => { e.stopPropagation(); step(1); });
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.hidden = true; });
  window.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") lb.hidden = true;
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  /* ---------------- reasons machine ---------------- */
  let reasonPool = [];
  let reasonCount = 0;
  const reasonCard = $("#reason-card");
  $("#reason-btn").addEventListener("click", (e) => {
    if (!reasonPool.length) reasonPool = [...CONFIG.reasons].sort(() => Math.random() - 0.5);
    reasonCount++;
    $("#reason-num").textContent = "#" + reasonCount;
    $("#reason-text").textContent = reasonPool.pop();
    reasonCard.classList.remove("pop");
    void reasonCard.offsetWidth;
    reasonCard.classList.add("pop");
    if (reasonCount % 5 === 0) confetti(80, 0.5);
    e.currentTarget.textContent = pick(["Another one! 💘", "More please 🥺", "Keep going 💕", "One more! 💖", "Again!! 😍"]);
  });

  /* open-when flip cards */
  $$(".flip").forEach((f) => f.addEventListener("click", () => f.classList.toggle("flipped")));

  /* ---------------- catch-the-hearts game ---------------- */
  const board = $("#game-board");
  const startBtn = $("#game-start");
  const msg = $("#game-msg");
  const scoreEl = $("#score");
  const timerEl = $("#timer");
  const GOAL = 20;
  let score = 0;
  let timeLeft = 30;
  let playing = false;
  let spawner = null;
  let countdown = null;
  let items = [];

  function startGame() {
    score = 0;
    timeLeft = 30;
    playing = true;
    scoreEl.textContent = score;
    timerEl.textContent = timeLeft;
    startBtn.hidden = true;
    msg.hidden = true;
    spawner = setInterval(spawnItem, 520);
    countdown = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;
      if (timeLeft <= 0) endGame(false);
    }, 1000);
    requestAnimationFrame(moveItems);
  }
  function spawnItem() {
    const bad = Math.random() < 0.18;
    const el = document.createElement("button");
    el.className = "game-item";
    el.textContent = bad ? "💔" : pick(["💖", "💕", "💗", "💘", "❤️", "🩷"]);
    const x = rand(10, board.clientWidth - 60);
    el.style.left = x + "px";
    const item = { el, y: 0, speed: rand(1.8, 3.6) + (30 - timeLeft) * 0.05, rot: 0, vr: rand(-3, 3), bad };
    el.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      catchItem(item, e);
    });
    board.appendChild(el);
    items.push(item);
  }
  function catchItem(item, e) {
    if (!playing || item.done) return;
    item.done = true;
    item.el.classList.add("caught");
    setTimeout(() => item.el.remove(), 350);
    const rect = board.getBoundingClientRect();
    const fs = document.createElement("span");
    fs.className = "float-score";
    fs.style.left = e.clientX - rect.left + "px";
    fs.style.top = e.clientY - rect.top + "px";
    if (item.bad) {
      score = Math.max(0, score - 2);
      fs.textContent = "-2 💔";
      board.classList.remove("shake");
      void board.offsetWidth;
      board.classList.add("shake");
    } else {
      score++;
      fs.textContent = pick(["+1 💖", "+1 😘", "+1 🥰", "+1 ✨"]);
    }
    fs.addEventListener("animationend", () => fs.remove());
    board.appendChild(fs);
    scoreEl.textContent = score;
    if (score >= GOAL) endGame(true);
  }
  function moveItems() {
    if (!playing) return;
    const limit = board.clientHeight + 10;
    items.forEach((it) => {
      if (it.done) return;
      it.y += it.speed;
      it.rot += it.vr;
      it.el.style.transform = `translateY(${it.y}px) rotate(${it.rot}deg)`;
      if (it.y > limit) {
        it.done = true;
        it.el.remove();
      }
    });
    items = items.filter((it) => !it.done);
    requestAnimationFrame(moveItems);
  }
  function endGame(won) {
    playing = false;
    clearInterval(spawner);
    clearInterval(countdown);
    items.forEach((it) => it.el.remove());
    items = [];
    msg.hidden = false;
    if (won) {
      msg.innerHTML = `
        <h3>You caught my heart! 💘</h3>
        <p>Secret unlocked 🔓: You don't need to catch it, ${CONFIG.to}... it's been yours all along. 🥰<br>
        <b>Redeem this for one unlimited hug coupon 🎟️🤗</b></p>
        <button class="btn" id="game-again">Play again 🔁</button>`;
      confetti(200, 0.5);
    } else {
      msg.innerHTML = `
        <h3>Aww, so close! 🥺</h3>
        <p>You caught ${score} hearts. Don't worry, you already have mine. But try again for the secret! 😉</p>
        <button class="btn" id="game-again">Try again 💪</button>`;
    }
    $("#game-again").addEventListener("click", startGame);
  }
  startBtn.addEventListener("click", startGame);

  /* ---------------- typewriter love letter ---------------- */
  const letterEl = $("#letter-text");
  const letterBtn = $("#letter-btn");
  letterBtn.addEventListener("click", () => {
    letterBtn.hidden = true;
    const text = CONFIG.letter;
    if (reducedMotion) {
      letterEl.textContent = text;
      return;
    }
    letterEl.classList.add("typing");
    let i = 0;
    (function type() {
      letterEl.textContent = text.slice(0, ++i);
      if (i < text.length) {
        const ch = text[i - 1];
        setTimeout(type, ch === "\n" ? 260 : ".,!?".includes(ch) ? 180 : rand(18, 42));
      } else {
        letterEl.classList.remove("typing");
        confetti(120, 0.6);
      }
    })();
  });

  /* ---------------- the big question ---------------- */
  const noBtn = $("#no-btn");
  const yesBtn = $("#yes-btn");
  const noTexts = ["No 🙄", "Are you sure? 🥺", "Think again! 😤", "Wrong button 😾", "Nope, try again 🙅‍♀️", "You can't catch me 😜", "Pleaseee 🥹", "Error 404: No not found 🤖", "Just press YES 💖"];
  let noCount = 0;
  let yesScale = 1;
  function runAway() {
    noCount++;
    noBtn.textContent = noTexts[noCount % noTexts.length];
    noBtn.classList.add("runaway");
    const pad = 20;
    const maxX = window.innerWidth - noBtn.offsetWidth - pad;
    const maxY = window.innerHeight - noBtn.offsetHeight - pad;
    noBtn.style.left = rand(pad, maxX) + "px";
    noBtn.style.top = rand(pad + 60, maxY) + "px";
    yesScale = Math.min(yesScale + 0.15, 2.2);
    yesBtn.style.transform = `scale(${yesScale})`;
  }
  noBtn.addEventListener("pointerenter", runAway);
  noBtn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    runAway();
  });
  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    runAway();
  });

  function celebrate() {
    confetti(260, 0.4);
    setTimeout(() => confetti(200, 0.25), 500);
    setTimeout(() => confetti(200, 0.55), 1000);
  }
  yesBtn.addEventListener("click", () => {
    noBtn.remove();
    $("#question-card").hidden = true;
    $("#celebration").hidden = false;
    celebrate();
  });
  $("#again-btn").addEventListener("click", celebrate);
})();
