export class HomeAPI {
  static getArtist() {
    return fetch("http://128.199.116.6/api/artist/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static getEvent() {
    return fetch("http://128.199.116.6/api/event/?o=-show_day&a=-ticket_open", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static getArtistFW(newuser) {
    return fetch(`http://128.199.116.6/api/artistfw/?newuser=${newuser}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static getEventFW(user) {
    return fetch(`http://128.199.116.6/api/eventfw/?user=${user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static getVenue() {
    return fetch("http://128.199.116.6/api/venue/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static getVenue() {
    return fetch("http://128.199.116.6/api/venue/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
