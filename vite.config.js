
// module.exports = {
//   assetsInclude(file) {
//     return /\.(mtl|obj|glb|png|gltf|jpg)$/.test(file)
//   }
// }
export default {
  assetsInclude(file) {
    return /\.(mtl|obj|glb|png|gltf)$/.test(file)
  },
}