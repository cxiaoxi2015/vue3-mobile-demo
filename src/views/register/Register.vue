<template>
  <div class="wrapper">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt=""
      class="wrapper__img"
    />
    <div class="wrapper__input">
      <input
        type="text"
        class="wrapper__input__content"
        placeholder="请输入手机号"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="请输入密码"
        autocomplete="new-password"
        v-model="password"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="确认密码"
        autocomplete="new-password"
        v-model="ensurement"
      />
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__register-link" @click="handleLoginClick">已有账号去登录</div>
    <Toast v-if="show" :message="toastMessage"></Toast>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

// 注册相关逻辑
const useRegisterEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: '',
    ensurement: ''
  })

  const handleRegister = async () => {
    try {
      const result = await post('/api/user/register', {
        username: data.username,
        password: data.password
      })
      if (result?.errno === 0) {
        router.push({ name: 'Login' })
      } else {
        showToast('注册失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { username, password, ensurement } = toRefs(data)
  return {
    username,
    password,
    ensurement,
    handleRegister
  }
}

// 登录相关逻辑
const useLoginEffect = () => {
  const router = useRouter()
  const handleLoginClick = () => {
    router.push({
      name: 'Home'
    })
  }
  return {
    handleLoginClick
  }
}

export default {
  name: 'Register',
  components: {
    Toast
  },
  setup() {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, ensurement, handleRegister } = useRegisterEffect(showToast)
    const { handleLoginClick } = useLoginEffect()
    return {
      username,
      password,
      ensurement,
      handleRegister,
      show,
      toastMessage,
      handleLoginClick
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__img {
    display: block;
    margin: 0 auto 0.4rem auto;
    width: 0.66rem;
    height: 0.66rem;
  }
  &__input {
    width: 100%;
    height: 0.48rem;
    margin-bottom: 0.16rem;
    padding: 0 0.16rem;
    box-sizing: border-box;
    background: #f9f9f9;
    border: 1px solid rgba(0, 0, 0, 0.1);
    &__content {
      line-height: 0.48rem;
      border: none;
      outline: none;
      width: 100%;
      background: transparent;
      font-size: 0.16rem;
      color: $content-notice-fontColor;
      &::placeholder {
        color: $content-notice-fontColor;
      }
    }
  }
  &__register-button {
    width: 100%;
    margin: 0.32rem 0 0.6rem 0;
    line-height: 0.48rem;
    background: $btn-bgColor;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    color: $bgColor;
    font-size: 0.16rem;
    text-align: center;
  }
  &__register-link {
    text-align: center;
    font-size: 0.14rem;
    color: $content-notice-fontColor;
  }
}
</style>
