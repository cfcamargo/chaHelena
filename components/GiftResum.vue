<template>
    <Container>
        <div class="flex flex-col gap-6 justify-center items-center p-10" v-if="confirmError">
            <h2 class="text-pink text-center">Desculpe, Houve um erro ao confirmar a presença, Atualize a página e tente novamente, Se o problema persistir, fale com a Mamãe ou com o Papai.</h2>
            <Animation name="/error.json"/>
            <span class="text-pink-dark">
                {{ confirmErrorMessage }}
            </span>
        </div>

        <div class="flex flex-col gap-6 justify-center items-center p-10" v-else>
            <h2 class="font-cursive text-5xl text-pink-dark">{{ store.getGuestSelected.name }}</h2>

            <p class="text-blue-dark text-center">Fico feliz que você vai me presentar com o(a) {{ store.getGiftSelected.description }}! Sua escolha é muito especial para mim. Mal posso esperar para recebê-lo no meu chá de bebê. Obrigada por fazer parte deste momento único!</p>

            <div class="flex flex-col gap-2">
                <button class="px-6 py-2 bg-blue hover:bg-blue-dark text-white rounded" @click="$emit('prev')">
                    ALTERAR PRESENTE
                </button>

                <button class="px-6 py-2 bg-pink hover:bg-pink-dark text-white rounded" @click="confirmPresence">
                    <span v-if="confirm_loading" class="w-full flex justify-center items-center">
                        <Loader2 :size="24" color="white" class="animate-spin"/>
                    </span>
                    <span v-else>
                        CONFIRMAR PRESENÇA
                    </span>
                </button>
            </div>
        </div>
    </Container>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';

import { useConfirmedStore } from '@/store/confirmed'

const emits = defineEmits(['next'])

const confirmError = ref(false)
const confirmErrorMessage = ref('')

const store = useConfirmedStore()
const supabase = useSupabaseClient()

const confirm_loading = ref(false)


async function confirmPresence(){
    confirm_loading.value = true
    const { data: guestData, error: guestError } = await supabase
    .from('guests')
    .update({ confirmed: true, giftId: store.getGiftSelected.id })
    .eq('id', store.getGuestSelected.id)

    if(guestError){
        handleConfirmedError(guestError)
        return
    }

    const { data: giftData, error: giftError } = await supabase
        .from('gifts')
        .update({ selected: true })
        .eq('id', store.getGiftSelected.id);

      if (giftError) {
        console.error('Erro ao atualizar o presente:', giftError);
        return;
      }

      emits('next')
      confirm_loading.value = false

}


function handleConfirmedError(message : any){
    confirmError.value = true
    confirmErrorMessage.value = message
}

</script>
