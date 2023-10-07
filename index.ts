function Builder<I>(def: I) {

  return def;
}

interface IThing {
  doThing: (args: { value: object }) => string
  doAnotherThing: () => void
}

Builder<IThing>({

  doThing(args: { value: object }) {
    /**
     * ts7022 is shown on 'value' below.
     * 
     * Only shown when func param 'arg' type is declared. Removing the declaration resolves the error.
     * Only shown in vscode. tsc compiles without errors.
     * Only shown on second pass, after a change has been made to the file. Initial type check on load shows no errors.
     * Only shown when noImplicitAny: true
     * 
     * In a more complex file, declaring this function
     * after 'doAnotherThing' prevents the error being
     * displayed.
     */
    const { value } = this.args
    return `${value}`
  },

  doAnotherThing() { },

})