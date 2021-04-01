<template>
  <a-entity id="gender" position="3 0 0">
    <a-entity mixin="title" :text="`value: What gender is ${petName}?;`"/>
    <a-entity 
      id="malePoster"
      material="src: #male;" 
      mixin="frameLeft" 
      class="raycastable"
      @click="$emit('submit', {gender: 'MALE'})"
    />
    <a-entity
      id="femalePoster"
      material="src: #female;"
      mixin="frameRight"
      class="raycastable"
      @click="$emit('submit', {gender: 'FEMALE'})"
    />
  </a-entity>
</template>

<script>
export default {
  name: 'Gender',
  props: {
    petName: String,
  },
  emits: ['submit'],
}
</script>