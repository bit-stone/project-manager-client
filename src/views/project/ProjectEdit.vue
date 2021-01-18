<template>
  <div>
    <div class="loading" v-show="loading"></div>

    <div id="project-edit" v-if="!loading">
      <div class="data-panel">
        <div class="data-panel-header">
          <div class="data-panel-title">
            Projekt bearbeiten
          </div>
          <div class="data-panel-side-title" style="display: flex;">
            <button type="button" @click="saveProject">
              <i class="material-icons-round">save</i>
              Speichern
            </button>
            <button type="button" class="red" @click="cancelEdit">
              <i class="material-icons-round">clear</i>
              Abbrechen
            </button>
          </div>
        </div>
        <div class="data-panel-divider"></div>
        <div class="project-edit-content">
          <div class="project-edit-line">
            <div class="project-edit-label">Titel:</div>
            <div class="project-edit-input">
              <input type="text" v-model="projectData.title" />
            </div>
          </div>

          <div class="project-edit-line">
            <div class="project-edit-label">Ort:</div>
            <div class="project-edit-input">
              <input type="text" v-model="projectData.location" />
            </div>
          </div>

          <div class="project-edit-line">
            <div class="project-edit-label">Status:</div>
            <div class="project-edit-input">
              <select v-model="projectData.totalState">
                <option value="new">Neu</option>
                <option value="offer">Angebotsphase</option>
                <option value="offerRejected">Angebot abgelehnt</option>
                <option value="planning">Planung/Abbau</option>
                <option value="production">Herstellung</option>
                <option value="installation">Montage</option>
                <option value="warranty">Gewährleistung</option>
              </select>
            </div>
          </div>

          <div class="project-edit-line">
            <div class="project-edit-label">Beschreibung:</div>
            <div class="project-edit-input">
              <textarea rows="6" v-model="projectData.description" />
            </div>
          </div>

          <div class="project-edit-line">
            <div class="project-edit-label">Tags:</div>
            <div class="project-edit-input">
              <textarea rows="6" v-model="tagListInput" @change="updateTags" />
            </div>
          </div>

          <div class="project-edit-line">
            <div class="project-edit-label">Tag-Vorschau</div>
            <div class="project-edit-input">
              <TagList :tag-list="projectData.tagList"></TagList>
            </div>
          </div>
        </div>
      </div>

      <div class="data-panel" style="margin-top: 4rem;">
        <div class="data-panel-header">
          <div class="data-panel-title" style="color: red;">
            Seltene Aktionen
          </div>
        </div>
        <div class="data-panel-divider"></div>
        <div class="data-panel-action-line" v-show="!projectData.isArchived">
          <span>
            Projekte nur noch über Archiv zugänglich machen:
            <span style="color: red"
              >Ungespeicherte Änderungen gehen dabei verloren!</span
            >
          </span>
          <button type="button" class="red" @click="toggleIsArchived">
            Projekt archivieren
          </button>
        </div>
        <div class="data-panel-action-line" v-show="projectData.isArchived">
          <span>
            Projekt wieder aktiv zugänglich machen:
          </span>
          <button type="button" class="red" @click="toggleIsArchived">
            Archivierung aufheben
          </button>
        </div>
        <div
          class="data-panel-divider"
          style="margin-top: 1rem; margin-bottom: 1rem;"
        ></div>
        <div class="data-panel-action-line">
          <span>
            Projekt vollkommen entfernen.<br />
            <span style="color: red"
              >Damit werden auch alle verknüpften Aufgaben, Medien und Dokumente
              unwiederbringlich gelöscht!</span
            >
          </span>
          <button type="button" class="red" @click="deleteProject">
            Projekt löschen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ProjectInterface, ProjectState } from "@/@types/ApiInterfaces";
import TagList from "@/components/TagList.vue";

@Component({
  watch: {
    $route: "this.fetchData"
  },
  components: {
    TagList
  }
})
export default class ProjectEdit extends Vue {
  loading = true;

  tagListInput = "";
  projectData: ProjectInterface = {
    _id: "0",
    title: "Neues Projekt",
    isArchived: false,
    location: "",
    description: "",
    createMoment: "",
    tagList: [],
    totalState: ProjectState.new
  };

  mounted() {
    this.fetchData();
  }

  cancelEdit() {
    const projectId = this.$route.params.projectId;
    if (projectId && projectId.length === 24) {
      this.$router.push("/project/" + projectId);
    } else {
      this.$router.push("/project");
    }
  }

  updateTags() {
    const dummyList = this.tagListInput.split(",");
    const outputList: string[] = [];
    if (dummyList.length > 0) {
      for (let tagItem of dummyList) {
        tagItem = tagItem.trim();
        if (tagItem.length > 0) {
          outputList.push(tagItem);
        }
      }
    }
    this.projectData.tagList = outputList;
  }

  async fetchData() {
    this.loading = true;
    const projectId = this.$route.params.projectId;
    if (projectId && projectId.length === 24) {
      const response = await Vue.apiCall("/api/project/" + projectId);
      if (response.success === true) {
        this.projectData = response.data.projectData;
        if (this.projectData.tagList) {
          this.tagListInput = this.projectData.tagList.join(",");
        }
        this.loading = false;
      }
    } else {
      // new project :O
      this.loading = false;
    }
  }

  async saveProject() {
    try {
      const response = await Vue.apiCall("/api/project/save", "POST", {
        projectData: this.projectData
      });
      if (response.success === true) {
        this.$router.push("/project/" + response.data.projectData._id);
        Vue.toastSay({ message: "Projekt wurde gespeichert", type: "success" });
      } else {
        console.log(response.message);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async toggleIsArchived() {
    try {
      const response = await Vue.apiCall("/api/project/archive", "POST", {
        projectId: this.projectData._id
      });
      if (response.success === true) {
        this.projectData = response.data.projectData;
        if (this.projectData.isArchived === true) {
          Vue.toastSay({
            message: "Projekt wurde erfolgreich archiviert",
            type: "success"
          });
        } else {
          Vue.toastSay({
            message: "Projekt wurde reaktiviert",
            type: "success"
          });
        }
      } else {
        console.log(response.message);
        Vue.toastSay({
          message: "Fehler: " + response.message,
          type: "error"
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  async deleteProject() {
    const cont = confirm(
      "Wollen sie dieses Projekt wirklich komplett entfernen?"
    );
    if (!cont) {
      return;
    }

    try {
      const projectId = this.$route.params.projectId;
      if (projectId && projectId.length === 24) {
        const response = await Vue.apiCall(
          "/api/project/" + projectId,
          "DELETE"
        );
        if (response.success === true) {
          this.$router.push("/project");
        } else {
          console.log(response.message);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style scoped>
#project-edit {
  padding: 1rem;
  width: 20%;
  margin: auto;
  min-width: 40rem;
}

.project-edit-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.project-edit-line {
  min-height: 1.5rem;
  line-height: 1.5rem;
  display: flex;
  width: 100%;
  margin-bottom: 0.5rem;
}

.project-edit-label {
  width: 10rem;
  text-align: right;
  padding-right: 0.3rem;
}

.project-edit-input {
  width: 100%;
}

.project-edit-input input {
  width: calc(100% - 1rem);
  border: 1px solid #ccc;
}

.project-edit-input select {
  width: calc(100% - 0.6rem);
}

.project-edit-input textarea {
  resize: none;
  width: calc(100% - 1rem);
  border: 1px solid #ccc;
}
</style>
