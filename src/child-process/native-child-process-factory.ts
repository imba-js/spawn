import {ChildProcessFactory} from './child-process-factory';
import {NativeChildProcess} from './native-child-process';
import {EnvList} from '../interfaces';


export class NativeChildProcessFactory implements ChildProcessFactory
{


	public create(root: string, command: string, environment: EnvList = {}): NativeChildProcess
	{
		return new NativeChildProcess(root, command, environment);
	}

}
