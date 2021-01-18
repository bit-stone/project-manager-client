<template>
  <div class="project-item" @click="showProject">
    <div class="project-item-title">
      <b>{{ project.title }}</b>
      <small>{{ project.location }}</small>
    </div>
    <div class="project-state">
      <ProjectStateIndicator
        :state-string="project.totalState"
        :icon-only="true"
      ></ProjectStateIndicator>
    </div>
    <div class="projet-item-tags">
      <TagList :tag-list="project.tagList"></TagList>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ProjectInterface } from "@/@types/ApiInterfaces";
import TagList from "@/components/TagList.vue";
import ProjectStateIndicator from "@/components/project/ProjectStateIndicator.vue";

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
  margin: 1rem;
  display: grid;
  grid-template-rows: 3rem auto;
  grid-template-columns: auto 4rem;
  grid-template-areas: "title state" "details details";
}

.project-item:hover {
  border-color: #801818;
  background-color: #ccc;
}

.project-item-title {
  grid-area: title;
  color: #00b10f;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
}

.project-item-title small {
  font-size: 0.8rem;
  color: #666;
}

.project-state {
  grid-area: state;
  display: flex;
  justify-content: flex-end;
}
</style>
