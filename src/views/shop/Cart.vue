<template>
  <div class="cart">
    <div class="product">
      <div class="product__header">

      </div>
      <template
        v-for="item in productList"
        :key="item._id">
        <div class="product__item" v-if="item.count > 0">
          <div
            class="product__item__checked iconfont"
            v-html="item.check ? '&#xe652;' : '&#xe6f7;'"
            @click="() => changeCartItemChecked(shopId, item._id)"></div>
          <img class="product__item__img" :src="item.imgUrl" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{ item.name }}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{ item.price }}
              <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
            </p>
          </div>
          <div class="product__number">
          <span
            class="product__number__minus"
            @click="() => { changeCartItemInfo(shopId, item._id, item, -1) }">-</span>
            {{ item.count || 0 }}
            <span
              class="product__number__plus"
              @click="() => { changeCartItemInfo(shopId, item._id, item, 1) }"
            >+</span>
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check__icon__img"
        />
        <div class="check__icon__tag">{{ total }}</div>
      </div>
      <div class="check__info">
        总计: <span class="check__info__price">&yen;{{ price }}</span>
      </div>
      <div class="check__btn">
        去结算
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from './commonCartEffect'

// 购物车相关逻辑
const useCartEffect = (shopId) => {
  const { changeCartItemInfo } = useCommonCartEffect()
  const store = useStore()
  const cartList = store.state.cartList
  const total = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        count += product.count
      }
    }
    return count
  })
  const price = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.check) {
          count += (product.count * product.price)
        }
      }
    }
    return count.toFixed(2)
  })
  const productList = computed(() => cartList[shopId] || [])

  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', {
      shopId,
      productId
    })
  }

  return {
    total,
    price,
    productList,
    changeCartItemInfo,
    changeCartItemChecked
  }
}
export default {
  name: 'Cart',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { total, price, productList, changeCartItemInfo, changeCartItemChecked } = useCartEffect(shopId)
    return {
      total,
      price,
      productList,
      shopId,
      changeCartItemInfo,
      changeCartItemChecked
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables';
@import '../../style/mixins';
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.product {
  overflow-y: scroll;
  flex: 1;
  background: #fff;
  &__header {
    height: .52rem;
    border-bottom: 1px solid #f1f1f1;
  }
  &__item {
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgColor;
    position: relative;
    &__checked {
      line-height: .5rem;
      margin-right: .2rem;
      color: #0091ff;
      font-size: .2rem;
    }
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }
    &__title {
      max-width: 100%;
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontColor;
      @include ellipsis();
    }
    &__price {
      margin: .06rem 0 0 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $highlight-fontColor;
    }
    &__yen {
      font-size: .12rem;
    }
    &__origin {
      margin-left: .06rem;
      line-height: .2rem;
      font-size: .12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: .12rem;
      &__minus, &__plus {
        display: inline-block;
        width: .2rem;
        height: .2rem;
        line-height: .16rem;
        border-radius: 50%;
        font-size: .2rem;
        text-align: center;
      }
      &__minus {
        border: .01rem solid $medium-fontColor;
        color: $medium-fontColor;
        margin-right: .05rem;
      }
      &__plus {
        border-color: $btn-bgColor;
        background-color: $btn-bgColor;
        color: $bgColor;
        margin-left: .05rem;
      }
    }
  }
}
.check {
  display: flex;
  box-sizing: border-box;
  height: .49rem;
  border-top: .01rem solid $content-bgColor;
  line-height: .49rem;
  &__icon {
    position: relative;
    width: .84rem;
    &__img {
      display: block;
      margin: .12rem auto;
      width: 0.28rem;
      height: .26rem;
    }
    &__tag {
      position: absolute;
      left: .46rem;
      top: .04rem;
      padding: 0 .04rem;
      min-width: .2rem;
      height: .2rem;
      line-height: .2rem;
      background-color: $highlight-fontColor;
      border-radius: .1rem;
      font-size: .12rem;
      text-align: center;
      color: #fff;
      transform: scale(0.49);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    color: $content-fontColor;
    font-size: .12rem;
    &__price {
      color: $highlight-fontColor;
      font-size: .18rem;
    }
  }
  &__btn {
    width: .98rem;
    line-height: .49rem;
    text-align: center;
    background: #4fb0f9;
    color: $bgColor;
    font-size: .14rem;
  }
}
</style>
