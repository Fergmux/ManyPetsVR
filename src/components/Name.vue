<template>
  <a-entity id="name" position="6 0 0">
    <a-entity mixin="title" text="value: What is your pet's name?;"/>
    <a-entity
      :text="`value: ${name}; width: 6; align: center;`"
      @click="$emit('open', 'pet_name')"
      mixin="frame"
      class="raycastable"
      material="visible: false;"
    />
  </a-entity>
</template>

<script>
export default {
  name: 'Name',
  props: {
    name: String,
  },
  emits: ['open'],
}
</script>