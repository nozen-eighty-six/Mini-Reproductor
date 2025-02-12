import React from "react";

const helpHttp = () => {
  const customFetch = async (endpoint, options) => {
    const defaultHeader = {
      accept: "Application/json",
    };

    const controller = new AbortController();
    options.signal = controller.signal;
    //Definir los métodos
    options.method = options.method || "GET";
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;

    options.body = options.body ? JSON.stringify(options.body) : false;

    //Verificar cuerpo de la petición
    if (!options.body) delete options.body;
    setTimeout(() => {
      controller.abort();
    }, 10000);

    try {
      const res = await fetch(endpoint, options);
      if (!res.ok) {
        throw {
          err: true,
          status: res.status || "00",
          statusText: res.statusText || "Ocurrió un error",
        };
      }
      return await res.json();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const get = (url, options = {}) => {
    return customFetch(url, options);
  };
  const post = (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };

  return {
    post,
    get,
  };
};

export default helpHttp;
