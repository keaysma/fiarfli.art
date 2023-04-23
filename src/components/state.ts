import { reactive } from 'vue'
import indexData from '@/components/index.json'
import contentData from '@/components/content.json'

interface State {
  isGalleryOpen: boolean
  isGalleryFullscreen: boolean
  isMobileMenuOpen: boolean
  blocks: any[] // TODO: type this

  mediaContentNames: string[]
  mediaContent: any // TODO: type this

  adminCurrentPage: "gallery" | "about" | "commissions" | "contactme"

  about: string
  commissions: string
  contact: string
  contactFormEnabled: boolean
}

const state = reactive<State>({
  isGalleryOpen: false,
  isGalleryFullscreen: false,
  isMobileMenuOpen: false,
  blocks: indexData.blocks,

  mediaContentNames: [],
  mediaContent: {},

  adminCurrentPage: 'gallery', //about, gallery, commission, contactme

  about: contentData.about,
  commissions: contentData.commissions,
  contact: contentData.contact,
  contactFormEnabled: contentData.contactFormEnabled
})

export default state