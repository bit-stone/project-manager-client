<template>
  <div class="home">
    Hier soll einmal ein Dashboard enstehen! Leider weiß ich noch absolut nicht,
    was hier alles reingehören soll. Bisherige Ideen: <br />
    - Übersicht der Projekte, bei denen man als Hauptverantwortung eingetragen
    ist?<br />
    - Übersicht der zuletzt veränderten Aufgaben<br />
    - Übersicht der letzten Änderungen, die man ausgeführt hat?<br />
    - Schnellzugriff/Favoriten Funktion? - Persönliche Aufgaben, mit
    Projekt-Filter -> Aufgaben-Tab soll für Aufgaben allgemein sein. (Nötig?)
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Dashboard extends Vue {}
</script>

<style scoped>
.home {
  padding: 1rem;
  color: #ccc;
}
</style>
