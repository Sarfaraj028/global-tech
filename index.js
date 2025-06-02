import express, { urlencoded } from "express";
import connection from "./database/db.js";
import Client from "./models/client.model.js";
import methodOverride from "method-override";
// import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import passport from "passport";
import LocalStrategy from 'passport-local'
import session from "express-session";
import flash from "connect-flash"
import User from "./models/user.model.js";
import router from "./routes/user.route.js";
import dashboardRoute from "./routes/dashboard.route.js";


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


// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user)
          return done(null, false, { message: "User Not Found." });

        const isMatch = await user.comparePassword(password);
        if (!isMatch)
          return done(null, false, { message: "Wrong password." });
        console.log("welcome user");
        
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

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

//dashboard Router
app.use("/dashboard", dashboardRoute)

//User ROuter
app.use("/user", router)



app.use((req, res) => {
  req.flash("error", `Page Not Found!`)
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
