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

  // Optional background music: put an mp3 at assets/music.mp3 and it will
  // show a music button. Leave as-is if you don't want music.
  music: "assets/music.mp3",

  // ---------------------------------------------------------------
  //  📸 PHOTOS — drop your pictures in the /photos folder and list
  //  them here. Until a photo exists, a cute placeholder is shown.
  // ---------------------------------------------------------------
  photos: [
    { src: "photos/1.jpg",  caption: "The day it all began 💫" },
    { src: "photos/2.jpg",  caption: "Our first date 🍝" },
    { src: "photos/3.jpg",  caption: "That smile tho 😍" },
    { src: "photos/4.jpg",  caption: "Adventure buddies 🌍" },
    { src: "photos/5.jpg",  caption: "Silly us 🤪" },
    { src: "photos/6.jpg",  caption: "My favourite person 💕" },
    { src: "photos/7.jpg",  caption: "Food dates forever 🍕" },
    { src: "photos/8.jpg",  caption: "Sunsets with you 🌅" },
    { src: "photos/9.jpg",  caption: "Us, being cute 🥰" },
  ],

  // ---------------------------------------------------------------
  //  📖 OUR STORY — timeline moments
  // ---------------------------------------------------------------
  timeline: [
    { date: "The Beginning",   emoji: "✨", title: "When we first met",     text: "I had no idea that one moment would change my whole life. But my heart knew." },
    { date: "First Date",      emoji: "☕", title: "Butterflies everywhere", text: "I was so nervous, and you made it feel so easy. I never wanted it to end." },
    { date: "The Moment",      emoji: "💘", title: "When I knew",           text: "Somewhere between the laughter and the late-night talks, I fell for you completely." },
    { date: "25 Oct 2025",     emoji: "💍", title: "Our Shaadi",            text: "The day I became yours and you became mine — officially, forever, no take-backs." },
    { date: "Year One",        emoji: "🏡", title: "Building our world",    text: "Every adventure, every argument, every hug — all of it made us stronger." },
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
