<template>
    <button v-if="!liked" @click="likePost(postId)" class="btn">
        <i class="far fa-thumbs-up likeBtn like"></i>
        Like {{likes.length}}
    </button>
    <button v-else @click="unlikePost(postId)" class="btn">
        <i class="far fa-thumbs-up likeBtn liked"></i>
        Unlike {{likes.length}}
    </button>
</template>

<script>
export default {
    name: 'Likes',
    props: {
        postId: Number,
        userId: Number
    },
    data() {
        return {
            likes: [],
            liked: null   
        }
    },
    methods: {      
        async fetchLikes(postId) {
            const resLikes = await fetch(`http://localhost:3000/api/posts/${JSON.stringify(postId)}/likes`)
            const dataLikes = await resLikes.json()
            dataLikes.forEach(like => {
            like.userId == this.userId ? this.liked = true : this.like = false
        })
            return dataLikes
        },
        likePost(postId) {
            const data = {
                like: true,
                userId: this.userId,
                postId: postId
            }
            fetch(`http://localhost:3000/api/posts/${JSON.stringify(postId)}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => this.likes.push(data))
                .catch(error => console.log(error))
            this.liked = true
        },
        unlikePost(postId) {
            const data = {
                userId: this.userId
            }
            fetch(`http://localhost:3000/api/posts/${JSON.stringify(postId)}/unlike`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            this.likes = this.likes.filter((like) => like.userId != this.userId)
            this.liked = false
        }
    },
    async created() {
        this.likes = await this.fetchLikes(this.postId)
    }
}
</script>

<style scoped>
button {
    background: none;
    border-style: none;
    outline: none;
    width: 40%
}
p {
    margin: 1rem 0 1rem 0;
}
.liked {
    color: white;
    background-color: #3174e4;
    border: 1px solid #3174e4;
    border-radius: 50%;
    padding: 0.5rem;
}
.like {
    color: #3174e4;
    background-color: white;
    border: 1px solid #3174e4;
    border-radius: 50%;
    padding: 0.5rem;
}
i {
    margin-right: 4px;
}
</style>
