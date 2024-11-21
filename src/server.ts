import app from './app';

const port = 5000;

const activateServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on Port: ${port} `);
    });
  } catch (error) {
    console.log(error);
  }
};

// Call the function to start the server
activateServer();
