import "reflect-metadata"
import { ContructorType } from "./type"
import DContainer from "./dContainer"
import * as chalk from 'chalk';
import BaseService from './base/baseService'

export function service<H extends ContructorType>(...args: ConstructorParameters<H>) {
    return function <T extends ContructorType>(constructor: T) {
        console.log(`Auto Register Service ${chalk.greenBright(constructor.name)}`);
        DContainer.registerService(constructor, new constructor(...args));
    }
}

export function logger(message: string) {
    return (constructor: any, methodName: string, descriptor: PropertyDescriptor): any => {
        const origFunction = descriptor.value;
        descriptor.value = function wrapper(...args) {
            console.log(`The method ${constructor.toString()}.${methodName} has been called`);
            console.log("It said: " + message);
            // if (typeof constructor === "object") {
            //     let user = constructor.getFirstUser.call(this);
            // } else if (typeof constructor === "function") {
            //     let name = constructor.serviceName;
            // }
            return origFunction.apply(this, args);
        }
    }
}

export function broacastEvent(eventData: any) {
    return (constructor: any, methodName: string, descriptor: PropertyDescriptor): any => {
        const origFunction = descriptor.value;
        descriptor.value = function(...args) {
            let returnData = origFunction.apply(this, args);
            //do something with or without returnData
            (this as BaseService).broadcastEvent(eventData);
            return returnData;
        }
    }
}

export function injectService<T extends ContructorType>(target: T) {
    return (constructor: any, propertyName: string): any => {
        console.log(`Injecting ${chalk.greenBright(target.name)} into Service ${chalk.greenBright(constructor.toString())} Starting`);
        let service = DContainer.getService(target);
        if (service) {
            console.log(`Service ${chalk.greenBright(target.name)} has been registered in DContainer. Now, inject it into ${chalk.greenBright(constructor.toString())}`);
            proxyGetter(constructor, propertyName, service);
        } else {
            console.log(`Service ${chalk.red(target.name)} has not been registered in DContainer`);
        }
    }
}

const INJECTION = Symbol();
export function proxyGetter(
    proto: object,
    key: string,
    data: any
) {
    function getter(this: any) {
        if (!Reflect.hasMetadata(INJECTION, this, key)) {
            Reflect.defineMetadata(INJECTION, data, this, key);
        }
        return Reflect.getMetadata(INJECTION, this, key);
    }

    function setter(this: any, newVal: any) {
        Reflect.defineMetadata(INJECTION, newVal, this, key);
    }

    Object.defineProperty(proto, key, {
        configurable: true,
        enumerable: true,
        get: getter,
        set: setter,
    });
}