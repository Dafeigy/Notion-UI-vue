<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Button from './ui/button/Button.vue';
import { BookA, ChevronDown } from 'lucide-vue-next';
const defaultTextColors = [
    'text-black dark:text-white',
    'text-gray-500',
    'text-orange-900',
    'text-orange-500',
    'text-yellow-500',
    'text-green-400',
    'text-blue-500',
    'text-purple-500',
    'text-pink-500',
    'text-red-500',
]
const defaultBGColor = [
    'bg-white dark:bg-white',
    'bg-gray-500/50',
    'bg-orange-900/50',
    'bg-orange-500/50',
    'bg-yellow-500/50',
    'bg-green-400/50',
    'bg-blue-500/50',
    'bg-purple-500/50',
    'bg-pink-500/50',
    'bg-red-500/50',
]
import { TooltipProvider, TooltipContent,TooltipTrigger,Tooltip} from '@/components/ui/tooltip';
</script>
<template>
<DropdownMenu>
    
    <DropdownMenuTrigger>
        <TooltipProvider>
        <Tooltip>
        <TooltipTrigger><Button variant="outline" size="sm" class="rounded-none cursor-pointer"><BookA class="h-4 w-4"/><ChevronDown/></Button></TooltipTrigger>
        <TooltipContent>
            <p>Change Text style</p>
        </TooltipContent>
        </Tooltip>
    </TooltipProvider>
        
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Text Color</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <div id="text-color-select" class="grid grid-cols-5">
        <DropdownMenuItem v-for="text in defaultTextColors" :class="text" class="flex justify-center items-center m-0.5 aspect-square cursor-pointer">A</DropdownMenuItem>
      </div>
      <DropdownMenuLabel>Background Color</DropdownMenuLabel>
      <div id="bg-color-select" class="grid grid-cols-5">
        <DropdownMenuItem v-for="text in defaultBGColor" :class="text" class="flex justify-center items-center m-0.5 aspect-square cursor-pointer border-indigo-700 rounded"></DropdownMenuItem>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>    
</template>