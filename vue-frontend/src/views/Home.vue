<template>
  <Nav redirection="/home" :logged="true" />
  <router-link to="/new-post" class="btn">Create Post</router-link>
  <h3>Publications</h3>  
</template>

<script>
import Nav from "../components/Nav.vue";

export default {
  name: "Home",
  components: {
    Nav
  },
  data() {
    return {
      posts: [],
    };
  },
  created() {
    this.posts = [
      {
        id: 1,
        title: "my Title",
        description: "my Description",
        imageUrl: "",
        userProfileUrl: "",
        likes: 21,
        dislikes: 3
      },
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
  background: rgba(128, 0, 128, 0.815);
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 1rem;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>