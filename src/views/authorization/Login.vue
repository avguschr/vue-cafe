<template>
    <div class="d-flex flex-column align-items-center">
        <h1 class="text-center mb-5">Log In</h1>
        <div :class="$style.content">
            <form method="post">
                <label for="login">Login</label>
                <input required v-model="loginText" class="inp" type="text" placeholder="Enter your login">
                <label for="password">Password</label>
                <input required v-model="password" class="inp" type="password" placeholder="Enter your password">
                <button @click.prevent="makeLogIn" class="but">Log In</button>
            </form>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'log-in',
    data() {
        return {
            loginText: 'admin',
            password: 'admin'
        }
    },
    methods: {
        ...mapActions({login: 'authorization/login/login'}),
        async makeLogIn() {
            if (this.loginText || this.password) {
                this.login({login: this.loginText, password: this.password})
                this.loginText = ''
                this.password = ''
                this.$router.push('/')
            }
        }
    }
}
</script>
<style module>
    .content {
        width: 50%;
    }
</style>