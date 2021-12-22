export type ParsedFile<T> = {
  data: T | null
  error: string | null
}

export type SavedFile = {
  success: boolean
  error: string | null
}
