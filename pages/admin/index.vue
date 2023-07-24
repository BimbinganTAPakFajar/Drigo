<template>
  <div class="bg-white">
    <button
      data-drawer-target="sidebar-multi-level-sidebar"
      data-drawer-toggle="sidebar-multi-level-sidebar"
      aria-controls="sidebar-multi-level-sidebar"
      type="button"
      class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <span class="sr-only">Open sidebar</span>
      <svg
        class="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        ></path>
      </svg>
    </button>

    <aside
      id="sidebar-multi-level-sidebar"
      class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-white"
      aria-label="Sidebar"
    >
      <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul class="space-y-2 font-medium">
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span class="ml-3">Dashboard admin</span>
            </a>
          </li>
          <li v-for="(el, idx) in sideMenu" :key="idx" @click="changeTab(idx)">
            <div
              :class="{
                'bg-gray-200': tabIndex === idx,
              }"
              class="cursor-pointer flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group dark:text-white dark:hover:bg-gray-700"
            >
              <span
                class="flex-1 ml-3 text-left whitespace-nowrap"
                sidebar-toggle-item
                >{{ el }}</span
              >
            </div>
          </li>
        </ul>
      </div>
    </aside>

    <div class="p-4 sm:ml-64 min-h-screen" v-if="tabIndex === 0">
      <div
        v-if="modalFoto === true"
        id="toast-danger"
        class="fixed z-20 left-1/2 -translate-x-1/2 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Error icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">
          Fotografer berhasil di hapus.
        </div>
        <button
          @click="modalFoto = false"
          type="button"
          class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-danger"
          aria-label="Close"
        >
          <span class="sr-only">Close</span>
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
      >
        <div
          class="flex items-center justify-center h-auto py-7 mb-4 rounded bg-gray-50 dark:bg-gray-800"
        >
          <div
            class="flex flex-col items-center justify-center w-2/3 max-w-fit text-center gap-6"
          >
            <h1
              class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
            >
              Pendaftaran
              <span
                class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600"
                >Crew Fotografer</span
              >
            </h1>
            <p
              class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"
            >
              Pastikan anda menggunakan email admin blissful ketika mendaftarkan
              crew fotografer pada google form
            </p>

            <NuxtLink
              to="https://docs.google.com/forms/d/e/1FAIpQLSfc68H0Tt_Q9uTyQzPIQnMM7mnIb9-mAQMfu3Y-bjtFQECdwA/viewform?usp=sf_link"
              class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Klik untuk menuju form
            </NuxtLink>
          </div>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Nama</th>
                <th scope="col" class="px-6 py-3">Link Portofolio</th>
                <th scope="col" class="px-6 py-3">Harga</th>
                <th scope="col" class="px-6 py-3">Servis</th>
                <th scope="col" class="px-6 py-3">Pengalaman (Tahun)</th>
                <th scope="col" class="px-6 py-3">Deskripsi singkat</th>
                <th scope="col" class="px-6 py-3">Action</th>
              </tr>
            </thead>
            <div v-if="pending">
              <button
                disabled
                type="button"
                class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Loading...
              </button>
            </div>
            <tbody v-else>
              <tr
                class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                v-for="el in photographerList.data"
                :key="el.id"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ el.attributes.name }}
                </th>
                <td
                  class="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline"
                >
                  <NuxtLink :to="el.attributes.portofolioLink"
                    >Klik melihat portofolio</NuxtLink
                  >
                </td>
                <td class="px-6 py-4">{{ el.attributes.price }}</td>
                <td class="px-6 py-4">{{ el.attributes.serviceProvided }}</td>
                <td class="px-6 py-4">{{ el.attributes.yearExperience }}</td>
                <td class="px-6 py-4">{{ el.attributes.description }}</td>
                <td class="px-6 py-4">
                  <div
                    @click="deletePhotographer(el.id)"
                    class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Hapus
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="p-4 sm:ml-64 min-h-screen" v-if="tabIndex === 1">
      <div
        v-if="modalCatering === true"
        id="toast-danger"
        class="fixed z-20 left-1/2 -translate-x-1/2 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Error icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">Catering berhasil di hapus.</div>
        <button
          @click="modalCatering = false"
          type="button"
          class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-danger"
          aria-label="Close"
        >
          <span class="sr-only">Close</span>
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
      >
        <div
          class="flex items-center justify-center h-auto py-7 mb-4 rounded bg-gray-50 dark:bg-gray-800"
        >
          <div class="flex flex-wrap items-center gap-6">
            <div class="flex flex-col gap-3 w-[31%]">
              <label for="cateringName">Catering Name</label>
              <input
                type="text"
                id="cateringName"
                v-model="formCatering.name"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Dapur Betawi"
                required
              />
            </div>
            <div class="flex flex-col gap-3 w-[50%] flex-grow">
              <label for="address">Catering address</label>
              <input
                type="text"
                id="address"
                min="0"
                v-model="formCatering.location"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Jln. Bandung"
                required
              />
            </div>
            <div class="flex flex-col gap-3 flex-grow w-[31%]">
              <label for="Food">Catering Food</label>
              <input
                type="text"
                id="Food"
                min="0"
                v-model="foodObjTemp.food"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Bakso"
                required
              />
            </div>
            <div class="flex flex-col gap-3 flex-grow w-[31%]">
              <label for="Food Price">Food Price </label>
              <input
                type="number"
                id="Food Price"
                v-model="foodObjTemp.price"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Price / food"
                required
              />
            </div>
            <div class="flex flex-col gap-3 flex-grow w-[31%]">
              <label for="Food Price">Food Stok </label>
              <input
                type="number"
                id="Food Price"
                v-model="foodObjTemp.stok"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Food Stock"
                required
              />
            </div>
            <div class="flex w-full justify-between items-start">
              <button
                class="px-6 py-3 duration-300 ease-in-out text-[#7B7B7B] focus:text-black hover:ring-2 ring-[#3258E8] rounded-xl w-auto"
                @click.prevent="addFoodList"
              >
                Tambah
              </button>
              <ol
                class="justify-end flex flex-col gap-8 list-decimal divide-y-[1px] divide-black [&>*:not(:first-child)]:pt-8"
              >
                <li
                  v-for="(el, idx) in store.foodList"
                  :key="idx"
                  class="flex gap-20 items-center justify-center list-decimal"
                >
                  <div class="flex gap-2 flex-col">
                    <h1 class="font-semibold">Food Name</h1>
                    <span>{{ el.food }}</span>
                  </div>
                  <div class="flex flex-col gap-2">
                    <h1 class="font-semibold">Food Price</h1>
                    <h1 class="font-semibold">{{ el.price }}</h1>
                  </div>

                  <div class="flex flex-col gap-2">
                    <h1 class="font-semibold">Food Stock</h1>
                    <h1 class="font-semibold">{{ el.stok }}</h1>
                  </div>
                  <div
                    class="flex gap-2 text-sm items-center group cursor-pointer"
                    @click.prevent="deleteFood(idx)"
                  >
                    <TrashIcon
                      class="w-4 group-hover:stroke-red-500 flex items-center duration-300 ease-in-out"
                    />
                    <span>Delete</span>
                  </div>
                </li>
              </ol>
            </div>

            <button
              class="bg-[#3258E8] text-white rounded-xl focus:bg-[#2847BE] px-6 py-3 w-auto"
              @click.prevent="submitCatering"
            >
              Submit makanan
            </button>
          </div>
        </div>

        <div
          class="fixed left-0 top-0 w-full h-screen z-40"
          v-if="modalFoodCatering"
        >
          <div
            class="flex w-full items-center justify-center h-screen bg-black/50 backdrop-blur-md"
          >
            <div class="relative overflow-x-auto">
              <table
                class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
              >
                <thead
                  class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                  <tr>
                    <th scope="col" class="px-6 py-3">Nama Makanan</th>
                    <th scope="col" class="px-6 py-3">Harga</th>
                    <th scope="col" class="px-6 py-3">Stok</th>
                    <th scope="col" class="px-6 py-3">
                      <svg
                        @click="modalFoodCatering = false"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(el, idx) in cateringList.data[cateringIndex]
                      .attributes.food"
                    :key="idx"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {{ el.food }}
                    </th>
                    <td class="px-6 py-4">{{ el.price }}</td>
                    <td class="px-6 py-4">{{ el.stok }}</td>
                    <td class="px-6 py-4"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Nama</th>
                <th scope="col" class="px-6 py-3">Alamat</th>
                <th scope="col" class="px-6 py-3">Tabel Makanan</th>
                <th scope="col" class="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <div v-if="pending">
              <button
                disabled
                type="button"
                class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Loading...
              </button>
            </div>
            <tbody v-else>
              <tr
                class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                v-for="(el, idx) in cateringList.data"
                :key="el.id"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ el.attributes.name }}
                </th>

                <td class="px-6 py-4">{{ el.attributes.location }}</td>
                <td
                  class="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                >
                  <div @click="openFoodModal(idx)">Klik melihat makanan</div>
                </td>

                <td class="px-6 py-4">
                  <div
                    @click="deleteCatering(el.id)"
                    class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Hapus
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="p-4 sm:ml-64 min-h-screen" v-if="tabIndex === 2">
      <div
        class="fixed z-40 left-0 top-0 w-full bg-black/50 backdrop-blur-md min-h-screen"
        v-if="modalGambar"
      >
        <div class="absolute top-[10%] right-[10%]">
          <div class="btn btn-square btn-outline" @click="modalGambar = false">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div
          class="text-white flex flex-col items-center justify-center w-full h-screen"
        >
          <div class="carousel w-full">
            <div
              :id="el.id"
              class="carousel-item w-full"
              v-for="el in dataGambar"
              :key="el.id"
            >
              <img :src="el.attributes.url" class="w-1/4 mx-auto" />
            </div>
          </div>
          <div class="flex justify-center w-full py-2 gap-2">
            <a
              :href="`#` + el.id"
              class="btn btn-xs"
              v-for="(el, idx) in dataGambar"
              :key="el.id"
              >{{ idx + 1 }}</a
            >
          </div>
        </div>
      </div>
      <div
        v-if="modalVenue === true"
        id="toast-danger"
        class="fixed z-20 left-1/2 -translate-x-1/2 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Error icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">Venue berhasil di hapus.</div>
        <button
          @click="modalVenue = false"
          type="button"
          class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-danger"
          aria-label="Close"
        >
          <span class="sr-only">Close</span>
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
      >
        <div
          class="flex items-center justify-center h-auto py-7 mb-4 rounded bg-gray-50 dark:bg-gray-800"
        >
          <div
            class="flex flex-col items-center justify-center w-2/3 max-w-fit text-center gap-6"
          >
            <h1
              class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
            >
              Pendaftaran
              <span
                class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600"
                >Crew Venue</span
              >
            </h1>
            <p
              class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"
            >
              Pastikan anda menggunakan email admin blissful ketika mendaftarkan
              crew venue pada google form
            </p>

            <NuxtLink
              to="https://docs.google.com/forms/d/e/1FAIpQLSfv28n7c8hvaO22c3dH0QOp54iNM4MnZRZ9njwgcRyKwQpl9Q/viewform"
              target="_blank"
              class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Klik untuk menuju form
            </NuxtLink>
          </div>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Nama</th>
                <th scope="col" class="px-6 py-3">Link Portofolio</th>
                <th scope="col" class="px-6 py-3">Harga</th>
                <th scope="col" class="px-6 py-3">Alamat</th>
                <th scope="col" class="px-6 py-3">Gambar</th>
                <th scope="col" class="px-6 py-3">Kapasitas</th>
                <th scope="col" class="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <div v-if="pending">
              <button
                disabled
                type="button"
                class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Loading...
              </button>
            </div>
            <tbody v-else>
              <tr
                class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                v-for="el in venueList.data"
                :key="el.id"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ el.attributes.venueName }}
                </th>
                <td>
                  <NuxtLink
                    :to="el.attributes.venueLink"
                    class="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline"
                    >Link Venue</NuxtLink
                  >
                </td>
                <td class="px-6 py-4">{{ el.attributes.price }}</td>
                <td class="px-6 py-4">
                  {{ el.attributes.address }}, {{ el.attributes.city }} ,
                  {{ el.attributes.province }}
                </td>
                <td
                  class="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                  @click="openSlider(el.id)"
                >
                  Buka Gambar
                </td>
                <td class="px-6 py-4">{{ el.attributes.capacity }} Orang</td>

                <td class="px-6 py-4">
                  <div
                    @click="deleteVenue(el.id)"
                    class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Hapus
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="p-4 sm:ml-64 min-h-screen" v-if="tabIndex === 3">
      <div
        v-if="modalMUA === true"
        id="toast-danger"
        class="fixed z-20 left-1/2 -translate-x-1/2 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Error icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">
          Make up artist berhasil di hapus.
        </div>
        <button
          @click="modalMUA = false"
          type="button"
          class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-danger"
          aria-label="Close"
        >
          <span class="sr-only">Close</span>
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
      >
        <div
          class="flex items-center justify-center h-auto py-7 mb-4 rounded bg-gray-50 dark:bg-gray-800"
        >
          <div
            class="flex flex-col items-center justify-center w-2/3 max-w-fit text-center gap-6"
          >
            <h1
              class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
            >
              Pendaftaran
              <span
                class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600"
                >Crew Make up artist</span
              >
            </h1>
            <p
              class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"
            >
              Pastikan anda menggunakan email admin blissful ketika mendaftarkan
              crew make up artist pada google form
            </p>

            <NuxtLink
              to="https://docs.google.com/forms/d/e/1FAIpQLSedmrIRxW7iqi4uwrVnII-BCvln1tPOERMlB_LRbHV8j54QQQ/viewform?usp=sf_link"
              class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Klik untuk menuju form
            </NuxtLink>
          </div>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Nama</th>
                <th scope="col" class="px-6 py-3">Link Portofolio</th>
                <th scope="col" class="px-6 py-3">Harga</th>
                <th scope="col" class="px-6 py-3">Servis</th>
                <th scope="col" class="px-6 py-3">Action</th>
              </tr>
            </thead>
            <div v-if="pending">
              <button
                disabled
                type="button"
                class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Loading...
              </button>
            </div>
            <tbody v-else>
              <tr
                class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                v-for="el in muaList.data"
                :key="el.id"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ el.attributes.name }}
                </th>
                <td
                  class="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline"
                >
                  <NuxtLink :to="el.attributes.portofolioLink"
                    >Klik melihat portofolio</NuxtLink
                  >
                </td>
                <td class="px-6 py-4">{{ el.attributes.price }}</td>
                <td class="px-6 py-4">{{ el.attributes.serviceProvided }}</td>
                <td class="px-6 py-4">
                  <div
                    @click="deleteMUA(el.id)"
                    class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Hapus
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="p-4 sm:ml-64 min-h-screen" v-if="tabIndex === 4">
      <div
        v-if="modalMC === true"
        id="toast-danger"
        class="fixed z-20 left-1/2 -translate-x-1/2 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Error icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">
          Master of ceremonies berhasil di hapus.
        </div>
        <button
          @click="modalMC = false"
          type="button"
          class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-danger"
          aria-label="Close"
        >
          <span class="sr-only">Close</span>
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
      >
        <div
          class="flex items-center justify-center h-auto py-7 mb-4 rounded bg-gray-50 dark:bg-gray-800"
        >
          <div
            class="flex flex-col items-center justify-center w-2/3 max-w-fit text-center gap-6"
          >
            <h1
              class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
            >
              Pendaftaran
              <span
                class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600"
                >Crew Master of ceremonies</span
              >
            </h1>
            <p
              class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"
            >
              Pastikan anda menggunakan email admin blissful ketika mendaftarkan
              crew master of ceremonies pada google form
            </p>

            <NuxtLink
              to="https://docs.google.com/forms/d/e/1FAIpQLSeieMKyqZnAnXSfdH6HT_VWWksHONT9NV_x7nzmMCkYB3stbg/viewform?usp=sf_link"
              taget="_blank"
              class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Klik untuk menuju form
            </NuxtLink>
          </div>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Nama</th>
                <th scope="col" class="px-6 py-3">Alamat</th>
                <th scope="col" class="px-6 py-3">Harga</th>
                <th scope="col" class="px-6 py-3">Servis</th>
                <th scope="col" class="px-6 py-3">Action</th>
              </tr>
            </thead>
            <div v-if="pending">
              <button
                disabled
                type="button"
                class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Loading...
              </button>
            </div>
            <tbody v-else>
              <tr
                class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                v-for="el in mcList.data"
                :key="el.id"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ el.attributes.Name }}
                </th>
                <td class="px-6 py-4">{{ el.attributes.Address }}</td>
                <td class="px-6 py-4">{{ el.attributes.price }}</td>
                <td class="px-6 py-4">{{ el.attributes.serviceProvided }}</td>
                <td class="px-6 py-4">
                  <div
                    @click="deleteMC(el.id)"
                    class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Hapus
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="p-4 sm:ml-64 min-h-screen" v-if="tabIndex === 5">
      <div
        v-if="modalDekor === true"
        id="toast-danger"
        class="fixed z-20 left-1/2 -translate-x-1/2 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Error icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">
          Vendor Dekorasi berhasil di hapus.
        </div>
        <button
          @click="modalDekor = false"
          type="button"
          class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-danger"
          aria-label="Close"
        >
          <span class="sr-only">Close</span>
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
      >
        <div
          class="flex items-center justify-center h-auto py-7 mb-4 rounded bg-gray-50 dark:bg-gray-800"
        >
          <div
            class="flex flex-col items-center justify-center w-2/3 max-w-fit text-center gap-6"
          >
            <h1
              class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
            >
              Pendaftaran
              <span
                class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600"
                >Crew Dekorasi</span
              >
            </h1>
            <p
              class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"
            >
              Pastikan anda menggunakan email admin blissful ketika mendaftarkan
              crew dekorasi pada google form
            </p>

            <NuxtLink
              to="https://docs.google.com/forms/d/e/1FAIpQLSd9X4F7FG7QJnOLYwXGGP6ha4-i0Xd-qPdz3q-T9wovmFL6kQ/viewform?usp=sf_link"
              class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Klik untuk menuju form
            </NuxtLink>
          </div>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Tema</th>
                <th scope="col" class="px-6 py-3">Harga</th>
                <th scope="col" class="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <div v-if="pendingDekor">
              <button
                disabled
                type="button"
                class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Loading...
              </button>
            </div>

            <tbody v-else>
              <tr
                class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                v-for="el in dataDekor.data"
                :key="el.id"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ el.attributes.theme }}
                </th>
                <td class="px-6 py-4">{{ el.attributes.price }}</td>
                <td class="px-6 py-4">
                  <div
                    @click="deleteDekor(el.id)"
                    class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Hapus
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="p-4 sm:ml-64 min-h-screen" v-if="tabIndex === 6">
      <div
        v-if="modalBand === true"
        id="toast-danger"
        class="fixed z-20 left-1/2 -translate-x-1/2 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Error icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">
          Band Dekorasi berhasil di hapus.
        </div>
        <button
          @click="modalBand = false"
          type="button"
          class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-danger"
          aria-label="Close"
        >
          <span class="sr-only">Close</span>
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
      >
        <div
          class="flex items-center justify-center h-auto py-7 mb-4 rounded bg-gray-50 dark:bg-gray-800"
        >
          <div
            class="flex flex-col items-center justify-center w-2/3 max-w-fit text-center gap-6"
          >
            <h1
              class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
            >
              Pendaftaran
              <span
                class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600"
                >Crew Band</span
              >
            </h1>
            <p
              class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"
            >
              Pastikan anda menggunakan email admin blissful ketika mendaftarkan
              crew band pada google form
            </p>

            <NuxtLink
              to="https://docs.google.com/forms/d/e/1FAIpQLSeBEE7eUbusEbzb_m7PBiLvytk9KmREe2-IUPyuXTX4lxg1_g/viewform?usp=sf_link"
              class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Klik untuk menuju form
            </NuxtLink>
          </div>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Nama</th>
                <th scope="col" class="px-6 py-3">Harga</th>
                <th scope="col" class="px-6 py-3">Genre</th>
                <th scope="col" class="px-6 py-3">Portofolio</th>
                <th scope="col" class="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <div v-if="pendingDekor">
              <button
                disabled
                type="button"
                class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Loading...
              </button>
            </div>

            <tbody v-else>
              <tr
                class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                v-for="el in bandList.data"
                :key="el.id"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ el.attributes.Name }}
                </th>
                <td class="px-6 py-4">{{ el.attributes.Price }}</td>
                <td class="px-6 py-4">{{ el.attributes.Genre }}</td>
                <td
                  class="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline"
                >
                  <NuxtLink :to="el.attributes.portofolioLink"
                    >Klik melihat portofolio</NuxtLink
                  >
                </td>
                <td class="px-6 py-4">
                  <div
                    @click="deleteBand(el.id)"
                    class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Hapus
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div
      class="p-4 sm:ml-64 md:py-14 flex flex-col gap-8"
      v-if="tabIndex === 7"
    >
      <div
        class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
      >
        <div
          class="flex items-center justify-center h-auto py-7 mb-4 rounded bg-gray-50 dark:bg-gray-800"
        >
          <div
            class="flex flex-col items-center justify-center w-2/3 max-w-fit text-center gap-6"
          >
            <h1
              class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
            >
              <span
                class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600"
                >Paket Blissful Beginning</span
              >
            </h1>
            <p
              class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"
            >
              Isi dan pilih dari crew yang ada untuk paket yang ingin dibuat
              dibawah.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="mb-6">
            <label
              for="packageName"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Package Name</label
            >
            <input
              v-model="formPaket.packageName"
              type="text"
              id="packageName"
              class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div class="mb-6">
            <label
              for="Harga Dasar"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Harga Dasar</label
            >
            <input
              v-model="formPaket.basePrice"
              type="Number"
              id="Harga Dasar"
              class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        <div
          class="flex items-center justify-center h-auto py-7 mb-4 rounded bg-gray-50 dark:bg-gray-800"
        >
          <div
            class="flex flex-col items-center justify-center w-full px-10 text-center gap-6"
          >
            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Deskripsi Paket</label
            >
            <textarea
              v-model="formPaket.descriptionPackage"
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Deskripsi paket disini..."
            ></textarea>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4 mb-4">
          <div
            class="flex flex-col gap-6 items-start justify-start h-auto py-10 px-6 rounded bg-gray-50 dark:bg-gray-800"
          >
            <p class="text-2xl text-gray-500 dark:text-gray-700">Fotografer</p>
            <ul
              class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <li
                class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
              >
                <div
                  class="flex items-center pl-3"
                  v-for="el in photographerList.data"
                >
                  <input
                    v-if="!editing"
                    @click="formPaket.fotografer = el.id"
                    id="fotografer"
                    type="radio"
                    value=""
                    name="fotografer"
                    class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <input
                    v-else
                    @click="formPaket.fotografer = el.id"
                    :checked="formPaket.fotografer == el.id"
                    id="fotografer"
                    type="radio"
                    value=""
                    name="fotografer"
                    class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="fotografer"
                    class="w-full py-3 ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                    >{{ el.attributes.name }}
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div
            class="flex flex-col gap-6 items-start justify-start h-auto py-10 px-6 rounded bg-gray-50 dark:bg-gray-800"
          >
            <p class="text-2xl text-gray-500 dark:text-gray-700">Dekorasi</p>
            <ul
              class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <li
                class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
              >
                <div
                  class="flex items-center pl-3"
                  v-for="el in dataDekor.data"
                >
                  <input
                    v-if="!editing"
                    @click="formPaket.dekor = el.id"
                    id="dekor"
                    type="radio"
                    value=""
                    name="dekor"
                    class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />

                  <input
                    v-else
                    @click="formPaket.dekor = el.id"
                    :checked="formPaket.dekor == el.id"
                    id="dekor"
                    type="radio"
                    value=""
                    name="dekor"
                    class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />

                  <label
                    for="dekor"
                    class="w-full py-3 ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                    >{{ el.attributes.theme }}
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div
            class="flex flex-col gap-6 items-start justify-start h-auto py-10 px-6 rounded bg-gray-50 dark:bg-gray-800"
          >
            <p class="text-2xl text-gray-500 dark:text-gray-700">Venue</p>
            <ul
              class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <li
                class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
              >
                <div
                  class="flex items-center pl-3"
                  v-for="el in venueList.data"
                >
                  <input
                    v-if="!editing"
                    @click="formPaket.venue = el.id"
                    id="venue"
                    type="radio"
                    value=""
                    name="venue"
                    class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <input
                    v-else
                    @click="formPaket.venue = el.id"
                    :checked="formPaket.venue == el.id"
                    id="venue"
                    type="radio"
                    value=""
                    name="venue"
                    class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />

                  <label
                    for="venue"
                    class="w-full py-3 ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                    >{{ el.attributes.venueName }} {{ formPaket.venue }}
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="flex items-center justify-center h-auto py-7 mb-4 rounded bg-gray-50 dark:bg-gray-800"
        >
          <div
            class="flex flex-col items-center justify-center w-full px-10 text-center gap-6"
          >
            <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">
              Make up artist
            </h3>
            <ul
              class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <li
                v-for="el in muaList.data"
                :key="el.id"
                class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
              >
                <div class="flex items-center pl-3">
                  <input
                    v-if="!editing"
                    @click="addToArrayMUA(el.id)"
                    :id="`${el.id}mua`"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <input
                    v-else
                    @click="addToArrayMUA(el.id)"
                    :checked="formPaket.mua.includes(el.id)"
                    :id="`${el.id}mua`"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />

                  <label
                    :id="`${el.id}mua`"
                    class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >{{ el.attributes.name }}
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="flex items-center justify-center h-auto py-7 mb-4 rounded bg-gray-50 dark:bg-gray-800"
        >
          <div
            class="flex flex-col items-center justify-center w-full px-10 text-center gap-6"
          >
            <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">
              Master Ceremonies
            </h3>
            <ul
              class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <li
                v-for="el in mcList.data"
                :key="el.id"
                class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
              >
                <div class="flex items-center pl-3">
                  <input
                    v-if="!editing"
                    @click="addToArrayMC(el.id)"
                    :id="`${el.id}mc`"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <input
                    v-else
                    @click="addToArrayMC(el.id)"
                    :checked="formPaket.mc.includes(el.id)"
                    :id="`${el.id}mc`"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    :id="`${el.id}mc`"
                    class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >{{ el.attributes.Name }}
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div
            class="flex flex-col gap-6 items-start justify-start h-auto py-10 px-6 rounded bg-gray-50 dark:bg-gray-800"
          >
            <p class="text-2xl text-gray-500 dark:text-gray-700">Catering</p>
            <ul
              class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <li
                class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
              >
                <div
                  class="flex items-center pl-3"
                  v-for="el in cateringList.data"
                >
                  <input
                    v-if="!editing"
                    @click="formPaket.catering = el.id"
                    id="catering"
                    type="radio"
                    value=""
                    name="catering"
                    class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <input
                    v-else
                    @click="formPaket.catering = el.id"
                    :checked="formPaket.catering == el.id"
                    id="catering"
                    type="radio"
                    value=""
                    name="catering"
                    class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="catering"
                    class="w-full py-3 ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                    >{{ el.attributes.name }}
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div
            class="flex flex-col gap-6 items-start justify-start h-auto py-10 px-6 rounded bg-gray-50 dark:bg-gray-800"
          >
            <p class="text-2xl text-gray-500 dark:text-gray-700">Band</p>
            <ul
              class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <li
                class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
              >
                <div class="flex items-center pl-3" v-for="el in bandList.data">
                  <input
                    v-if="!editing"
                    @click="formPaket.band = el.id"
                    id="band"
                    type="radio"
                    value=""
                    name="band"
                    class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <input
                    v-else
                    @click="formPaket.band = el.id"
                    :checked="formPaket.band == el.id"
                    id="band"
                    type="radio"
                    value=""
                    name="band"
                    class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="band"
                    class="w-full py-3 ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                    >{{ el.attributes.Name }}
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div class="w-1/3 flex items-center justify-cne">
            <button
              @click="submit"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Submit
            </button>
            <button
              v-if="editing"
              @click.prevent="cancelEdit"
              class="py-2.5 px-2 w-auto mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Batalkan Edit
            </button>
          </div>
        </div>
      </div>

      <div class="fixed z-50 right-[4%] bottom-[4%]" v-if="editing">
        <button
          class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
        >
          <span
            class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
          >
            Sedang Melakukan Edit...
          </span>
        </button>
      </div>
      <div class="flex flex-wrap gap-6">
        <div
          v-for="(el, idx) in dataPackage.data"
          :key="idx"
          class="w-full flex flex-col gap-6 max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="flex items-center justify-between mb-4">
            <h5
              class="text-xl font-bold leading-none text-gray-900 dark:text-white"
            >
              {{ el.attributes.packageName }}
            </h5>
            <div
              @click="editPackage(el.id, idx)"
              class="cursor-pointer text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Edit Paket
            </div>
          </div>
          <div class="flow-root space-y-4">
            <h5
              class="text-xl font-bold leading-none text-gray-900 dark:text-white"
            >
              Deskripsi Paket
            </h5>

            <p>
              {{ el.attributes.descriptionPackage }}
            </p>
          </div>

          <div class="flow-root space-y-4">
            <h5
              class="text-xl font-medium leading-none text-gray-900 dark:text-white"
            >
              Harga dasar paket ini adalah
              <span class="font-bold">Rp {{ el.attributes.basePrice }}</span>
            </h5>
          </div>

          <div class="flow-root">
            <ul
              role="list"
              class="divide-y divide-gray-200 dark:divide-gray-700"
            >
              <li class="py-3 sm:py-4 flex flex-col gap-6">
                <h5
                  class="text-xl font-bold leading-none text-gray-900 dark:text-white"
                >
                  Master of Ceremonies
                </h5>
                <div class="flex items-center space-x-4">
                  <div
                    class="flex-1 min-w-0"
                    v-for="(el, idx) in el.attributes.master_ceremonies.data"
                  >
                    <p
                      class="text-sm font-medium text-gray-900 truncate dark:text-white"
                    >
                      {{ el.attributes.Name }}
                    </p>
                  </div>
                </div>
              </li>

              <li class="py-3 sm:py-4 flex flex-col gap-6">
                <h5
                  class="text-xl font-bold leading-none text-gray-900 dark:text-white"
                >
                  Make up artist
                </h5>
                <div class="flex items-center space-x-4">
                  <div
                    class="flex-1 min-w-0"
                    v-for="(el, idx) in el.attributes.make_up_artists.data"
                  >
                    <p
                      class="text-sm font-medium text-gray-900 truncate dark:text-white"
                    >
                      {{ el.attributes.name }}
                    </p>
                  </div>
                </div>
              </li>

              <li class="py-3 sm:py-4 flex flex-col gap-6">
                <h5
                  class="text-xl font-bold leading-none text-gray-900 dark:text-white"
                >
                  Katering
                </h5>
                <div class="flex items-center space-x-4">
                  <div class="flex-1 min-w-0">
                    <p
                      class="text-sm font-medium text-gray-900 truncate dark:text-white"
                    >
                      {{ el.attributes.catering.data.attributes.name }}
                    </p>
                  </div>
                </div>
              </li>

              <li class="py-3 sm:py-4 flex flex-col gap-6">
                <h5
                  class="text-xl font-bold leading-none text-gray-900 dark:text-white"
                >
                  Fotografer
                </h5>
                <div class="flex items-center space-x-4">
                  <div class="flex-1 min-w-0">
                    <p
                      class="text-sm font-medium text-gray-900 truncate dark:text-white"
                    >
                      {{ el.attributes.photographer.data.attributes.name }}
                    </p>
                  </div>
                </div>
              </li>

              <li class="py-3 sm:py-4 flex flex-col gap-6">
                <h5
                  class="text-xl font-bold leading-none text-gray-900 dark:text-white"
                >
                  Venue
                </h5>
                <div class="flex items-center space-x-4">
                  <div class="flex-1 min-w-0">
                    <p
                      class="text-sm font-medium text-gray-900 truncate dark:text-white"
                    >
                      {{ el.attributes.venue.data.attributes.venueName }}
                    </p>
                  </div>
                </div>
              </li>

              <li class="py-3 sm:py-4 flex flex-col gap-6">
                <h5
                  class="text-xl font-bold leading-none text-gray-900 dark:text-white"
                >
                  Band
                </h5>
                <div class="flex items-center space-x-4">
                  <div class="flex-1 min-w-0">
                    <p
                      class="text-sm font-medium text-gray-900 truncate dark:text-white"
                    >
                      {{ el.attributes.band.data.attributes.Name }}
                    </p>
                  </div>
                </div>
              </li>

              <li class="py-3 sm:py-4 flex flex-col gap-6">
                <h5
                  class="text-xl font-bold leading-none text-gray-900 dark:text-white"
                >
                  Dekorasi
                </h5>
                <div class="flex items-center space-x-4">
                  <div class="flex-1 min-w-0">
                    <p
                      class="text-sm font-medium text-gray-900 truncate dark:text-white"
                    >
                      {{
                        el.attributes.decoration_vendors.data[0].attributes
                          .theme
                      }}
                    </p>
                  </div>
                </div>
              </li>

              <button
                @click.prevent="deletePackage(el.id)"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 w-full dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Delete
              </button>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed z-50 left-0 top-0 w-full min-h-screen" v-if="logout">
      <div
        class="fixed bg-black/50 backdrop-blur-sm z-40 w-full min-h-screen text-white flex items-center justify-center"
      >
        <div class="relative w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="p-6 text-center">
              <svg
                class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3
                class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
              >
                Anda yakin ingin logout ?
              </h3>
              <button
                @click="logoutAdmin"
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Ya, saya yakin.
              </button>
              <button
                @click="logout = false"
                type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Tidak, batalkan.
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { TrashIcon } from "@heroicons/vue/24/outline";
definePageMeta({
  middleware: ["admin", "admin-auth"],
});
import { initFlowbite } from "flowbite";
import { useFoodStore } from "~/store/adminFood";

