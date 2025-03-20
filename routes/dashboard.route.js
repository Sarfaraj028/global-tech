import express from 'express'
const dashboardRoute = express.Router()
import ensureAuthenticated from '../middlewares/ensureAuthentication.js';
import ensureAdmin from '../middlewares/ensureAdmin.js';
import Client from '../models/client.model.js';

// GET route to fetch all clients
dashboardRoute.get("/", ensureAuthenticated, ensureAdmin,  async (req, res) => { 
  
  try {
    // Fetch all clients from the database
    const clients = await Client.find(); // This will return all clients

    // Log the fetched clients to the console for debugging
    console.log("Fetched clients: ", clients);
    // Return the fetched clients in the response
    res.render("dashboard", { clients}); // Return clients as a JSON response
  } catch (error) {
    // If an error occurs during fetching, return an error response
    console.error("Error fetching clients:", error);
    req.flash("error", "failed to fetched data")
    res.redirect("/");
  }
});

// Delete a user by ID
dashboardRoute.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Client.findByIdAndDelete(id);
    console.log("deleted");
    req.flash("success", "Client data deleted successfully!")
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    req.flash("error", "Something went wrong!")
    res.redirect("/")
  }
});

export default dashboardRoute