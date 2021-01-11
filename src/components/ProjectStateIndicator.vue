<template>
  <div class="project-state-indicator" :title="stateDisplayText">
    <div v-if="isArchived">
      <i class="material-icons-round">archive</i>
    </div>
    <div v-else>
      <div style="display: flex; flex-direction: row; align-items: center;">
        <span v-show="!iconOnly">{{ stateDisplayText }}</span>
        <i class="material-icons-round" style="margin-left: 0.2rem;">{{
          stateDisplayIcon
        }}</i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ProjectState } from "ApiInterfaces";

@Component({})
export default class ProjectStateIndicator extends Vue {
  @Prop() stateString!: ProjectState;
  @Prop() iconOnly!: boolean;

  get isArchived() {
    return this.stateString === "archived";
  }

  get stateDisplayData(): { title: string; icon: string } {
    switch (this.stateString) {
      case "new":
        return {
          title: "Neu angelegtes Projekt",
          icon: "create"
        };
      case "offer":
        return {
          title: "Angebotsphase",
          icon: "content_paste"
        };
      case "planning":
        return {
          title: "Planungs/Zeichnungsphase",
          icon: "architecture"
        };
      case "production":
        return {
          title: "Produktionsphase",
          icon: "construction"
        };
      case "installation":
        return {
          title: "Montagephase",
          icon: "foundation"
        };
      case "warranty":
        return {
          title: "Gewähleistungsphase",
          icon: "how_to_vote"
        };
      case "archived":
        return {
          title: "Projekt ist archiviert",
          icon: "archive"
        };
      default:
        return { title: "", icon: "" };
    }
  }

  get stateDisplayText() {
    return this.stateDisplayData.title;
  }

  get stateDisplayIcon() {
    return this.stateDisplayData.icon;
  }
}
</script>

<style></style>
