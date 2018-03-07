import {ChildProcess} from './child-process';


async function sleep(timeout: number): Promise<any>
{
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, timeout);
	});
}


export class MockChildProcess extends ChildProcess
{


	public returnCode: number = 0;

	public stdout: Array<string> = [];

	public stderr: Array<string> = [];

	public timeout: number;


	public async run(): Promise<number>
	{
		this.onStart.emit(this.command);

		for (let i = 0; i < this.stdout.length; i++) {
			this.onStdout.emit(this.stdout[i]);
		}

		for (let i = 0; i < this.stderr.length; i++) {
			this.onStderr.emit(this.stderr[i]);
		}

		if (typeof this.timeout !== 'undefined') {
			await sleep(this.timeout);
		}

		this.onFinish.emit(this.returnCode);

		return this.returnCode;
	}

}
