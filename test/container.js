'use strict';
/* global describe:true,it:true,before:true */
const Container =  require('../lib/container').Container;
const DIContainer = require('di').DIContainer;
const sinon = require('sinon');

require('should');
class Singleton {
	constructor () {
		this.name = Math.random()
	}
}

describe('container', () => {

	it('should inherint DIContainer', () => {
		let container = new Container();
		container.should.be.instanceof(DIContainer);
	});

	it('should store singletons', () => {
		let container = new Container();

		container.registerSingleton(Singleton, Singleton);

		let singleton = container.get(Singleton);
		singleton.should.be.instanceof(Singleton);
		(container.__instances.has(Singleton)).should.equal(true)
		container.__instances.get(Singleton).should.be.instanceof(Singleton)

	});

	it('should destroy singleton', () => {
		let container = new Container();
		container.registerSingleton(Singleton, Singleton);

		let singleton = container.get(Singleton);
		singleton.$destroy = sinon.spy();

		container.destroy(Singleton);

		(container.__instances.has(Singleton)).should.equal(false)
		singleton.$destroy.calledOnce.should.be.true;

	});

	it('should use destroy handler', () => {
		let container = new Container();
		container.registerSingleton(Singleton, Singleton);

		let singleton = container.get(Singleton);
		singleton.$destroy = sinon.spy();


		let spy = sinon.spy();

		container.destroy(Singleton, spy);
		container.destroy(Singleton);

		singleton.$destroy.calledOnce.should.equal(false);
		spy.calledOnce.should.equal(true);
		spy.calledWith(singleton);

	});

	it('should destroy all instances', () => {
		let container = new Container();
		container.registerSingleton(Singleton, Singleton);

		container.destroy();

		container.__instances.has(Singleton).should.equal(false)
		container.__instances.size.should.equal(0)

	})

});
