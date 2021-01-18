<template>
  <div class="login">
    <div class="login-title">
      Login
    </div>
    <input
      type="text"
      v-model="loginName"
      placeholder="Benutzername"
      @keyup.enter="requestLogin"
    />
    <input
      type="password"
      v-model="password"
      placeholder="Passwort"
      @keyup.enter="requestLogin"
    />
    <small>{{ state }}</small>

    <button type="button" @click="requestLogin">Login</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import store from "@/store";

@Component
export default class Login extends Vue {
  loginName = "";
  password = "";
  state = "";

  async requestLogin() {
    const response = await Vue.apiCall("/auth/login", "POST", {
      loginName: this.loginName,
      password: this.password
    });
    if (response.success === true) {
      store.commit("userLogin", { id: response.data.userId });
      store.commit("setUserNameList", response.data.userNameList);
      router.push("/dashboard");
    } else {
      this.state = response.message;
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: auto;
  margin-top: 20rem;
}

.login-title {
  color: #00b10f;
  font-weight: bold;
  font-size: 4rem;
  text-align: center;
  margin-bottom: 1rem;
}

.login input {
  height: 2rem;
  border: 1px solid #ccc;
  margin-bottom: 0.5rem;
  width: 15rem;
}

.login button {
  width: 10rem;
  height: 1.5rem;
}

.login small {
  color: red;
  margin: 0.5rem;
}
</style>
