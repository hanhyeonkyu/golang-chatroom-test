var lastReceived = 0;
var isWait = false;

var fetch = function () {
  if (isWait) return;
  isWait = true;
  $.getJSON("/lp/fetch?lastReceived=" + lastReceived, function (data) {
    if (data == null) return;
    $.each(data, function (i, event) {
      var li = document.createElement("li");
      switch (event.Type) {
        case 0: // JOIN
          li.innerText =
            event.User == $("#uname").text()
              ? "You joined the chat room."
              : event.User + " joined the chat room.";
          break;
        case 1: // LEAVE
          li.innerText =
            $("#uname").text() === data.User
              ? "you left the chat room."
              : data.User + " left the chat room.";
          break;
        case 2: // MESSAGE
          var username = document.createElement("strong");
          var content = document.createElement("span");
          username.innerText = event.User;
          content.innerText = event.Content;
          li.appendChild(username);
          li.appendChild(document.createTextNode(": "));
          li.appendChild(content);
          break;
      }
      $("#chatbox li").first().before(li);
      lastReceived = event.Timestamp;
    });
    isWait = false;
  });
};

// Call fetch every 1 seconds
setInterval(fetch, 1000);

fetch();

$(document).ready(function () {
  var postConecnt = function () {
    var uname = $("#uname").text();
    var content = $("#sendbox").val();
    $.post("/lp/post", {
      uname: uname,
      content: content,
    });
    $("#sendbox").val("");
  };

  $("#sendbox").keydown(function (event) {
    if (event.keyCode == 13) {
      postConecnt();
    }
  });

  $("#sendbtn").click(function () {
    postConecnt();
  });
});
