<template>
    <view class="content">
        <view v-if="user">
            <view class="name"><text>{{user.name}}</text></view>

            <view class="actions">
                <button @click="handleLogout">Logout</button>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getCurrentUser } from '../../services';

const user = ref();

onMounted(async () => {
    uni.showLoading({ title: 'loading...' })
    uni.getStorage({
        key: 'userinfo',
        success: (res: any) => {
            if (res.data) {
                user.value = res.data;
            }
        }
    })

    const userinfo = await getCurrentUser();
    if (userinfo.id) {
        uni.setStorageSync('userinfo', userinfo);
        user.value = userinfo;
    }
    uni.hideLoading()
})

const handleLogout = () => {
    uni.removeStorageSync('token')
    uni.redirectTo({ url: '/pages/login/index' })
}
</script>

<style scoped>
.actions {
    margin-top: 200rpx;
}

.name {
    text-align: center;
    line-height: 400rpx;
}
</style>