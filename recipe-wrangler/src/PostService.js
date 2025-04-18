import axios from "axios";

const url = "api/posts/";

class PostService {
  // Get Posts
  static async getPosts() {
    try {
      const res = await axios.get(url);
      const data = res.data;
      return data.map((post) => ({
        ...post,
        createdAt: new Date(post.createdAt),
      }));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  //Get Random Posts
  static async getRandomPosts(count) {
    try {
      const res = await axios.get(`${url}random-public`, {
        params: {
          count: count,
        },
      });
      const data = res.data;
      return data.map((post) => ({
        ...post,
        createdAt: new Date(post.createdAt),
      }));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  //Get User Posts
  static async getUserPosts(userId) {
    try {
      const res = await axios.get(`${url}user?userId=${userId}`);
      const data = res.data;
      return data.map((post) => ({
        ...post,
        createdAt: new Date(post.createdAt),
      }));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // Update Post
  static updatePost(id, updates) {
    return axios.put(`${url}${id}`, updates);
  }

  // Create Post
  static insertPost(recipe) {
    return axios.post(url, recipe);
  }

  // Delete Post
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default PostService;
