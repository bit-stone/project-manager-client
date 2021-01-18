<template>
  <div
    class="task"
    v-show="taskData"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="task-item">
      <div
        class="task-state"
        :class="{ changeable: isWorker && showActions }"
        :style="{ color: taskStateColor }"
        @click="toggleShowStateOptions"
      >
        <i class="material-icons-round">
          {{ taskStateIcon }}
        </i>
        <div class="task-state-options" v-show="showStateOptions">
          <div class="task-state-option" @click="setTaskState('open')">
            <i class="material-icons-round" style="color: #cccccc;"
              >radio_button_checked</i
            >
          </div>
          <div class="task-state-option" @click="setTaskState('halted')">
            <i class="material-icons-round" style="color: #801818;"
              >pause_circle_outline</i
            >
          </div>
          <div class="task-state-option" @click="setTaskState('progress')">
            <i class="material-icons-round" style="color: #ffd000;"
              >play_circle_outline</i
            >
          </div>
          <div class="task-state-option" @click="setTaskState('completed')">
            <i class="material-icons-round" style="color: #00f10b;">task_alt</i>
          </div>
        </div>
      </div>
      <div class="task-title" @click="toggleShowDetails">
        {{ taskData.title }}
      </div>
      <!-- Sub-Title -->
      <div class="task-sub-1">
        <i class="material-icons-round">construction</i>
        {{ userDisplayName(taskData.workUserId) }}
        - {{ convertToDateTime(taskData.changeMoment) }}
      </div>
      <div class="task-sub-3">
        <i class="material-icons-round">add_circle_outline</i>
        {{ userDisplayName(taskData.createUserId) }}
        - {{ convertToDate(taskData.createMoment) }}
      </div>
      <div
        class="task-sub-4"
        :title="convertToDateTime(taskData.dueMoment)"
        v-show="taskData.dueMoment"
        :style="{ color: dueDateColor }"
      >
        <i class="material-icons-round">alarm</i>
        {{ convertToDate(taskData.dueMoment) }}
      </div>
    </div>
    <div class="task-details" v-show="showDetails">
      {{ taskData.description }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { TaskInterface, TaskState } from "@/@types/ApiInterfaces";
import store from "@/store";

@Component({})
export default class TaskItem extends Vue {
  @Prop() taskData!: TaskInterface;

  showDetails = false;
  showActions = false;
  showStateOptions = false;

  handleMouseEnter() {
    this.showActions = true;
  }

  handleMouseLeave() {
    this.showActions = false;
  }

  toggleShowStateOptions() {
    if (this.isWorker === true) {
      this.showStateOptions = !this.showStateOptions;
    }
  }

  toggleShowDetails() {
    this.showDetails = !this.showDetails;
  }

  get currentUserId() {
    return store.getters.loggedInUserId;
  }

  get taskStateIcon() {
    switch (this.taskData.taskState) {
      case "open":
        return "radio_button_checked";
      case "halted":
        return "pause_circle_outline";
      case "progress":
        return "play_circle_outline";
      case "completed":
        return "task_alt";
      default:
        return "warning";
    }
  }

  get taskStateColor() {
    switch (this.taskData.taskState) {
      case "open":
        return "#cccccc";
      case "halted":
        return "#801818";
      case "progress":
        return "#ffd000";
      case "completed":
        return "#00f10b";
      default:
        return "warning";
    }
  }

  get dueDateColor() {
    if (
      this.taskData.dueMoment &&
      this.taskData.dueMoment.length &&
      this.taskData.taskState !== TaskState.completed
    ) {
      const dateItem = new Date(this.taskData.dueMoment);
      const today = new Date();

      const diff = Math.round((dateItem.getTime() - today.getTime()) / 1000);
      console.log(diff);

      if (diff < 2 * 24 * 60 * 60) {
        return "#db4141";
      } else if (diff < 5 * 24 * 60 * 60) {
        return "#ffd000";
      } else {
        return "#cccccc";
      }
    }
    return "#cccccc";
  }

  get isCreator() {
    return this.taskData.createUserId === this.currentUserId;
  }

  get isWorker() {
    return this.isCreator === true ? true : this.isWorkerOnly;
  }

  get isWorkerOnly() {
    return this.taskData.workUserId === this.currentUserId;
  }

  userDisplayName(userId: string) {
    return store.getters.userDisplayName(userId);
  }

  convertToDate(inputString: string) {
    if (inputString && inputString.length) {
      const dateItem = new Date(inputString);
      return dateItem.toLocaleString("de-DE", {
        hour12: false,
        weekday: "short",
        month: "2-digit",
        day: "2-digit",
        year: "numeric"
      });
    }
    return "-";
  }

  convertToDateTime(inputString: string) {
    const dateItem = new Date(inputString);
    return dateItem.toLocaleString("de-DE", {
      hour12: false,
      weekday: "short",
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }

  async setTaskState(state: TaskState) {
    try {
      if (state !== this.taskData.taskState) {
        const response = await Vue.apiCall("/api/task/update-state", "POST", {
          taskId: this.taskData._id,
          newState: state
        });

        if (response.success === true) {
          this.taskData.taskState = response.data.taskData.taskState;
          this.taskData.changeMoment = response.data.taskData.changeMoment;
          Vue.toastSuccess("Aufgaben-Status aktualisiert");
        } else {
          Vue.toastError(response.message);
        }
      }
    } catch (e) {
      console.error(e);
      Vue.toastError(e);
    }
  }
}
</script>

<style scoped>
.task {
  min-height: 3rem;
  display: flex;
  flex-direction: column;
  border: 2px solid #ccc;
  box-shadow: 0 0 2px 0 rgba(200, 200, 200, 0.7);
  background-color: white;
  border-bottom: none;
}

.task:last-child {
  border-bottom: 2px solid #ccc;
}

.task-item {
  display: grid;
  height: 2.5rem;
  font-size: 0.7rem;
  line-height: 1rem;
  color: #aaa;
  padding: 0.3rem 0.5rem 0.3rem 0.5rem;
  grid-template-rows: 67% 33%;
  grid-template-columns: 3rem repeat(4, calc((100% - 3.5rem) / 4));
  grid-template-areas:
    "state title title title title"
    "state sub-1 sub-1 sub-3 sub-4";
}

.task-details {
  font-size: 0.8rem;
  border-top: 1px solid #ccc;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  /* padding: 1rem; */
}

.task:hover {
  background-color: #fafafa;
}

.task-state {
  grid-area: state;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  user-select: none;
}

.task-state.changeable {
  border: 1px solid #ccc;
}

.task-state.changeable:hover {
  border-color: #801818;
}

.task-state i {
  font-size: 2rem;
  line-height: 2.5rem;
}

.task-title {
  grid-area: title;
  font-size: 1rem;
  line-height: 1.5rem;
  color: black;
  cursor: pointer;
}

*[class^="task-sub"] {
  display: flex;
  align-items: center;
}

*[class^="task-sub"] i,
*[class^="task-side"] i {
  font-size: 1rem;
}

.task-sub-1 {
  grid-area: sub-1;
}
.task-sub-2 {
  grid-area: sub-2;
}
.task-sub-3 {
  grid-area: sub-3;
}
.task-sub-4 {
  grid-area: sub-4;
  justify-content: flex-end;
}

.highlight {
  color: #00f10b;
}

.task-state-options {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 0.5rem;
  height: 2.5rem;
  border: 1px solid #ccc;
  position: absolute;
  left: 2.5rem;
  top: -2px;
  background-color: white;
}

.task-state-option {
  width: 2.6rem;
  text-align: center;
}
</style>
