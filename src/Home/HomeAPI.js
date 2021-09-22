export class HomeAPI {
  static getArtist() {
    return fetch("http://192.168.1.13:80/api/artist/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static getEvent() {
    return fetch("http://192.168.1.13:80/api/event/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static getArtistFW(newuser) {
    return fetch(`http://192.168.1.13:80/api/artistfw/?newuser=${newuser}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static getEventFW(user) {
    return fetch(`http://192.168.1.13:80/api/eventfw/?user=${user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static getVenue() {
    return fetch("http://192.168.1.13:80/api/venue/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
