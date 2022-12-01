---
layout: home

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
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/sky124380729.png',
    name: 'Levi',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/sky124380729' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/%E9%83%91%E6%B3%89-124380729' }
    ]
  }
]
</script>

<VPTeamMembers style="margin-top:20px;" size="small" :members="members" />
