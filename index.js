import express, { urlencoded } from "express";
import connection from "./database/db.js";
import Client from "./models/client.model.js";
import methodOverride from "method-override";
// import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import session from "express-session";
import flash from "connect-flash"


const app = express();
const port = process.env.PORT || 3000;
dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(flash());

// Session setup
app.use(
  session({
    secret: process.env.MY_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expiresIn: Date.now + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000, // Set maxAge to 7 days
      httpOnly: true,
    },
  })
);


// Middleware to add flash messages to res.locals
app.use((req, res, next) => { 
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user
  next();
});

app.get("/", (req, res) => {
  
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/why", (req, res) => {
  res.render("why");
});



//post route
app.post("/clients", async (req, res) => {
  const { name, email, phone, company, service, message } = req.body;

  const newClient = new Client({
    name,
    email,
    phone,
    company,
    service,
    message,
  });
  try {
    // Save the client to the database
    const savedClient = await newClient.save();
    console.log("Client saved:", savedClient);

    // Return a success response with the saved client data
    req.flash("success", "Your response has been submitted! We will shortly contact you.")
    res.redirect("/")
    // res.render("response.ejs", { newClient: savedClient });
  } catch (error) {
    // Handle any errors that occur during saving
    console.error("Error saving client:", error);
    req.flash("error", "Something went wrong Try after some time!")
    res.redirect("/");
  }
});


app.use((req, res) => {
  req.flash("error", `Page Not Found!`)
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
