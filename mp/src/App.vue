<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log('lunch')
  const token = uni.getStorageSync('token');
  console.log(token)
  if (!token) {
    console.log('re')
    uni.reLaunch({
      url: '/pages/login/index'
    })
  }
});
</script>
<style>
page {
  background-color: #fcfcfc;
  font-size: 20px;
}

.content {
  padding: 20rpx 30rpx;
}

.input {
  border: 1px solid #CCC;
  border-radius: 4px;
  padding: 8px;
}
</style>
