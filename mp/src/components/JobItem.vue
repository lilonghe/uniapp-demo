<template>
    <view class="jobItem" @click="handleViewDetail">
        <view class="title">
            <text class="name">{{job.title}}</text>
            <text class="offer">{{turnMoney(job.salary_min)}} - {{turnMoney(job.salary_max)}}K</text>
        </view>
        <view class="companyInfo">
            <text>{{job.company}}</text>
        </view>
        <!-- <view class="tags">
            <tag v-for="tag in user.tags" :text="tag" :key="tag" />
        </view> -->
        <!-- <view class="poster">
            <text>{{user.poster.name}}</text>
            <text>{{user.address}}</text>
        </view> -->
    </view>
</template>
<script setup lang="ts">
import Tag from './Tag.vue'
import { defineProps } from 'vue';
import type { IJob } from '../services'

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

.companyInfo {
    display: flex;
    gap: 8rpx;
    font-size: 12px;
}

.tags {
    display: flex;
    gap: 8rpx;
}

.poster {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
}
</style>