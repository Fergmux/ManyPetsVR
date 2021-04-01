<template>
  <a-entity id="postcode" position="21 0 0">
    <a-entity mixin="title" :text="`value: What postcode does ${petName} live at?;`"/>
    <a-entity
      :text="`value: ${postcode}; width: 6; align: center;`"
      @click="$emit('open', 'pet_address_postcode')"
      mixin="frame"
      class="raycastable"
      material="visible: false;"
    />
  </a-entity>
</template>

<script>
export default {
  name: 'Postcode',
  props: {
    petName: String,
    postcode: String,
  },
  emits: ['open'],
}
</script>