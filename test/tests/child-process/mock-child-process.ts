import {MockChildProcess} from '../../../src';
import {expect} from 'chai';


describe('#ChildProcess/MockChildProcess', () => {

	describe('run()', () => {

		it('should run command', async () => {
			const runner = new MockChildProcess(__dirname, 'pwd');

			runner.returnCode = 1;
			runner.stdout = ['hello world\n'];
			runner.stderr = ['hello hell\n'];

			runner.onStart.subscribe((command) => {
				expect(command).to.be.equal('pwd');
			});

			runner.onFinish.subscribe((returnCode) => {
				expect(returnCode).to.be.equal(1);
			});

			const stdout = [];
			const stderr = [];

			runner.onStdout.subscribe((chunk) => {
				stdout.push(chunk);
			});

			runner.onStderr.subscribe((chunk) => {
				stderr.push(chunk);
			});

			const returnCode = await runner.run();

			expect(returnCode).to.be.equal(1);
			expect(stdout.join('')).to.be.equal('hello world\n');
			expect(stderr.join('')).to.be.equal('hello hell\n');
		});

	});

});