onMounted(() => {
  initFlowbite();
});
const deleteState = ref(false);
const config = useRuntimeConfig();
const token = useCookie("token");
const isAuth = useCookie("isAuth");
const role = useCookie("role");
const store = useFoodStore();

const sideMenu = [
  "Fotografer",
  "Catering",
  "Venue",
  "Make up artist",
  "Master of Ceremony",
  "Dekorasi",
  "Band Pengiring",
  "Paket",
  "Log out",
];

const formPaket = ref({
  fotografer: "", // 1
  catering: "", // 1
  venue: "", // 1
  mua: [], // > 1
  mc: [], // > 1
  dekor: "", // 1
  band: "", // 1
  descriptionPackage: "",
  packageName: "",
  basePrice: 0,
});

let editing = ref(false);
// State Modal

const modalFoto = ref(false);
const modalMUA = ref(false);
const modalMC = ref(false);
const modalVenue = ref(false);
const modalCatering = ref(false);
const modalDekor = ref(false);
const modalBand = ref(false);
let logout = ref(false);
// End State Modal

const tabIndex = ref(0);
function changeTab(idx) {
  if (idx != 8) {
    tabIndex.value = idx;
  } else logout.value = true;
}

const { data, pending } = await useFetch(
  `${config.public.strapiEndpoint}/identifiers/1?populate=*`,
  {
    watch: [deleteState],
  }
);

