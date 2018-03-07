import {MockChildProcess, MockChildProcessFactory} from '../../../src';
import {expect} from 'chai';


let factory: MockChildProcessFactory;


describe('#ChildProcess/MockChildProcessFactory', () => {

	beforeEach(() => {
		factory = new MockChildProcessFactory;
	});

	describe('create()', () => {

		it('should create new mock child process', () => {
			expect(factory.create('', '')).to.be.an.instanceOf(MockChildProcess);
		});

		it('should create new mock child process for specific command', () => {
			let called = 0;

			factory.commands['pwd'] = (spawner) => {
				expect(spawner).to.be.an.instanceOf(MockChildProcess);
				called++;
			};

			factory.create('', '');
			factory.create('', 'pwd');
			factory.create('', '');

			expect(called).to.be.equal(1);
		});

	});

});
