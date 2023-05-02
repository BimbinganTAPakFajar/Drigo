<template>
  <div class="flex flex-col gap-14 items-start justify-start w-full">
    <h1 class="text-5xl text-slate-600 font-semibold tracking-tighter">
      Frequently Asked Questions
    </h1>
    <div class="w-full flex item-start text-justify justify-start h-full">
      <div class="flex flex-col gap-20 w-full">
        <div
          class="flex flex-col gap-6 w-[90%]"
          v-for="(el, idx) in genap"
          :key="el.id"
        >
          <h1 class="text-xl font-semibold text-slate-600">
            {{ el.question }}
          </h1>
          <p class="text-slate-500 leading-8">{{ el.answer }}</p>
        </div>
      </div>
      <div class="flex flex-col gap-20 w-full">
        <div
          class="flex flex-col gap-6 w-[90%]"
          v-for="(el, idx) in ganjil"
          :key="el.id"
        >
          <h1 class="text-xl font-semibold text-slate-600">
            {{ el.question }}
          </h1>
          <p class="text-slate-500 leading-8">{{ el.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

let FAQ = ref();

FAQ.value = await $fetch(`${config.strapiEndpoint}/faqs`, {
  method: "GET",
});

let ganjil = ref([]);
let genap = ref([]);

FAQ.value.data[0].attributes.QuestionAnswer.forEach((element, index) => {
  if (index % 2 == 0) {
    genap.value.push(element);
    console.log("genap", genap.value);
  } else {
    ganjil.value.push(element);
    console.log("ganjil", ganjil.value);
  }
});
</script>
