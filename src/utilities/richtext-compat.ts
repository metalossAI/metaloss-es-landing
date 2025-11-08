import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

/**
 * Type compatibility helper for Payload CMS richtext-lexical version differences.
 * 
 * Between v3.43.0 and v3.59.1, the type definitions for DefaultTypedEditorState changed,
 * causing SerializedEditorState to be incompatible. This helper provides a safe conversion.
 * 
 * @param data - The serialized editor state from Payload
 * @returns The data cast to DefaultTypedEditorState for RichText component compatibility
 */
export function asRichTextData(
  data: SerializedEditorState | null | undefined,
): DefaultTypedEditorState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data as any
}
