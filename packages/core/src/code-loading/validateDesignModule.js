export const validateDesignModule = (scriptRootModule) => {
  if (!scriptRootModule) {
    throw new Error('undefined root module passed !')
  }
  if ((typeof (scriptRootModule) === 'function')) { // single export ???
    console.warn('please use named exports for your main() function ! auto updating')
  }
  if (!('main' in scriptRootModule)) {
    throw new Error('no main() function found in the input script')
  }
}
