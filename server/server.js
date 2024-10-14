const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const dbConfig = require("./app/config/db.config");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app); // Create HTTP server for both Express and Socket.IO
const socketIO = new Server(server, {
  cors: {
    origin: "*", // Replace with specific origins in production
    methods: ["GET", "POST"]
  }
});

// Middleware for CORS and session management
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const generateID = () => Math.random().toString(36).substring(2, 10);
let users = [];

// Session handling
app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"], // Use environment variable for security
    httpOnly: true,
  })
);

// MongoDB setup
const db = require("./app/models");
const Role = db.role;
const User = db.user

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// Initial roles creation
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({ name: "user" }).save();
      new Role({ name: "moderator" }).save();
      new Role({ name: "admin" }).save();
    }
  });
}

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Bezkoder application with chat!" });
});

// Import routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("join", async (email) => {
    let _id = generateID();
    socket.join(_id);
    socket._id = _id;
    console.log(_id, email);
    let userinfo = await User.findOne({ email: email });
    users.unshift({ id: _id, email, name: userinfo.name, messages: [] });
    users.forEach(user => {
      if (user.id != _id) socket.to(user.id).emit("userlist", users.filter(u => u.id != user.id))
    })
    socket.emit("userlist", users.filter(user => user.id != _id));

  });

  socket.on("new_message", data => {
    const { message, receiver, sender, timestamp } = data;
    console.log({ message, receiver, sender, timestamp })
    socket.to(receiver).emit("new_message", { message, receiver, sender, time: `${timestamp.hour}:${timestamp.mins}` });
    socket.emit("new_message", { message, receiver, sender, time: `${timestamp.hour}:${timestamp.mins}` })
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log(users, socket._id);
    users = users.filter(user => user.id != socket._id);
    console.log("🔥: A user disconnected");
  });
});

app.get("/api", (req, res) => {
  res.json(users);
});

// Setting the port and starting the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
