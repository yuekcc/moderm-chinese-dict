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
