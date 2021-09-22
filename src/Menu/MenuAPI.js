export class MenuAPI {
  static addRequest(body) {
    return fetch("http://192.168.1.13:80/api/request/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  static addProblem(body) {
    return fetch("http://192.168.1.13:80/api/problem/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
}
