import { ContructorType } from "./type"
import * as chalk from "chalk";

const ServiceConstructed = Symbol();
class Container {
    private container: Map<ContructorType, InstanceType<ContructorType>>;
    constructor() {
        console.log(chalk.bold.green("D-CONTAINER IS STARTED"));
        this.container = new Map<ContructorType, InstanceType<ContructorType>>();
    }

    public registerService<T extends ContructorType>(construtor: T, object: InstanceType<T>): void {
        let constructed: boolean = Reflect.hasMetadata(ServiceConstructed, construtor);

        if (constructed) {
            console.log(`the ${construtor.name} service has been constructed`);
        } else {
            Reflect.defineMetadata(ServiceConstructed, true, construtor);
            this.container.set(construtor, object);
        }
    }

    public getService<T extends ContructorType>(construtor: T): InstanceType<T> {
        return this.container.get(construtor);
    }

    public getAllService(): any[] {
        return [...this.container.values()];
    }

    public isRegistered<T extends ContructorType>(constructor: T): boolean {
        return Reflect.hasOwnMetadata(ServiceConstructed, constructor);
    }
}

export default new Container();