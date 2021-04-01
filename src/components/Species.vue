<template>
    <a-entity id="species">
      <a-entity mixin="title" :text="`value: Is ${petName} a dog or a cat?;`"/>
      <a-obj-model 
        id="dogPoster"
        src="#dog-obj"
        scale="0.005 0.005 0.005"
        position="-0.8 -0.5 0"
        animation__scale="property: scale; to: 0.006 0.006 0.006; dur: 200; startEvents: mouseenter"
        animation__scale_reverse="property: scale; to: 0.005 0.005 0.005; dur: 200; startEvents: mouseleave"
        animation__spin="property: rotation; from: 0 0 0; to: 0 360 0; dur: 500; startEvents: click"
        material="src: #dogfur;"
        class="raycastable"
        @click="$emit('submit', {species: 'DOG'})"
      />
      <a-obj-model
        id="catPoster"
        src="#cat-obj"
        scale="0.02 0.02 0.02"
        animation__scale="property: scale; to: 0.024 0.024 0.024; dur: 200; startEvents: mouseenter"
        animation__scale_reverse="property: scale; to: 0.02 0.02 0.02; dur: 200; startEvents: mouseleave"
        animation__spin="property: rotation; from: 0 0 0; to: 0 360 0; dur: 500; startEvents: click"
        material="src: #catfur;"
        position="0.8 -0.5 0"
        class="raycastable"
        @click="$emit('submit', {species: 'CAT'})"
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