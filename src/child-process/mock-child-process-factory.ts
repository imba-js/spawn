import {ChildProcessFactory} from './child-process-factory';
import {MockChildProcess} from './mock-child-process';
import {EnvList} from '../interfaces';


export class MockChildProcessFactory implements ChildProcessFactory
{


	public commands: {[cmd: string]: (runner: MockChildProcess) => void} = {};


	public create(root: string, command: string, environment: EnvList = {}): MockChildProcess
	{
		const runner = new MockChildProcess(root, command, environment);

		if (typeof this.commands[command] !== 'undefined') {
			this.commands[command](runner);
		}

		return runner;
	}

}
