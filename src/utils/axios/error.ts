export class CodeError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'CodeError'
  }
}
