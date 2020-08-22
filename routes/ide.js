const express = require("express");
const router = express.Router();

router.post("",
    (req, res, next) => {
        res.status(201).json({
            message: "POST request",
            data: {
                "request": {
                    "code": req.body.code
                },
                "responses": [
                {
                    "textAnnotations": [
                    {
                        "locale": "en",
                        "description": "DEMO?\nTEXT\nIS\nHERE\n",
                    }
                    ]
                }
                ]
            }          
      });
    }
);


router.get("", (req, res, next) => {
    res.status(200).json({
        message: "Get successful"
    });
});
  

module.exports = router;