import fs from 'fs';
import colors from 'colors';
import path from 'path';

const cwd = process.cwd();

export const cdToApp = (appName: string) => {
  process.chdir(path.join(cwd, appName));
};

export const createAppDir = (appName: string) => {
  try {
    fs.mkdirSync(path.join(cwd, appName));
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(colors.red(`\n→ The folder ${appName} already exists.`));
      console.log(
        colors.red('→ Please use a different name for your project.')
      );
    } else console.log(err);
    process.exit(1);
  }
};

export const displayLoading = (message: string) => {
  const P = ['\\', '|', '/', '-'];
  let x = 0;
  return setInterval(function () {
    process.stdout.write('\r' + P[x++] + ` ${message}`);
    x &= 3;
  }, 250);
};
