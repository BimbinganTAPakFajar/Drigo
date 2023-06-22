<template v-if="FAQ.data.length > 0">
  <div class="flex flex-col gap-14 items-start justify-start w-full">
    <h1 class="text-5xl text-slate-600 font-semibold tracking-tighter">
      Frequently Asked Questions
    </h1>
    <div
      class="w-full flex item-start text-justify justify-start h-full"
      v-if="FAQ.data.length > 0"
    >
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
    <div
      class="w-full py-10 px-14 flex items-center justify-center bg-gray-100 rounded-xl border-dashed border-[3px] border-gray-300"
      v-else
    >
      No Question and Answer displayed right now.
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

let FAQ = ref();

FAQ.value = await $fetch(`${config.public.strapiEndpoint}/faqs`, {
  method: "GET",
});

let ganjil = ref([]);
let genap = ref([]);

if (FAQ.value.data.length > 0) {
  FAQ.value.data[0].attributes.QuestionAnswer.forEach((element, index) => {
    if (index % 2 == 0) {
      genap.value.push(element);
    } else {
      ganjil.value.push(element);
    }
  });
}
</script>
