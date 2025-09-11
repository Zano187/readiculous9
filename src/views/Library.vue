<script setup>
import {ref} from "vue";

const title = ref("Our Readiculous Books for Readaholics");

import breathe from "@/assets/breathe.jpg";
import door from "@/assets/door.jpg";
import star from "@/assets/star.jpg";
import moon from "@/assets/the moon.jpg";
import karin from "@/assets/karin.jpg";
import wicked from "@/assets/wicked.jpg";
import vintage from "@/assets/vintage book.jpg";
import alone from "@/assets/alone.jpg";
import green from "@/assets/green.jpg";
import revenge from "@/assets/revenge.jpg";
import watching from "@/assets/watching.jpg";
import shadow from "@/assets/shadow.jpg";
import serpent from "@/assets/serpent.jpg";
import rule from "@/assets/rule.png";
import night from "@/assets/night caller.jpg";
import ice from "@/assets/ice.jpg";
import house from "@/assets/house.jpg";
import clap from "@/assets/clap.jpg";
import swallows from "@/assets/swallows.jpg";
import really from "@/assets/really.jpg";
import past from "@/assets/past.jpg";
import orange from "@/assets/orange.jpg";
import norse from "@/assets/norse.jpg";
import man from "@/assets/man's.jpg";


const books = ref([
  {id: 1, title: "Breathe", cover: breathe},
  {id: 2, title: "Beyond The Ocean Door", cover: door},
  {id: 3, title: "Star Daughter", cover: star},
  {id: 4, title: "The Moon And Stars", cover: moon},
  {id: 5, title: "The Silent Wife", cover: karin},
  {id: 6, title: "Wicked", cover: wicked},
  {id: 7, title: "The Vintage Book", cover: vintage},
  {id: 8, title: "Alone", cover: alone},
  {id: 9, title: "The Green Soldier", cover: green},
  {id: 10, title: "In Mind Of Revenge", cover: revenge},
  {id: 11, title: "Witching Places", cover: watching},
  {id: 12, title: "The Shadow Cell", cover: shadow},
  {id: 13, title: "The Serpent", cover: serpent},
  {id: 14, title: "The Three Month Rule", cover: rule},
  {id: 15, title: "Night Caller", cover: night},
  {id: 16, title: "Breaking The Ice", cover: ice},
  {id: 17, title: "House Of Hollow", cover: house},
  {id: 18, title: "Clap When You Land", cover: clap},
  {id: 19, title: "The Swallows", cover: swallows},
  {id: 20, title: "Really Good Actually", cover: really},
  {id: 21, title: "The Past Is Rising", cover: past},
  {id: 22, title: "City Of Orange", cover: orange},
  {id: 23, title: "Norse Mythology", cover: norse},
  {id: 24, title: "A Man's Man", cover: man}
]);
</script>

<template>
  <div class="app">
    <!-- Content -->
    <div class="content">
      <h1>{{ title }}</h1>

      <section class="library">
        <h2>Library</h2>
        <div class="book-grid">
          <div v-for="book in books" :key="book.id" class="book-card">
            <img :src="book.cover" :alt="book.title" class="book-cover"/>
            <p>{{ book.title }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
}

.content h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.library h2 {
  margin: 20px 0;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
}

.book-card {
  background: transparent; /* fully transparent background */
  border-radius: 12px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  padding: 12px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid transparent; /* make border transparent as well */
  transition: transform 0.2s ease-in-out, box-shadow 0.2s;
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
}

.book-cover {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.book-card p {
  margin-top: 8px;
  font-size: 14px;
  font-weight: bold;
  color: #111;
}
</style>
