<template>
  <DashboardLayout>
    <div class="space-y-8 sm:space-y-4">
      <!-- Page Header -->
      <div
        class="flex flex-row items-center justify-between w-full gap-2 sm:gap-4"
      >
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
            <div class="flex items-center gap-2">
              <h1
                class="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white"
              >
                {{ inquiry?.applicationNumber || "Loading..." }}
              </h1>
              <span class="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                Inquiry
              </span>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Visa Inquiry Details
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="openEmailModal"
            class="px-4 py-2 text-sm font-medium rounded-[6px] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <Mail class="h-4 w-4" />
            Send Email
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="flex items-center gap-3 text-gray-500 dark:text-gray-400">
          <div class="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          Loading inquiry...
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
        <p class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
      </div>

      <!-- Inquiry Details -->
      <div v-else-if="inquiry" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Contact Information -->
          <div class="p-6 bg-white dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <User class="h-5 w-5" />
              Contact Information
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="text-xs text-gray-500 dark:text-gray-400">Full Name</label>
                <p class="text-sm font-medium text-gray-900 dark:text-white mt-1">
                  {{ inquiry.inquiryName || inquiry.customerName || "-" }}
                </p>
              </div>
              <div>
                <label class="text-xs text-gray-500 dark:text-gray-400">Email Address</label>
                <p class="text-sm font-medium text-gray-900 dark:text-white mt-1">
                  {{ inquiry.email || "-" }}
                </p>
              </div>
              <div>
                <label class="text-xs text-gray-500 dark:text-gray-400">Phone Number</label>
                <p class="text-sm font-medium text-gray-900 dark:text-white mt-1">
                  {{ inquiry.phoneNumber || "-" }}
                </p>
              </div>
            </div>
          </div>

          <!-- Inquiry Details -->
          <div class="p-6 bg-white dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText class="h-5 w-5" />
              Inquiry Details
            </h2>
            <div class="space-y-4">
              <div>
                <label class="text-xs text-gray-500 dark:text-gray-400">Subject</label>
                <p class="text-sm font-medium text-gray-900 dark:text-white mt-1">
                  {{ inquiry.inquirySubject || "-" }}
                </p>
              </div>
              <div>
                <label class="text-xs text-gray-500 dark:text-gray-400">Message</label>
                <p class="text-sm text-gray-900 dark:text-white mt-1 whitespace-pre-wrap bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                  {{ inquiry.inquiryMessage || "-" }}
                </p>
              </div>
            </div>
          </div>

          <!-- Travel Route -->
          <div class="p-6 bg-white dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MapPin class="h-5 w-5" />
              Travel Route
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="text-xs text-gray-500 dark:text-gray-400">Nationality</label>
                <p class="text-sm font-medium text-gray-900 dark:text-white mt-1">
                  {{ inquiry.nationality || "-" }}
                </p>
              </div>
              <div>
                <label class="text-xs text-gray-500 dark:text-gray-400">Travelling From</label>
                <p class="text-sm font-medium text-gray-900 dark:text-white mt-1">
                  {{ inquiry.travellingFrom || "-" }}
                </p>
              </div>
              <div>
                <label class="text-xs text-gray-500 dark:text-gray-400">Destination</label>
                <p class="text-sm font-medium text-gray-900 dark:text-white mt-1">
                  {{ inquiry.destinationCountry || "-" }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Sales Status -->
          <div class="p-6 bg-white dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Sales Status
            </h2>
            <div class="space-y-4">
              <div>
                <label class="text-xs text-gray-500 dark:text-gray-400">Current Status</label>
                <div class="mt-2">
                  <select
                    v-model="selectedSalesStatus"
                    @change="updateSalesStatus"
                    class="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="new_lead">New Lead</option>
                    <option value="contacted">Contacted</option>
                    <option value="follow_up">Follow Up</option>
                    <option value="converted">Converted</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="text-xs text-gray-500 dark:text-gray-400">Sales Notes</label>
                <textarea
                  v-model="salesNotes"
                  @blur="updateSalesNotes"
                  placeholder="Add notes about this inquiry..."
                  class="w-full mt-2 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Timeline -->
          <div class="p-6 bg-white dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Timeline
            </h2>
            <div class="space-y-3">
              <div class="flex items-start gap-3">
                <div class="w-2 h-2 mt-1.5 rounded-full bg-green-500"></div>
                <div>
                  <p class="text-sm text-gray-900 dark:text-white">Inquiry Submitted</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ formatDate(inquiry.createdAt) }}
                  </p>
                </div>
              </div>
              <div v-if="inquiry.salesStatusUpdatedAt" class="flex items-start gap-3">
                <div class="w-2 h-2 mt-1.5 rounded-full bg-blue-500"></div>
                <div>
                  <p class="text-sm text-gray-900 dark:text-white">Status Updated</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ formatDate(inquiry.salesStatusUpdatedAt) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Email Modal -->
      <div
        v-if="showEmailModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="showEmailModal = false"
      >
        <div class="bg-white dark:bg-[#09090B] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b border-gray-200 dark:border-gray-800">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                Send Email
              </h2>
              <button
                @click="showEmailModal = false"
                class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X class="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
          <div class="p-6 space-y-4">
            <div>
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">To</label>
              <input
                :value="inquiry?.email"
                readonly
                class="w-full mt-2 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
              />
            </div>
            <div>
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
              <input
                v-model="emailSubject"
                class="w-full mt-2 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
              />
            </div>
            <div>
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
              <textarea
                v-model="emailBody"
                class="w-full mt-2 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm min-h-[200px]"
              ></textarea>
            </div>
          </div>
          <div class="p-6 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-3">
            <button
              @click="showEmailModal = false"
              class="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              @click="sendEmail"
              :disabled="sendingEmail"
              class="px-4 py-2 text-sm font-medium rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50"
            >
              {{ sendingEmail ? 'Sending...' : 'Send Email' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArrowLeft, Mail, User, FileText, MapPin, X } from "lucide-vue-next";
import DashboardLayout from "@/components/DashboardLayout.vue";
import { useSalesKanban, type SalesKanbanApplication } from "@/composables/useSalesKanban";

const route = useRoute();
const router = useRouter();
const { getSalesKanbanApplications, updateSalesStatus: updateStatus, sendCustomEmail } = useSalesKanban();

// State
const loading = ref(true);
const error = ref<string | null>(null);
const inquiry = ref<SalesKanbanApplication | null>(null);
const selectedSalesStatus = ref("new_lead");
const salesNotes = ref("");

// Email modal state
const showEmailModal = ref(false);
const emailSubject = ref("");
const emailBody = ref("");
const sendingEmail = ref(false);

// Computed
const inquiryId = Number(route.params.id);

// Methods
const goBack = () => {
  router.push("/dashboard/sales-kanban");
};

const fetchInquiry = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Fetch all sales kanban applications and find the one with matching ID
    const applications = await getSalesKanbanApplications();
    const found = applications.find((app) => app.id === inquiryId);

    if (!found) {
      error.value = "Inquiry not found";
      return;
    }

    inquiry.value = found;
    selectedSalesStatus.value = found.salesStatus || "new_lead";
    salesNotes.value = found.salesNotes || "";
  } catch (err: any) {
    error.value = err.message || "Failed to load inquiry";
  } finally {
    loading.value = false;
  }
};

