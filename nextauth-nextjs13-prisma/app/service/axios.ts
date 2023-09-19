import axios from "axios";

// const api = axios.create({ baseURL: "http://localhost:8002" });

export function Login(params: { email: string; password: string } | undefined) {

  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:8002/login", params)
      .then(({ data }) => {

        // api.defaults.headers.common["Authorization"] =
        //   "Bearer " + data.access_token;
        // localStorage.setItem("access_token", data.access_token);
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
