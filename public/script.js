const socket = io();
const joinDiv = document.getElementById("join");
const chatDiv = document.getElementById("chat");
const roomSelect = document.getElementById("room");
const joinBtn = document.getElementById("joinBtn");
const msgInput = document.getElementById("msg");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");

joinBtn.onclick = () => {
  const room = roomSelect.value;
  socket.emit("joinRoom", room);
  joinDiv.style.display = "none";
  chatDiv.style.display = "block";
};

sendBtn.onclick = () => {
  const msg = msgInput.value;
  if (msg.trim() !== "") {
    socket.emit("chatMessage", msg);
    msgInput.value = "";
  }
};

socket.on("message", (msg) => {
  const p = document.createElement("p");
  p.textContent = msg;
  messages.appendChild(p);
  messages.scrollTop = messages.scrollHeight;
});
