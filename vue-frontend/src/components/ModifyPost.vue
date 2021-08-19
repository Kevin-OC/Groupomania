<template>
    <div id="modifyPost">
        <form @submit.prevent="modifyPost">
            <div id="btns">
                <label for="file">Choisir une nouvelle image</label>
                <input type="file" ref="file" name="file" class="upload" id="file" @change="updateFile">
            </div>
            <div id="fileContainer">
                <img id="preview" :src="'http://localhost:3000/images/' + post.file" :alt="post.file" v-if="preview">
                <p v-else>Ce post ne possède pas d'image</p>
            </div>
            <div id="text">
                <label for="textarea">Changer votre texte</label>
                <textarea name="textarea" v-model="post.text"></textarea>
            </div>
            <div id="modify">
                <input type="submit" value="je modifie !" class="btn">    
            </div>
            <p>{{errMsg}}</p>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import router from '../router'
export default {
    name: 'ModifyPost',
    beforeCreate() {
        /* on récupère l'id du post via l'url */
        const parsedUrl = new URL(window.location.href)
        const postId = parsedUrl.pathname.split('/modify-post/')[1]
        /* selon l'id on récupère le post concerné */
        fetch(`http://localhost:3000/api/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                data.file ? this.preview = true : this.preview = false
                this.post = {...data}
            })
            .catch(error => {error})
    },
    data() {
        return {
            post: {},
            newFile: '',
            preview: null,
            errMsg: null
        }
    },
    methods: {
        updateFile(event) {
            /* sur le onchange on va attribuer cette valeur à file (nécessaire pour l'envoi au backend) */ 
            this.newFile = this.$refs.file.files[0]
            let input = event.target
            if(input.files) {
                let reader = new FileReader()
                reader.onload = (e) => {
                    document.getElementById('preview').src = e.target.result
                }
                reader.readAsDataURL(input.files[0])
                this.preview = true
            }
        },
        async modifyPost() {
            /* on peut envoyer un post sans image mais il faut au moins qu'il y est un texte */     
            if (!this.post.text) {
                this.errMsg = "Error => vous devez remplir le champ <message> pour créer une nouvelle publication!"
                return
            }
            /* on créé un objet formData afin de pouvoir ajouter le texte et surtout le file choisi */
            let formData = new FormData()
            formData.append('text', this.post.text)
            if (this.newFile) {
                formData.append('file', this.newFile)
            }
            /* envoi du form via axios.put de l'objet formData */
            if (confirm("êtes vous sûr de vouloir modifier votre post ?")) {
                axios.put(`http://localhost:3000/api/posts/${this.post.id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                })  
                    .then(res => {
                        console.log(res.data)
                        router.push({ path: '/home' })                                               
                    })
                    .catch(error => console.log(error))
            }            
        }
    }
}
</script>

<style scoped>
#modifyPost {
    max-width: 60%;
    box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
    margin: auto;
    margin-top: 2rem;
    padding: 1rem;
    border-radius: 4px;
}
form {
    display: flex;
    flex-direction: column;
}
#fileContainer {
    overflow: hidden;
    margin: 1rem 0 1rem 0;
}
img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}
#btns {
    display: flex;
    flex-direction: column;
}
#file {
    cursor: pointer;
}
#text {
    display: flex;
    flex-direction: column;
}
label {
    margin: 1rem;
    padding: 0.5rem 0;
    text-align: center;
    border-radius: 8px;
    box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
}
textarea {
    padding: 16px;
}
#modify {
    text-align: right;
}
.btn {
    background-color: #1c68e6;
    border-style: none;
    outline: none;
    width: 20%;
    border-radius: 8px;
    height: 40px;
    color: white;
    margin: 1rem 0 1rem 0;
}

</style>