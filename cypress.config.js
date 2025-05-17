const { defineConfig } = require("cypress");
module.exports = defineConfig({
  defaultCommandTimeout: 15000,  // 15 detik
  pageLoadTimeout: 30000,        // 30 detik
});

const fs = require('fs');
const path = require('path');

module.exports = (on, config) => {
  on('before:run', () => {
    const screenshotPath = 'cypress/screenshots/';
    if (fs.existsSync(screenshotPath)) {
      fs.readdirSync(screenshotPath).forEach(file => {
        const filePath = path.join(screenshotPath, file);
        fs.unlinkSync(filePath);
      });
    }
  });
};


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
