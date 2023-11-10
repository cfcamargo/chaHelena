import type gift from "~/models/gift"
import type guest from "~/models/guest"
export const useConfirmedStore = defineStore('confirmed', {
    state: () => ({
        guestList: [] as guest[],
        giftList: [] as gift[],

        guestSelected : {} as guest,
        giftSelected : {} as gift,
    }),
    getters: {
        getGuestList: (state) => state.guestList,
        getGiftList: (state) => state.giftList,
        getGuestSelected: (state) => state.guestSelected,
        getGiftSelected: (state) => state.giftSelected,
    },
    actions: {
        setGuestList(list : guest[]) {
            this.guestList = list
        },
        setGiftList(list : gift[]) {
            this.giftList = list
        },
        setGuestSelected(guest : guest) {
            this.guestSelected = guest
        },
        setGiftSelected(gift : gift) {
            this.giftSelected = gift
        },
    },
  })