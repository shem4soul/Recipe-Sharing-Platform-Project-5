const express = require("express")
const { sendCertificate } = require("../controllers/Certificate")
const { validateToken } = require("../middleware/validateAuth")
const { validateCertificate } = require("../middleware/validation")

const router = express.Router()

router.post("/certificate",
  validateToken,
  validateCertificate,
  sendCertificate
)

module.exports = router