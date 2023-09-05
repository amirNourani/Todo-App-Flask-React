
export function backendLookup(method, endpoint, callback, body) {
  const url = `http://localhost:5000${endpoint}`;
  fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null,
  })
    .then((res) => res.json())
    .then((data) => callback(data))
    .catch((error) => console.log(error));
}

export function apiTodoList(callback) {
  const endpoint = "/tasks";
  backendLookup("GET", endpoint, callback);
}

export function apiUpdateTodo(id, body, callback) {
  const endpoint = `/tasks/${id}/update`;
  backendLookup("PUT", endpoint, callback, body);
}

export function apiDeleteTodo(id, callback) {
  const endpoint = `/tasks/${id}/delete`;
  backendLookup("DELETE", endpoint, callback);
}


export function apiCreateTodo(body, callback) {
  const endpoint = "/add";
  backendLookup("POST", endpoint, callback, body)
}
