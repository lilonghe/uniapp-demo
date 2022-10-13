<template>
  <Loading v-if="loading" />
  <view class="content" v-if="job">
    <view class="jobMeta">
      <view class="title">
        <text class="jobTitle">{{job.title}}</text>
        <text class="offer">{{turnMoney(job.salary_min)}} - {{turnMoney(job.salary_max)}}K</text>
      </view>
      <view class="condition">
        <text>{{job.office_address}} / </text>
        <text class="remoteType">{{REMOTE_TYPE[job.remote_type]}}</text>
      </view>
      <view>
        <text class="headcount">Headcount: {{job.headcount}}</text>
      </view>
    </view>
    <view class="detail">
      <view>
        <text class="title">职位详情</text>
      </view>
      <view>
        <text class="jd">{{job.jd}}</text>
      </view>
    </view>

    <view class="actions">
      <button :disabled="job.applied" @click="handleApply">{{job.applied ? 'Applied' : 'Apply'}}</button>
    </view>
  </view>
</template>
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { getJobInfo, IJob, applyJob } from '../../services'
import { REMOTE_TYPE } from '../../utils/constant'
import Loading from '../../components/Loading.vue'

const job = ref<IJob>();
const loading = ref(true)

const turnMoney = (money: number) => {
    return (money / 1000).toFixed()
}

const loadData = async (id: string) => {
  loading.value = true;
  const data = await getJobInfo(id);
    if (data) {
      job.value = data;
    }
    loading.value = false
}

onLoad((option) => {
  const { id } = option;
  if (id) {
    loadData(id)
  }
})

const handleApply = async () => {
  if (!job.value) return
  const data = await applyJob(job.value.id);
  if (data.success) {
    uni.showToast({ title: 'Apply success' });
    loadData(job.value.id);
  }
}
</script>
<style scoped lang="scss">
$border-color: #efefef8c;
$block-padding: 30rpx 0;

.jobMeta {
  padding: $block-padding;
  border-bottom: 1px solid $border-color;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .jobTitle {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .offer {
      white-space: nowrap;
      vertical-align: top;
      width: 30%;
      text-align: right;
    }
  }

  .headcount {
    font-size: .8em;
  }
}

.condition {
  font-size: .8em;
  margin-top: 20rpx;
}

.detail {
  padding: $block-padding;

  .title {
    font-weight: bold;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10rpx;
    margin: 10rpx 0;
  }

  .jd {
    font-size: 12px;
  }
}

.actions {
  position: absolute;
  bottom: 10px;
  width: calc(100vw - 30rpx * 2);
}
</style>