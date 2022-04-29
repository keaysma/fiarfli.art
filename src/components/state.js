import { reactive } from 'vue'

const state = reactive?.({
  isGalleryOpen: false,
  isGalleryFullscreen: false,
  isMobileMenuOpen: false,
  blocks: [],

  mediaContentNames: [],
  mediaContent: {},

  adminCurrentPage: 'gallery', //about, gallery, commission, contactme

  about: undefined,
  commissions: undefined,
  contact: undefined,
  contactFormEnabled: undefined
})

export default state