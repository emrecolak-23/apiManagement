const validate = (schema) => (req, res, next) => {

  let data = {}
  const url = req.route.path
  const {name, apiKey, description, time, limit, ipAdress} = req.body;
  const userId = req.header('userId')


  switch (url) {
    case "/add-to-allow/:slug":
        data = {ipAdress}
        req.type = 'allowList'
      break;
    case "/add-to-block/:slug":
        data = {ipAdress}
        req.type = 'blockList'
      break;
    case "/remove-to-allow/:slug":
        data = {ipAdress}
        req.type = 'allowList'
      break;
    case "/remove-to-block/:slug":
        data = {ipAdress}
        req.type = 'blockList'
      break;
    case "/":
        data = {name, userId, apiKey, description}
      break;
    case "/:slug":
        data = {name, apiKey, description, time, limit}
      break;
    default:
      break;
  }

  // if (userId) {
  //   // Post 
  //   data = {name, userId, apiKey, description}
  // } else {
  //   // Update
  //   data = {name, apiKey, description, time, limit}
  // }

  const {value, error} = schema.validate(data);
  if (error) {
    const errorMessage = error.details?.map(detail => detail.message).join(", ")
    res.status(400).json({
      error: errorMessage
    });
    return;
  }
  Object.assign(req, value);
  return next();
}

export default validate