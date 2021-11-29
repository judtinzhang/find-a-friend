const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next(err)
  }
  // this error is catched in frontend
  if (String(err) !== 'Error: Not logged in.') {
    res.status(500).send(String(err))
  } else {
    res.status(200).send()
  }
}

module.exports = { errorHandler }
