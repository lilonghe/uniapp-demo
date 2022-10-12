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

interface ILoginResponse {
    token: string;
}

const handleSubmit = (e: any) => {
    const values = e.detail.value;
    if (!values.username || !values.password) {
        return
    }
    
    uni.request({
        url: 'https://mock.apifox.cn/m1/650713-0-default/login',
        success: ({ data }) => {
            const { token } = data as ILoginResponse;
            if (token) {
                uni.setStorageSync('token', token);
                uni.redirectTo({
                    url: '/pages/index/index'
                })
            }
        }
    })
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