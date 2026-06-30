// class Command {

//     static literal(...params: ConstructorParameters<typeof LiteralCommand>) {
//         new LiteralCommand(...params)
//     }
//     static argument() {
//     }
// }

// interface Base {
//     then(): this
//     executes(): void
//     error(): void
// }

// class LiteralCommand implements Base {
//     constructor(literal: string) {
//     }
//     then() {
//         return this
//     }
//     executes(func: (ctx) => {}) {
//     }
//     error() {
//     }
//     build() {
//     }
// }