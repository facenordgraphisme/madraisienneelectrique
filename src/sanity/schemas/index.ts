import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './post'
import { categoryType } from './category'
import blockContent from './blockContent'
import author from './author'

export const schemaTypes: SchemaTypeDefinition[] = [postType, categoryType, blockContent, author]
