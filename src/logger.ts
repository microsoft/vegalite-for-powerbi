module powerbi.extensibility.visual {
    export function logExceptions() {
        return function(target: any, propertyKey: string, descriptor) {
            return {
                value: function() {
                    try {
                        return descriptor.value.apply(this, arguments);
                    } catch (e) {
                        console.error(e);
                        throw e;
                    }
                }
            };
        };
    }
}
