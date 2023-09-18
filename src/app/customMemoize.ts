export function customMemoize() {
    // Value cache stored in the closure
    const cacheLookup: { [key: string]: any } = {};

    return (target: any, key: any, descriptor: any) => {
        const originalMethod = descriptor.value;

        descriptor.value = function () {
            // arguments can be object -> stringify it
            const keyString = JSON.stringify(arguments);

            // cached data
            if (keyString in cacheLookup) {
                return cacheLookup[keyString];
            }

            // call the function with arguments
            const calculation = originalMethod.apply(this, arguments);
            // save data to cache
            cacheLookup[keyString] = calculation;
            // return calculated data
            return calculation;
        };

        return descriptor;
    };
}