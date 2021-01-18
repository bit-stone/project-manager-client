<template>
  <div>
    <div class="login-required" v-show="!isLoggedIn">Bitte einloggen!</div>
    <div id="user-side-bar" v-if="isLoggedIn">
      <div class="user-sub-header">Eingeloggt als:</div>
      <div class="user-header">{{ userDisplayName }}</div>
      <div class="user-sub-header">{{ userLoginName }}</div>
      <div class="user-divider"></div>
      <div class="user-sub-header">
        Hier könnten noch weitere Dinge stehen :)
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store";

@Component({})
export default class UserSideBar extends Vue {
  get isLoggedIn() {
    return store.state.isLoggedIn;
  }

  get userDisplayName() {
    return store.getters.loggedInDisplayName;
  }

  get userLoginName() {
    return store.getters.loggedInLoginName;
  }
}
</script>

<style scoped>
#user-side-bar {
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.user-header {
  text-align: center;
  font-size: 1.5rem;
  color: #00b10f;
}

.user-sub-header {
  color: #888;
  text-align: center;
  font-size: 0.8rem;
}

.user-divider {
  border-bottom: 2px solid #ccc;
  height: 0.5rem;
  margin-bottom: 0.5rem;
}

.login-required {
  color: #ccc;
  margin: auto;
  margin-top: 4rem;
  text-align: center;
}
</style>
