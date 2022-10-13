<template>
  <view class="content">
    <view v-if="loading && !jobs" class="loading">
      <text>Loading...</text>
    </view>
    <view class="jobList">
      <job-item v-for="item in jobs" :key="item.id" :job="item" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { onReachBottom } from '@dcloudio/uni-app';
import { onMounted, reactive, ref, watch } from 'vue'
import JobItem from '../../components/JobItem.vue';
import { getJobs } from '../../services';

const jobs = ref()
const params = reactive({ limit: 20, offset: 0 })
const loading = ref(false)

const loadData = async (isAppend: boolean = false) => {
  loading.value = true;
  const resp = await getJobs(params.limit, params.offset);
  if (resp.length > 0) {
    if (isAppend) {
      jobs.value = jobs.value.concat(resp);
    } else {
      jobs.value = resp;
    }
  }
  loading.value = false;
}

onReachBottom(() => {
  if (loading.value) return;
  params.offset = params.offset + params.limit;
})

onMounted(() => {
  loadData();
})

watch([params], () => {
  loadData(true);
})
</script>

<style scoped lang="scss">
.content {
  padding: 20rpx $uni-spacing-row-base;
}

.jobList {
  display: flex;
  gap: 20rpx;
  flex-direction: column;
}

.loading {
  text-align: center;
  line-height: 200rpx;
}
</style>
