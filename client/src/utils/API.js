import axios from "axios";

export default {
  // Gets all dishes
  getDishes: function() {
    return axios.get("/api/dishes");
  },
  // Gets the dish with the given id
  getDish: function(id) {
    return axios.get("/api/dishes/" + id);
  },
  // Deletes the dish with the given id
  deleteDish: function(id) {
    return axios.delete("/api/dishes/" + id);
  },
  // Adds a dish to the database
  addDish: function(dishData) {
    return axios.post("/api/dishes", dishData);
  },

  // =================== USERS =====================
  // Gets all users

  getUsers: function() {
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // Adds a user to the database
  // addUser: function(userData) {
  //   return axios.post("/api/users", userData);
  // }


  // ================= ORDERS ====================

  getOrders: function() {
    return axios.get("/api/orders");
  },
  getOrder: function(id) {
    return axios.get("/api/orders/" + id);
  },
  addOrder: function(orderData) {
    return axios.post("/api/orders", orderData);
  },


  // =========== SIGN IN/ SIGN UP ==================
  getCurrentUser: function() {
    return axios.get("/api/currentuser");
  }
};
