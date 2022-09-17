export function walkSentence(inputs = '') {
  const _inputs = `${inputs || ''}`.trim();
  if (!_inputs) {
    return [];
  }
  const endpoint = `/api/infer?${new URLSearchParams({ sentence: _inputs })}`;
  return fetch(endpoint)
    .then(res => res.json())
    .then(doc => doc);
}

export function lookupWords(hanzi = '') {
  const _hanzi = `${hanzi || ''}`.trim();
  if (!_hanzi) {
    return [];
  }

  const endpoint = `/api/hanzi/${_hanzi}/words`;
  return fetch(endpoint)
    .then(res => res.json())
    .then(doc => doc);
}

const speakDefaultOptions = {
  lang: 'zh-CN',
  volume: 1,
  rate: 1,
  pitch: 1,
};

const speakList = [];
function _speak(text, opts = speakDefaultOptions) {
  const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance;
  const speechSynthesis = window.speechSynthesis;

  const ssu = new SpeechSynthesisUtterance();
  ssu.lang = opts.lang;
  ssu.volume = opts.volume;
  ssu.rate = opts.rate;
  ssu.pitch = opts.pitch;
  ssu.text = text;
  speechSynthesis.speak(ssu);
}

export function enableSpeak() {
  return !!(window.SpeechSynthesisUtterance && window.speechSynthesis);
}

export function speak(text) {
  speakList.push(text);
  setTimeout(() => {
    while (speakList.length > 0) {
      if (window.speechSynthesis.speaking) {
        continue;
      }

      const content = speakList.pop();
      _speak(content);
    }
  });
}
