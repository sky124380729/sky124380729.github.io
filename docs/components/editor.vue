<template>
  <div ref="editorRef" class="editor"></div>
  <button @click="run">run</button>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, nextTick, PropType } from 'vue'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

const props = defineProps({
  code: {
    type: String as PropType<string>
  }
})
const editorRef = ref(null)
const run = () => {
  // eval(props.code!)
  console.log('假装我run了')
}
onMounted(async () => {
  await nextTick()
  if (editorRef.value) {
    monaco.editor.defineTheme('BlackTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        // 相关颜色属性配置
        'editor.foreground': '#00c4ff'
        // 'editor.background': '#3e414a', //背景色
        // 'editorCursor.foreground': '#8B0000',
        // 'editor.lineHighlightBackground': '#0000FF20',
        // 'editorLineNumber.foreground': '#008800',
        // 'editor.selectionBackground': '#88000030',
        // 'editor.inactiveSelectionBackground': '#88000015'
      }
    })
    monaco.editor.create(editorRef.value, {
      value: props.code,
      language: 'javascript',
      fontSize: 12,
      tabSize: 2,
      insertSpaces: true,
      readOnly: false,
      fontFamily: 'Cascadia Code',
      theme: 'BlackTheme'
    })
  }
})
</script>

<style lang="scss">
.editor {
  width: 100%;
  height: 500px;
}
</style>
