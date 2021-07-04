import dotenv from 'dotenv'
dotenv.config()

import dbConnection from './src/config/database';
new dbConnection()

const PORT = process.env.PORT || 5000;
import server from './src/config/server';
server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});

//import uploads from './uploads'

//uploads.integrateCategories()
//uploads.integrateArticles()