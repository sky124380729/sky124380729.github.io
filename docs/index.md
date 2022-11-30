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
    details: 前端规范文档，包含 html css javascript typescript vue react等各种规范约束
  - icon: ⚡️
    title: EBS ADMIN
    link: /admin/introduction
    details: 开箱即用的后台通用框架指南，使用vite3 + vue3 + vue-router + pinia + typescript + naive-ui打造，致力于框架零开发
  - icon: 🖖
    title: EBS VUI
    link: /vui/introduction
    details: 通用PC端组件库，基于 naive-ui 二次封装，与公司产品及UI设计风格相匹配，可支持深度定制
  - icon:  🚀
    title: EBS PEDESTAL
    link: /pedestal/introduction
    details: 微前端通用基座，旨在更好的为各个子应用的接入服务
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
