export const BindThis = (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value
    return {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this)
            Object.defineProperty(this, propertyKey, {
                value: boundFn,
                configurable: true,
                writable: true
            })
            return boundFn
        }
    }
}
