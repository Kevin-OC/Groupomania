<template>
  <Nav redirection="/home" :logged="true" />
  <router-link to="/new-post" class="btn">Créer un nouveau post</router-link>
  <h3>Publications</h3> 
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
      posts: [],
    };
  },
  created() {
    this.posts = [
      { 
        userId: 1,
        postId: 1,
        profile: "/img/logo.82b9c7a5.png",
        username: "John Doe",
        date: "05/07",
        text: "my Text",
        file: "/img/logo.82b9c7a5.png",             
        likes: 21
      },
      {
        userId: 2,
        postId: 2,
        profile: "/img/logo.82b9c7a5.png",
        username: "Jane Doe",
        date: "05/07",
        text: "my 2nd Text",
        file: "/img/logo.82b9c7a5.png",
        likes: 37
      },
      {
        userId: 3,
        postId: 3,
        profile: "/img/logo.82b9c7a5.png",
        username: "Jack Doe",
        date: "05/07",
        text: "my 3d Text",
        file: "/img/logo.82b9c7a5.png",
        likes: 73
      }
    ];
  },
};
</script>

<style scoped>
h3 {
  background: no-repeat center url("../assets/logos/icon.png");
  background-size: cover;
  height: 160px;
  width: 160px;
  text-align: center;
  margin: auto;
}
.btn {
  display: inline-block;
  color: red;
  border: none;
  padding: 10px 20px;
  margin: 1rem;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  border: 1px solid red;
}
.btn:hover {
  box-shadow: 2px 2px 8px 5px rgb(255 15 15 / 10%);
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>