exports.redirectToRoot = (error, response) => {
  if (error) {
    console.log("error");
    console.log(error);
    response.redirect("/");
  }
};
