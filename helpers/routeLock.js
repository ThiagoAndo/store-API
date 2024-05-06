let lock = false;

const allowAccess = () => {
  lock = true;

  setTimeout(() => {
    lock = false;
  }, 7200000);
};

exports.lock = lock;
exports.allowAccess = allowAccess;
