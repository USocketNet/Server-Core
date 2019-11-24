<!doctype html>
<html>
  <head>
    <title>USocketNet - Chat</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="chat.css">
  </head>
  <body>
    <ul id="messages"></ul>
    <form action="">
      <input id="m" autocomplete="off" /><button>Send</button>
    </form>
    <script src="socket.io.js"></script>
    <script src="jquery-1.11.1.js"></script>
    <script src="script.js"></script>
  </body>
</html>