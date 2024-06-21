function assertIsConcreteInstance(instance, abstractClass) {
    if (instance.__proto__ === abstractClass.prototype) {
        throw new Error('Abstract class cannot be instantiated directly');
    }
}

function assertMethodImplemented(instance, methodName) {
    if (!instance[methodName]){
        throw new Error(`Method ${methodName} must be implemented`);
    }
}

function assertIsInstanceOfContract(instance, contractClass){
    if (!(instance instanceof contractClass)) {
        throw new Error(`Type Class must be an instance of ${contractClass}`);
    }
}

module.exports = {
    assertIsConcreteInstance,
    assertMethodImplemented,
    assertIsInstanceOfContract
};