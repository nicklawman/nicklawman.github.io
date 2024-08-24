const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const currTime = document.querySelector("#currTime");
const durTime = document.querySelector("#durTime");
const lyricContainer = document.querySelector(".lyric");

// Song titles
const songs = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];

// Lyrics list
const lyric_list = {
    "01": `
(Verse 1)
When life moves on, I’ve found my way,
Left behind the daily grind, no need to stay.
In the mountains, where the trees sway,
I teach the young, in nature’s bright array.

(Chorus)
The mountains call, with a mystic song,
My soul, it dances, where I belong.
With wisdom gained through years so long,
In the quiet hills, I feel so strong.

(Verse 2)
The peaks afar, in mist they hide,
No tourists here, just the mountains wide.
With the spirits of old, walking by my side,
In this peaceful place, I take my stride.

(Chorus)
The mountains call, with a mystic song,
My soul, it dances, where I belong.
With wisdom gained through years so long,
In the quiet hills, I feel so strong.

(Bridge)
I’ve never felt this young before,
Though age knocks softly at my door.
I share my life, my learned lore,
With those who need it, ever more.

(Chorus)
The mountains call, with a mystic song,
My soul, it dances, where I belong.
With wisdom gained through years so long,
In the quiet hills, I feel so strong.

(Outro)
My old age here begins to bloom,
In simple peace, no trace of gloom.
Contentment in the mountain’s room,
Where life and nature find their tune.
    `,
    "02": `
Verse 1:
I see us high where mountains kiss the sky,
With every breath, just you and I.
By the ocean where the waves break free,
I reach for you, but words elude me.

Chorus:
Let’s not wait, don’t let time drift away,
Before we’re left with words we couldn’t say.
Hold this moment, don’t let it fade to gray,
“If only we had found our way.

Verse 2:
I dream of nights beneath a silver glow,
Where love could bloom, where time moves slow.
But here I am, too scared to try,
Wishing you’d see the tears I cry.

Chorus:
Let’s not wait, don’t let time drift away,
Before we’re left with words we couldn’t say.
Hold this moment, don’t let it fade to gray,
“If only we had found our way.

Bridge:
I long to see the dawn break free,
To chase the day, just you and me.
But silence keeps my heart at bay,
As life’s tide pulls us far away.

Chorus:
So here I stand, with dreams in play,
Hoping you’ll be mine someday.
If only I could find the way,
To say the words I fear each day.
`,
    "03": `
Verse 1:

I was once a cherished soul,
Held close, in her arms, I’d fold.
But slowly, her gaze grew cold,
New dreams called her, far and bold.

Chorus:

She couldn’t meet my eyes that night,
A whispered “Be good, don’t cry.”
With a heart too heavy to fight,
She left without a final goodbye.

Bridge:

I’m good, she knew, but in her sights,
She carved a new life where I had no rights.
Left adrift in a world so bright,
Where I lingered in the shadows, out of sight.

Verse 2:

She had her reasons, I understand,
A new life, new dreams in a distant land.
Once I was her joy, her pride,
Now just a memory she tries to hide.

Chorus:

She couldn’t meet my eyes that night,
A whispered “Be good, don’t cry.”
With a heart too heavy to fight,
She left without a final goodbye.

Bridge (repeated):

I’m good, she knew, but in her sights,
She carved a new life where I had no rights.
Left adrift in a world so bright,
Where I lingered in the shadows, out of sight.

Outro:

Oh, how I wish, how I dream,
For a love that’s more than it seems.
She’d rather lose her life, I plea,
Than to ever abandon, ever lose me.
`,
    "04": `
Verse 1:

In the mountains, I find my home,
A place where the skies are wide and roam.
But in this peaceful, quiet land,
I feel the distance, slipping from my hand.

Chorus:

Petals fall, one by one,
Can’t stop, just see them gone.
Mountains warm, like home they show,
But inside, I'm afraid you’ll go.

Verse 2:

Each time I leave, it’s harder to stay,
Knowing the world’s pulling you away.
I see the signs, I feel the drift,
Hate to admit, but I can’t seem to hold.

Bridge:

The school, the trees, they comfort me,
But in my heart, there’s a silent plea.
For every smile, a tear does hide,
I know the truth, I can’t confide.

Chorus:

Petals fall, one by one,
Can’t stop, just see them gone.
Mountains warm, like home they show,
But inside, I know you’ll go.

Outro:

I’ll stay here, with hope held tight,
In the shadows of the mountain light.
But the petals fall, and I can’t control,
The fear that one day, you’ll leave this role.

`,
    "05": `
Chorus:
We dance in the light, as others fall,
In a world split in two, where dreams stall.
We cheer for stars, while bombs fill the sky,
What echoes in the end? A silent cry.

Verse 1:
On one side, they tremble in the night,
On the other, we bask in the spotlight.
Have we turned blind to the cries of despair?
When half the world’s forgotten, do we even care?

Verse 2:
In crowded streets, our voices soar,
But their cries for peace are drowned by war.
Why are their tears lost in the noise?
When will we act, when will we make the choice?

Bridge:
This stage can’t hide the truth we see,
The world’s divided, but it’s not meant to be.
When we wake, will it be too late?
Or will we rise, before sealing their fate?

Chorus:
We dance in the light, as others fall,
In a world split in two, where dreams stall.
We cheer for stars, while bombs fill the sky,
What echoes in the end? A silent cry.
`,
    "06": `
Verse 1:
In the cold, a mother prays,
For a chance to see her boy who strayed.
Life moves on, but she stays,
In memories where his laughter plays.

Chorus:
She found the drops, in a shop one night,
A promise to bring lost love to light.
With every tear, a wish unfurls,
To hold him close in both their worlds.

Verse 2:
A drop of magic, a fleeting chance,
To bring her son back in a glance.
Through the veil of time and space,
She sees his smile, feels his embrace.

Chorus:
She found the drops, in a shop one night,
A promise to bring lost love to light.
With every tear, a wish unfurls,
To hold him close in both their worlds.

Bridge:
In that moment, time stands still,
She whispers all she never will.
No more words left unsaid,
As she cradles him, heart heavy yet unshed.

Outro:
In her heart, love’s quiet flame,
Burns bright for her boy, without blame.
A magic fleeting, but love remains,
In the tears that wash away her pains.
`,
    "07": `
Verse 1:
Back in the day, we thought we’d crack the code,
Machines with minds, intelligence bestowed.
But we hit a wall, round and round we’d go,
Till AlexNet came, stole the show.
CNN’s rise, a spark in the night,
Prometheus’ fire, AI’s burning light.

Chorus:
It was a dream, now it’s alive,
From the darkness, AI did arise.
One by one, the pieces aligned,
A revolution sparked, in code it’s defined.

Verse 2:
GANs were born, two minds collide,
One creates, the other decides.
Then came the game that no one could best,
AlphaGo’s triumph, put us to the test.
Just one week later, AlphaGo Two,
Left its predecessor in the rear view.

Bridge:
Then the Transformer came, eight minds at work,
Parallel thoughts, a quantum quirk.
Nobody knew the power it’d hold,
Till GPT spoke, and the world was told.

Verse 3:
ChatGPT came, quiet as the night,
But soon enough, it changed the fight.
Suddenly the world, eyes wide in shock,
AI’s here to stay, no more on the clock.

Outro:
From the shadows to the light of day,
AI’s here, it’s here to stay.
What comes next, nobody can say,
But the revolution’s rolling, come what may.

`,
    "08": `
Verse 1:
In stage one, you still feel the fire,
Dreams and goals, your heart’s desire.
This is your time, the clock still runs,
To live and love, before the twilight comes.

Chorus 1:
Hold this stage, the last with high speed,
Strength with discount, yet much can be done.
Do what you must, as if you’re young,
This is your song, it must be sung.

Verse 2:
At stage two, life’s gears start to grind,
Slow and steady, leaving much behind.
Gather what’s left, say goodbye to the rest,
Don’t leave regrets, don’t fail the test.

Chorus 2:
Enjoy the slow pace, while still you can,
Forgive or forget, before life’s final span.
No more new dreams, just finish the list,
Settle your soul before the dark mist.

Verse 3:
Now it’s stage three, you can’t even stand,
Torture begins, till the final end.
Fighting is not real, even your body’s not yours,
Life’s final chapter, closing the doors.

Chorus 3:
Now you show the fighter’s stand,
Yet your strength slips like sand.
You don’t even have the power to press the button,
Unless you planned before it all began.

Outro:
After three stages go, the dark night falls,
Reflect on life, did you stand tall?
It’s not the end that makes it real,
But the paths you walked, the steps you feel.

This isn’t meant to bring you fear,
But to ignite a fire, while the time is clear.
Fix what you can before it’s too late,
Live with intent, and embrace your fate.
`,
    "09": `
Verse 1:

She’s drawn to strength, where alphas lead,
For beta who kneel, her interest won’t seed.
Fear and haste won’t make her stay,
Her feelings fade when you lose your way.

Chorus:

Be the man she craves, strong and wise,
Don’t show your need, keep the surprise.
Act like a king, not a beggar in line,
Reveal too much, and she’ll decline.

Verse 2:

See her too soon as your guiding light,
Your mind spins, you’re losing sight.
What if I lose her, the only Right,
Fear takes hold, you give with all might.

Verse 3:

Her every move, you magnify,
Confidence lost, you wonder why.
In her eyes, you’re just a fleeting try,
Too easily won, not worth the high.

Verse 4:

Expose your need, and she won’t turn,
It’s not her fault, but yours to learn.
In fear, you kneel, but it’s all in vain,
Wrong button pressed, what you expect to return?

Chorus:

Be the man she craves, strong and wise,
Don’t show your need, keep the surprise.
Act like a king, not a beggar in line,
Reveal too much, and she’ll decline.

Bridge:

Keep your focus, build your worth,
Don’t be a beggar, know your worth.
An alpha’s mind is sharp and clear,
He holds his ground, not driven by fear.

Outro:

Some girls are rare, when you find,
Cherish them, but keep in mind,
For most, if you beg and plead,
Wrong button pressed, what do you want to earn.
`,
    10: `
Verse 1:
A boy stood firm on the island’s sand,
Gazed far beyond to a distant land.
He whispered soft, “One day, I’ll see,”
And tossed a coin far across the sea.

Chorus:
Golden Gate in sight, where dreams extend,
From the island’s shore to the ocean’s end.
Through Pacific winds that never cease,
In freedom’s land, they find their peace.

Verse 2:
Years rolled on, and paths were drawn,
From the island’s edge to the early dawn.
With roots now deep in the brave new land,
They stand as one, with futures planned.

Bridge:
By the shore, where the waters meet,
He stands once more, the circle complete.
A coin in hand, he casts it free,
“Here I am, across the sea.”

Outro:
The journey ends, yet it’s just begun,
From brave’s land, a new game’s on.
`,
};

