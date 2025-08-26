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
    [fromLang.value, toLang.value] = [toLang.value, fromLang.value];
    outputText.textContent = "Translation will appear here...";
  });

  // Translation
  translateBtn.addEventListener("click", async () => {
    const text = inputText.value.trim();
    if (!text) {
      outputText.textContent = "⚠️ Please enter text to translate.";
      return;
    }
    if (fromLang.value === toLang.value) {
      outputText.textContent = "⚠️ Source and target languages cannot be the same.";
      return;
    }
    outputText.textContent = "⏳ Translating...";
    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang.value}|${toLang.value}`;
      const res = await fetch(url);
      const data = await res.json();
      outputText.textContent = data.responseData.translatedText;
    } catch {
      outputText.textContent = "❌ Error translating.";
    }
  });

  // Copy
  copyBtn.addEventListener("click", () => {
    const text = outputText.textContent;
    if (text && text !== "Translation will appear here...") navigator.clipboard.writeText(text);
  });

  // Speak translation
  speakBtn.addEventListener("click", () => {
    const text = outputText.textContent;
    if (text && text !== "Translation will appear here...") {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = toLang.value;
      speechSynthesis.speak(utterance);
    }
  });

  // Speech recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.interimResults = false;
    micBtn.addEventListener("click", () => {
      recognition.lang = fromLang.value;
      recognition.start();
      micBtn.textContent = "🎤 Listening...";
      micBtn.disabled = true;
    });
    recognition.addEventListener("result", e => inputText.value = e.results[0][0].transcript);
    recognition.addEventListener("end", () => { micBtn.textContent = "🎤 Speak"; micBtn.disabled = false; });
    recognition.addEventListener("error", () => { micBtn.textContent = "🎤 Speak"; micBtn.disabled = false; });
  } else {
    micBtn.disabled = true;
    micBtn.title = "Speech recognition not supported in this browser.";
  }
});
