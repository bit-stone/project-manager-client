<template>
  <select v-model="selectedValue">
    <option value="">-</option>
    <option
      v-for="(userItem, userId) in userNameList"
      :key="userId"
      :value="userId"
      >{{ userItem.displayName }}</option
    >
  </select>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import store from "@/store";

@Component({})
export default class UserSelect extends Vue {
  selectedValue = "";

  @Watch("selectedValue")
  onValueChanged() {
    this.$emit("select", this.selectedValue);
  }

  get userNameList() {
    return store.getters.userNameList;
  }
}
</script>

<style scoped></style>
