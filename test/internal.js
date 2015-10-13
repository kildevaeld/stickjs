/* global describe:true,it:true,before:true */
const ModuleFactory = require('../lib/module.factory').ModuleFactory;
const Container = require('../lib/container').Container;
const sinon = require('sinon')
const internal = require('../lib/internal')

class Dependency {}


describe('Internal', () => {
	
	
	
	describe('getDependencies', () => {
		
		function testDeps (fn ,deps) {
			
			deps.should.be.an.Array();
			deps.length.should.equal(deps.length);
			deps.should.eql(deps);
			fn.should.have.property('inject', deps);
		}
		
		
		it('should get dependencies by function parameters', () => {
			const fn = function (dep1, dep2) { };
			
			let [f, deps] = internal.getDependencies(fn);
			
			f.should.equal(fn);
			/*deps.should.be.an.Array();
			deps.length.should.equal(2);
			deps.should.eql(['dep1', 'dep2']);
			f.should.have.property('inject', ['dep1','dep2']);*/
			testDeps(fn, ['dep1', 'dep2']);
		});
		
		it('should get dependencies by inject property', () => {
			const fn = function (d, d2, dep) {};
			fn.inject = ['dep1', 'dep2', Dependency];
			
			let [f, deps] = internal.getDependencies(fn);
			
			f.should.equal(fn);
			
			testDeps(fn, ['dep1', 'dep2', Dependency]);
			
		});
		
		it('should get depdencies from array', () => {
			
			const fn = function () {};
			
			let [f, deps] = internal.getDependencies(['dep1', 'dep2', fn]);
			
			f.should.equal(fn);
			
			testDeps(fn, ['dep1', 'dep2']);
			
		});
		
	});
	
});
