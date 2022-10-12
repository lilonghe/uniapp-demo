<template>
  <view class="content">
    <view class="jobList">
      <job-item v-for="item in jobs" :key="item.id" :job="item" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import JobItem from '../../components/JobItem.vue';
import { getJobs } from '../../services';

const jobs = ref()
const params = reactive({ limit: 20, offset: 0 })

onMounted(async () => {
  const resp = await getJobs(params.limit, params.offset);
  if (resp.length > 0) {
    jobs.value = resp;
  }
})
</script>

<style scoped lang="scss">
.content {
  padding: 20rpx $uni-spacing-row-base;
}

.jobList {
  display: flex;
  gap: 15rpx;
  flex-direction: column;
}
</style>
