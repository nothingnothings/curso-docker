const connectToDatabase = () => {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);

    return dummyPromise;
  });
};

export default connectToDatabase;