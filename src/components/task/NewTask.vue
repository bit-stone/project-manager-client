<template>
  <div class="new-task-container">
    <div class="new-task-title">
      <input
        type="text"
        v-model="newTask.title"
        placeholder="Titel der Aufgabe"
      />
    </div>
    <div class="new-task-description">
      <textarea
        v-model="newTask.description"
        placeholder="Genauere Beschreibung der Aufgabe..."
      ></textarea>
    </div>
    <div class="new-task-right-side">
      <span> Zuweisung an: </span>
      <select v-model="newTask.workUserId">
        <option
          v-for="(userItem, userId) in userNameList"
          :key="userId"
          :value="userId"
        >
          {{ userItem.displayName }}
        </option>
      </select>
      <hr />
      <span> Fällig am: </span>
      <input type="date" v-model="newTask.dueMoment" />
    </div>
    <div class="new-task-actions">
      <button type="button" class="red" @click="cancelEdit">
        <i class="material-icons-round">clear</i>
        Abbrechen
      </button>
      <button type="button" @click="saveNewTask">
        <i class="material-icons-round">save</i>
        Speichern
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { TaskRefType, TaskInterface, TaskState } from "@/@types/ApiInterfaces";
import store from "@/store";

@Component({})
export default class NewTask extends Vue {
  @Prop() refType?: TaskRefType;
  @Prop() refId?: string;

  newTask = {
    _id: "",
    refId: this.refId,
    refType: this.refType,
    title: "",
    taskRef: 0,
    description: "",
    taskState: TaskState.open,
    createUserId: this.currentUserId,
    createMoment: "",
    changeMoment: "",
    dueMoment: "",
    workUserId: this.currentUserId
  } as TaskInterface;

  get userNameList() {
    return store.getters.userNameList;
  }

  get currentUserId() {
    return store.getters.loggedInUserId;
  }

  cancelEdit() {
    this.resetNewTask();
    this.$parent.$emit("taskEditCancel");
  }

  resetNewTask() {
    this.newTask.title = "";
    this.newTask.description = "";
    this.newTask.dueMoment = "";
  }

  async saveNewTask() {
    try {
      const response = await Vue.apiCall("/api/task/add", "POST", {
        taskData: this.newTask
      });
      if (response.success === true) {
        Vue.toastSuccess("Aufgabe wurde angelegt!");
        this.resetNewTask();
        this.$parent.$emit("taskAdded", response.data.taskData);
      } else {
        Vue.toastError(response.message);
      }
    } catch (e) {
      console.log(e);
      Vue.toastError(e);
    }
  }
}
</script>

<style scoped>
.new-task-container {
  width: 100%;
  min-height: 10rem;
  display: grid;
  grid-template-rows: 2rem 6rem 2rem;
  grid-template-columns: auto 10rem;
  grid-template-areas: "title right-side" "description right-side" "actions actions";
  padding: 0.5rem 0 0.5rem 0;
}

input,
select {
  width: 95%;
}

textarea {
  width: 95%;
  resize: none;
  height: 5rem;
}

.new-task-title {
  grid-area: title;
}

.new-task-description {
  grid-area: description;
}

.new-task-right {
  grid-area: right-side;
}

.new-task-actions {
  grid-area: actions;
  display: flex;
  justify-content: flex-end;
}
</style>
