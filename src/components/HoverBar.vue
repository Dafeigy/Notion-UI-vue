<script setup lang="ts">
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'
import Toggle from '@/components/ui/toggle/Toggle.vue'
import TextTurnInto from '@/components/TextTurnInto.vue'
import { Bold, Italic, Underline, Strikethrough,ChevronsLeftRightEllipsis,SigmaSquare,Link,WandSparkles,Ghost} from 'lucide-vue-next'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import ColorManage from "@/components/TextCorlorChange.vue"
</script>

<template>
  <ButtonGroup>
    <Button variant="outline" size="sm" class="cursor-pointer"><WandSparkles/></Button>
    <TooltipProvider>
        <Tooltip>
        <TooltipTrigger class="rounded-none cursor-pointer"><Button variant="outline" size="sm" class="cursor-pointer rounded-none"><Ghost/>Ask AI</Button></TooltipTrigger>
        <TooltipContent>
            <p>Make edits, find answer,or more</p>
        </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    
    <ButtonGroupSeparator />
    <TextTurnInto/>
    <TooltipProvider>
        <Tooltip>
        <TooltipTrigger><Toggle size="sm" variant="outline" class="bg-background dark:bg-input/30 cursor-pointer hover:text-blue-400 rounded-none data-[state=on]:text-blue-400"><Bold/></Toggle></TooltipTrigger>
        <TooltipContent>
            <KbdGroup><p>Bold:</p><Kbd>Ctrl</Kbd><span>+</span><Kbd>B</Kbd></KbdGroup>
        </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    <TooltipProvider>
        <Tooltip>
        <TooltipTrigger><Toggle size="sm" variant="outline" class="bg-background dark:bg-input/30 cursor-pointer hover:text-blue-400 rounded-none data-[state=on]:text-blue-400"><Italic/></Toggle></TooltipTrigger>
        <TooltipContent>
            <KbdGroup><p>Italicize:</p><Kbd>Ctrl</Kbd><span>+</span><Kbd>I</Kbd></KbdGroup>
        </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    <TooltipProvider>
        <Tooltip>
        <TooltipTrigger><Toggle size="sm" variant="outline" class="bg-background dark:bg-input/30 cursor-pointer hover:text-blue-400 rounded-none data-[state=on]:text-blue-400"><Underline/></Toggle></TooltipTrigger>
        <TooltipContent>
            <KbdGroup><p>Underline:</p><Kbd>Ctrl</Kbd><span>+</span><Kbd>U</Kbd></KbdGroup>
        </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    <TooltipProvider>
        <Tooltip>
        <TooltipTrigger><Toggle size="sm" variant="outline" class="bg-background dark:bg-input/30 cursor-pointer hover:text-blue-400 rounded-none data-[state=on]:text-blue-400"><Strikethrough/></Toggle></TooltipTrigger>
        <TooltipContent>
            <KbdGroup><p>Strike-through:</p><Kbd>Ctrl</Kbd><span>+</span><Kbd>Shift</Kbd><span>+</span><Kbd>S</Kbd></KbdGroup>
        </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    <Button variant="outline" size="sm" class="cursor-pointer"><ChevronsLeftRightEllipsis/></Button>
    <Button variant="outline" size="sm" class="cursor-pointer"><SigmaSquare/></Button>
    <Button variant="outline" size="sm" class="cursor-pointer"><Link/></Button>
    <ColorManage/>
  </ButtonGroup>
</template>
