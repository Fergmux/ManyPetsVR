<template>
  <a-scene>
    <assets />

    <!-- Background sky -->
    <a-sky 
      height="2048"
      radius="30"
      src="#skyTexture"
      theta-length="90"
      width="2048"
    />

    <!-- Ground -->
    <a-circle src="#groundTexture" rotation="-90 0 0" radius="32" />

    <!-- ManyPets -->
    <a-gltf-model
      src="#manypets"
      position="0 1.2 -15"
      scale="2 2 2"
      animation="property: position; from: 0 2 -15; to: 0 3 -14; dur: 2000; easing: easeInOutQuad; loop: true; dir: alternate;"
    />

    <!--<a-entity light="type: directional; color: #EEE; intensity: 3" position="0 0.8 1"></a-entity>-->
    <a-box mixin="spotlight-box" position="-4 0.2 -5.5" />
    <a-box mixin="spotlight-box" position="0 0.2 -5.5" />
    <a-box mixin="spotlight-box" position="4 0.2 -5.5" />
    <a-entity mixin="spotlight" position="-4 1 -5" ></a-entity>
    <a-entity mixin="spotlight" position="0 1 -5"></a-entity>
    <a-entity mixin="spotlight" position="4 1 -5"></a-entity>
    <a-entity light="type: ambient; intensity: 1;"></a-entity>

    <a-box 
      position="-0.5 1.3 -0.1"
      scale="0.2 0.2 0.2"
      :material="`color: ${boxColor}`"
      @hit="setTouch(true)"
      @hitend="setTouch(false)"
      class="cube"
    />

    <!-- Keyboard -->
    <a-entity 
      v-if="showKeyboard"
      @superkeyboardinput="submitValue"
      @superkeyboardchange="updateInput"
      id="keyboard"
      super-keyboard="hand: #rightHand; multipleInputs: true;"
      position="0 1.076 -1"
      rotation="-30 0 0"
    />

    <!-- Pet form -->
    <a-entity id="ui" position="0 1.6 -2.5">
      <a-entity 
        ref="form"
        id="form"
        highlight
        :animation="`property: position; to: ${formOffset} 0 0; dur: 1000; easing: easeInOutQuad; startEvents: moveForm;`"
      >
        <form-species :pet-name="petName" @submit="addAttribute"/>

        <form-gender :pet-name="petName" @submit="addAttribute" />

        <form-name :name="name" @open="openKeyboard" />

        <form-breed :pet-name="petName" :breed="breed" @open="openKeyboard"/>

        <form-spayed :pet-name="petName" @submit="addAttribute" />

        <form-value :pet-name="petName" @submit="addAttribute" />

        <form-dob :pet-name="petName" @submit="addAttribute" />

        <form-postcode :pet-name="petName" :postcode="postcode" @open="openKeyboard"/>

        <form-price :pet-name="petName" :quote="quote" @submit="getQuote" />
      </a-entity>
    </a-entity>

    <!-- Hand controls -->
    <tracked-controls />
  </a-scene>
</template>

<script>
import 'aframe'
import { ref, computed, nextTick, onMounted, watch } from 'vue'
import axios from 'axios'
import Assets from './components/Assets.vue'
import FormSpecies from './components/Species.vue'
import FormGender from './components/Gender.vue'
import FormName from './components/Name.vue'
import FormBreed from './components/Breed.vue'
import FormSpayed from './components/Spayed.vue'
import FormValue from './components/Value.vue'
import FormDob from './components/Dob.vue'
import FormPostcode from './components/Postcode.vue'
import FormPrice from './components/Price.vue'
import TrackedControls from './components/Hands.vue'

const moveFormEvent = new Event('moveForm')

export default {
	name: 'MainScene',
  components: {
    Assets,
    FormSpecies,
    FormGender,
    FormName,
    FormBreed,
    FormSpayed,
    FormValue,
    FormDob,
    FormPrice,
    FormPostcode,
    TrackedControls,
  },
	setup() {
		const color = ref('#FFC65D')
		const breed = ref('Enter breed')
		const postcode = ref('Enter postcode')
    const name = ref('Enter name')
		const formOffset = ref(0)
		const showKeyboard = ref(false)
    const petData = ref({})
    const quote = ref(null)
    const touching = ref(false)
    const petName = computed(() => name.value !== 'Enter name' ? name.value : 'your pet')
    const boxColor = computed(() => touching.value ? 'red' : 'blue')

    const getQuote = async () => {
      quote.value = null
      const response = await axios.post('https://admin-api.devpolicies.io/quick-quote',{
          agency: "BBM",
          data: {
            insured_entity: {
              ...petData.value,
              breed: {
                name: "Chow Chow",
                value: "CHOW_CHOW"
              },
              pedigree: true,
              pedigree_type: "PEDIGREE",
            },
            policy: {
              inception_date: "2021-04-01T00:00:00Z"
            }
          },
          product_line_key: "cat-dog-pio",
          source: "swagger_ui",
      })
      
      quote.value = response.data.quote
    }

    const updateInput = event => {
      if (showKeyboard.value === 'breed') {
        breed.value = event.detail.value
      } else if (showKeyboard.value === 'pet_address_postcode') {
        postcode.value = event.detail.value
      } else if (showKeyboard.value === 'pet_name') {
        name.value = event.detail.value
      }
    }

    const moveForm = async back => {
      const modifier = 3 * (back ? 1 : -1)
      const formx = document.querySelector("#form").getAttribute('position').x
      console.log(formx)
      if (!back || formx < 0) {
        formOffset.value = formx + modifier
        await nextTick()
        form.dispatchEvent(moveFormEvent)
      }
    }

    const openKeyboard = open => { 
      showKeyboard.value = open ?? true
    }

    const submitValue = event => {
      if(event.detail.value) {
        addAttribute({[showKeyboard.value]: event.detail.value})
      }
      moveForm()
      openKeyboard(false)
    }

    const addAttribute = value => {
      petData.value = {...petData.value, ...value}
      console.log(value)
      moveForm()
    }

    watch(touching, touch => {
      if (touch) {
        moveForm(true)
      }
    })

    const setTouch = newtouch => { 
      if (touching.value === false && newtouch === true) {
        touching.value = true
      } else if (touching.value === true && newtouch === false) {
        touching.value = false
      }
    }

    const consts = {color, breed, name, formOffset, showKeyboard, postcode, petName, quote, boxColor}
    const methods = { addAttribute, submitValue, updateInput, openKeyboard, getQuote, setTouch}
		return { ...consts, ...methods }
	}
}
</script>
