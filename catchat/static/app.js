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

function emit(msg, uid) {
  var node = document.createElement("div");
  if (uid) {
    node.innerHTML = "" + uid + ": " + msg;
  } else {
    node.innerHTML = msg;
  }
  messagesEl.appendChild(node);
}

ws.addEventListener("open", function(e) {
  console.log("connected to websocket");
  emit("Connected!");
});

ws.addEventListener("message", function(e) {
  console.log("received message from server: " + e.data);
  var obj = JSON.parse(e.data);
  emit(obj.msg, obj.uid);
});

formEl.addEventListener("submit", function(e) {
  e.preventDefault();
  e.stopPropagation();
  var msg = inputEl.value;
  var obj = {"msg": msg};
  var data = JSON.stringify(obj);
  console.log("sending message: " + data);
  ws.send(data);
});

console.log("loaded");
