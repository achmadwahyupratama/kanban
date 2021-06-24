<template>
    <div class="page" id="register-page">
        <div class="y-kanban-logo"> 
            <img class="y-kanban-logo" src="../images/logo-kanban.png" alt="y-kanban-logo">
        </div>
        <form @submit.prevent="register" id="register-form" class="form">
            <div class="form-group shadow">
                <input v-model="regUsername" class="form-control" id="register-username" type="username" placeholder="username">
            </div> <br>
            <div class="form-group shadow">
                <input v-model="regEmail" class="form-control" id="register-email" type="email" placeholder="your_email@mail.domain">
            </div> <br>
            <div class="form-group shadow">
                <input v-model="regPassword" class="form-control" id="register-password" type="password" placeholder="password">
            </div> <br>
            <button class="btn register-btn shadow btn-lg btn-light" type="submit">Register</button>
        </form> <br>
        <button @click="backToLogin" class="btn register-btn btn-danger shadow btn-sm" type="button">Cancel</button>
    </div>
</template>

<script>
export default {
    name: "Register",
    data(){
        return {
            regEmail: '',
            regUsername: '',
            regPassword:''
        }
    },
    methods: {
        register(){
            const payload = {
                email: this.regEmail,
                username: this.regUsername,
                password: this.regPassword
            }
            this.$emit("submitRegister", payload)
        },
        backToLogin(){
            this.$emit("cancelRegister")
        }
    }

}
</script>

<style>

</style>