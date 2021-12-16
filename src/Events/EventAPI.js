export class EvAPI {
  static getEvent() {
    return fetch("http://128.199.116.6/api/event/", {
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
  static getPromoter() {
    return fetch("http://128.199.116.6/api/promoter/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static getTicket() {
    return fetch("http://128.199.116.6/api/ticket/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static getEventId(id) {
    return fetch(`http://128.199.116.6/api/event/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static getArtist() {
    return fetch("http://128.199.116.6/api/artist/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static addfollower(id) {
    return fetch(`http://128.199.116.6/api/event/${id}/addfollwer/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static addEventFollow(body) {
    return fetch(`http://128.199.116.6/api/eventfw/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  static CheckEventFollow(user, event) {
    return fetch(
      `http://128.199.116.6/api/eventfw/?user=${user}&event=${event}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  static DeleteEventFollow(id) {
    return fetch(`http://128.199.116.6/api/eventfw/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static minusfollower(id) {
    return fetch(`http://128.199.116.6/api/event/${id}/unfollower/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
