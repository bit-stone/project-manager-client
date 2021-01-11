<template>
  <div class="tag-list">
    <span class="tag-item" v-for="(tag, idx) in tagList" :key="idx">
      {{ tag }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class TagList extends Vue {
  @Prop() tagList!: string[];
}
</script>

<style scoped>
.tag-item {
  border: none;
  background-color: #801818;
  color: white;
  border-radius: 0.2rem;
  padding: 0.1rem 0.5rem 0.1rem 0.5rem;
  font-size: 0.7rem;
  margin-right: 0.2rem;
}
</style>
