<template>
  <div class="data-panel">
    <div class="data-panel-header">
      <div class="data-panel-title">Aufgaben</div>
      <div class="data-panel-side-title">
        <button type="button" v-show="!showNewTask" @click="toggleShowNewTask">
          <i class="material-icons-round">add_circle</i>
          Aufgabe
        </button>
      </div>
    </div>
    <div class="data-panel-divider" v-show="showNewTask"></div>
    <div class="data-panel-line" v-show="showNewTask">
      <NewTask :refType="refType" :refId="refId"></NewTask>
    </div>
    <div class="data-panel-divider"></div>
    <div class="data-panel-line">
      <div class="loading" v-show="loading"></div>
    </div>
    <div class="data-panel-line" v-show="!loading">
      <span style="color: #ccc;" v-show="taskList.length === 0">
        Keine Aufgaben vorhanden
      </span>
      <TaskItem
        v-for="taskItem in filteredTaskList"
        :key="taskItem._id"
        :taskData="taskItem"
      >
      </TaskItem>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { TaskInterface, TaskRefType } from "@/@types/ApiInterfaces";
import TaskItem from "@/components/task/TaskItem.vue";
import NewTask from "@/components/task/NewTask.vue";

@Component({
  components: {
    TaskItem,
    NewTask
  }
})
export default class TaskList extends Vue {
  @Prop() refType?: TaskRefType;
  @Prop() refId?: string;

  loading = false;
  taskList: TaskInterface[] = [];

  displaySettings = {
    showUserId: ""
  };
  showNewTask = false;

  mounted() {
    this.fetchData();

    this.$on("taskEditCancel", () => {
      this.showNewTask = false;
    });

    this.$on("taskAdded", (taskData: TaskInterface) => {
      this.taskList.unshift(taskData);
      this.showNewTask = false;
    });
  }

  get filteredTaskList(): TaskInterface[] {
    const sortStateObject = {
      open: 1,
      progress: 2,
      halted: 3,
      completed: 4
    };

    return this.taskList
      .filter((el: TaskInterface) => {
        if (this.displaySettings.showUserId.length) {
          return el.workUserId === this.displaySettings.showUserId;
        } else {
          return true;
        }
      })
      .sort((taskA: TaskInterface, taskB: TaskInterface) => {
        return (
          sortStateObject[taskA.taskState] - sortStateObject[taskB.taskState]
        );
      });
  }

  toggleShowNewTask() {
    this.showNewTask = !this.showNewTask;
  }

  async fetchData() {
    this.loading = true;
    if (this.refId && this.refId.length) {
      const taskResponse = await Vue.apiCall(
        "/api/task/" + this.refType + "/" + this.refId
      );
      if (taskResponse.success === true) {
        this.loading = false;
        this.taskList = taskResponse.data.taskList;
      }
    }
  }
}
</script>

<style scoped></style>
