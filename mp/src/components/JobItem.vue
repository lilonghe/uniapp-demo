<template>
    <view class="jobItem" @click="handleViewDetail">
        <view class="title">
            <text class="name">{{job.title}}</text>
            <text class="offer">{{turnMoney(job.salary_min)}} - {{turnMoney(job.salary_max)}}K</text>
        </view>
        <view>
            <text class="timeAgo">{{timeAgo(job.create_time)}}</text>
        </view>
        <view class="companyInfo">
            <text>{{job.company}}</text>
            <text class="remoteType">{{REMOTE_TYPE[job.remote_type]}}</text>
        </view>
    </view>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
import type { IJob } from '../services'
import { REMOTE_TYPE } from '../utils/constant'
import { timeAgo } from '../utils'

interface IProps {
    job: IJob
}
const { job } = defineProps<IProps>()

const handleViewDetail = () => {
    uni.navigateTo({ url: '../job/index?id=' + job.id })
}

const turnMoney = (money: number) => {
    return (money / 1000).toFixed()
}

</script>
<style lang="scss" scoped>
.jobItem {
    background-color: #FFF;
    padding: 15rpx 20rpx;
    border-radius: 10rpx;

    display: flex;
    flex-direction: column;
    gap: 12rpx;
}

.title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name {
        max-width: 60%;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bold;
        white-space: nowrap;
    }

    .offer {
        color: coral;
    }
}

.timeAgo {
    font-size: .8em;
    color: #CCC;
}

.companyInfo {
    display: flex;
    gap: 8rpx;
    font-size: 12px;
    align-items: center;
}

.remoteType {
    margin-left: auto;
}
</style>