<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Sun, Moon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
})

const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="flex items-center space-x-2">
    <Button
      variant="ghost"
      size="sm"
      @click="toggleDark()"
      :class="cn(
        'relative flex h-9 w-9 items-center justify-center rounded-md border border-border/40 bg-background shadow-sm hover:bg-accent hover:text-accent-foreground dark:border-border/50',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
      )"
    >
      <Sun
        v-if="!isDark"
        class="h-4 w-4 text-foreground transition-all"
      />
      <Moon
        v-else
        class="h-4 w-4 text-foreground transition-all"
      />
      <span class="sr-only">切换主题</span>
    </Button>
  </div>
</template>