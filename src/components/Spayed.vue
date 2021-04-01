<template>
  <a-entity id="spayed" position="12 0 0">
    <a-entity mixin="title" :text="`value: Is ${petName} spayed or neutered?;`"/>
    <a-entity 
      id="snippedPoster"
      material="src: #scissors;" 
      mixin="frameLeft" 
      class="raycastable"
      @click="$emit('submit', {spayed_neutered: true})"
    />
    <a-entity
      id="notSnippedPoster"
      material="src: #aubergine;"
      mixin="frameRight"
      class="raycastable"
      @click="$emit('submit', {spayed_neutered: false})"
    />
  </a-entity>
</template>

<script>
export default {
  name: 'Species',
  props: {
    petName: String,
  },
  emits: ['submit'],
}
</script>