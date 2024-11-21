const { exec } = require('child_process');
const path = require('path');

const buildPath = path.join(__dirname, 'build');

exec('npm run build', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error during build: ${stderr}`);
    process.exit(1);
  }

  exec(`npx gh-pages -d ${buildPath}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error during deploy: ${stderr}`);
      process.exit(1);
    }

    console.log('Deployment successful!');
  });
});