<template>
    <div>
        <div class="page" id="login-page">
            <div class="y-kanban-logo"> 
                <img class="y-kanban-logo" src="../images/logo-kanban.png" alt="y-kanban-logo">
            </div>
            <form id="login-form" class="form" @submit.prevent="login">
                <div class="form-group shadow">
                    <input v-model="logEmail" class="form-control" id="login-email" type="email" placeholder="your_email@mail.domain">
                </div> <br>
                <div class="form-group shadow">
                    <input v-model="logPassword" class="form-control" id="login-password" type="password" placeholder="password">
                </div> <br>
                <button class="btn login-btn btn-lg  btn-light shadow" type="submit">Login</button>
            </form>
            <div class="registerAndGoogle">
                <p>Don't have account?</p>
                <button @click="gotoRegister" class="btn register-btn btn-light shadow btn-sm" type="button">Register</button>
                <p>or</p>
                <g-signin-button
                    :params="googleSignInParams"
                    @success="onSignInSuccess"
                    @error="onSignInError">
                    Sign in with Google
                </g-signin-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data(){
        return {
            logEmail: '',
            logPassword: '',
            googleSignInParams: {
                client_id: '233480838293-u757u2147bqiht0g048s58pssp4kd49j.apps.googleusercontent.com'
            }
        }
    },
    methods: {
        login (){
            const email= this.logEmail;
            const password = this.logPassword;
            const payload = {
                email, password
            };
            this.$emit("submitLogin", payload);
        },
        gotoRegister(){
            this.$emit("gotoRegister");
        }
        ,
        onSignInSuccess (googleUser) {
            const profile = googleUser.getBasicProfile()
            const token = googleUser.getAuthResponse().id_token ;
            const userLogin = {
                name: profile.getName(),
                email: profile.getEmail()
            }
            this.$emit('googleLogin', token)
            // console.log(token);
            // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            // console.log('Name: ' + profile.getName());
            // console.log('Image URL: ' + profile.getImageUrl());
            // console.log('Email: ' + profile.getEmail());
        },
        onSignInError (error) {
            console.log('OH NOES', error)
        }
    }
}
</script>

<style>
</style>