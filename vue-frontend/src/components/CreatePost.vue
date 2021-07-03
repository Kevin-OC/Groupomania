<template>
    <div id="createPost">
        <h4>Partagez votre post</h4>
        <form @submit="onSubmit">
        <input type="textarea" name="textarea" placeholder="..." class="textarea">
        <p class="uploadFile">            
            <input type="file" name="uploadFile" class="uploadFileInput">
            <label for="uploadFile">Upload image</label>
        </p>
        <input type="submit" value="Post" class="btn">
        </form>
  </div>
</template>

<script>
export default {
    name: 'CreatePost',
    methods: {
        onSubmit(e) {
            e.preventDefault();
            alert("are you sure ?")
        }
    }
}
</script>

<style scoped>
#createPost {
    width: 80%;
    margin: auto;
    background: rgba(0, 0, 0, 0.144);
    padding: 1.8rem;
    border-radius: 8px;
}
form {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
input {
    width: 100%;
    box-shadow: 3px 5px 6px 2px rgb(0 0 0 / 10%);
    border-style: none;
    border-radius: 8px;
    outline: none;
}
.textarea {
    height: 4rem;
    padding-left: 1rem;
}
.uploadFile {
    position: relative;
    margin: 1rem 0 1rem 0;
    background: rgba(220, 20, 60, 0.712);
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    border-radius: 8px;
    margin: 2rem 2rem 2rem 0;
    color: white;
}
.uploadFileInput {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.01;
    cursor: pointer;
    height: 3rem;
}
.btn {
    color: white;
    background-color: green;
    height: 3rem;
    width: 20%;
    cursor: pointer;
}
.btn:active {
    transform: scale(0.98);
}
</style>