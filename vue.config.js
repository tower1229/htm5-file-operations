module.exports = {
    outputDir: 'docs',
    baseUrl: process.env.NODE_ENV === 'production'
      ? '/htm5-file-operations/'
      : '/'
  }