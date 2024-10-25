module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    browsers: ['ChromeHeadlessCI'],  // Use ChromeHeadless in CI environment
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--headless', '--remote-debugging-port=9222'],
      },
    },
    singleRun: true, // Ensures that tests run once and then exit
    // Other configurations...
  });
};
