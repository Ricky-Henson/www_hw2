document.addEventListener("DOMContentLoaded", function () {
  const whiteKeys = document.querySelectorAll(".white-key");
  const blackKeys = document.querySelectorAll(".black-key");
  const buttons = document.querySelectorAll("button");
  const audioFiles = {
    a: "tunes/a.wav",
    s: "tunes/s.wav",
    d: "tunes/d.wav",
    f: "tunes/f.wav",
    g: "tunes/g.wav",
    h: "tunes/h.wav",
    j: "tunes/j.wav",
    k: "tunes/k.wav",
    l: "tunes/l.wav",
    semicolon: "tunes/;.wav",
    w: "tunes/w.wav",
    e: "tunes/e.wav",
    t: "tunes/t.wav",
    y: "tunes/y.wav",
    u: "tunes/u.wav",
    o: "tunes/o.wav",
    p: "tunes/p.wav",
  };
  let isRecording = false;
  let recordedNotes = [];
  let volume = 0.5; // Default volume
  let volumeSlider = document.getElementById("volume-slider");
  let recordSwitch = document.getElementById("record-switch");

  whiteKeys.forEach((key) => {
    key.addEventListener("click", () => playSound(key.dataset.note));
  });

  blackKeys.forEach((key) => {
    key.addEventListener("click", () => playSound(key.dataset.note));
  });

  volumeSlider.addEventListener("input", function () {
    volume = volumeSlider.value;
  });

  recordSwitch.addEventListener("change", function () {
    if (recordSwitch.checked) {
      isRecording = true;
      recordedNotes = [];
    } else {
      isRecording = false;
    }
  });

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.add("clicked");
      setTimeout(() => button.classList.remove("clicked"), 200);
      if (button.id === "playback") {
        isRecording = false;
        playRecordedNotes(recordedNotes);
      } else if (button.id === "clear") {
        isRecording = false;
        recordedNotes = [];
        alert("已清空 !");
      }
    });
  });

  document.addEventListener("keydown", function (event) {
    let key = event.key;
    if (key === ";") {
      key = "semicolon";
    }
    const note = audioFiles[key];
    if (note) {
      playSound(key);
      const pianoKey = document.querySelector(`[data-note="${key}"]`);
      if (pianoKey) {
        pianoKey.classList.add("clicked");
        setTimeout(() => pianoKey.classList.remove("clicked"), 200);
      }
    }
  });

  function playSound(note) {
    const audio = new Audio(audioFiles[note]);
    audio.volume = volume;
    audio.play();
    if (isRecording) {
      recordedNotes.push(note);
    }
    const key = document.querySelector(`[data-note="${note}"]`);
    if (key) {
      key.classList.add("key-pressed");
      setTimeout(() => key.classList.remove("key-pressed"), 200);
    }
  }

  function playRecordedNotes(notes) {
    notes.forEach((note, index) => {
      setTimeout(() => playSound(note), index * 350); // Play notes with a delay
    });
  }
});
