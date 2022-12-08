<template>
  <n-drawer v-model:show="visible" :width="460" placement="left">
    <n-drawer-content>
      <template #header>Playground</template>
      <slot></slot>
      <n-divider>console</n-divider>
      <!-- TODO: 这里后面根据实际输出结果，\n 分割加上transition-group，还可以搞渐变色哈哈 -->
      <pre class="text-xs text-pink">> i'm output</pre>
      <pre class="text-xs text-purple">> i'm output</pre>
      <pre class="text-xs text-pink">> i'm output</pre>
      <pre class="text-xs text-purple">> {{ output }}</pre>
      <template #footer>
        <button @click="run">Run</button>
      </template>
    </n-drawer-content>
  </n-drawer>
  <button @click="showMe">Let's run it!</button>
</template>

<script setup>
import { ref } from 'vue'
import { NDivider, NDrawer, NDrawerContent } from 'naive-ui'

const visible = ref(false)

const output = ref(null)

const showMe = () => {
  visible.value = true
}

const run = () => {
  output.value = 'did you tried'
}
</script>
