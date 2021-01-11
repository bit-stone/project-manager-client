<template>
  <div class="home two-column-page">
    <div class="page-header">
      <div class="left">
        Projekte
      </div>
      <div class="center">
        <input type="text" placeholder="Schnellsuche..." />
      </div>
      <div class="right">
        <button type="button">
          <i class="material-icons-round">add_circle</i>
          Neues Projekt
        </button>
      </div>
    </div>

    <div class="content">
      <div class="loading" v-show="loading">Lade Daten...</div>
      <div class="project-list" v-show="!loading">
        <div
          class="project-list-item"
          v-for="projectItem in projectList"
          :key="projectItem._id"
        >
          <ProjectItem :project="projectItem"></ProjectItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ProjectInterface } from "ApiInterfaces";
import ProjectItem from "@/components/ProjectItem.vue";

@Component({
  components: {
    ProjectItem
  },
  watch: {
    $route: "fetchData"
  }
})
export default class Project extends Vue {
  loading = false;
  projectList: ProjectInterface[] = [];

  created() {
    this.fetchData();
  }

  async fetchData() {
    this.loading = true;
    const response = await Vue.$apiCall("/api/project");
    this.loading = false;
    if (response.success === true) {
      console.log(response);
      this.projectList = response.data.projectList;
    } else {
      console.error(response.message);
    }
  }
}
</script>

<style scoped>
.project-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
