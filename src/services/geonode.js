import 'whatwg-fetch';

export const getCRSFToken = () => {
  let csrfToken, csrfMatch = document.cookie.match(/csrftoken=(\w+)/);
  if (csrfMatch && csrfMatch.length > 0) {
    csrfToken = csrfMatch[1];
  }
  return csrfToken;
};
const createRequestObject = function(method, body, contentType = 'application/json') {
  return {
      method: method,
      credentials: 'same-origin',
      headers: {
            'Content-Type': contentType,
            'X-CSRFToken': getCRSFToken()
          },
      body: body
    };
};
export const uploadFiles = (server, files) => {
	var data = new FormData();
  files.forEach((file)=> {
    data.append('file', file);
  });
	var request = createRequestObject('POST', data);
  var requestPath = server + 'uploads/new/json';
  return fetch(requestPath,request)
    .then((response) => response.json())
    .catch((ex) => Promise.reject(ex));
}