// Vendor Dekorasi

const { data: dataDekor, pending: pendingDekor } = await useFetch(
  `${config.public.strapiEndpoint}/decoration-vendors`,
  {
    watch: [deleteState],
  }
);

async function deleteDekor(id) {
  await useFetch(`${config.public.strapiEndpoint}/decoration-vendors/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token.value,
    },
  }).then((deleteState.value = !deleteState.value)),
    (modalDekor.value = true);
}

// End Vendor Dekorasi

// Photographer

let photographerList = data.value.data.attributes.photographers;

async function deletePhotographer(id) {
  await useFetch(`${config.public.strapiEndpoint}/photographers/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token.value,
    },
  }).then((deleteState.value = !deleteState.value), (modalFoto.value = true));
}

// End Photographer

// MUA

let muaList = data.value.data.attributes.make_up_artists;
async function deleteMUA(id) {
  await useFetch(`${config.public.strapiEndpoint}/make-up-artists/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token.value,
    },
  }).then((deleteState.value = !deleteState.value)),
    (modalMUA.value = true);
}

function addToArrayMUA(id) {
  if (formPaket.value.mua.includes(id)) {
    formPaket.value.mua = formPaket.value.mua.filter(
      (selectedId) => selectedId !== id
    );
  } else {
    formPaket.value.mua.push(id);
  }
}

// End MUA

// MC

let mcList = data.value.data.attributes.master_ceremonies;
async function deleteMC(id) {
  await useFetch(`${config.public.strapiEndpoint}/master-ceremonies/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token.value,
    },
  }).then((deleteState.value = !deleteState.value)),
    (modalMC.value = true);
}

