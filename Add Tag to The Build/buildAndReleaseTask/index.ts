import tl = require('azure-pipelines-task-lib/task');
import {PythonShell} from 'python-shell';

async function run() {
    try {
        const collectionuri: string | undefined = tl.getInput('collectionuri', true);
        if (collectionuri == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad "collectionuri" input was given');
            return;
        }
		const projectname: string | undefined = tl.getInput('projectname', true);
        if (projectname == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad "projectname" input was given');
            return;
        }
		const buildid: string | undefined = tl.getInput('buildid', true);
        if (buildid == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad "buildid" input was given');
            return;
        }
		const branchname: string | undefined = tl.getInput('branchname', true);
        if (branchname == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad "branchname" input was given');
            return;
        }
        console.log('Collection URI:', collectionuri);
		console.log('Project:', projectname);
		console.log('Build ID:', buildid);
		console.log('Branch:', branchname);


		const {PythonShell} = require('python-shell');
		
		let options = {
			mode: 'text',
			pythonPath: 'python',
			pythonOptions: [], 
			scriptPath: '.',
			args: ['-c', collectionuri, '-p', projectname, '-i', buildid, '-b', branchname]
		};
		PythonShell.run('tag-build.py', options, function(err: any, results: any) {
			if (err) console.log(err);
			// results is an array consisting of messages collected during execution
			console.log('results: %j', results);
		});
		
		
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();