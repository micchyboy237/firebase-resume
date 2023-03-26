const { getLastCommit } = require("./checkLastCommit");
const { getArgsOptions, gitHelpers } = require("./utils");

const argOptions = getArgsOptions();

const commitPush = async () => {
  const lastCommit = await getLastCommit();

  if (argOptions.merge || argOptions.pmerge) {
    const currentBranch = lastCommit.branch;
    const branchToMerge = argOptions.merge || argOptions.pmerge;

    if (argOptions.pmerge) {
      await gitHelpers.push();
    }

    await gitHelpers.checkout(branchToMerge);
    await gitHelpers.merge(currentBranch);
    await gitHelpers.push();
    await gitHelpers.checkout(currentBranch);
  } else {
    const argsMsg = process.argv.slice(2).join(" ").trim();

    const message = argsMsg || lastCommit.subject;

    await gitHelpers.commit(message);
    await gitHelpers.push();
  }
};

commitPush();
