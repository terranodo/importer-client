import 'whatwg-fetch';

export const getCRSFToken = () => {
  let csrfToken, csrfMatch = document.cookie.match(/csrftoken=(\w+)/);
  if (csrfMatch && csrfMatch.length > 0) {
    csrfToken = csrfMatch[1];
  }
  return csrfToken;
};
const createRequestObject = function(method, body, contentType = 'application/json') {
  let request = createRequestObjectWithBody(method, body);
  request.headers["Content-Type"] = contentType;
  return request
};
const createRequestObjectWithBody = function(method, body) {
  let request = createSimpleRequestObject(method);
  request.body = body;
  return request;
}
const createSimpleRequestObject = function(method) {
  return {
      method: method,
      credentials: 'same-origin',
      headers: {
            'X-CSRFToken': getCRSFToken()
          },
    };
};

export const uploadFiles = (server, files) => {
	var data = new FormData();
  files.forEach((file)=> {
    data.append('file', file);
  });
	var request = createRequestObjectWithBody('POST', data);
  var requestPath = server + '/uploads/new/json';
  return fetch(requestPath,request)
    .then((response) => response.json())
    .catch((ex) => Promise.reject(ex));
};

export const importAll = (server, id) => {
	var request = createRequestObject('GET');
  var requestPath = `${server}/importer-api/data/${id}/import_all_layers/`;
  return fetch(requestPath,request)
    .then((response) => response.json())
    .catch((ex) => Promise.reject(ex));
};
export const configure = (server, id, config) => {
	var request = createRequestObjectWithBody('POST', config);
  var requestPath = `${server}/importer-api/data-layers/${id}/configure/`;
  return fetch(requestPath,request)
    .then((response) => response.json())
    .catch((ex) => Promise.reject(ex));
};
export const allUploadedData = (server) => {
	var request = createRequestObject('GET');
  var requestPath = `${server}/importer-api/data/`;
  return fetch(requestPath,request)
    .then((response) => response.json())
    .catch((ex) => Promise.reject(ex));
};
export const uploadedData = (server, id) => {
	var request = createRequestObject('GET');
  var requestPath = `${server}/importer-api/data/${id}/`;
  return fetch(requestPath,request)
    .then((response) => response.json())
    .catch((ex) => Promise.reject(ex));
};
