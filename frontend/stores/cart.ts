import { defineStore } from 'pinia'

type CartItem = {
  id: string
  title: string
  price: number
  quantity: number
  image?: string
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  actions: {
    addItem(product: any) {
      const existing = this.items.find(item => item.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
          image: product.image?.[0]?.url
        })
      }
    },
    removeItem(id: string) {
      this.items = this.items.filter(item => item.id !== id)
    },
    clearCart() {
      this.items = []
    }
  },
  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  },
  persist: true 
})
