<template>
  <n-drawer v-model:show="visible" :width="460" placement="left">
    <n-drawer-content>
      <template #header>Playground</template>
      <slot></slot>
      <n-divider>console</n-divider>
      <!-- TODO: 这里后面根据实际输出结果，\n 分割加上transition-group，还可以搞渐变色哈哈 -->
      <pre class="text-pink text-xs">> i'm output</pre>
      <pre class="text-purple text-xs">> i'm output</pre>
      <pre class="text-pink text-xs">> i'm output</pre>
      <pre class="text-purple text-xs">> {{ output }}</pre>
      <template #footer>
        <n-button @click="run">Run</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
  <n-button @click="showMe">Let's run it!</n-button>
</template>

<script setup>
import { ref } from 'vue'
import { NButton, NDivider, NDrawer, NDrawerContent } from 'naive-ui'

const visible = ref(false)

const output = ref(null)

const showMe = () => {
  visible.value = true
}

const run = () => {
  output.value = 'did you tried'
}
</script>
