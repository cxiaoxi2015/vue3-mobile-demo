<template>
  <div class="docker">
    <!-- BEM -->
    <!-- block__element--Modifier -->
    <div
      v-for="(item, index) in dockerList"
      :key="item.text"
      :class="{ 'docker__item--active': index === 0 }"
      class="docker__item"
    >
      <div class="iconfont" v-html="item.icon" />
      <div class="docker__title" v-text="item.text" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  setup() {
    const dockerList = [
      {
        icon: '&#xe6f3;',
        text: '首页'
      },
      {
        icon: '&#xe7e5;',
        text: '购物车'
      },
      {
        icon: '&#xe61e;',
        text: '订单'
      },
      {
        icon: '&#xe660;',
        text: '我的'
      }
    ]
    return {
      dockerList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.docker {
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 0.01rem solid $content-bgColor;
  padding: 0 0.18rem;
  box-sizing: border-box;
  color: $content-fontColor;
  &__item {
    flex: 1;
    text-align: center;
    &--active {
      color: #1fa4fc;
    }
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.18rem;
    }
  }
  &__title {
    font-size: 0.2rem;
    transform: scale(0.5);
    transform-origin: center top;
  }
}
</style>
