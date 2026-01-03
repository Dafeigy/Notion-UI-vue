<template>
  <div 
    ref="blockRef"
    :class="['notion-block', props.class]"
    @mouseup="handleMouseUp"
    @mousedown="handleMouseDown"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @focus="handleFocus"
    @blur="handleBlur"
    tabindex="0"
    class="flex"
  >
    <div class="mr-0.5 flex items-center">
      <TooltipProvider>
          <Tooltip>
          <TooltipTrigger class="rounded-none cursor-pointer">
            <Plus class=" p-0.5"
              :class="[
                'hover:bg-muted cursor-pointer m-0.5 rounded transition-opacity',
                (isHovered || isActive)&&!isBaseBlock() ? 'opacity-100' : 'opacity-0 pointer-events-none'
              ]" 
            />
          </TooltipTrigger>
          <TooltipContent>
              <p><b>Click</b> to add new <code>Block</code></p>
          </TooltipContent>
          </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
          <Tooltip>
          <TooltipTrigger class="rounded-none cursor-pointer">
            <GripVertical class=" p-0.5"
              :class="[
                'hover:bg-muted cursor-pointer m-0.5 rounded transition-opacity',
                (isHovered || isActive)&&!isBaseBlock() ? 'opacity-100' : 'opacity-0 pointer-events-none'
              ]" 
            />
          </TooltipTrigger>
          <TooltipContent>
              <p><b>Drag</b> to move this <code>Block</code></p>
          </TooltipContent>
          </Tooltip>
      </TooltipProvider>
    </div>
    
    <slot />
    
    <Teleport to="body" v-if="showHoverBar && selectionPosition">
      <div
        ref="hoverBarRef"
        class="fixed z-50"
        :style="{
          left: `${selectionPosition.x}px`,
          top: `${selectionPosition.y}px`,
        }"
        @mousedown.stop
      >
        <HoverBar />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import HoverBar from '@/components/elements/HoverBar.vue'
import { Plus,GripVertical } from 'lucide-vue-next'
interface Position {
  x: number
  y: number
}

interface Props {
  class?: string
}

const props = defineProps<Props>()

const blockRef = ref<HTMLElement | null>(null)
const hoverBarRef = ref<HTMLElement | null>(null)
const showHoverBar = ref(false)
const selectionPosition = ref<Position | null>(null)
const isSelecting = ref(false)
const startSelectionTime = ref(0)
const isHovered = ref(false)
const isActive = ref(false)

const isBaseBlock = (): boolean =>{
  return props.class?.includes('notion-block') || false
}
/**
 * 获取选中文字所在元素的行高（像素单位）
 * @param range 选中的Range对象
 * @returns 行高的像素值
 */
 const getSelectionLineHeight=(range: Range): number =>{
  // 获取选中文本所在的元素
  let element: HTMLElement | null = null
  
  // 如果选区起始节点是文本节点，获取其父元素
  if (range.startContainer.nodeType === Node.TEXT_NODE) {
    element = range.startContainer.parentElement
  } else {
    element = range.startContainer as HTMLElement
  }
  
  // 如果无法直接获取元素，尝试从commonAncestorContainer获取
  if (!element) {
    const container = range.commonAncestorContainer
    if (container.nodeType === Node.TEXT_NODE) {
      element = container.parentElement
    } else {
      element = container as HTMLElement
    }
  }
  
  // 如果还是没有获取到元素，返回默认行高
  if (!element) {
    return 24 // 默认24px，大约是1.5倍16px字体大小
  }
  
  // 获取计算样式
  const computedStyle = window.getComputedStyle(element)
  
  // 解析字体大小
  const fontSize = parseFloat(computedStyle.fontSize) || 24
  
  // 解析行高
  const lineHeight = computedStyle.lineHeight
  
  // 处理不同的行高值
  return parseLineHeight(lineHeight, fontSize)
}

/**
 * 将CSS line-height值转换为像素值
 * @param lineHeight CSS line-height值
 * @param fontSize 字体大小（像素）
 * @returns 行高的像素值
 */
