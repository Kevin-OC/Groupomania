<template>
  <Nav redirection="/home" :logged="true" />
  <router-link to="/new-post" class="btn">Créer un nouveau post</router-link>
  <Posts :posts="posts" /> 
</template>

<script>
import Nav from "../components/Nav.vue";
import Posts from "../components/Posts.vue";

export default {
  name: "Home",
  components: {
    Nav,
    Posts
  },
  data() {
    return {
      posts: []
    };
  },
  methods: {
    async fetchPosts() {
      const res = await fetch('http://localhost:5000/posts')
      const data = await res.json()
      return data
    }
  },
  async created() {
    this.posts = await this.fetchPosts()
    console.log("hello")
  }
};
</script>

<style scoped>
.btn {
  display: inline-block;
  color: rgba(0, 0, 0, 0.75);
  border: none;
  padding: 10px 20px;
  margin: 1rem;
  border-radius: 5px;
  text-decoration: none;
  border: 1px solid rgba(0, 0, 0, 0.75);
}
.btn:hover {
  box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>