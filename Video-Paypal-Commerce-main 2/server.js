// setting the environment vars in development
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ extname: "handlebars" });
const cookieParser = require("cookie-parser");

// const sequelize = require("sequelize");

// importing models
const { Purchase, Video, User } = require("./models");

// Paypal client id
const clientId = process.env.PAYPAL_CLIENT_ID;

// import sequelize connection
const sq_connection = require("./config/connection");
const { Console } = require("console");

// Setting the port
const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1); // trust first proxy

app.use(
  session({
    key: "user",
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(cookieParser());

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));

const customerOrders = {};

// used to convert json sent in post bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

app.get("/home", sessionChecker, async (req, res) => {
  res.render("homepage");
});

app.get("/login", async (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log(req.body);

  try {
    const validUser = await User.findOne(
      { where: { id: username, password: password } },
      (err, res) => {
        console.log("validating user...");
      }
    );

    console.log(validUser);

    if (validUser) {
      req.session.user = username;
    }
    res.redirect("/");
    res.end();
  } catch (e) {
    console.log(e);
    res.status(500);
    res.end();
  }
});

app.get("/", sessionChecker, (req, res) => {
  res.render("homepage", { clientId: clientId, userId: req.session.user });
});

// Will be needed to return all items currently in the cart
app.post("/checkout", sessionChecker, (req, res) => {
  // customerOrders[req.body.customerId] = req.body.cartItems
  customerOrders[req.body.customerId] = req.body.cart;
  res.send({ cartSaved: true });
});

// app.get("/checkout", sessionChecker,(req, res) => {
//   // customerOrders[req.body.customerId] = req.body.cartItems
//   customerOrders[req.body.customerId] = req.body.cart;
//   res.send({ cartSaved: true });
// });

app.get("/checkout/:id", sessionChecker, async (req, res) => {
  res.render("checkoutpage", {
    clientId: clientId,
    cart: encodeURIComponent(JSON.stringify(customerOrders[req.params.id])),
  });
});

app.post("/purchase", async (req, res) => {
  const { client_id, payment_usd, videos } = req.body;

  isValid = true;

  // VERIFY THE PAYMENT
  if (!isValid) {
    res.status(500);
    res.end();
  }

  // Save to database
  // for every video we save a purchase record
  videos.forEach(async (video) => {
    const { id, qty } = video;

    // clientid needs to be the id of the logged in client
    await Purchase.create(
      {
        video_id: parseInt(id),
        client_id: parseInt(req.session.user),
        qty: parseInt(qty),
      },
      (err, res) => {
        if (err) console.log(err);
      }
    );
  });

  res.send(true);
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

sq_connection.sync();

app.listen(PORT, console.log(`App listening on port ${PORT}...`));
