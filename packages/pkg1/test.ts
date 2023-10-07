function Builder<A extends object, I>(def: I & ThisType<I & { args: A }>) {

  return def;
}

interface ThingArgs {
  value: object
}

interface IThing<A> {
  doThing: (args: A) => string
  doAnotherThing: () => void
}

function FuncThing<A extends ThingArgs>() {

  return Builder<A, IThing<A>>({

    doThing(args: A & { extra?: "" }) {
      const { value } = this.args
      return `${value}`
    },

    doAnotherThing() { },

  })

}