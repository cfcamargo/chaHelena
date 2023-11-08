import type gift from "~/models/gift"
import type guest from "~/models/guest"


export const useConfirmedStore = defineStore('confirmed', {
    state: () => ({
        guestList: [] as guest[],
        giftList: [] as gift[],

        guestSelected : {} as guest,
    }),
    getters: {
        getGuestList: (state) => state.guestList,
        getGiftList: (state) => state.giftList,
        getGuestSelected: (state) => state.guestSelected,
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
    },
  })