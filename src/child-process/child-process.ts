import {EventEmitter} from '@imba/event-emitter';
import {EnvList} from '../interfaces';


export abstract class ChildProcess
{


	public onStart: EventEmitter<string> = new EventEmitter<string>();

	public onStdout: EventEmitter<string> = new EventEmitter<string>();

	public onStderr: EventEmitter<string> = new EventEmitter<string>();

	public onFinish: EventEmitter<number> = new EventEmitter<number>();

	protected root: string;

	protected command: string;

	protected environment: EnvList;

	private killed: boolean = false;


	constructor(root: string, command: string, environment: EnvList = {})
	{
		this.root = root;
		this.command = command;
		this.environment = environment;
	}


	public abstract run(): Promise<number>;


	public kill(signal?: string): void
	{
		this.killed = true;
	}


	public isKilled(): boolean
	{
		return this.killed;
	}

}
