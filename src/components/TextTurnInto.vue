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
import { ChevronDown,Heading1, Heading2, Heading3, SquareSigma,MessageSquareQuote,Text, } from 'lucide-vue-next';
import { TooltipProvider, TooltipContent,TooltipTrigger,Tooltip} from '@/components/ui/tooltip';
</script>
<template>
<DropdownMenu>
    
    <DropdownMenuTrigger >
    <TooltipProvider>
        <Tooltip>
        <TooltipTrigger><Button variant="outline" size="sm" class="rounded-none cursor-pointer">Text<ChevronDown class="h-4 w-4"/></Button></TooltipTrigger>
        <TooltipContent>
            <p>Turn Text into</p>
        </TooltipContent>
        </Tooltip>
    </TooltipProvider>
        
    </DropdownMenuTrigger>
    
    <DropdownMenuContent>
      <DropdownMenuLabel>Turn into</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="cursor-pointer">
        <Text/>Text
    </DropdownMenuItem>
      <DropdownMenuItem class="cursor-pointer">
        <Heading1/>Heading1
    </DropdownMenuItem>
      <DropdownMenuItem class="cursor-pointer">
        <Heading2/>Heading2
    </DropdownMenuItem>
      <DropdownMenuItem class="cursor-pointer">
        <Heading3/>Heading3
    </DropdownMenuItem>
      <DropdownMenuItem class="cursor-pointer">
        <SquareSigma/>BlockEqution
    </DropdownMenuItem>
      <DropdownMenuItem class="cursor-pointer">
        <MessageSquareQuote/>Quote
    </DropdownMenuItem>
      
    </DropdownMenuContent>
  </DropdownMenu>    
</template>