function addToArrayMC(id) {
  if (formPaket.value.mc.includes(id)) {
    formPaket.value.mc = formPaket.value.mc.filter(
      (selectedId) => selectedId !== id
    );
  } else {
    formPaket.value.mc.push(id);
  }
}

// End MC

// Venue

let modalGambar = ref(false);
let dataGambar = ref();
let venueList = data.value.data.attributes.venues;
async function deleteVenue(id) {
  await useFetch(`${config.public.strapiEndpoint}/venues/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token.value,
    },
  }).then((deleteState.value = !deleteState.value)),
    (modalVenue.value = true);
}

function openSlider(id) {
  $fetch(`${config.public.strapiEndpoint}/venues/${id}?populate=*`, {
    method: "GET",

    headers: {
      Authorization: "Bearer " + token.value,
    },
  }).then((res) => {
    dataGambar.value = res.data.attributes.venueImage.data;
  });
  modalGambar.value = true;
}

// End Venue

// Band

let bandList = data.value.data.attributes.bands;
async function deleteBand(id) {
  await useFetch(`${config.public.strapiEndpoint}/bands/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token.value,
    },
  }).then((deleteState.value = !deleteState.value)),
    (modalBand.value = true);
}
// End Band

// Catering

let cateringList = data.value.data.attributes.caterings;
let cateringIndex = ref(0);
let modalFoodCatering = ref(false);
let formCatering = ref({
  location: "",
  name: "",
});

