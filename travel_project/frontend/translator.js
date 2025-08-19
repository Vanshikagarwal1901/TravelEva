document.addEventListener("DOMContentLoaded", () => {
  const translateBtn = document.getElementById("translateBtn");
  const inputText = document.getElementById("input-text");
  const outputText = document.getElementById("output-text");
  const fromLang = document.getElementById("from-language");
  const toLang = document.getElementById("to-language");
  const swapBtn = document.getElementById("swapBtn");
  const copyBtn = document.getElementById("copyBtn");
  const speakBtn = document.getElementById("speakBtn");
  const micBtn = document.getElementById("micBtn");

  // Swap languages
  swapBtn.addEventListener("click", () => {
    const temp = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = temp;
    outputText.textContent = "Translation will appear here...";
  });

  // Translation button click
  translateBtn.addEventListener("click", async () => {
    const text = inputText.value.trim();
    const source = fromLang.value;
    const target = toLang.value;

    if (!text) {
      outputText.textContent = "⚠️ Please enter text to translate.";
      return;
    }

    if (source === target) {
      outputText.textContent = "⚠️ Source and target languages cannot be the same.";
      return;
    }

    outputText.textContent = "⏳ Translating...";

    try {
      const langpair = `${source}|${target}`;
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.responseStatus !== 200) {
        outputText.textContent = `❌ Error: ${data.responseDetails || "Translation failed."}`;
      } else {
        outputText.textContent = data.responseData.translatedText;
      }
    } catch (err) {
      console.error("Translation error:", err);
      outputText.textContent = "❌ Error translating.";
    }
  });

  // Copy translated text
  copyBtn.addEventListener("click", () => {
    const text = outputText.textContent;
    if (text && text !== "Translation will appear here...") {
      navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
      });
    }
  });

  // Speak translated text (text-to-speech)
  speakBtn.addEventListener("click", () => {
    const text = outputText.textContent;
    const lang = toLang.value;
    if (text && text !== "Translation will appear here...") {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      speechSynthesis.speak(utterance);
    }
  });

  // Speech recognition for input (voice to text)
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.interimResults = false;

    micBtn.addEventListener("click", () => {
      recognition.lang = fromLang.value; // Use selected source language
      recognition.start();
      micBtn.textContent = "🎤 Listening...";
      micBtn.disabled = true;
    });

    recognition.addEventListener("result", (event) => {
      const transcript = event.results[0][0].transcript;
      inputText.value = transcript;
    });

    recognition.addEventListener("end", () => {
      micBtn.textContent = "🎤 Speak";
      micBtn.disabled = false;
    });

    recognition.addEventListener("error", (e) => {
      console.error("Speech recognition error", e);
      micBtn.textContent = "🎤 Speak";
      micBtn.disabled = false;
    });
  } else {
    micBtn.disabled = true;
    micBtn.title = "Speech recognition not supported in this browser.";
  }
});
