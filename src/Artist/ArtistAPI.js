export class ArAPI {
  static getArtist() {
    return fetch("http://192.168.1.13:80/api/artist/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static getArtistId(id) {
    return fetch(`http://192.168.1.13:80/api/artist/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static getArtistEvent(id) {
    return fetch(`http://192.168.1.13:80/api/event/?artist=${id}`, {
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
  static addfollower(id) {
    return fetch(`http://192.168.1.13:80/api/artist/${id}/addfollwer/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static addArtistFollow(body) {
    return fetch(`http://192.168.1.13:80/api/artistfw/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  static CheckArtistFollow(newuser, artist) {
    return fetch(
      `http://192.168.1.13:80/api/artistfw/?newuser=${newuser}&artist=${artist}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  static DeleteArtistFollow(id) {
    return fetch(`http://192.168.1.13:80/api/artistfw/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static minusfollower(id) {
    return fetch(`http://192.168.1.13:80/api/artist/${id}/unfollower/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
