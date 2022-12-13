<template>
  <n-drawer v-model:show="visible" :width="720" placement="left">
    <n-drawer-content>
      <template #header>Playground</template>
      <Editor v-model:code="raw" />
      <!-- TODO: 这里后面根据实际输出结果，\n 分割加上transition-group，还可以搞渐变色哈哈 -->
      <n-divider title-placement="left" dashed>console</n-divider>
      <div ref="console" class="console">
        <n-text v-for="text in logList" :key="text" tag="div">{{ text }}</n-text>
      </div>
      <template #footer>
        <n-space>
          <n-button @click="run">run</n-button>
          <n-button @click="clear">clear</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
  <n-button @click="showMe">> Let's run it!</n-button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { dynamicImport } from '../utils'
import Editor from './editor.vue'

const props = defineProps({
  module: {
    type: String
  },
  code: {
    type: Function,
    default: () =>
      function testCase() {
        return null
      }
  }
})

// 获取原始串
const raw = ref(props.code.toString())

// 生成可供new Function执行的串
const code = computed({
  get() {
    return `${raw.value}\nreturn ${props.code.name}`
  },
  set(val) {
    raw.value = val
  }
})

const log = ref('')

const logList = computed(() => {
  return log.value
    .split('\n')
    .filter((v) => v)
    .map((text) => `> ${text}`)
})

const originalLog = console.log

console.log = function (...args) {
  log.value += `\n${args.toString()}`
  originalLog.apply(console, args)
}

const visible = ref(false)

const showMe = () => {
  log.value = ''
  visible.value = true
}

const run = async () => {
  if (!props.module) {
    return console.warn('没有module')
  }
  const module = dynamicImport(props.module)
  module().then((mod) => {
    const runner = new Function(code.value!)()
    runner(mod)
  })
}

const clear = () => {
  log.value = ''
}

const reset = () => {
  // 这里暂时不生效
  raw.value = props.code.toString()
}
</script>

<style lang="scss" scoped>
.console {
  max-height: 200px;
  font-size: 12px;
  font-family: PingFang SC, Cascadia Code;
}
</style>
