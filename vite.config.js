export default {
  assetsInclude(file) {
    return /\.(mtl|obj|glb|png|gltf)$/.test(file)
  }
}