import { createStore } from 'vuex'

export default createStore({
  state: {
    cartList: {
      // 第一层级商铺的id
      // shopId: {
        // 第二层级是商品id
        // 第二层内容是商品内容以及购物数量
        // productId: {
        //   title: '番茄250g/份'
        // }
      // }
    }
  },
  mutations: {
    changeCartItemInfo(state, payload) {
      const { shopId, productId, productInfo, num } = payload
      let shopInfo = state.cartList[shopId]
      if (!shopInfo) { shopInfo = {} }
      let product = shopInfo[productId]
      if (!product) {
        product = productInfo
        product.count = 0
        product.check = 0
      }
      product.count = product.count + num
      if (num > 0) { product.check = true }
      if (product.count < 0) { product.count = 0 }
      shopInfo[productId] = product
      state.cartList[shopId] = shopInfo
    },
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId][productId]
      product.check = !product.check
    }
  },
  actions: {
  },
  modules: {
  }
})
