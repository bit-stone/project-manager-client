<template>
  <div class="home two-column-page">
    <div class="page-header">
      <div class="left">
        Projekte
      </div>
      <div class="center">
        Schnellsuche/Filter
      </div>
      <div class="right">
        <button type="button" @click="showProjectCreate">
          <i class="material-icons-round">add_circle</i>
          Projekt
        </button>
      </div>
    </div>

    <div class="content">
      <div class="loading" v-show="loading">Lade Daten...</div>
      <div class="project-list" v-show="!loading">
        <span
          v-show="projectList.length == 0"
          style="color: #ccc; padding-left: 1rem;"
        >
          Keine Projekte gefunden
        </span>
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
import { ProjectInterface } from "@/@types/ApiInterfaces";
import ProjectItem from "@/components/project/ProjectItem.vue";

@Component({
  components: {
    ProjectItem
  },
  watch: {
    $route: "fetchData"
  }
})
export default class ProjectList extends Vue {
  loading = false;
  projectList: ProjectInterface[] = [];

  created() {
    this.fetchData();
  }

  async fetchData() {
    this.loading = true;
    const response = await Vue.apiCall("/api/project");
    this.loading = false;
    if (response.success === true) {
      console.log(response);
      this.projectList = response.data.projectList;
    } else {
      console.error(response.message);
    }
  }

  showProjectCreate() {
    this.$router.push("/project/edit");
  }
}
</script>

<style scoped>
.project-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
}
</style>
