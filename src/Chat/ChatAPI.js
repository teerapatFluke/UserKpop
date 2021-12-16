export class ChatAPI {
  static getArtist() {
    return fetch("http://128.199.116.6/api/artist/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static getChatRoom(user, artist) {
    return fetch(
      `http://128.199.116.6/api/chatroom/?user=${user}&artist=${artist}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  static RemoveChatRoom(id) {
    return fetch(`http://128.199.116.6/api/chatroom/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static addChatRoom(body) {
    return fetch(`http://128.199.116.6/api/chatroom/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
}