const parseLineHeight=(lineHeight: string, fontSize: number): number =>{
  // 如果是normal，使用常用系数
  if (lineHeight === 'normal') {
    // 常用浏览器默认行高大约是1.2倍字体大小
    return fontSize * 1.2
  }
  
  // 如果是像素单位，直接解析
  if (lineHeight.includes('px')) {
    return parseFloat(lineHeight) || fontSize * 1.2
  }
  
  // 如果是em或rem单位，乘以字体大小
  if (lineHeight.includes('em') || lineHeight.includes('rem')) {
    const multiplier = parseFloat(lineHeight) || 1.2
    return multiplier * fontSize
  }
  
  // 如果是纯数字（无单位），乘以字体大小
  if (!isNaN(parseFloat(lineHeight))) {
    return parseFloat(lineHeight) * fontSize
  }
  
  // 默认使用1.2倍字体大小
  return fontSize * 1.2
}

// /**
//  * 获取选中文字所在元素的字体大小
//  * @param range 选中的Range对象
//  * @returns 字体大小的像素值
//  */
// const getSelectionFontSize=(range: Range): number =>{
//   let element: HTMLElement | null = null
  
//   if (range.startContainer.nodeType === Node.TEXT_NODE) {
//     element = range.startContainer.parentElement
//   } else {
//     element = range.startContainer as HTMLElement
//   }
  
//   if (!element) {
//     const container = range.commonAncestorContainer
//     if (container.nodeType === Node.TEXT_NODE) {
//       element = container.parentElement
//     } else {
//       element = container as HTMLElement
//     }
//   }
  
//   if (!element) {
//     return 16 // 默认16px
//   }
  
//   const computedStyle = window.getComputedStyle(element)
//   return parseFloat(computedStyle.fontSize) || 16
// }

// 处理鼠标进入事件
const handleMouseEnter = () => {
  isHovered.value = true
}

// 处理鼠标离开事件
const handleMouseLeave = () => {
  isHovered.value = false
}

// 处理焦点获得事件
const handleFocus = () => {
  isActive.value = true
}

// 处理焦点失去事件
const handleBlur = () => {
  isActive.value = false
}

// 处理鼠标按下事件
const handleMouseDown = () => {
  isSelecting.value = true
  startSelectionTime.value = Date.now()
  // 隐藏可能已显示的悬浮框
  showHoverBar.value = false
  selectionPosition.value = null
}

// 处理鼠标释放事件
const handleMouseUp = async (event: MouseEvent) => {
  if (!isSelecting.value) return
  
  isSelecting.value = false
  
  // 确保选择不是点击（检查选择持续时间）
  const selectionDuration = Date.now() - startSelectionTime.value
  if (selectionDuration < 100) { // 少于100ms认为是点击而不是选择
    return
  }

  const selection = window.getSelection()
  
  // 检查是否有选中文本
  if (!selection || selection.toString().trim().length === 0) {
    return
  }

  // 检查选区是否完全在当前元素内
  const range = selection.getRangeAt(0)
  if (!blockRef.value?.contains(range.commonAncestorContainer)) {
    return
  }

  // 获取选区第一个字符的位置
  const rects = range.getClientRects()
  if (rects.length === 0) return

  // 获取第一个矩形的左上角位置
  const firstRect = rects[0]
  
  // 等待DOM更新后再计算位置
  await nextTick()
  
  selectionPosition.value = {
    x: firstRect?.left ?? 0,
    y: (firstRect?.top ?? 0) - getSelectionLineHeight(range)-12 // 向上偏移10px
  }
  
  showHoverBar.value = true
  event.stopPropagation()
}

// 点击其他地方关闭悬浮框
const handleClickOutside = (event: MouseEvent) => {
  if (hoverBarRef.value && !hoverBarRef.value.contains(event.target as Node)) {
    showHoverBar.value = false
    selectionPosition.value = null
  }
}

// 监听选择变化
const handleSelectionChange = () => {
  const selection = window.getSelection()
  if (!selection || selection.toString().trim().length === 0) {
    showHoverBar.value = false
    selectionPosition.value = null
  }
}

// 监听键盘事件（如按ESC关闭）
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    showHoverBar.value = false
    selectionPosition.value = null
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  document.addEventListener('selectionchange', handleSelectionChange)
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  document.removeEventListener('selectionchange', handleSelectionChange)
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.notion-block {
  position: relative;
  cursor: text;
  user-select: text;
}

/* 添加一些样式优化 */
:deep(.notion-block *) {
  user-select: text;
}
</style>