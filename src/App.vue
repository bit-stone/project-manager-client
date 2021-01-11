<template>
  <div id="app">
    <div id="main-nav">
      <div class="nav-logo">
        <img src="./assets/logo.png" width="60px" height="60px" />
      </div>

      <router-link to="/dashboard" class="main-nav-item">
        <i class="material-icons-round">dashboard</i>
        <small>Übersicht</small>
      </router-link>

      <router-link to="/project" class="main-nav-item">
        <i class="material-icons-round">construction</i>
        <small>Projekte</small>
      </router-link>

      <router-link to="/task" class="main-nav-item">
        <i class="material-icons-round">assignment_turned_in</i>
        <small>Aufgaben</small>
      </router-link>

      <router-link to="/tools" class="main-nav-item">
        <i class="material-icons-round">calculate</i>
        <small>Tools</small>
      </router-link>

      <router-link to="/archive" class="main-nav-item">
        <i class="material-icons-round">archive</i>
        <small>Archiv</small>
      </router-link>

      <a
        href="#"
        @click="logoutRequest"
        class="main-nav-item login-nav-item"
        v-show="isLoggedIn"
      >
        <i class="material-icons-round">power_settings_new</i>
        <small>Abmelden</small>
      </a>
    </div>

    <div id="main-content">
      <router-view />
    </div>

    <div id="main-user">
      <UserSideBar></UserSideBar>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserSideBar from "@/views/UserSideBar.vue";
import router from "./router";
import store from "./store";

@Component({
  components: {
    UserSideBar
  }
})
export default class App extends Vue {
  async mounted() {
    try {
      const response = await Vue.$apiCall("/auth/ping");
      if (response.success === true) {
        store.commit("userLogin", { id: response.data.userId });
        store.commit("setUserNameList", response.data.userNameList);
      }
    } catch (e) {
      console.log(e);
      store.commit("userLogout");
    }
  }

  get isLoggedIn() {
    return store.state.isLoggedIn;
  }

  async logoutRequest() {
    const response = await Vue.$apiCall("/auth/logout", "POST");
    if (response.success === true) {
      store.commit("userLogout");
      router.push("/login");
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  font-family: "Ubuntu", sans-serif;
  display: grid;
  grid-template-columns: 6rem auto 20rem;
  grid-template-rows: 100%;
  height: 100%;
  color: #0c1618;
  background-color: #f5fdf6;
}

#main-nav {
  display: flex;
  flex-direction: column;
  background-color: #00b10f;
  color: #fffbef;
  align-items: center;
  padding-top: 0.5rem;
}

#main-content {
  height: 100%;
  overflow-y: scroll;
}

#main-user {
  border-left: 2px solid #00b10f;
  background-color: white;
}

h1,
h2,
h3 {
  color: #00b10f;
}

input,
select {
  height: 1.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
}

a {
  text-decoration: none;
}

.main-nav-item {
  height: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fffbef;
  margin-bottom: 2rem;
  width: calc(100% - 0.5rem);
  margin-left: 0.5rem;
}

.main-nav-item:hover {
  color: #801818;
}

.main-nav-item.router-link-exact-active {
  background-color: #f5fdf6;
  color: #00b10f;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}

.main-nav-item.router-link-active {
  background-color: #f5fdf6;
  color: #00b10f;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}

.main-nav-item i {
  font-size: 3rem;
}

.login-nav-item {
  margin-top: auto;
}

.nav-logo {
  width: 4rem;
  margin-bottom: 1rem;
}

button {
  height: 2rem;
  color: white;
  background-color: #00b10f;
  border-radius: 0.3rem;
  border: none;
  cursor: pointer;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  display: flex;
  flex-direction: row;
  font-size: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-right: 0.5rem;
}

button.red {
  background-color: #db4141;
}

button i {
  margin-right: 0.2rem;
}

button:hover {
  background-color: #801818;
}

.header {
  display: grid;
  grid-template-columns: 50% 50%;
  line-height: 4rem;
  height: 4rem;
}

.header-title {
  color: #00b10f;
  font-size: 1.5rem;
}

.header-actions {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding-right: 1rem;
}

.loading {
  color: #00b10f;
  font-size: 2rem;
  width: 32px;
  height: 32px;
  text-align: center;
  margin: auto;
  margin-top: 4rem;
  background: url("./assets/loading.gif");
}

.data-panel {
  border: 2px solid #ccc;
  box-shadow: 0 0 4px rgba(200, 200, 200, 0.8);
  border-radius: 1rem;
  padding: 0.5rem;
  background: white;
  margin-bottom: 1rem;
  min-width: 45%;
}

.data-panel-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.data-panel-header {
  height: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.data-panel-title {
  color: #00b10f;
  font-size: 1.5rem;
  font-weight: bold;
}

.data-panel-sub-title {
  color: #888;
  font-size: 1rem;
}

.data-panel-side-title {
  color: #888;
  font-size: 1rem;
}

.data-panel-divider {
  margin-bottom: 0.5rem;
  height: 0.5rem;
  border-bottom: 1px solid #ccc;
}

.page-header {
  display: grid;
  grid-template-columns: 20% auto 20%;
  height: 3rem;
  background-color: white;
  border-bottom: 2px solid #00b10f;
  margin-bottom: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  line-height: 3rem;
}

.page-header * {
  display: flex;
  flex-direction: row;
}

.page-header .left {
  color: #00b10f;
  justify-content: flex-start;
  align-items: center;
}

.page-header .center {
  justify-content: center;
  align-items: center;
}

.page-header .right {
  justify-content: flex-end;
  align-items: center;
}
</style>
