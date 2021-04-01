<template>
  <a-entity id="breed" position="9 0 0">
    <a-entity mixin="title" :text="`value: What breed is ${petName}?;`"/>
    <a-entity
      :text="`value: ${breed}; width: 6; align: center;`"
      @click="$emit('open', 'breed')"
      mixin="frame"
      class="raycastable"
      material="visible: false;"
    />
  </a-entity>
</template>

<script>
export default {
  name: 'Breed',
  props: {
    petName: String,
    breed: String,
  },
  emits: ['open'],
}
</script>