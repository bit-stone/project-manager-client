<template>
  <div
    class="project-state-indicator-container"
    :title="stateDisplayData.title"
  >
    <div class="project-state-icon" :class="stateDisplayData.style">
      <div class="project-state-inner-icon">
        <i class="material-icons-round">{{ stateDisplayData.icon }}</i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ProjectState } from "@/@types/ApiInterfaces";

@Component({})
export default class ProjectStateIndicator extends Vue {
  @Prop() stateString!: ProjectState;
  @Prop() iconOnly!: boolean;

  get stateDisplayData(): { title: string; icon: string; style: string } {
    switch (this.stateString) {
      case "new":
        return {
          title: "Neu angelegtes Projekt",
          icon: "add_circle_outline",
          style: "step-one"
        };
      case "offer":
        return {
          title: "Angebotsphase",
          icon: "attach_money",
          style: "step-two"
        };
      case "offerRejected":
        return {
          title: "Angebot abgelehnt",
          icon: "money_off",
          style: "step-two"
        };
      case "planning":
        return {
          title: "Planungs/Zeichnungsphase",
          icon: "calculate",
          style: "step-three"
        };
      case "production":
        return {
          title: "Produktionsphase",
          icon: "biotech",
          style: "step-four"
        };
      case "installation":
        return {
          title: "Montagephase",
          icon: "construction",
          style: "step-five"
        };
      case "warranty":
        return {
          title: "Gewähleistungsphase",
          icon: "flag",
          style: "step-six"
        };
      default:
        return { title: "", icon: "", style: "" };
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

<style scoped>
.project-state-icon {
  width: 2.6rem;
  height: 2.6rem;
  background-color: #00b10f;
  border-radius: 100%;
  /* border: 2px solid #00b10f; */
  color: #801818;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-state-inner-icon {
  background-color: white;
  border-radius: 1rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-one {
  background: white;
}

.step-two {
  background-color: #ffd000;
  background-image: linear-gradient(90deg, white 50%, transparent 50%),
    linear-gradient(180deg, transparent 50%, white 50%);
}

.step-three {
  background-image: linear-gradient(90deg, white 50%, transparent 50%),
    linear-gradient(180deg, transparent 50%, #ffd000 50%);
}

.step-four {
  background-image: linear-gradient(90deg, transparent 50%, #00b10f 50%),
    linear-gradient(180deg, white 50%, #ffd000 50%);
}

.step-five {
  background-image: linear-gradient(90deg, transparent 50%, #00b10f 50%),
    linear-gradient(180deg, #ffd000 50%, #00b10f 50%);
}

.step-six {
  background: #00b10f;
}
</style>
