const getInfoLog = (req) => {
  return `INFO: ${req.method} ${req.url}`;
};

const getErrorLog = (error) => {
  return `ERROR: ${error.message}`;
};

const getProcessLog = (processName) => {
  return `PROCESS: ${processName} completed`;
};

module.exports = {
  getInfoLog,
  getErrorLog,
  getProcessLog,
};