<template>
  <a-entity id="value" position="15 0 0">
    <a-entity mixin="title" :text="`value: How much did you pay for ${petName}?;`"/>
    <a-box mixin="rail" position="0 -0.7 2" />
    <a-box 
      mixin="slider"
      position="-0.5 -0.7 2"
      class="cube"
      @movex="updatePetValue"
    />
    <a-entity
      :text="`value: $${petValue}; width: 6; align: center;`"
      mixin="frame"
      class="raycastable"
      @click="$emit('submit', {value: petValue})"
      material="visible: false;"
    />
  </a-entity>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Name',
  props: {
    name: String,
  },
  emits: ['submit'],
  setup() {
    const petValue = ref(0)
    const normalise = (number, max) => ((number + 0.5) * max).toFixed(0)

    const updatePetValue = event => {
      const price = normalise(event.detail, 3000)
      petValue.value = price
    }

    return {petValue, updatePetValue}
  }
}
</script>