import { reactive } from 'vue'

const state = reactive?.({
  isGalleryOpen: false,
  isMobileMenuOpen: false,
  blocks: [],

  mediaContentNames: [],
  mediaContent: {}
})

export default state