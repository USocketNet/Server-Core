//Require our custom Express.
const express = require('usn-libs').express;
const instance = express.init();

//Serve the Demoguy site.
instance.serve_public(80);