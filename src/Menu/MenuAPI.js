export class MenuAPI {
  static addRequest(body) {
    return fetch("http://128.199.116.6/api/request/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  static addProblem(body) {
    return fetch("http://128.199.116.6/api/problem/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  static update_user(id, body) {
    return fetch(`http://128.199.116.6/api/user/${id}/update_user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
}
