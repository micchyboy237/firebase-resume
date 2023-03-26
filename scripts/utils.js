const { execSync } = require("child_process");
const { getLastCommit } = require("./checkLastCommit");

const getArgsOptions = () => {
  const args = process.argv.slice(2);
  const commands = args.filter((arg) => arg.startsWith("-"));

  const argOptions = commands.reduce((acc, command) => {
    const accObj = { ...acc };
    const commandIndex = args.findIndex((c) => c === command);
    const commandValueIndex = commandIndex + 1;
    const defaultBranch = "main";
    let isBooleanCommand,
      commandKey,
      commandValue = args[commandValueIndex];

    switch (command) {
      case "-merge": {
        commandKey = "merge";
        commandValue = commandValue || defaultBranch;

        break;
      }
      case "-pmerge": {
        commandKey = "pushAndMerge";
        commandValue = commandValue || defaultBranch;

        break;
      }
      default: {
        commandKey = "";
        isBooleanCommand = false;
      }
    }

    if (commandKey) {
      if (!isBooleanCommand) {
        accObj[commandKey] = commandValue;
      } else {
        accObj[commandKey] = true;
      }
    }

    return accObj;
  }, {});

  return argOptions;
};

const GitHelpers = function () {
  return {
    checkout: function (branch) {
      execSync(`git checkout ${branch}`);

      return this;
    },
    commit: function (message) {
      execSync(`git commit -m "${message}"`);

      return this;
    },
    merge: function (branch) {
      execSync(`git merge ${branch}`);

      return this;
    },
    push: async function () {
      const lastCommit = await getLastCommit();

      execSync(`git push -u origin ${lastCommit.branch} && git status`);

      return this;
    },
  };
};

module.exports = {
  getArgsOptions,
  gitHelpers: new GitHelpers(),
};
