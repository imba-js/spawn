import {NativeChildProcess, NativeChildProcessFactory} from '../../../src';
import {expect} from 'chai';


let factory: NativeChildProcessFactory;


describe('#ChildProcess/NativeChildProcessFactory', () => {

	beforeEach(() => {
		factory = new NativeChildProcessFactory;
	});

	describe('create()', () => {

		it('should create new native child process', () => {
			expect(factory.create('', '')).to.be.an.instanceOf(NativeChildProcess);
		});

	});

});
