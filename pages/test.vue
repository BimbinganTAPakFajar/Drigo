<template>
  <div>
    <h1>Counter: {{ counter || "-" }}</h1>
    <button @click="counter = null">reset</button>
    <button @click="counter--">-</button>
    <button @click="counter++">+</button>
  </div>
</template>
<script setup></script>
