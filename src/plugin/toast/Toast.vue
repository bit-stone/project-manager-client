<template>
  <div id="toast-container">
    <div
      class="toast-item"
      v-for="(toastItem, index) in toastList"
      :key="index"
      :class="toastItem.type"
    >
      {{ toastItem.message }}
      <div class="toast-item-close">
        <i class="material-icons-round" @click="removeToast(index)">clear</i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Toast } from "./ToastPlugin";
import store from "@/store";

@Component({})
export default class ToastComponent extends Vue {
  exampleText = "";

  get toastList() {
    return store.getters.toastList;
  }

  removeToast(index: number) {
    store.commit("toastRemove", { index });
  }
}
</script>

<style scoped>
#toast-container {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 1rem;
  left: 50%;
  width: 0;
  min-height: 0;
  align-items: center;
}

.toast-item {
  min-width: 22rem;
  padding: 0.5rem;
  border-radius: 0.3rem;
  margin-bottom: 0.5rem;
  background-color: white;
  box-shadow: 0 0 8px 0 rgba(150, 150, 150, 0.8);
  border: 2px solid #ccc;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 0.15s;
}

@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.toast-item-close {
  cursor: pointer;
}

.toast-item-close:hover {
  color: #801818;
}

.toast-item-close i {
  font-size: 1rem;
}

.toast-item.info {
  background-color: #cdf1ff;
  border-color: #9fe4ff;
}

.toast-item.success {
  background-color: #cdffe2;
  border-color: #84ffb7;
}

.toast-item.warning {
  background-color: #fff8cd;
  border-color: #fded84;
}

.toast-item.error {
  background-color: #ffd3cd;
  border-color: #ff897a;
}
</style>
