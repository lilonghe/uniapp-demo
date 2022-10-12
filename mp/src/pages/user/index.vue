<template>
    <view class="content">
        <view v-if="user">
            <view>Nickname: {{user.name}}</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getCurrentUser } from '../../services';

const user = ref();

onMounted(async () => {
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
})
</script>