<template>
  <div
    class="text-white mx-auto flex flex-col gap-24 items-center justify-center bg- w-[90%]"
  >
    <!-- Card First  -->
    <div
      class="flex gap-20 rounded-2xl overflow-hidden items-center bg-[#FAFAFA]"
    >
      <div class="flex flex-col gap-10 xl:p-10 2xl:p-20 aspect-[1/0.467]">
        <h1 class="titleCard font-bold text-black">
          Elevate Your Big Day with Our Premier Vendor Services
        </h1>
        <p class="text-[#7B7B7B] text-lg text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, cum!
          Perspiciatis recusandae praesentium nam. Aliquam amet natus, quisquam
          sit aspernatur maxime laboriosam doloremque saepe ab? Nostrum aperiam
          omnis facere minus? Dolore impedit ipsa veniam ab minima sint, a magni
          quaerat pariatur itaque totam suscipit, ipsam enim corporis
          exercitationem? Voluptate, alias.
        </p>
      </div>

      <div class="aspect-[1/0.96] rounded-md overflow-hidden">
        <img
          class="w-full h-full"
          src="https://ik.imagekit.io/drigoalexander/danie-franco-7XqL_DVuBMw-unsplash_K5AtA7THc.jpg?updatedAt=1678532712830"
          alt="Wedding Image"
        />
      </div>
    </div>
    <!-- End Card First  -->

    <!-- Second Card -->
    <div
      class="flex gap-10 rounded-2xl items-center bg-[#FAFAFA] p-28 w-full justify-between"
    >
      <div class="flex flex-col gap-2 p-8">
        <p class="text-lg text-[#3258E8]">Our Service</p>
        <h2 class="font-semibold text-black text-5xl">
          We Offer <br />Best Service
        </h2>
      </div>
      <div class="grid grid-cols-2 gap-20">
        <div
          class="col-span-1 flex items-center justify-center gap-10"
          v-for="(el, idx) in detail"
          :key="idx"
        >
          <div class="bg-white aspect-square rounded-xl p-6">
            <img :src="el.iconLink" alt="icon" />
          </div>

          <div
            class="flex flex-col gap-2 items-start text-black tracking-wider pr-10"
          >
            <h2 class="text-2xl font-semibold">
              {{ el.title }}
            </h2>
            <p class="text-base text-[#7B7B7B]">
              {{ el.description }}
            </p>
          </div>
        </div>
      </div>
      <!-- End Second Card -->
    </div>
    <!-- Choose Package -->
    <div class="flex items-center justify-evenly gap-20">
      <div class="flex gap-10">
        <card
          v-for="(el, idx) in cardPackage"
          :key="idx"
          :package="el.package"
          :price="el.price"
        />
      </div>

      <div class="flex flex-col gap-6 items-start">
        <h4 class="text-base text-[#3258E8] font-semibold">Our Package</h4>
        <h2 class="text-5xl font-bold text-black">Popular Wedding Packages</h2>
        <p class="text-base text-[#7B7B7B] w-2/3 tracking-wide">
          If you're looking for the ultimate wedding experience, look no further
          than our popular wedding package.
        </p>
        <div class="flex gap-10 items-start">
          <div
            v-for="(el, idx) in packageData"
            :key="idx"
            class="flex flex-col gap-4 w-44"
          >
            <h1 class="text-black font-semibold text-2xl">
              {{ el.quantity }}
            </h1>
            <p class="text-[#7B7B7B] font-regular text-base">
              {{ el.description }}
            </p>
          </div>
        </div>
        <div class="flex gap-6 items-start">
          <Button :type="1" buttonText="Choose Package" />
          <Button :type="2" buttonText="View More" />
        </div>
      </div>
    </div>
    <!-- End Choose Package -->

    <!-- Schedule Calender -->
    <div class="flex flex-col gap-36 w-full">
      <div class="flex flex-col gap-3 text-center">
        <h2 class="text-black font-bold text-3xl">Our Schedule</h2>
        <p class="text-[#7B7B7B] font-medium text-base">
          Get to know our schedule for you to prepare
        </p>
      </div>

      <div class="flex flex-col gap-24 mx-auto">
        <Calendar
          class="border-b-2 last-of-type:border-b-0 pb-14"
          v-for="(el, idx) in calendarList"
          :key="idx"
          :image="el.image"
          :customerName="el.customerName"
          :date="new Date()"
          :packageName="el.packageName"
        />
      </div>
      <div class="flex items-center justify-center">
        <Button :type="3" buttonText="View more" />
      </div>
    </div>
    <!-- End Schedule Calender -->

    <!-- Advertisement -->
    <div
      class="w-full rounded-tl-[5rem] rounded-xl flex items-center justify-center relative bg-[#3258E8]/10"
    >
      <div
        class="absolute z-10 -top-8 -right-8 w-20 flex items-center justify-center aspect-square bg-white rounded-full shadow-2xl"
      >
        <img src="/assets/love.svg" alt="Love Icon" />
      </div>

      <div
        class="flex flex-col gap-4 absolute z-10 left-8 -bottom-8 bg-white rounded-xl py-4 pl-4 pr-6 shadow-xl"
      >
        <p class="text-sm font-semibold text-black">
          Thank you for helping <br />
          my Wedding. Amazing!
        </p>
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-square overflow-hidden rounded-full">
            <img src="/assets/albert.jpg" alt="Profile Picture" />
          </div>
          <div class="flex flex-col gap-[1px]">
            <h2 class="text-sm font-semibold text-black">Drigo Alexander</h2>
            <p class="text-xs font-light text-black">Happy Customer</p>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col gap-6 items-center justify-center text-center w-full py-20 overflow-hidden relative"
      >
        <img
          class="w-full absolute top-0 left-0 z-0"
          src="/assets/world.svg"
          alt="Background"
        />
        <h4 class="z-10 relative text-base font-semibold text-[#3258E8]">
          Believe your wedding to us
        </h4>
        <h2 class="z-10 relative text-4xl font-semibold text-black">
          Dont Miss The 50% Discount <br />
          If You Book Your First Appointment
        </h2>
        <p
          class="z-10 relative text-base font-normal text-black whitespace-pre-line"
        >
          Let's maximize your wedding and <br />
          make the memories that never forgotten
        </p>
        <Button :type="1" class="z-10 relative" buttonText="Book now" />
      </div>
    </div>
    <!-- End Advertisement -->
  </div>
