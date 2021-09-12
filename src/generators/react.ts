import { execSync } from 'child_process';
import { TOptions } from '../feature_main';
import { cdToApp, createAppDir, displayLoading } from '../utils';

const reactGenerator = async (options: TOptions) => {
  console.log('REACT:', options);

  createAppDir(options.appName);

  let VITE_TEMPLATE = 'react';
  if (options.useTypescript) VITE_TEMPLATE = 'react-ts';
  if (options.useNpm) {
    try {
      execSync(
        `npm init vite@latest ${options.appName} -- --template ${VITE_TEMPLATE}`
      );
      cdToApp(options.appName);
      execSync('npm install');
    } catch (err) {
      console.log(err);
    }
  }
};

export default reactGenerator;