let foodObjTemp = ref({
  food: "",
  price: 0,
  stok: 0,
});

function addFoodList() {
  store.pushFoodObj(foodObjTemp.value);
  foodObjTemp.value = {
    food: "",
    price: 0,
    stok: 0,
  };
}

function deleteFood(idx) {
  store.deleteFoodObj(idx);
}

function submitCatering() {
  const { data: dataCatering, error: errorCatering } = useFetch(
    `${config.public.strapiEndpoint}/caterings`,
    {
      method: "POST",
      Authorization: "Bearer " + token.value,
      body: {
        data: {
          location: formCatering.value.location,
          name: formCatering.value.name,
          food: store.foodList,
          identifier: 1,
        },
      },
    }
  ).then(() => {
    location.reload();
    store.$reset();
  });
}

function openFoodModal(idx) {
  cateringIndex.value = idx;
  modalFoodCatering.value = true;
}

async function deleteCatering(id) {
  await useFetch(`${config.public.strapiEndpoint}/caterings/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token.value,
    },
  }).then((deleteState.value = !deleteState.value)),
    (modalCatering.value = true);
}
// End Catering

// Package
let idPackage = ref(0);
function submit() {
  if (!editing.value) {
    try {
      useFetch(`${config.public.strapiEndpoint}/packages`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token.value,
        },
        body: {
          data: {
            // packageName: formPaket.value.packageName,
            packageName: formPaket.value.packageName,
            descriptionPackage: formPaket.value.descriptionPackage,
            basePrice: Number(formPaket.value.basePrice),
            decoration_vendors: {
              id: Number(formPaket.value.dekor),
            },
            band: {
              id: Number(formPaket.value.band),
            },
            make_up_artists: formPaket.value.mua,

            master_ceremonies: formPaket.value.mc,

            photographer: {
              id: Number(formPaket.value.fotografer),
            },
            venue: {
              id: Number(formPaket.value.venue),
            },
            catering: {
              id: Number(formPaket.value.catering),
            },
          },
        },
      });
      location.reload();
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      useFetch(
        `${config.public.strapiEndpoint}/packages/${Number(idPackage.value)}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token.value,
          },
          body: {
            data: {
              packageName: formPaket.value.packageName,
              descriptionPackage: formPaket.value.descriptionPackage,
              basePrice: Number(formPaket.value.basePrice),
              decoration_vendors: {
                id: Number(formPaket.value.dekor),
              },
              band: {
                id: Number(formPaket.value.band),
              },
              make_up_artists: formPaket.value.mua,
              master_ceremonies: formPaket.value.mc,

              photographer: {
                id: Number(formPaket.value.fotografer),
              },
              venue: {
                id: Number(formPaket.value.venue),
              },
              catering: {
                id: Number(formPaket.value.catering),
              },
            },
          },
        }
      );

      location.reload();
    } catch (err) {
      console.log(err);
    }
  }
}
const { data: dataPackage, pending: pendingPackage } = useFetch(
  `${config.public.strapiEndpoint}/packages?populate=*`,
  {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token.value,
    },
  }
);

