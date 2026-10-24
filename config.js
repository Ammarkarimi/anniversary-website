// =====================================================================
//  💖 EDIT EVERYTHING HERE 💖
//  All the personal bits of the website live in this one file.
// =====================================================================

const CONFIG = {
  from: "Rafika",
  to: "Hammad",
  fromFull: "Rafika Karimi",
  toFull: "Hammad Payawala",

  // Our shaadi day (YYYY-MM-DD). Used for the "married for" counter.
  togetherSince: "2025-10-25",

  // Which anniversary this is (shown in the hero). e.g. "1st", "2nd", "3rd"
  anniversaryNumber: "1st",

  // ---------------------------------------------------------------
  //  🔒 THE LOCK — he has to answer this before the website opens
  //  (month is 1-12). It's a cute gate, not real security: anyone
  //  who reads this file can see the answer.
  // ---------------------------------------------------------------
  lock: {
    question: "When did we meet for the first time?",
    answer: { day: 9, month: 12, year: 2023 },
    yearsFrom: 2015,
    yearsTo: 2026,
  },

  // Optional background music: put an mp3 at assets/music.mp3 and it will
  // show a music button. Leave as-is if you don't want music.
  music: "assets/music.mp3",

  // The photo shown big on the home screen
  heroPhoto: "photos/01.jpg",

  // ---------------------------------------------------------------
  //  📸 PHOTOS — in the /photos folder, shown in this order.
  //  If a file is missing, a cute placeholder is shown instead.
  // ---------------------------------------------------------------
  photos: [
    { src: "photos/01.jpg", caption: "Qubool hai, forever 💍" },
    { src: "photos/02.jpg", caption: "Mr & Mrs, officially 💚" },
    { src: "photos/03.jpg", caption: "Suited up, all for me 🤵💗" },
    { src: "photos/04.jpg", caption: "Getting ready, together 🌸" },
    { src: "photos/05.jpg", caption: "Mehendi hands & boarding passes ✈️" },
    { src: "photos/06.jpg", caption: "Best seat = next to you 💺" },
    { src: "photos/07.jpg", caption: "On top of the world with you 🏔️" },
    { src: "photos/08.jpg", caption: "Sunglasses & sunshine 😎" },
    { src: "photos/09.jpg", caption: "Snow, sun & my person ❄️" },
    { src: "photos/10.jpg", caption: "Cuddles to beat the cold 🥶🤗" },
    { src: "photos/11.jpg", caption: "Lost in the meadows with you 🌲" },
    { src: "photos/12.jpg", caption: "Pink flowers, pinker cheeks 🌺" },
    { src: "photos/13.jpg", caption: "Matching watches, matching hearts ⌚" },
    { src: "photos/14.jpg", caption: "Night out, heart full 🌙" },
    { src: "photos/15.jpg", caption: "Candlelight & you 🕯️" },
  ],

  // ---------------------------------------------------------------
  //  📖 OUR STORY — timeline moments (photo is optional)
  // ---------------------------------------------------------------
  timeline: [
    { date: "9 Dec 2023",      emoji: "✨", title: "The day we first met",   text: "An ordinary day that turned out to be the most important day of my life. I had no idea... but my heart did." },
    { date: "Then...",         emoji: "💘", title: "When I knew",            text: "Somewhere between the laughter and the late-night talks, I fell for you completely." },
    { date: "25 Oct 2025",     emoji: "💍", title: "Our Shaadi",             text: "Qubool hai. The day I became yours and you became mine — officially, forever, no take-backs.", photo: "photos/01.jpg" },
    { date: "Our First Trip",  emoji: "🏔️", title: "Up in the mountains",    text: "Snow, sunshine, matching sunglasses, and you holding my hand the whole way up.", photo: "photos/10.jpg" },
    { date: "Year One",        emoji: "🏡", title: "Building our world",     text: "Candlelight dinners, silly selfies, matching watches — every little moment made us stronger.", photo: "photos/15.jpg" },
    { date: "25 Oct 2026",     emoji: "🎉", title: "Happy 1st Anniversary!", text: "One year down, forever to go. I can't wait for all our tomorrows." },
  ],

  // ---------------------------------------------------------------
  //  💌 REASONS I LOVE YOU — the "reason machine" picks from these
  // ---------------------------------------------------------------
  reasons: [
    "The way you laugh at your own jokes before you even finish them 😂",
    "You make me feel safe, always 🫶",
    "Your hugs fix literally everything 🤗",
    "You're my best friend AND my favourite human 💕",
    "The way you look at me when you think I'm not watching 👀",
    "You always know how to make me smile, even on bad days 🌈",
    "You're so patient with me (even when I'm being dramatic) 🙈",
    "Your terrible dance moves. Never change. 🕺",
    "You remember the little things 🧸",
    "You make ordinary days feel like adventures 🚀",
    "Because you're YOU, and that's more than enough 💖",
    "You steal my fries and I still love you 🍟",
    "The way you say my name 🥺",
    "You believe in me even when I don't 🌟",
    "Every day with you is my favourite day 📅",
  ],

  // ---------------------------------------------------------------
  //  ✍️ THE LOVE LETTER (use \n\n for new paragraphs)
  // ---------------------------------------------------------------
  letter:
    "My dearest Hammad,\n\n" +
    "Happy 1st Anniversary, my love! One whole year of being your wife, and I made this little corner of the internet just for you, because a card felt way too small for everything I feel.\n\n" +
    "Thank you for every laugh, every late-night conversation, every time you held my hand without me asking. Thank you for loving me on my good days and even more on my messy ones.\n\n" +
    "You are my home, my peace, my favourite notification, and my forever person. I fall in love with you a little more every single day — and I promise to keep choosing you, again and again.\n\n" +
    "Here's to us, to all the memories we've made, and to the million more we're going to make.\n\n" +
    "Forever yours,\nRafika 💖",
};
