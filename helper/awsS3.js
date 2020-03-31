module.exports = {
    steps: {
      import: {
        robot: '/s3/import',
        bucket: 'wonder4photos',
        key: 'YOUR_S3_KEY',
        secret: 'YOUR_S3_SECRET',
      },
      viruscheck: {
        use: 'filter',
        robot: '/file/virusscan',
        error_on_decline: true,
      },
    },
  };