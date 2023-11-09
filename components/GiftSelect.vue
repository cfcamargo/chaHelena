<template>
  <Container>
      <div class="flex flex-col gap-6 justify-center items-center p-10 w-full">
          <h2 class="font-cursive text-5xl text-pink-dark">Selecione um presente</h2>

          <div class="w-full flex justify-center" v-if="loading">
              <Loader2 :size="45" color="#FFC8DD" class="animate-spin"/>
          </div>

          <ul class="flex-1 max-h-[300px] overflow-y-scroll flex flex-col gap-4 w-full scroll-element px-2" v-if="giftNotSelected.length > 0">
              <li class="cursor-pointer text-white p-2 rounded" :class="giftSelected !== null && giftSelected.description === gift.description ? 'bg-blue-dark' : 'bg-pink-dark'" v-for="gift in giftNotSelected" :key="gift.id" @click="selectedGuest(gift)">
                  {{  gift.description }}
              </li>
          </ul>

          <button class="px-6 py-2 bg-pink hover:bg-pink-dark text-white rounded disabled:cursor-not-allowed disabled:opacity-20 disabled:hover:bg-pink" @click="$emit('next')" :disabled="giftSelected===null">
              SELECIONAR
          </button>
      </div>
  </Container>
</template>

<script setup lang="ts">
import { Search, Loader2 } from 'lucide-vue-next';
import { useConfirmedStore } from '@/store/confirmed'
import type gift from '~/models/gift';

const emits = defineEmits(['next'])

const store = useConfirmedStore()
const supabase = useSupabaseClient()

const loading = ref(false)

async function listGifts() {
  try {
    loading.value = true
    const { data, error } = await supabase
      .from('gifts') // Substitua 'guests' pelo nome correto da sua tabela
      .select('*')    // Seleciona todas as colunas; você pode ajustar isso conforme necessário

    if (error) {
      console.error('Erro ao listar guests:', error.message)
      return
    }

    if(data){
        store.setGiftList(data)
        giftList.value = data
    }

    loading.value = false
  } catch (error) {
    console.error('Erro inesperado:', error)
  }
}


const giftSelected = ref<gift | null>(null)
const giftList = ref<gift[]>([])

function selectedGuest(gift: gift){
    giftSelected.value = gift
    store.setGiftSelected(gift)
}

const giftNotSelected = computed(() => {
    return giftList.value.filter(gift => gift.selected === false)
})


onMounted(() => {
    listGifts()
})


</script>
