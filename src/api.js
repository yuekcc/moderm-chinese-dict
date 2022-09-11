export function lookupWords(inputs, withins = false) {
  const _inputs = `${inputs || ''}`.trim();
  if (!_inputs) {
    return [];
  }
  const endpoint = `/api/search?${new URLSearchParams({ keyword: _inputs, withins })}`;
  return fetch(endpoint)
    .then(res => res.json())
    .then(doc => doc);
}
