<template>
  <DashboardLayout>
    <div class="space-y-8 sm:space-y-4">
      <div class="flex flex-row items-center justify-between w-full gap-2 sm:gap-4">
        <div class="flex items-center gap-3">
          <button
            @click="goBack"
            class="p-2 hover:bg-[#E4E4E8] dark:hover:bg-[#2F2F31] transition-colors border border-gray-200 dark:border-gray-800 w-[42px] h-[36px] flex items-center justify-center"
            style="border-radius: 5px"
            title="Go back"
          >
            <ArrowLeft class="h-4 w-4 text-gray-600 dark:text-gray-300" />
          </button>
          <div class="flex-1 min-w-0">
            <h1 class="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Coupon Details
            </h1>
          </div>
        </div>
      </div>

      <div class="bg-white w-full dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <div class="space-y-2 text-sm text-gray-900 dark:text-white">
          <div class="text-gray-600 dark:text-gray-300">ID</div>
          <div class="font-medium">{{ couponId }}</div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "~/components/DashboardLayout.vue";
import { ArrowLeft } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const couponId = computed(() => route.params.id);

useHead({
  title: computed(() => `Coupon ${couponId.value || ''} - iVisa`),
});

const goBack = () => {
  router.push("/dashboard/coupons");
};
</script>

