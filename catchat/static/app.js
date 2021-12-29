console.log("loading");

var inputEl = document.querySelector("input[type=text]");
var formEl = document.querySelector("form");
var messagesEl = document.querySelector(".messages");

var scheme;
if (window.location.protocol === "http:") {
  scheme = "ws:";
} else {
  scheme = "wss:";
}
var url = scheme + "//" + window.location.hostname + ":" + window.location.port + "/api";
var ws = new WebSocket(url);

function emit(msg) {
  var node = document.createElement("div");
  node.innerHTML = msg;
  messagesEl.appendChild(node);
}

ws.addEventListener("open", function(e) {
  console.log("connected to websocket");
  emit("Connected!");
});

ws.addEventListener("message", function(e) {
  var msg = e.data;
  console.log("received message from server: " + msg);
  emit(msg);
});

formEl.addEventListener("submit", function(e) {
  e.preventDefault();
  e.stopPropagation();
  var msg = inputEl.value;
  console.log("sending message: " + msg);
  ws.send(msg);
});

console.log("loaded");
