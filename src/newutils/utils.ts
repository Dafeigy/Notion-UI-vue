
import { v4 as uuidv4 } from 'uuid'
import { type BlockType, type BlockData } from '@/newutils/types'

export const createBlock = (type: BlockType, content: string = '') : BlockData => {
    return {
      id: uuidv4(),
      content,
      type,
    }
  }