import {ChildProcess} from './child-process';
import {EnvList} from '../interfaces';


export interface ChildProcessFactory
{


	create(root: string, command: string, environment: EnvList): ChildProcess;

}
