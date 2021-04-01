<template>
  <a-entity id="value" position="24 0 0">
  <a-entity
    v-if="displayText.startsWith('$')"
    mixin="title"
    :text="`value: You could insure ${petName} for:;`"
  />
    <a-entity
      :text="`value: ${displayText}; width: 6; align: center;`"
      mixin="frame"
      class="raycastable"
      @click="getQuote"
      material="visible: false;"
    />
    <a-icosahedron
      v-if="displayText === 'Getting price'"
      radius="0.5"
      material="src: #shiny;"
      animation="property: rotation; to: 360 360 360; dur: 3000; easing: linear; loop: true; delay: 500"
      animation__grow="property: scale; from: 0 0 0; to: 1 1 1; dur: 500; easing: linear;"
      position="0 -1 0"
    />
  </a-entity>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'Name',
  props: {
    petName: String,
    quote: Object,
  },
  emits: ['submit'],
  setup(props, context) {
    const text = ref('Get Quote')
    const displayText = computed(() => props.quote ? `$${price.value/100}` : text.value)
    const price = computed(() => props.quote && (
      Object.keys(props.quote.coverage_options)
        .filter(coverage => coverage.startsWith('vet_fees'))
        .map(coverage => props.quote.coverage_options[coverage].price.month.amount)
        .sort((a, b) => a - b)[0]
      )
    )

    const getQuote = () => {
      text.value = 'Getting price'
      context.emit('submit')
    }

    return {displayText, getQuote}
  }
}
</script>