export type MessageResponse = {
  status: number
  message: string
}

export type PayloadResponse<T> = {
  status: number
  payload: T
}
