<template>
    <view class="content">
        <view v-if="user">
            <view>Nickname: {{user.name}}</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const user = ref();

onMounted(() => {
    interface IUserResponse {
        id: string;
        name: string;
        resume_url: string;
    }

    uni.request({
        url: "https://mock.apifox.cn/m1/650713-0-default/user/current",
        success: ({ data }) => {
            const userinfo = data as IUserResponse;
            if (userinfo.id) {
                uni.setStorageSync('userinfo', userinfo);
                user.value = userinfo;
            }
        }
    })
})
</script>