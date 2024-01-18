---
layout: page

hero:
  name: LEVI NOTEBOOK
  # text: LEVI 个人笔记
  # tagline: Javascript,Typescript,Vue,React,Webpack,Vite,Rollup,Algorithm,Links,etc...
  actions:
    - theme: brand
      text: 快速开始 →
      link: /specification/introduction
    - theme: alt
      text: 在线预览
      link: /xxx
features:
  - icon: 🎌
    title: Javascript
    link: /javascript/index
    details: ...
---

<script setup>
// import { NCarousel, NCarouselItem } from 'naive-ui'
import { VPTeamMembers } from 'vitepress/theme'
import { useRouter } from 'vitepress'
import image0 from '/assets/wallpapers/w1.jpg'
import image1 from '/assets/wallpapers/w2.jpg'
import image2 from '/assets/wallpapers/w3.jpg'
import image3 from '/assets/wallpapers/w4.jpg'

// segmentfault 图标
const SF_SVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">  <image id="image0" width="32" height="32" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABUFBMVEUAml4AmmEAmmEKnWch p3UOn2kBmmFavZja8Oj////k9O6X1b5xxqfW7uUXo2/1+/h8y61Kt46h2cRAs4hwxqYfpnRyx6eA zLD9/v16yqz+/v4Vom5dvpqQ07p3yapYvJcRoGspqnqJ0LUoqXkrq3sCmmIFm2SU1Lz2+/mx4M4y rX9qw6IPn2qe2MJZvZhtxaQNn2k9sobp9vGp3Mmy4M/h8+zY7+ZvxaXz+vdUu5VLt48gpnQdpXIi p3Z+y68QoGpuxaVTupTZ7+dev5sJnWYDm2IHnGXX7+bx+faS07smqXj4/PpnwqB0x6gGnGTn9fBH tox2yKoInWVVu5XM6t+75NR4yavJ6d2u3swsq3yj2sXj8+0LnmeP0rk2r4L6/fuv383r9/L0+vgw rX4+sofV7uTs9/NNuJCCzbEMnmiR07q/5dfQ7OHA5tei2sVpw6LzH4wMAAAAAnRSTlNJ424rirYA AAABYktHRAnx2aXsAAAAB3RJTUUH5wIBCC0dSNbSEQAAAVFJREFUOMuFk+dbwjAQxkvAahSwCipu Uako4N64rRNB3Atx7/X/f/OuLWlTbXpfcuPX3t37JJLkIwLzSeI6EsTD3AB/oEoAyNU1lNLaOlcg SHULuQHhegNQ3IAGrDZGok1uQDMCYcEWLVCPidZsBaDNCbR3KJ1d3di1J96LLfri/QkLUAeS+tyx wSGSohVLW0CGJYfJCPNHGTCG4fjE5BSdTpAZBvgZgFPNwg/luXlC0lkFmy0EFmUGLEEmucy2WMHP ZfsWq5hZW9fMXBTDDTuwuaX33N7JWkqqnA67IWOs3B5GeXQLvFBaft9AihAcoHPolFo9Osb8Cbin 6GhOAJAzvEbm1oYIFaBwfoHHJeSv4EQdaMkOBGnuOlJWbiB/a8rCA3dM3fsH8z7wwOOTWX9+wfAV 3TduSLn4/vH59f1jTFZOgal/t/jfvAHPx+v1/H8BCaQqrGJXXckAAAAldEVYdGRhdGU6Y3JlYXRl ADIwMjMtMDItMDFUMDg6NDU6MjkrMDA6MDA0dnXXAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTAy LTAxVDA4OjQ1OjI5KzAwOjAwRSvNawAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMy0wMi0wMVQw ODo0NToyOSswMDowMBI+7LQAAAAASUVORK5CYII="/>
</svg>`

const { go } = useRouter()

const navigateTo = (url) => {
  // 如果是外链
  if(/^https?:\/\//.test(url)) {
    window.open(url)
  } else {
    go(url)
  }
}

const members = [
  {
    avatar: 'https://www.github.com/sky124380729.png',
    name: 'Levi',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/sky124380729' },
      { icon: { svg: SF_SVG }, link: 'https://segmentfault.com/u/sky124380729' }
    ]
  }
]

const columns = [
  { title: '个人开源项目 levi-vue-admin', img: image2, link: 'https://levi-vue-admin.vercel.app/' },
  { title: '关于微前端的理解与实践', img: image0, link: '/columns/micro-frontend/index' },
  { title: '手撕Promise', img: image1, link: '/mini-code/promise' },
  { title: '关于KMP的理解', img: image2, link: '/algorithm/kmp' },
  { title: '前端性能优化', img: image3, link: '/columns/perform-optimize/index' }
]
</script>

<div class="flex mt-10">
  <n-carousel
    effect="card"
    prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
    next-slide-style="transform: translateX(50%) translateZ(-800px);"
    style="height: 450px"
    show-arrow
  >
    <n-carousel-item v-for="column in columns" @click="navigateTo(column.link)" :style="{ width: '60%' }">
      <div class="carousel-img" :style="`background: url(${column.img}) no-repeat center`">
        {{ column.title }}
      </div>
    </n-carousel-item>
  </n-carousel>
</div>

<style scoped>
.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: bold;
  font-size: 26px;
  cursor: pointer;
  padding: 0 30px;
  background-size: cover !important;
}
</style>

<VPTeamMembers class="my-3" size="small" :members="members" />

<script>
// 百度流量统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?bb6ad308cbbeaa342099abc91a8ee9cb";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
</script>
