<script setup lang="ts">
import { ref } from 'vue'
import SwitchMode from '@/components/SwitchMode.vue'
import Block from '@/components/elements/Block.vue'
import { VueDraggableNext as draggable } from 'vue-draggable-next'

interface BlockItem {
  id: string
  content: string
  tag: string
  class?: string
}

const blocks = ref<BlockItem[]>([
  { id: '1', content: 'H1: 另一个标题块', tag: 'h1', class: 'my-0.5 text-3xl font-bold flex items-center block-editor' },
  { id: '2', content: 'H2: 另一个标题块', tag: 'h2', class: 'my-0.5 text-2xl font-bold flex items-center block-editor' },
  { id: '3', content: 'H3: 另一个标题块', tag: 'h3', class: 'my-0.5 text-1xl font-bold flex items-center block-editor' },
  { id: '4', content: '这是一个<code class="mx-1 p-1 rounded bg-secondary ">Block</code>，当你选中这里的文字时，悬浮框会显示在选中文字的顶部。', tag: 'p', class: ' border rounded' },
  { id: '5', content: 'This is a <code class="mx-1 p-1 rounded bg-secondary ">Block</code>, When you select text here, HoverBar will show upon the selected text.', tag: 'p', class: ' border rounded' },

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
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center " contenteditable="true">
    <h1 class="text-3xl font-bold flex items-center">
        Light/Dark Mode Toggle<SwitchMode class="m-4"/>
      </h1>
    <div class="block-editor bg-secondary p-4 rounded-xl">
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
        <Block v-for="block in blocks" :key="block.id" class="my-1 p-1 border rounded" :id="'block-'+block.id">
          <component :is="block.tag" v-html="block.content" :class="block.class" />
        </Block>
      </transition-group>
    </draggable>
      </Block>
    </div>
    <div class="my-2 text-3xl select-none" contenteditable="false">
      [WIP] Draggable Container Test 
  </div>
     
  </div>

</template>

<style scoped></style>
