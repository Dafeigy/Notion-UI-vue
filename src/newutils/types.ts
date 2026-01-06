export const BlockType = {
  Text: 'text',
  Heading1: 'heading1',
  Heading2: 'heading2',
  Heading3: 'heading3',
  Code: 'code',
  // Quote: 'quote',
  // UnorderedList: 'unorderedList',
  // OrderedList: 'orderedList',
} as const;

export type BlockType = typeof BlockType[keyof typeof BlockType];

export type BlockData = {
  id: string
  content: string
  type: BlockType
}