function editPackage(id, idx) {
  editing.value = true;
  idPackage.value = id;
  formPaket.value.packageName =
    dataPackage.value.data[idx].attributes.packageName;

  formPaket.value.descriptionPackage =
    dataPackage.value.data[idx].attributes.descriptionPackage;
  formPaket.value.basePrice = dataPackage.value.data[idx].attributes.basePrice;
  formPaket.value.dekor =
    dataPackage.value.data[idx].attributes.decoration_vendors.data[0].id;
  formPaket.value.band = dataPackage.value.data[idx].attributes.band.data.id;
  dataPackage.value.data[idx].attributes.master_ceremonies.data.forEach(
    (element) => {
      formPaket.value.mc.push(element.id);
    }
  );
  dataPackage.value.data[idx].attributes.make_up_artists.data.forEach(
    (element) => {
      formPaket.value.mua.push(element.id);
    }
  );
  formPaket.value.fotografer =
    dataPackage.value.data[idx].attributes.photographer.data.id;
  formPaket.value.venue = dataPackage.value.data[idx].attributes.venue.data.id;
  formPaket.value.catering =
    dataPackage.value.data[idx].attributes.catering.data.id;
}

function cancelEdit() {
  editing.value = false;
  formPaket.value.packageName = "";
  formPaket.value.descriptionPackage = "";
  formPaket.value.basePrice = 0;
  formPaket.value.dekor = "";
  formPaket.value.band = "";
  formPaket.value.mc = [];
  formPaket.value.mua = [];
  formPaket.value.fotografer = "";
  formPaket.value.venue = "";
  formPaket.value.catering = "";
  console.log(formPaket.value);
}

function deletePackage(id) {
  try {
    useFetch(`${config.public.strapiEndpoint}/packages/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token.value,
      },
    });

    location.reload();
  } catch (err) {
    console.log(err);
  }
}
// End Package

// Logout

function logoutAdmin() {
  try {
    isAuth.value = undefined;
    token.value = undefined;
    role.value = undefined;
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

// End Logout
watch(data, () => {
  photographerList = data.value.data.attributes.photographers;
  muaList = data.value.data.attributes.make_up_artists;
  mcList = data.value.data.attributes.master_ceremonies;
  venueList = data.value.data.attributes.venues;
  cateringList = data.value.data.attributes.caterings;
});
</script>
