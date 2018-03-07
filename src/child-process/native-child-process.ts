import {spawn, ChildProcess as NodeChildProcess} from 'child_process';
import {ChildProcess} from './child-process';


export class NativeChildProcess extends ChildProcess
{


	private currentChild: NodeChildProcess;


	public async run(): Promise<number>
	{
		this.onStart.emit(this.command);

		if (this.currentChild) {
			this.onStderr.emit(`Command ${this.command} is already running.`);
			this.onFinish.emit(1);

			return 1;
		}

		return new Promise<number>((resolve) => {
			const child = this.currentChild = spawn(this.command, [], {
				shell: true,
				cwd: this.root,
				env: this.environment,
			});

			child.stdout.on('data', (chunk: string) => {
				this.onStdout.emit(chunk);
			});

			child.stderr.on('data', (chunk: string) => {
				this.onStderr.emit(chunk);
			});

			child.on('close', (returnCode) => {
				this.onFinish.emit(returnCode);
				this.currentChild = undefined;
				resolve(returnCode);
			});
		});
	}


	public kill(signal?: string): void
	{
		super.kill(signal);

		if (this.currentChild) {
			this.currentChild.kill(signal);
		}
	}

}
