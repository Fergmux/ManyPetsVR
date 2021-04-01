<template>
  <a-entity 
    id="rightHand" 
    laser-controls="hand: right" 
    raycaster="objects: .raycastable; far: 10;" 
    line="color: #CCCCCC"
    aabb-collider="objects: .cube;"
    grab
  />
  <a-entity 
    id="leftHand" 
    aabb-collider="objects: .cube;"
    grab
    hand-controls="hand: left; handModelStyle: highPoly; color: #ffcccc"
  />
</template>