<template>
  <div ref="editorRef" class="editor"></div>
</template>

<script setup lang="ts">
import { ref, unref, onMounted } from 'vue'
import { basicSetup, EditorView } from 'codemirror'
import { ViewUpdate } from '@codemirror/view'
import { javascript } from '@codemirror/lang-javascript'

const props = defineProps({
  code: {
    type: [String, Function]
  }
})

const emit = defineEmits(['update:code'])

const editorRef = ref(null)

const code = ref(props.code)

// 初始化编译器
const initEditor = () => {
  // TODO: 这里的doc是不会发生变化的，后续用state进行更新
  new EditorView({
    doc: unref(code)?.toString(),
    extensions: [basicSetup, javascript(), getEditorTheme(), EditorView.updateListener.of(onEditorUpdate)],
    parent: editorRef.value!
  })
}

// 编译器代码变更的回调
const onEditorUpdate = (v: ViewUpdate) => {
  emit('update:code', v.state.doc.toString())
}

// 初始化编译器编译器主题
const getEditorTheme = () => {
  return EditorView.theme({
    '.cm-scroller': {
      'font-family': 'Cascadia Code, PingFang SC, Microsoft YaHei'
    },
    '.cm-gutterElement': {
      'font-size': '12px'
    },
    '.cm-line': {
      'font-size': '12px'
    }
  })
}

onMounted(() => {
  initEditor()
})
</script>

<style lang="scss">
.editor {
  min-height: 200px;
  max-height: 300px;
  overflow-y: scroll;
}
</style>
