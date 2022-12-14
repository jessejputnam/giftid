require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const flash = require("connect-flash");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const passport = require("./middlewares/passport");

// Database
const mongoDB = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Routing
const indexRouter = require("./routes/index");
const homeRouter = require("./routes/home");
const giftRouter = require("./routes/gift");
const searchRouter = require("./routes/search");
const userRouter = require("./routes/user");

// App Initialization
const app = express();
const sessionStore = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "mySessions",
  databaseName: "main"
});
sessionStore.on("error", console.error.bind("Session store connect error:"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// -------------- Passport Session ------------------ //
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // Auto signout after a week of no use
      // httpOnly: true,
      // secure: true
      sameSite: true
    },
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    name: "session-id",
    resave: true,
    rolling: true,
    saveUninitialized: true
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
// -------------- End Passport --------------------- //

// Get access to currentUser variable in all views
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/home", homeRouter);
app.use("/gift", giftRouter);
app.use("/search", searchRouter);
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
