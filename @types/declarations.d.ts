declare module 'noop' {
  type noop = () => void
  type throwop = (err) => void
  type doop = (cb: unknown, args: unknown, context: unknown) => unknown
}

declare module 'no-op' {
  type noop = () => void
  export default noop
}
