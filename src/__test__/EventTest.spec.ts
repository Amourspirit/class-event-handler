import * as mockConsole from "jest-mock-console";
import { EventHandler } from "../index";

// mockConsole has an import bug. this is a workaround that get it working
// without breaking ide. 
// bug: https://github.com/bpedersen/jest-mock-console/issues/14
const mConsole: any = mockConsole.default;

class TestClassEvents extends EventHandler {
  constructor() {
    super();
    this.once('sayHello', this.onStartToTalk);
    this.on('sayHello', this.onSayHello);
    this.on('sayGoodbye', this.onSayGoodbye);
  }

  onStartToTalk() {
    // tslint:disable-next-line: no-console
    console.log('I start to talk... ');
  }

  onSayHello(name = 'Nobody') {
    // tslint:disable-next-line: no-console
    console.log('Hello ' + name);
  }

  onSayGoodbye(...args:any[]) {
    // tslint:disable-next-line: no-console
    console.log('Goodbye', ...args);
  }

  sayHello(...args:any[]) {
    this.trigger('sayHello', ...args);
  }
  sayGoodbye(...args: any[]) {
    this.trigger('sayGoodbye', ...args);
  }
}

describe("Test Events Class", () => {
  it("should trigger and Write Hello Tony to console", (done) => {
    expect.assertions(2);
    const restoreConsole = mConsole("log");
    const testClassEvents = new TestClassEvents();
    testClassEvents.trigger('sayHello', 'Tony');
    // tslint:disable-next-line: no-console
    expect(console.log).toHaveBeenCalledWith("Hello Tony");
    // tslint:disable-next-line: no-console
    expect(console.log).not.toThrow();
    // expect(console.log).toThrowError('Log called');
    restoreConsole();
    done();
  });

  it("should trigger and Write Hello Tim to console", (done) => {
    expect.assertions(2);
    const restoreConsole = mConsole("log");
    const testClassEvents = new TestClassEvents();
    testClassEvents.trigger('sayHello', 'Tim');
    // tslint:disable-next-line: no-console
    expect(console.log).toHaveBeenCalledWith("Hello Tim");
    // tslint:disable-next-line: no-console
    expect(console.log).not.toThrow();
    // expect(console.log).toThrowError('Log called');
    restoreConsole();
    done();
  });

  it("should trigger OnReady to fire custom callback", (done) => {
    expect.assertions(2);
    const restoreConsole = mConsole("log");
    const testClassEvents = new TestClassEvents();
    testClassEvents.trigger('sayHello', 'Tim');
    // tslint:disable-next-line: no-console
    testClassEvents.onReady('sayHello', (e:string) => console.log('I already said hello to ' + e));
    // tslint:disable-next-line: no-console
    expect(console.log).toHaveBeenCalledWith("I already said hello to Tim");
    // tslint:disable-next-line: no-console
    expect(console.log).not.toThrow();
    // expect(console.log).toThrowError('Log called');
    restoreConsole();
    done();
  });

  it("should trigger and then remove sayHello", (done) => {
    expect.assertions(2);
    const restoreConsole = mConsole("log");
    const testClassEvents = new TestClassEvents();
    testClassEvents.trigger('sayHello', 'Angie');
    testClassEvents.off('sayHello');
    testClassEvents.trigger('sayHello', 'Peter');
    // tslint:disable-next-line: no-console
    expect(console.log).toHaveBeenCalledWith("Hello Angie");
    // tslint:disable-next-line: no-console
    expect(console.log).not.toThrow();
    // expect(console.log).toThrowError('Log called');
    restoreConsole();
    done();
  });

  it("should create custom trigger and raise it", (done) => {
    expect.assertions(2);
    const restoreConsole = mConsole("log");
    const testClassEvents = new TestClassEvents();
    const sayHi = (msg:string) => {
      // tslint:disable-next-line: no-console
      console.log("Hi " + msg);
    };
    testClassEvents.on('sayHi', sayHi);

    testClassEvents.trigger('sayHi', 'Angie');
    // tslint:disable-next-line: no-console
    expect(console.log).toHaveBeenCalledWith("Hi Angie");
    // tslint:disable-next-line: no-console
    expect(console.log).not.toThrow();
    // expect(console.log).toThrowError('Log called');
    restoreConsole();
    done();
  });

  it("should call sayHello that triggers onSayHello", (done) => {
    expect.assertions(2);
    const restoreConsole = mConsole("log");
    const testClassEvents = new TestClassEvents();
    testClassEvents.sayHello();
    // tslint:disable-next-line: no-console
    expect(console.log).toHaveBeenCalledWith("Hello Nobody");
    // tslint:disable-next-line: no-console
    expect(console.log).not.toThrow();
    // expect(console.log).toThrowError('Log called');
    restoreConsole();
    done();
  });

  it("should call sayGoodbye that triggers sayGoodbye with parameters", (done) => {
    expect.assertions(2);
    const restoreConsole = mConsole("log");
    const testClassEvents = new TestClassEvents();
    testClassEvents.sayGoodbye(", anybody", 'there?');
    // tslint:disable-next-line: no-console
    expect(console.log).toHaveBeenCalledWith("Goodbye", ", anybody", 'there?');
    // tslint:disable-next-line: no-console
    expect(console.log).not.toThrow();
    // expect(console.log).toThrowError('Log called');
    restoreConsole();
    done();
  });

  it("should test that numeric parameters are sent to callback", (done) => {
    expect.assertions(2);
    const events = new EventHandler();
    let first = 0;
    let second = 0;
    const onTest = (f: number, s: number) => {
      first = f;
      second = s;
    }
    events.on('test', onTest);
    events.trigger('test', 3, 7);
    expect(first).toEqual(3);
    expect(second).toEqual(7);
    done();
  });

  it("should test even on and triggered followed by onReady that repeats call with last parameters", (done) => {
    expect.assertions(2);
    const events = new EventHandler();
    let first = 0;
    let second = 0;
    const onTest = (f: number, s: number) => {
      first = f;
      second = s;
    }
    events.on('test', onTest);
    events.trigger('test', 3, 7);
    first = 0;
    second = 0;
    events.onReady('test', onTest);
    expect(first).toEqual(3);
    expect(second).toEqual(7);
    done();
  });

  it("should test that object parameters are sent to callback", (done) => {
    expect.assertions(4);
    const events = new EventHandler();
    let first:any = null;
    let second:any = null;
    const onTest = (f: object, s: object) => {
      first = f;
      second = s;
    }
    events.on('test', onTest);
    events.trigger('test', {name: 'first'}, {name:'second'});
    expect(first).toHaveProperty('name');
    expect(second).toHaveProperty('name');
    expect(first.name).toBe('first');
    expect(second.name).toBe('second');
    done();
  });

  it("should test that primitive and object parameters are sent to callback", (done) => {
    expect.assertions(6);
    const events = new EventHandler();
    let first: any = null;
    let second: any = null;
    let third: any = null;
    let foruth: any = null;
    const onTest = (p1: object, p2: string, p3:object, p4:number) => {
      first = p1;
      second = p2;
      third = p3;
      foruth = p4;
    }
    events.on('test', onTest);
    events.trigger('test', { name: 'first' },'mytest', { place: 'third' }, -999);
    expect(first).toHaveProperty('name');
    expect(third).toHaveProperty('place');
    expect(first.name).toBe('first');
    expect(third.place).toBe('third');
    expect(second).toBe('mytest');
    expect(foruth).toEqual(-999);
    done();
  });

  it("should test all callbacks are removed with removeAllEventListeners", (done) => {
    expect.assertions(15);
    const events = new EventHandler();
    let firedOne = false;
    let firedTwo = false;
    let firedThree = false;
    let firedFour = false;
    let firedFive = false;
    const onTestOne = (p: boolean) => {
      firedOne = p;
    };
    const onTestTwo = (p: boolean) => {
      firedTwo = p;
    };
    const onTestThree = (p: boolean) => {
      firedThree = p;
    };
    const onTestFour = (p: boolean) => {
      firedFour = p;
    };
    events.on('test', onTestOne);
    events.on('test', onTestTwo);
    events.on('test', onTestThree);
    events.on('test', onTestFour);
    events.on('test', (p: boolean) => {
      firedFive = p;
    });
    events.trigger('test', true);

    expect(firedOne).toBeTruthy();
    expect(firedTwo).toBeTruthy();
    expect(firedThree).toBeTruthy();
    expect(firedFour).toBeTruthy();
    expect(firedFive).toBeTruthy();
    events.trigger('test', false);
    expect(firedOne).toBeFalsy();
    expect(firedTwo).toBeFalsy();
    expect(firedThree).toBeFalsy();
    expect(firedFour).toBeFalsy();
    expect(firedFive).toBeFalsy();
    
    events.removeAllEventListeners('test');
    events.trigger('test', true);

    expect(firedOne).toBeFalsy();
    expect(firedTwo).toBeFalsy();
    expect(firedThree).toBeFalsy();
    expect(firedFour).toBeFalsy();
    expect(firedFive).toBeFalsy();
    done();
  });

});