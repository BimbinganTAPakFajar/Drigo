<template>
  <div class="justify-center flex items-center flex-col gap-32 max-w-screen-lg">
    <!-- Stats Crew-->
    <div
      v-if="openCrew === true"
      class="fixed flex flex-col text-black left-[5%] top-1/2 -translate-y-1/2 gap-10 text-justify"
    >
      <div class="flex flex-col gap-2 w-64">
        <h2 class="text-xl font-semibold">100+ unique visions</h2>
        <p class="text-[#666666] text-base font-light">
          of our clients through our bespoke projects
        </p>
      </div>
      <div class="flex flex-col gap-2 w-64">
        <h2 class="text-xl font-semibold">35+ gifted individuals</h2>
        <p class="text-[#666666] text-base font-light">
          who are dedicated to crafting a wedding that is nothing short of
          extraordinary
        </p>
      </div>
      <div class="flex flex-col gap-2 w-64">
        <h2 class="text-xl font-semibold">120 unique visions</h2>
        <p class="text-[#666666] text-base font-light">
          of our clients through our bespoke projects
        </p>
      </div>
    </div>
    <!-- End Stats Crew-->
    <!-- Button Crew -->
    <div
      @click="openCrew = true"
      v-if="openCrew === false"
      class="fixed flex flex-col text-black left-[7%] bottom-[7%] gap-10 text-justify"
    >
      <Button :type="3" buttonText="Our Statistic" />
    </div>
    <!-- End Button Crew -->
    <div class="flex flex-col group text-6xl font-bold uppercase">
      <h1 class="group-hover:text-[#666666] duration-500 ease-in-out">
        Creating
      </h1>
      <h1>Unforgettable</h1>
      <h1 class="group-hover:text-[#725AE4] duration-500 ease-in-out">
        Wedding Experiences
      </h1>
    </div>

    <div class="w-full h-[1px] bg-[#666666] rounded-full"></div>

    <div class="flex flex-col gap-10 w-full items-start">
      <h2 class="text-[#666666] font-semibold text-xl self-start">
        Who are we?
      </h2>
      <p class="text-justify tracking-wider leading-loose font-medium">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum
        distinctio perferendis deleniti. Magni rem maxime libero assumenda
        autem. Saepe commodi magni adipisci voluptatibus natus accusamus aliquid
        nesciunt quo. Assumenda dolores natus eveniet velit reiciendis
        voluptatem veniam, error inventore mollitia impedit ratione incidunt?
        Tempore dolorum sequi debitis doloremque perspiciatis quibusdam atque
        id. Soluta sunt reprehenderit quae magnam provident, cum eaque eius,
        ipsum laudantium maiores delectus debitis, deserunt consequatur natus
        quidem hic nam odio aperiam minus. Obcaecati fugiat voluptate a nesciunt
        hic eveniet harum perferendis non tempora dolorem blanditiis, delectus
        earum, ab asperiores suscipit voluptas, iusto minima vel. Ipsum rem
        tenetur, alias modi animi minima incidunt necessitatibus voluptatum
        nobis totam ex perferendis corrupti saepe facilis adipisci sequi odio
        perspiciatis quod officia possimus dicta consequatur. Beatae quidem
        minus, id iusto animi velit deleniti soluta repellat aliquid excepturi
        numquam. Nostrum illum qui illo, maiores aliquam sapiente quia quidem
        asperiores recusandae fugit culpa animi facere tempora quam nisi aut,
        minima ab laboriosam magni aliquid unde veritatis labore velit?
        Necessitatibus molestiae a ratione esse ut, consequuntur officia
        cupiditate? Dolore excepturi obcaecati debitis maiores libero, repellat
        et alias aperiam molestias rerum cupiditate tempore totam ipsam dolor
        optio sapiente est architecto dignissimos praesentium odio sit!
        Quisquam, vitae nihil!
      </p>
    </div>
    <!-- Timeline -->
    <div class="flex flex-col gap-10">
      <div class="items-start flex w-full flex-col gap-6">
        <h2 class="text-3xl font-semibold text-[#725AE4] tracking-wider">
          2021
        </h2>
        <h4
          class="text-2xl font-semibold text-[#666666] flex gap-4 items-center"
        >
          We Start Our business
          <span><BuildingStorefrontIcon class="w-6 aspect-square" /></span>
        </h4>
        <p class="text-black text-lg font-medium text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ipsa
          pariatur facilis voluptatem vel placeat eos, distinctio beatae quis
          quos rerum fugit ut ea et reprehenderit atque? Molestias in
          perferendis praesentium accusantium ratione impedit ducimus fuga nisi
          explicabo ipsam? Libero, officiis quod architecto ipsa in quidem enim
          sed. Corporis, fuga.
        </p>
      </div>
      <div class="w-full items-start justify-start">
        <div
          class="h-20 w-[2px] relative bg-[#725AE4] justify-start flex items-start"
        >
          <div
            class="absolute bg-[#725AE4] rounded-full w-3 aspect-square -top-2 left-1/2 -translate-x-1/2"
          ></div>
          <div
            class="absolute bg-[#725AE4] rounded-full w-3 aspect-square -bottom-2 left-1/2 -translate-x-1/2"
          ></div>
        </div>
      </div>

      <div class="items-start flex w-full flex-col gap-6">
        <h2 class="text-3xl font-semibold text-[#725AE4] tracking-wider">
          2022
        </h2>
        <h4
          class="text-2xl font-semibold text-[#666666] flex gap-4 items-center"
        >
          Our business starts to grow
          <span><ArrowTrendingUpIcon class="w-6 aspect-square" /></span>
        </h4>
        <p class="text-black text-lg font-medium text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ipsa
          pariatur facilis voluptatem vel placeat eos, distinctio beatae quis
          quos rerum fugit ut ea et reprehenderit atque? Molestias in
          perferendis praesentium accusantium ratione impedit ducimus fuga nisi
          explicabo ipsam? Libero, officiis quod architecto ipsa in quidem enim
          sed. Corporis, fuga.
        </p>
      </div>
    </div>
    <!-- End Timeline -->
    <!-- Crew -->
    <div class="flex flex-col items-center justify-center gap-10 w-full">
      <h1 class="text-5xl font-semibold text-black">Meet The Team</h1>
      <p class="w-1/2 text-[#666666] font-semibold text-base text-center">
        We've been searching all over the place to bring the best team to serve
        you on your wedding, meet them
      </p>
      <ArrowTrendingDownIcon class="w-12 aspect-square animate-bounce" />
      <div class="w-full flex flex-wrap gap-10 justify-start items-start">
        <CardCrew name="Drigo Alexander" job="Photographer" :skill="skill" />
      </div>
    </div>

    <!-- End Crew -->
  </div>
</template>

<script setup>
import {
  BuildingStorefrontIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/vue/24/outline";
const skill = ["Excellent Angle Photo", "Great Color Grading"];
const openCrew = ref(false);
definePageMeta({ layout: "no-footer" });
</script>
