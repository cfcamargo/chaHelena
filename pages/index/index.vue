<template>
    <div class="w-full h-screen flex justify-center items-center bg-pink-dark px-2">
        <transition enter-active-class="animate__animated animate__fadeInRight" leave-active-class="animate__animated animate__zoomOut" mode="out-in">
            <div v-if="step === 1">
                <Welcome @next="next"/>
            </div>
        </transition>

        <transition enter-active-class="animate__animated animate__fadeInRight" leave-active-class="animate__animated animate__zoomOut" mode="out-in">
            <div v-if="step === 2">
                <Introduction @next="next"/>
            </div>
        </transition>

        <transition enter-active-class="animate__animated animate__fadeInRight" leave-active-class="animate__animated animate__zoomOut" mode="out-in">
            <div v-if="step === 3">
                <GuestSelect @next="next"/>
            </div>
        </transition>

        <transition enter-active-class="animate__animated animate__fadeInRight" leave-active-class="animate__animated animate__zoomOut" mode="out-in">
            <div v-if="step === 4">
                <GuestConfirm @next="next" @prev="prev"/>
            </div>
        </transition>

        <transition enter-active-class="animate__animated animate__fadeInRight" leave-active-class="animate__animated animate__zoomOut" mode="out-in">
            <div v-if="step === 5">
                <GiftIntroduction @next="next"/>
            </div>
        </transition>

        <transition enter-active-class="animate__animated animate__fadeInRight" leave-active-class="animate__animated animate__zoomOut" mode="out-in">
            <div v-if="step === 6">
                <GiftSelect @next="next"/>
            </div>
        </transition>

        <transition enter-active-class="animate__animated animate__fadeInRight" leave-active-class="animate__animated animate__zoomOut" mode="out-in">
            <div v-if="step === 7">
                <GiftResum @next="next" @prev="prev"/>
            </div>
        </transition>

        <transition enter-active-class="animate__animated animate__fadeInRight" leave-active-class="animate__animated animate__zoomOut" mode="out-in">
            <div v-if="step === 8">
                <FinishResum/>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import 'animate.css';
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