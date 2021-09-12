import { Command, Option } from 'commander';
import {
  nextJsGenerator,
  reactGenerator,
  reactNativeGenerator,
} from './generators';
import inquirer from 'inquirer';
import colors from 'colors';

export enum TemplateOptions {
  'react' = 'react',
  'react-native' = 'react-native',
  'next' = 'next',
}

export interface TOptions {
  appName: string;
  template?: keyof typeof TemplateOptions;
  useTypescript: boolean;
  useNpm: boolean;
}

const switcher = (options: TOptions) => {
  switch (options.template) {
    case 'react': {
      reactGenerator(options);
      break;
    }
    case 'react-native': {
      reactNativeGenerator(options);
      break;
    }
    case 'next': {
      nextJsGenerator(options);
      break;
    }
    default:
      break;
  }
};

const main = async () => {
  const options: TOptions = {
    useTypescript: false,
    useNpm: false,
    appName: '',
    template: undefined,
  };

  const program = new Command();
  program.version('0.0.1');
  program
    .addOption(new Option('-n --name <appName>', 'app name (use quotes)'))
    .addOption(
      new Option('-t, --template <template>', 'choose which template').choices(
        Object.keys(TemplateOptions)
      )
    )
    .addOption(new Option('-ts, --typescript', 'use typescript'))
    .addOption(new Option('-npm, --npm', 'use npm to install dependencies'));

  program.parse(process.argv);

  const flags = program.opts();

  // HANDLE NAME FLAG
  if (!flags.name) {
    const { appName } = await inquirer.prompt({
      name: 'appName',
      message: 'What is you app name? ',
      default: 'my-twpx-app',
    });

    options.appName = appName;
  } else {
    const _appName = flags.name;
    console.log(colors.gray('→ set app name to'), colors.green(_appName));
    options.appName = _appName;
  }

  // HANDLE TEMPLATE FLAG
  if (!flags.template) {
    const { template } = await inquirer.prompt({
      name: 'template',
      message: 'Which template do you want? ',
      type: 'list',
      default: Object.keys(TemplateOptions)[0],
      choices: Object.keys(TemplateOptions),
    });

    options.template = template;
  } else {
    const _template = flags.template;
    console.log(colors.gray('→ using template'), colors.green(_template));
    options.template = _template;
  }

  // HANDLE TYPESCRIPT FLAG
  if (!flags.typescript) {
    const { useTs } = await inquirer.prompt({
      name: 'useTs',
      message: 'Do you want to use TypeScript? ',
      type: 'confirm',
      default: false,
    });

    options.useTypescript = useTs;
  } else {
    console.log(colors.gray('→ using typescript'));
    options.useTypescript = true;
  }

  // HANDLE NPM FLAG
  if (!flags.npm) {
    const { useNpm } = await inquirer.prompt({
      name: 'useNpm',
      message: 'Use npm to install dependencies? ',
      type: 'confirm',
      default: false,
    });

    options.useNpm = useNpm;
  } else {
    console.log(colors.gray('→ using npm'));
    options.useNpm = true;
  }

  switcher(options);
};

main().catch(console.log);
