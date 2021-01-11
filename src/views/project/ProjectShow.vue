<template>
  <div>
    <div class="loading" v-show="loading"></div>

    <div id="project-show" v-if="!loading">
      <div id="project-show-left">
        <div class="data-panel">
          <div class="data-panel-header">
            <div class="data-panel-title">{{ projectData.title }}</div>
            <div class="data-panel-side-title">
              <button type="button">
                <i class="material-icons-round">create</i>
                Bearbeiten
              </button>
            </div>
          </div>
          <div class="data-panel-sub-title">{{ projectData.location }}</div>
          <div class="data-panel-sub-title">
            <ProjectStateIndicator
              :state-string="projectData.totalState"
              :icon-only="false"
            ></ProjectStateIndicator>
          </div>
          <div class="data-panel-divider"></div>
          <div class="data-panel-line">
            <TagList :tag-list="projectData.tagList"></TagList>
          </div>
          <div
            class="data-panel-line"
            style="margin-top: 1rem; font-size: 0.8rem;"
          >
            {{ projectData.description }}
          </div>
        </div>

        <NoteList :refType="'project'" :refId="projectData._id"></NoteList>
      </div>
      <div id="project-show-right"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ProjectInterface } from "ApiInterfaces";
import TagList from "@/components/TagList.vue";
import NoteList from "@/components/NoteList.vue";
import ProjectStateIndicator from "@/components/ProjectStateIndicator.vue";

@Component({
  watch: {
    $route: "fetchData"
  },
  components: {
    TagList,
    ProjectStateIndicator,
    NoteList
  }
})
export default class Project extends Vue {
  loading = false;
  projectData!: ProjectInterface;

  created() {
    this.fetchData();
  }

  /**
   * Fetching Project Data
   */
  async fetchData() {
    this.loading = true;
    const projectId: string = this.$route.params.projectId;
    if (projectId.length) {
      const response = await Vue.$apiCall("/api/project/" + projectId);
      if (response.success === true) {
        this.projectData = response.data.projectData;
        this.loading = false;
      } else {
        console.error(response.message);
      }
    }
  }
}
</script>

<style scoped>
#project-show {
  display: grid;
  grid-template-columns: 35% auto;
}

#project-show-left {
  padding: 1rem;
  padding-right: 0.5rem;
  display: flex;
  flex-direction: column;
}

#project-show-right {
  padding: 1rem;
  padding-left: 0.5rem;
  display: flex;
  flex-direction: column;
}
</style>