const updateSalesStatus = async () => {
  if (!inquiry.value) return;

  try {
    await updateStatus(inquiry.value.id, selectedSalesStatus.value, salesNotes.value);
  } catch (err: any) {
    console.error("Failed to update status:", err);
  }
};

const updateSalesNotes = async () => {
  if (!inquiry.value) return;

  try {
    await updateStatus(inquiry.value.id, selectedSalesStatus.value, salesNotes.value);
  } catch (err: any) {
    console.error("Failed to update notes:", err);
  }
};

const openEmailModal = () => {
  emailSubject.value = `Re: ${inquiry.value?.inquirySubject || 'Your Visa Inquiry'}`;
  emailBody.value = `Dear ${inquiry.value?.inquiryName || inquiry.value?.customerName || 'Customer'},\n\nThank you for your inquiry regarding visa services.\n\n`;
  showEmailModal.value = true;
};

const sendEmail = async () => {
  if (!inquiry.value) return;

  sendingEmail.value = true;
  try {
    await sendCustomEmail(inquiry.value.id, emailSubject.value, emailBody.value);
    showEmailModal.value = false;
    alert("Email sent successfully!");
  } catch (err: any) {
    alert("Failed to send email: " + err.message);
  } finally {
    sendingEmail.value = false;
  }
};

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

onMounted(() => {
  fetchInquiry();
});
</script>
