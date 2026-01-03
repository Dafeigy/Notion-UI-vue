<script setup lang="ts">
import SwitchMode from '@/components/SwitchMode.vue'
import Block from '@/components/elements/Block.vue'
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center " contenteditable="true">
    <h1 class="text-3xl font-bold flex items-center">
        Light/Dark Mode Toggle<SwitchMode class="m-4"/>
      </h1>
    <div class="block-editor bg-accent p-4 rounded-xl">
      <Block class="flex flex-col notion-block">
          <Block class="my-1 p-1 border rounded">
          <h1 class="text-3xl font-bold flex items-center block-editor">H1: 另一个标题块</h1>
        </Block>
        <Block class="my-1 p-1 border rounded">
          <h2 class="text-2xl font-bold flex items-center block-editor">H2: 另一个标题块</h2>
        </Block>
        <Block class="my-1 p-1 border rounded">
          <h3 class="text-xl font-bold flex items-center block-editor">H3: 另一个标题块</h3>
        </Block>
        <Block class="p-1 border rounded" >
          <p>这是一个<code class="mx-1 p-1 rounded bg-secondary ">Block</code>，当你选中这里的文字时，悬浮框会显示在选中文字的顶部。</p>
        </Block>
        <Block class="p-1 border rounded" >
          <p>This is a <code class="mx-1 p-1 rounded bg-secondary ">Block</code>, When you select text here, HoverBar will show upon the selected text.</p>
        </Block>
        <Block class="my-1 p-1 border rounded">
          <p>[WIP]</p>
        </Block>
      </Block>
    </div>
    
     
  </div>

</template>

<style scoped></style>
