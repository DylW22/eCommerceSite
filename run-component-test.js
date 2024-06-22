//const { exec } = require("child_process");
import { exec } from "child_process";
const componentName = process.argv[2];

if (!componentName) {
  console.error("Please provide a component name.");
  process.exit(1);
}

//const command = `jest --testPathPattern="src/pages/tests/${componentName}"`;
const command = `cls && jest --coverage --colors --testPathPattern="tests/${componentName}"`;
const child = exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});

child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);
