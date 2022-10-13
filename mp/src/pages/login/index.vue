<template>
    <view class="content">
        <form @submit="handleSubmit">
            <view class="form-item">
                <view class="form-label">Username</view>
                <view>
                    <input name="username" class="input" />
                </view>
            </view>
            <view class="form-item">
                <view class="form-label">Password</view>
                <view>
                    <input name="password" type="password" class="input" />
                </view>
            </view>
            <view class="form-item">
                <button form-type="submit">Login</button>
            </view>
        </form>
    </view>
</template>
<script setup lang="ts">
import { login } from '../../services';

const handleSubmit = async (e: any) => {
    const values = e.detail.value;
    if (!values.username || !values.password) {
        uni.showToast({ title: 'Please input username or password', icon: 'none' })
        return
    }
    uni.showLoading({ title: 'loading...' })
    const data = await login(values);
    if (data.token) {
        uni.setStorageSync('token', data.token);
        uni.reLaunch({
            url: '/pages/index/index'
        })
    }
    uni.hideLoading()
}
</script>

<style scoped>

.form-item {
    margin-bottom: 30rpx;
}

.form-label {
    margin-bottom: 5rpx;
}
</style>