// Title list with longer titles
const title_list = {
    "01": "Now Teach, For You and Young",
    "02": "Before Words Fade",
    "03": "Cheap Love You Can't Afford",
    "04": "Petals Fall",
    "05": "We Are The Worlds",
    "06": "Eye Drops, Words Unsaid",
    "07": "The Story Minds Are Made",
    "08": "Final Game",
    "09": "Do Right, To Win Miss Right",
    10: "Pacific Coins",
};

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
    title.innerText = title_list[song]; // Use the longer title
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;

    // Update lyrics
    if (lyric_list[song]) {
        lyricContainer.innerText = lyric_list[song];
    } else {
        lyricContainer.innerText = "Lyrics not available.";
    }
}

// Play song
function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");

    audio.play();
}

// Pause song
function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");

    audio.pause();
}

// Previous song
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Next song
function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime(e) {
    const { duration, currentTime } = e.srcElement;
    var sec;
    var sec_d;

    // define minutes currentTime
    let min = currentTime == null ? 0 : Math.floor(currentTime / 60);
    min = min < 10 ? "0" + min : min;

    // define seconds currentTime
    function get_sec(x) {
        if (Math.floor(x) >= 60) {
            for (var i = 1; i <= 60; i++) {
                if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
                    sec = Math.floor(x) - 60 * i;
                    sec = sec < 10 ? "0" + sec : sec;
                }
            }
        } else {
            sec = Math.floor(x);
            sec = sec < 10 ? "0" + sec : sec;
        }
    }

    get_sec(currentTime, sec);

    // change currentTime DOM
    currTime.innerHTML = min + ":" + sec;

    // define minutes duration
    let min_d = isNaN(duration) === true ? "0" : Math.floor(duration / 60);
    min_d = min_d < 10 ? "0" + min_d : min_d;

    function get_sec_d(x) {
        if (Math.floor(x) >= 60) {
            for (var i = 1; i <= 60; i++) {
                if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
                    sec_d = Math.floor(x) - 60 * i;
                    sec_d = sec_d < 10 ? "0" + sec_d : sec_d;
                }
            }
        } else {
            sec_d = isNaN(duration) === true ? "0" : Math.floor(x);
            sec_d = sec_d < 10 ? "0" + sec_d : sec_d;
        }
    }

    // define seconds duration

    get_sec_d(duration);

    // change duration DOM
    durTime.innerHTML = min_d + ":" + sec_d;
}

// Event listeners
playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play");

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", nextSong);

// Time of song
audio.addEventListener("timeupdate", DurTime);
