import axios from "axios";

export default {
  // Gets all comments
  getComments: function() {
    return axios.get("/api/intake");
  },
  // Gets the comment with the given id
  getComment: function(id) {
    return axios.get("/api/intake/" + id);
  },
  // Deletes the comment with the given id
  deleteComment: function(id) {
    return axios.delete("/api/intake/" + id);
  },
  // Saves a comment to the database
  saveComment: function(commentData) {
    return axios.post("/api/intake", commentData);
  }
};
