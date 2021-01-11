<template>
  <div class="project-item" @click="showProject">
    <div class="project-item-title">
      <b>{{ project.title }}</b>
      <ProjectStateIndicator
        :state-string="project.totalState"
        :icon-only="true"
        style="color: #888"
      ></ProjectStateIndicator>
    </div>
    <div class="project-item-location">
      <small>{{ project.location }}</small>
    </div>
    <div class="projet-item-tags">
      <TagList :tag-list="project.tagList"></TagList>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ProjectInterface } from "ApiInterfaces";
import TagList from "@/components/TagList.vue";
import ProjectStateIndicator from "@/components/ProjectStateIndicator.vue";

import router from "@/router";

@Component({
  components: {
    TagList,
    ProjectStateIndicator
  }
})
export default class ProjectItem extends Vue {
  @Prop() project!: ProjectInterface;

  showProject() {
    router.push("/project/" + this.project._id);
  }
}
</script>

<style scoped>
.project-item {
  border: 2px solid #ccc;
  background-color: white;
  padding: 1rem;
  cursor: pointer;
  border-radius: 0.5rem;
  min-width: 20rem;
  box-shadow: 0 0 4px 0 rgba(200, 200, 200, 0.8);
}

.project-item:hover {
  border-color: #801818;
  background-color: #ccc;
}

.project-item-title {
  color: #00b10f;
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.project-item-location {
  color: #666;
}
</style>
