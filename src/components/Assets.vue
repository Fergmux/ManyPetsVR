<template>
  <a-assets>
    <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg" crossorigin="anonymous">
    <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg" crossorigin="anonymous">
    <img id="keyboard" src="../assets/images/sk-basic.png">
    <img id="dogPic" src="../assets/images/dog.png">
    <img id="catPic" src="../assets/images/cat.png">
    <img id="male" src="../assets/images/male.png">
    <img id="female" src="../assets/images/female.png">
    <img id="scissors" src="../assets/images/scissors.png">
    <img id="aubergine" src="../assets/images/aubergine.png">
    <img id="loading" src="../assets/images/loading.png">

    <a-asset-item id="dog-obj" src="src/assets/objects/dog.obj"></a-asset-item>
    <a-asset-item id="cat-obj" src="src/assets/objects/cat.obj"></a-asset-item>
    <a-asset-item id="manypets" src="src/assets/objects/manypets.gltf"></a-asset-item>

    <img id="dogfur" src="../assets/images/dogfur.jpg">
    <img id="catfur" src="../assets/images/catfur.jpg">
    <img id="shiny" src="../assets/images/shiny.jpg">

    <a-mixin
      id="responsive"
      animation__scale="property: scale; to: 1.2 1.2 1.2; dur: 200; startEvents: mouseenter"
      animation__scale_reverse="property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"
    />

    <a-mixin
      id="frame"
      geometry="primitive: plane; width: 0.6; height: 0.6"
      material="transparent: true;"
      class="menu-button"
      mixin="responsive"
      />

    <a-mixin
      id="frameLeft"
      mixin="frame"
      position="-0.8 0 0"
      animation__select="property: position; from: -0.8 0 0; to: -0.8 0 0.5; dur: 100; startEvents: click"
    />

    <a-mixin
      id="frameRight"
      mixin="frame"
      position="0.8 0 0"
      animation__select="property: position; from: 0.8 0 0; to: 0.8 0 0.5; dur: 100; startEvents: click"
    />

    <a-mixin
      id="title"
      text="width: 4; align: center;"
      position="0 1 0"
    />

    <a-mixin
      id="title"
      text="width: 4; align: center;"
      position="0 1 0"
    />

    <a-mixin
      id="rail"
      geometry="primitive: box; height: 0.01; width: 1; depth: 0.01"
      rotation="45 0 0"
    />

    <a-mixin
      id="slider"
      geometry="primitive: box; height: 0.10; width: 0.10; depth: 0.30"
      material="color: #002D5E;"
      rotation="45 0 0"
    />

    <a-mixin
      id="spotlight"
      light="type: spot; angle: 55; color: #EEE"
      rotation="10 0 0"
    />

    <a-mixin
      id="spotlight-box"
      geometry="primative: box;"
      material="color: black;"
      rotation="10 0 0"
      scale="0.5 0.3 0.3"
    />

  </a-assets>
</template>