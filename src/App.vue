<script setup lang="ts">
import SwitchMode from '@/components/SwitchMode.vue'
import BlockContent from '@/components/elements/BlockContainer.vue'
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center " contenteditable="true">
    <div class="block-editor">
      <h1 class="text-3xl font-bold flex items-center block-editor">
        Light/Dark Mode Toggle<SwitchMode class="m-4"/>
      </h1>
      <BlockContent class="p-4 border rounded" >
        <p>这是一个<code class="bg-gray-200 text-green-400/70 dark:bg-gray-700 p-1 rounded mx-1 dark:text-orange-300 ">BlockContent</code>，当你选中这里的文字时，悬浮框会显示在选中文字的顶部。</p>
      </BlockContent>
      <BlockContent class="p-4 border rounded" >
        <p>This is a <code class="bg-gray-200 text-green-400/70 dark:bg-gray-700 p-1 rounded mx-1 dark:text-orange-300 ">BlockContent</code>, When you select text here, HoverBar will show upon the selected text.</p>
      </BlockContent>
      <BlockContent class="my-1 p-4 border rounded bg-gray-200 dark:bg-secondary">
        <h1 class="text-3xl font-bold flex items-center block-editor">另一个标题块</h1>
        <p>copyright@Nul4i</p>
      </BlockContent>
    </div>
    
     
  </div>

</template>

<style scoped></style>
