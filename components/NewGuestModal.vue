<template>
    <div class="absolute top-0 left-0 right-0 bottom-0 w-full h-screen bg-black/80 flex justify-center items-center " v-show="props.show">
        <form class="p-6 bg-white rounded-xl w-full max-w-[500px]" @submit.prevent="handleAddNewGuest">
            <h2 class="text-xl font-bold text-center text-pink">Adicionar Convidado</h2>

            <input type="text" class="py-2 px-4 w-full border rounded border-pink-dark text-pink outline-none focus:outline-none mt-4" v-model="name">

            <div class="flex gap-2 mt-8">
                <button class="bg-pink hover:bg-pink-dark flex-1 py-2 rounded " type="submit">
                    <span v-if="props.insertLoading" class="w-full flex justify-center items-center">
                        <Loader2 :size="24" color="white" class="animate-spin"/>
                    </span>
                    <span class="text-white">
                         Adicionar
                    </span>
                </button>
                <button class="bg-blue hover:bg-blue-dark flex-1 py-2 rounded text-white" type="button" @click="cancel">Cancelar</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'


const props = defineProps<{
    show : boolean
    insertLoading: boolean
}>()

const emits = defineEmits(['close', 'addNewGuest'])

const name = ref('')

function handleAddNewGuest(){
    let newGuest = name.value
    name.value = ''
    emits('addNewGuest', newGuest)
}

function cancel(){
    name.value = ''
    emits('close')
}

</script>