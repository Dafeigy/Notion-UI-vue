<script setup lang="ts">
import { ref, provide,reactive } from 'vue'
import SwitchMode from '@/components/SwitchMode.vue'
import Block from '@/components/elements/Block.vue'
import { VueDraggableNext as draggable } from 'vue-draggable-next'
import { BlockType, type BlockData } from '@/newutils/types'
import { createBlock } from '@/newutils/utils'

// 使用 BlockData 类型
const blocks = ref<BlockData[]>([
  createBlock(BlockType.Text, '👋 Welcome! This is a private page for you to play around with.'),
  createBlock(BlockType.Text, 'Give these things a try:'),
  createBlock(BlockType.Text, '1. Hover on the left of each line for quick actions'),
  createBlock(BlockType.Text, '2. Click on the + button to add a new line(TODO)'),
  createBlock(BlockType.Text, '3. Drag the ⋮⋮ button to reorder'),
  createBlock(BlockType.Text, '4. Click the trash icon to delete this block'),
  createBlock(BlockType.Text, '5. Bold and italicize using markdown e.g. **bold** and *italics*'),
  createBlock(BlockType.Text, "6. Add headers and dividers with '#', '##' or '---' followed by a space"),
])

// Provide blocks 和操作方法给子组件
provide('blocks', blocks)

// 添加 Block 的方法
const addBlock = (index: number, type: BlockType = BlockType.Text) => {
  const newBlock = createBlock(type)
  blocks.value.splice(index + 1, 0, newBlock)
}

provide('addBlock', addBlock)

// 删除 Block 的方法
const deleteBlock = (id: string) => {
  const index = blocks.value.findIndex(b => b.id === id)
  if (index !== -1) {
    blocks.value.splice(index, 1)
  }
}

provide('deleteBlock', deleteBlock)

const dragOptions = {
  animation: 150,
  group: 'blocks',
  disabled: false,
  ghostClass: 'lotion-ghost',
}

const onListChange = (event: any) => {
  console.log('List changed:', event)
}
const updateBlockContent = (index: number, newContent: string) => {
  if (blocks.value[index]) {
    blocks.value[index].content = newContent
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
              <Block v-for="(block, index) in blocks" 
              :key="block.id" 
              :content="block.content"
              @input="updateBlockContent(index, $event)"
              class="my-1 p-1 border rounded first:my-0 max-w-full" 
              :id="'block-'+block.id"
              :index="index"
              >

                {{ block.content }}

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
