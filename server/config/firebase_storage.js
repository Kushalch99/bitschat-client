const { Storage } = require('@google-cloud/storage')

const storage = new Storage({
  projectId: "bitschat-29b15",
  keyFilename: "./serviceKey.json"
})

const bucket = storage.bucket('gs://bitschat-29b15.appspot.com');

module.exports =  { bucket }
