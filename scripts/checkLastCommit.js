var git = require("git-last-commit");

const getLastCommit = async () => {
  return new Promise((resolve, reject) => {
    git.getLastCommit(function (err, commit) {
      if (err) {
        return reject(err);
      }
      // read commit object properties
      resolve(commit);
    });
  });
};

const getLastCommitMessage = async () => {
  const commit = await getLastCommit();

  return commit.subject;
};

// // Sample usage
// (async () => {
//   const commit = await getLastCommit();

//   console.info('COMMIT!', commit);
// })();

module.exports = { getLastCommit, getLastCommitMessage };
