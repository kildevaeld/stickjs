/* global describe:true,it:true,before:true, beforeEach:true */
const ModuleFactory = require('../lib/module.factory').ModuleFactory;
const Container = require('../lib/container').Container;
const sinon = require('sinon')
const utils = require('utilities');

class Module { }

describe('ModuleFactory', () => {
	var factory;
	beforeEach(() => {
		factory = new ModuleFactory("factory", Module, new Container());
	});

	it('should throw when instantiating with wrong argumnets', () => {

		(() => { new ModuleFactory(); }).should.throw();

	});

	it('should instantiate', () => {

		//let factory = new ModuleFactory("factory", Module, new Container());

		factory.should.be.instanceof(ModuleFactory);
		factory.name.should.equal('factory');
		factory.module.should.equal(Module);
		factory.container.should.be.instanceof(Container);

	});

	it('should create module', (done) => {


		let mod = factory.create();
		(utils.isPromise(mod) == true).should.equal(true);
		mod.then((m) => {
			m.should.be.instanceof(Module);
			done();
		}).catch(done);

	});

	describe('controllers', () => {

		it('should define controller with function', () => {

			let spy = sinon.spy();

			factory.controller('main', spy);

			factory.container.hasHandler('main').should.equal(true);

			let controller = factory.container.get('main')

			spy.calledOnce.should.equal(true);
			spy.calledOn(controller).should.equal(true);

			controller.should.be.an.Object();


		});

		it('should define controller with object initialize function', () => {

			let spy = sinon.spy();

			let controllerDef = {
				name: 'test-name',
				initialize: function () {
					spy();
				}
			};

			factory.controller('main', controllerDef);

			let controller = factory.container.get('main').create();

			controller.should.have.properties({name: 'test-name'});
			controller.should.not.have.property('initialize');
			controller.should.have.property('constructor', controllerDef.initialize);
			spy.calledOnce.should.equal(true);

		});

		it('should define controller with object constructor function', () => {

			let spy = sinon.spy();

			let controllerDef = {
				name: 'test-name',
				constructor: function () {
					spy();
				}
			};

			factory.controller('main', controllerDef);

			let controller = factory.container.get('main');

			controller.should.have.properties({name: 'test-name'});

			controller.should.have.property('constructor', controllerDef.constructor);
			spy.calledOnce.should.equal(true);

		});

		it('should not define controller if controller definition isnt a object or a function', () => {

			(() => { factory.controller('main') }).should.throw();
			(() => { factory.controller('main', 'snap') }).should.throw();

		});

	});

	describe('services', () => {

		it('should define service with function', () => {

			let spy = sinon.spy();

			factory.service('service', spy);

			factory.container.hasHandler('service').should.equal(true);

			let controller = factory.container.get('service')
			//console.log(factory.container)
			spy.calledOnce.should.equal(true);
			spy.calledOn(controller).should.equal(true);

			controller.should.be.an.Object();

			factory.container.__instances.size.should.equal(1);

			factory.container.__instances.get('service').should.equal(controller);

		});

		it('should not define service when definition is not a function', () => {

			(() => { factory.service('service') }).should.throw();
			(() => { factory.service('service',{}) }).should.throw();
			(() => { factory.service('service', 'service') }).should.throw();

		});

	});

});
