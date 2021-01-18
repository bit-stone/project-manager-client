<template>
  <div id="task-list">
    <div id="task-list-filter">
      <div style="margin-right: 1rem;">
        <span>Ersteller: </span>
        <UserSelect v-on:select="filterData.createUserId = $event"></UserSelect>
      </div>

      <div style="margin-right: 1rem;">
        <span>Bearbeiter: </span>
        <UserSelect v-on:select="filterData.workUserId = $event"></UserSelect>
      </div>

      <button type="button" @click="searchRequest">Suchen</button>
      <span>{{ taskList.length }} Ergebnisse</span>
    </div>
    <div id="task-list-results">
      <TaskItem
        v-for="taskItem in taskList"
        :key="taskItem._id"
        :taskData="taskItem"
      ></TaskItem>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TaskInterface } from "@/@types/ApiInterfaces";

import TaskItem from "@/components/task/TaskItem.vue";
import UserSelect from "@/components/UserSelect.vue";

@Component({
  components: {
    TaskItem,
    UserSelect
  }
})
export default class TaskList extends Vue {
  taskList: TaskInterface[] = [];

  filterData = {
    workUserId: "",
    createUserId: ""
  };

  async searchRequest() {
    try {
      const response = await Vue.apiCall("/api/task/list", "POST", {
        filterData: this.filterData
      });
      console.log(response);
      if (response.success === true) {
        this.taskList = response.data.taskList;
      } else {
        console.log(response);
      }
    } catch (e) {
      Vue.toastError(e);
      console.error(e);
    }
  }
}
</script>

<style scoped>
#task-list-filter {
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: white;
  border-bottom: 2px solid #ccc;
}

#task-list-results {
  padding: 1rem;
}
</style>