</template>

<script setup>
definePageMeta({ layout: "index" });

const response = $fetch("http://localhost:1337/api/blogs", {
  method: "get",
  headers: {
    Authorization:
      "Bearer 6b0a778900fb45d1bc7e83da3a6c8265291e816824a163737dd0e5975ab14b5d63169c9e31fae29799ca2259f39c7eda9cb8ff706d1bdbfc4c4da7852ad5c365600477072253b9c443ac6db1886ec40fdcd05a1c766fc1c9e07ecb85a0b913e6b3e3b89c750f6a6ba19aa405590df530cf718ae8c98c05dbbb4836563fe9ef7d",
  },
});
console.log(response);
const calendarList = [
  {
    image: "/assets/albert.jpg",
    customerName: "Albert Dera",
    packageName: "Outdoor Package",
  },
  {
    image: "/assets/albert.jpg",
    customerName: "Albert Dera",
    packageName: "Outdoor Package",
  },
  {
    image: "/assets/albert.jpg",
    customerName: "Albert Dera",
    packageName: "Outdoor Package",
  },
  {
    image: "/assets/albert.jpg",
    customerName: "Albert Dera",
    packageName: "Outdoor Package",
  },
];
const packageData = [
  {
    quantity: "5 Variant",
    description: "Incredible package for your wedding",
  },
  {
    quantity: "135K+",
    description: "Customer has been served",
  },
  {
    quantity: "35 Person",
    description: "Best Wedding Crew that you can find",
  },
];

const detail = [
  {
    title: "Lorem Ipsum",
    description: "Lorem Ipsum",
    iconLink:
      "https://ik.imagekit.io/drigoalexander/Group_1340_puhys-Ant.png?updatedAt=1678538257940",
  },
  {
    title: "Lorem Ipsum",
    description: "Lorem Ipsum",
    iconLink:
      "https://ik.imagekit.io/drigoalexander/Group_1340_puhys-Ant.png?updatedAt=1678538257940",
  },
  {
    title: "Lorem Ipsum",
    description: "Lorem Ipsum",
    iconLink:
      "https://ik.imagekit.io/drigoalexander/Group_1340_puhys-Ant.png?updatedAt=1678538257940",
  },
  {
    title: "Lorem Ipsum",
    description: "Lorem Ipsum",
    iconLink:
      "https://ik.imagekit.io/drigoalexander/Group_1340_puhys-Ant.png?updatedAt=1678538257940",
  },
];

const cardPackage = [
  {
    package: "Outdoor Package",
    price: "50 Million",
    buffet: "20 Menus",
    crew: "15 Person",
    capacityVenue: "135K+",
  },
  {
    package: "Vintage Package",
    price: "20 Million",
    buffet: "10 Menus",
    crew: "7 Person",
    capacityVenue: "60K+",
  },
];
</script>

<style scoped>
.titleCard {
  font-size: calc(32px + ((100vw - 320px) / 680) * 1.5);
}
</style>
