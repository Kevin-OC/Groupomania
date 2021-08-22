<template>
    <div id="createPost">
        <form @submit.prevent="createPost">
            <div id="text">
                <textarea name="textarea" placeholder="Publiez votre message" v-model="text"></textarea>
            </div>
            <div id="preview" v-if="preview">
                <img :src="preview" :alt="preview">
            </div>         
            <div id="btns">                
                <input type="file" ref="file" name="file" class="upload" id="file" @change="selectFile">             
                <input type="submit" value="J'envoie !" class="btn">
            </div>
            <p>{{errMsg}}</p>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'CreatePost',
    data() {
        return {
            text: null,
            file: '',
            preview: null,
            errMsg: null
        }
    },
    methods: {
        selectFile(event) {
            /* sur le onchange on va attribuer cette valeur à file (nécessaire pour l'envoi au backend) */ 
            this.file = this.$refs.file.files[0]
            let input = event.target
            if(input.files) {
                let reader = new FileReader()
                reader.onload = (e) => {
                    this.preview = e.target.result
                }
                reader.readAsDataURL(input.files[0])
            }
        },
        createPost() {
            /* on peut envoyer un post sans image mais il faut au moins qu'il y est un texte */     
            if (!this.text) {
                this.errMsg = "Error => vous devez remplir le champ <message> pour créer une nouvelle publication!"
                return
            }
            /* on créé un objet formData afin de pouvoir ajouter le texte et surtout le file choisi */
            let formData = new FormData()
            formData.append('text', this.text)
            formData.append('file', this.file)
            formData.append('userId', localStorage.getItem('userId'))
            /* envoi du form via axios.put de l'objet formData */
            axios.post('http://localhost:3000/api/posts/create', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })  
                .then(res => this.$emit('add-Post', res.data))
                .catch(error => console.log(error))
            /* on emit le toggle-Create pour cacher ce composant tout en effaçant les inputs */
            this.$emit('toggle-Create')
            this.text = ''
            this.file = ''
            this.preview = ''
        }
    }
}
</script>

<style scoped>
#createPost {
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
textarea {
    height: 5rem;
    padding: 1rem 0 0 1rem;
    width: calc(100% - 1rem)
}
#preview {
    overflow: hidden;
    max-width: 20%;
}
img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}
#btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    border-top: 1px solid hsla(0, 0%, 0%, 0.5);
    padding-top: 2rem;
}
.btn {
    background-color: #1c68e6;
    border-style: none;
    outline: none;
    width: 20%;
    border-radius: 8px;
    height: 40px;
    color: white;
}
.upload:active {
  transform: scale(0.98);
}
p {
    margin-top: 1.6rem;
}
@media screen and (max-width: 992px) {
    #createPost {
        max-width: 90%;
    }
}
</style>