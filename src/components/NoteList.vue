<template>
  <div class="data-panel">
    <div class="data-panel-header">
      <div class="data-panel-title">Notizen</div>
      <div class="data-panel-side-title">
        <button type="button" @click="toggleShowAddNote" v-show="!showAddNote">
          <i class="material-icons-round">add_circle</i>
          Notiz
        </button>
      </div>
    </div>
    <div class="data-panel-line" v-show="showAddNote && !loading">
      <textarea
        v-model="newNoteMessage"
        style="width: 98%; margin-top: 0.5rem;"
        rows="5"
      ></textarea>
      <div
        style="display: flex; flex-direction: row; justify-content: flex-end;"
      >
        <button
          type="button"
          class="red"
          @click="toggleShowAddNote"
          v-show="showAddNote"
        >
          Abbrechen
        </button>
        <button type="button" @click="saveNote" v-show="showAddNote">
          Speichern
        </button>
      </div>
    </div>
    <div class="data-panel-divider"></div>
    <div class="data-panel-line" v-show="loading">
      <div class="loading"></div>
    </div>
    <div class="data-panel-line" style="padding-top: 0.5rem;" v-show="!loading">
      <span style="color: #ccc;" v-show="noteList.length === 0"
        >Keine Notizen vorhanden</span
      >
      <div class="note-item" v-for="noteItem in noteList" :key="noteItem._id">
        <div class="note-item-content">
          <div class="note-item-message">{{ noteItem.message }}</div>
          <button
            type="Button"
            class="red"
            v-show="noteItem.createUserId === currentUserId"
          >
            <i class="material-icons-round" @click="deleteNote(noteItem)"
              >delete</i
            >
          </button>
        </div>
        <div class="note-item-title">
          <span>{{ convertUserId(noteItem.createUserId) }}</span>
          <span>{{ convertDate(noteItem.createMoment) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { NoteInterface } from "ApiInterfaces";
import store from "@/store";

@Component({})
export default class NoteList extends Vue {
  @Prop() refType!: string;
  @Prop() refId!: string;

  loading = false;
  newNoteMessage = "";
  showAddNote = false;

  noteList: NoteInterface[] = [];

  get currentUserId() {
    return store.getters.loggedInUserId;
  }

  convertDate(inputString: string) {
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

  convertUserId(inputString: string) {
    return store.getters.userDisplayName(inputString);
  }

  mounted() {
    this.fetchData();
  }

  toggleShowAddNote() {
    this.showAddNote = !this.showAddNote;
  }

  /**
   * Notizen holen
   */
  async fetchData() {
    this.loading = true;
    const noteResponse = await Vue.$apiCall(
      "/api/note/" + this.refType + "/" + this.refId
    );
    if (noteResponse.success === true) {
      this.loading = false;
      this.noteList = noteResponse.data.noteList;
    }
  }

  /**
   * Neue Notiz hochladen und speichern
   */
  async saveNote() {
    const response = await Vue.$apiCall("/api/note/add", "POST", {
      refType: this.refType,
      refId: this.refId,
      message: this.newNoteMessage
    });
    if (response.success === true) {
      this.noteList.unshift(response.data.noteItem);
      this.toggleShowAddNote();
      this.newNoteMessage = "";
    }
  }

  async deleteNote(data: any) {
    const cont = confirm("Wollen Sie diese Notiz wirklich löschen?");
    if (!cont) {
      return;
    }

    const noteId = data._id;
    const response = await Vue.$apiCall("/api/note/remove", "POST", {
      noteId
    });
    if (response.success === true) {
      const removedNoteId = response.data.removedNote._id;
      for (let k = this.noteList.length - 1; k >= 0; k--) {
        if (this.noteList[k]._id === removedNoteId) {
          this.noteList.splice(k, 1);
          break;
        }
      }
    } else {
      console.error(response.message);
    }
  }
}
</script>

<style scoped>
.note-item {
  margin-bottom: 1rem;
  padding: 0.5rem;
}

.note-item:hover {
  background-color: #eee;
}

.note-item-title {
  font-size: 0.75rem;
  color: #888;
  border-top: 1px solid #ccc;
  margin-top: 0.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.note-item-content {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.note-item-content button {
  height: 1.4rem;
  width: 1.4rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  align-self: flex-end;
}

.note-item-content button i {
  font-size: 1rem;
}

.note-item-message {
  white-space: pre-wrap;
  font-size: 0.8rem;
}
</style>
