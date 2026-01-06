<script setup lang="ts">
import { ref } from 'vue'
import SwitchMode from '@/components/SwitchMode.vue'
import Block from '@/components/elements/Block.vue'
import { VueDraggableNext as draggable } from 'vue-draggable-next'
import type { Directive } from 'vue'
interface BlockItem {
  id: string
  content: string
  tag: string
  class?: string
}

const blocks = ref<BlockItem[]>(
[
  { id: '1', content: '👋 Welcome! This is a private page for you to play around with.', tag: 'p', class: 'border rounded my-1' },
  { id: '2', content: 'Give these things a try:', tag: 'p', class: 'border rounded my-1' },
  { id: '3', content: '1. Hover on the left of each line for quick actions', tag: 'p', class: 'border rounded my-1' },
  { id: '4', content: '2. Click on the + button to add a new line(TODO)', tag: 'p', class: 'border rounded my-1' },
  { id: '5', content: '3. Drag the ⋮⋮ button to reorder', tag: 'p', class: 'border rounded my-1' },
  { id: '6', content: '4. Click the trash icon to delete this block', tag: 'p', class: 'border rounded my-1' },
  { id: '7', content: '5. Bold and italicize using markdown e.g. **bold** and *italics*', tag: 'p', class: 'border rounded my-1' },
  { id: '8', content: "6. Add headers and dividers with '#', '##' or '---' followed by a space", tag: 'p', class: 'border rounded my-1' },
  // { id: '3', content: 'H3: 另一个标题块', tag: 'h3', class: 'my-0.5 text-1xl font-bold flex items-center block-editor' },
  // { id: '4', content: '这是一个<code class="mx-1 p-1 rounded bg-secondary ">Block</code>，当你选中这里的文字时，悬浮框会显示在选中文字的顶部。', tag: 'p', class: ' border rounded' },
  // { id: '5', content: 'This is a <code class="mx-1 p-1 rounded bg-secondary ">Block</code>, When you select text here, HoverBar will show upon the selected text.', tag: 'p', class: ' border rounded' },
])

const dragOptions = {
  animation: 150,
  group: 'blocks',
  disabled: false,
  ghostClass: 'lotion-ghost',
}

const onListChange = (event: any) => {
  console.log('List changed:', event)
}

const vEditable: Directive = {
  mounted(el, binding) {
    const { id, onUpdate } = binding.value
    
    el.addEventListener('input', (event: Event) => {
      onUpdate(id, (event.target as HTMLElement).innerHTML)
    })
    
    el.addEventListener('blur', (event: Event) => {
      onUpdate(id, (event.target as HTMLElement).innerHTML)
    })
    
    // 保存引用以便清理
    el._editableHandler = (event: Event) => {
      onUpdate(id, (event.target as HTMLElement).innerHTML)
    }
  },
  beforeUnmount(el) {
    // 清理事件监听器
    if (el._editableHandler) {
      el.removeEventListener('input', el._editableHandler)
      el.removeEventListener('blur', el._editableHandler)
    }
  }
}

const updateBlockContent = (id: string, content: string) => {
  const blockIndex = blocks.value.findIndex(block => block.id === id)
  if (blockIndex !== -1) {
    blocks.value[blockIndex].content = content
  }
}

</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center " contenteditable="true">
    <div id="left" class="w-1/2 h-full bg-muted lg:flex hidden flex-col p-4 overflow-auto">
      <h2 class="text-xl font-bold mb-4">Blocks JSON</h2>
      <pre class="bg-secondary p-4 rounded-lg overflow-auto">
        {{ JSON.stringify(blocks, null, 2) }}
      </pre>
    </div>
    <div id="right" class="w-1/2 h-full flex min-w-[512px] justify-center items-center">
      <div id="notion-editor" class="h-full w-4/5 flex flex-col ">
        <h1 contenteditable="false" class="my-4 w-4/5 px-20 text-4xl font-bold flex items-center justify-start">
          VotionUI<SwitchMode class="m-4"/>
        </h1>
        <div class="block-editor p-4 rounded-xl w-7/8">
        <Block class="flex flex-col notion-block">
          <draggable 
            :list="blocks"
            handle=".handle"
            @change="onListChange"
            item-key="id"
            tag="div"
            v-bind="dragOptions"
          >
            <transition-group type="transition">
              <Block v-for="block in blocks" 
              :key="block.id" 
              class="my-1 p-1 border rounded first:my-0 max-w-full" 
              :id="'block-'+block.id"
              >
                <component 
                  :is="block.tag" 
                  :class="block.class" 
                  contenteditable="true"
                  v-model="block.content"
                >
                {{ block.content }}
              </component>
              </Block>
            </transition-group>
          </draggable>
        </Block>
      </div>
      </div>
    </div>
    
     
  </div>

</template>

<style scoped></style>
