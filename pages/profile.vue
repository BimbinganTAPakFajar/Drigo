<script setup>
definePageMeta({
  layout: "index",
});
const config = useRuntimeConfig();
const token = useCookie("token").value;

const { data: userData } = await useFetch(
  `${config.strapiEndpoint}/users/me?populate=*`,
  {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }
);
</script>

<template>
  <!-- <div
    class="fixed min-h-screen left-[2%] scale-125 w-10 top-0 bg-rose-400/50 to-gradient-blue/50 blur-[50px] z-0"
  ></div> -->

  <div class="flex flex-col gap-4 justify-start w-full group py-20">
    <div class="flex flex-col gap-4 justify-start w-full group">
      <div class="flex justify-between items-center">
        <h1 class="font-semibold text-xl flex items-center gap-44">
          Hello, {{ userData.username }}!
        </h1>
        <div class="flex gap-10"></div>
      </div>
      <div class="h-[1px] w-full bg-slate-700"></div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Order ID</th>
              <th scope="col" class="px-6 py-3">Event Date</th>
              <th scope="col" class="px-6 py-3">Total Payment</th>
              <th scope="col" class="px-6 py-3">Payment Status</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody class="[&>*:not(:last-child)]:border-b-2">
            <tr
              v-for="el in userData.orders"
              :key="el.id"
              class="bg-white hover:bg-gray-50 border-gray-300"
            >
              <th
                scope="row"
                class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-fit"
              >
                <div class="pl-3">
                  {{ el.uuid }}
                </div>
              </th>
              <td class="px-6 py-4">
                <ClientOnly>
                  <span class="">
                    {{
                      new Date(el.Date).toLocaleString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    }}
                  </span>
                </ClientOnly>
              </td>
              <ClientOnly>
                <td class="px-6 py-4">
                  {{
                    Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(el.totalPrice)
                  }}
                </td>
              </ClientOnly>
              <td class="px-6 py-4">
                <div class="flex items-center" v-if="el.payStatus === false">
                  <div class="h-2.5 w-2.5 rounded-full bg-rose-300 mr-2"></div>
                  Not Payed
                </div>
                <div class="flex items-center" v-else>
                  <div
                    class="h-2.5 w-2.5 rounded-full bg-emerald-300 mr-2"
                  ></div>
                  Payed
                </div>
              </td>
              <td class="px-6 py-4" v-if="el.payStatus === false">
                <a href="#" class="font-medium text-sky-600 hover:underline"
                  >Pay now</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
