<template>
    <div class="w-full h-screen flex justify-center items-center bg-pink-dark px-2">
        <Container>
            <transition>
                <div v-if="step === 1">
                    <Welcome @next="next"/>
                </div>
            </transition>

            <transition>
                <div v-if="step === 2">
                    <Introduction @next="next"/>
                </div>
            </transition>

            <transition>
                <div v-if="step === 3">
                    <GuestSelect @next="next"/>
                </div>
            </transition>

            <transition>
                <div v-if="step === 4">
                    <GuestConfirm @next="next" @prev="prev"/>
                </div>
            </transition>
        </Container>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Welcome from '../../components/Welcome.vue';

const step = ref(1)

function next(){
    step.value++
}

function prev(){
    step.value--
}

</script>