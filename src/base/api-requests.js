export function errorHandler(err, url, payload, options = {}) {
  console.log(
    `${err.status ? err.status : "Error fetching data"}: ${
      err.statusText
    } - ${url}`,
    err,
    payload
  );
  if (!options.preventToastr) {
    console.error(
      `${err.status ? err.status : "Error fetching data"}`,
      `${err.statusText ? err.statusText : url}`
    );
  }
  if (!options.preventError) {
    throw err;
  }
  throw err;
}

function handleResponse(res) {
  if (!res.ok) {
    return Promise.reject(res);
  }
  return res.json();
}

export const getRequest = async (url, header) => {
  let params = {
    method: "GET",
    headers: {
      ...header
    }
  };
  const data = await fetch(url, params)
    .then((res) => {
      return handleResponse(res);
    })
    .catch((err) => errorHandler(err, url));
  return data;
};
