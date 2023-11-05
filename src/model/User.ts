export class User {
    private name: string;
    private age: number;

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }

    public sayMyThings(): String {
        return `My name is ${this.name} and my age is ${this.age}`
    }
}