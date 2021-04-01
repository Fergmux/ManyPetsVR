
<template>
  <a-entity id="dob" position="18 0 0">
    <a-entity mixin="title" :text="`value: When was ${petName} born?;`"/>
    <a-box mixin="rail" position="0 -0.5 2" />
    <a-box 
      mixin="slider"
      class="cube"
      position="-0.5 -0.5 2"
      @movex="updateDob('year', $event)"
    />

    <a-box mixin="rail" position="0 -0.7 2" />
    <a-box 
      mixin="slider"
      class="cube"
      position="-0.5 -0.7 2"
      @movex="updateDob('month', $event)"
    />

    <a-box mixin="rail" position="0 -0.9 2" />
    <a-box 
      mixin="slider"
      class="cube"
      position="-0.5 -0.9 2"
      @movex="updateDob('day', $event)"
    />

    <a-entity
      :text="`value: ${petDob}; width: 6; align: center;`"
      mixin="frame"
      class="raycastable"
      @click="$emit('submit', {dob: petDob})"
      material="visible: false;"
    />
  </a-entity>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'Name',
  props: {
    petName: String,
  },
  emits: ['submit'],
  setup() {
    const petDobValue = ref({year: 1990, month: 1, day: 1})
    const petDob = computed(() => Object.values(petDobValue.value).join('-'))

    const max = {
      'day': 31,
      'month': 12,
      'year': 31
    }
    
    const normalise = (number, max) => ((number + 0.5) * max).toFixed(0)

    const updateDob = (period, event) => {
      const number = normalise(event.detail, max[period])

      petDobValue.value[period] = period === 'year' ? Number(number) + 1990 : number
    }

    return { petDob, updateDob }
  }
}
</script>
