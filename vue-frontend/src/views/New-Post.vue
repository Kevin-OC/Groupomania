<template>
    <Nav redirection="/home" :logged="true" />
    <CreatePost />
</template>

<script>
import Nav from "../components/Nav.vue";
import CreatePost from "../components/CreatePost.vue"

export default {
    name: 'New-Post',
    components: {
        Nav,
        CreatePost
    }
}
</script>