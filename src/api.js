// let AUTH_TOKEN = '';

// function updateAuthToken() {
//   const endpoint = `/api/users/auth-via-email`;
//   return fetch(endpoint, {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       email: 'yuekcc@lambdadriver.space',
//       password: 'rznc999999',
//     }),
//   })
//     .then(res => res.json())
//     .then(doc => {
//       AUTH_TOKEN = doc.token;
//     });
// }

// 改为后台调用 pb 接口
// export async function lookupWord(word) {
//   if (!AUTH_TOKEN) {
//     await updateAuthToken();
//   }

//   const endpoint = `/api/collections/modern_chinese_dict/records?${new URLSearchParams({
//     filter: `entry = ${JSON.stringify(word)}`,
//   })}`;
//   return fetch(endpoint, {
//     headers: {
//       Authorization: `User ${AUTH_TOKEN}`,
//     },
//   })
//     .then(res => res.json())
//     .then(doc => doc);
// }

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
