import axios from "axios";

export default {
  // Gets all comments
  getComments: function() {
    return axios.get("/api/comments");
  },
  // Gets the comment with the given id
  getComment: function(id) {
    return axios.get("/api/comments/" + id);
  },
   // Gets the comment with the given username
  getUserComment: function(username) {
    return axios.get("/api/comments/" + username);
  },
  // Deletes the comment with the given id
  deleteComment: function(id) {
    return axios.delete("/api/comments/" + id);
  },
  // Saves a comment to the database
  saveComment: function(commentData) {
    return axios.post("/api/comments", commentData);
  },
    // Gets the comment with the given id
    getListing: function(id) {
      return axios.get("/api/comments/" + id);
    }
};