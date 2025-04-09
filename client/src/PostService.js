import axios from "axios";

const url = "http://localhost:5000/api/posts/";

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

  // Create Post
  static insertPost(text) {
    return axios.post(url, { text: text });
  }

  // Delete Post
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default PostService;
