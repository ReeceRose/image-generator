const { spawn } = require('child_process');

const child = spawn('pnpm', ['tauri', 'build']);
child.stdout.on('data', (data) => console.log(data.toString()));
child.stderr.on('data', (data) => console.error(data.toString()));
child.on('exit', (code) => {
	if (code !== 0) console.log(`Child exited with code ${code}`);
});