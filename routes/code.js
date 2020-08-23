require('dotenv').config();
const express = require("express");
const axios = require("axios");
const FormData = require("form-data");
const { response } = require("express");
const router = express.Router();

const runUrl = "https://api.hackerearth.com/v3/code/run/";
const compileUrl = "https://api.hackerearth.com/v3/code/compile/";

router.post('/compile', async (req, res, next) => {
    if(!req.body) {
        res.status(400).json({
            message: 'Upload Unsuccessful'
        });
    }
    else {
        var compile_response;
        const form = new FormData();
        form.append('client_secret', process.env.CLIENT_SECRET);
        form.append('async', 0);
        form.append('source', req.body.data.code);
        form.append('lang', req.body.data.language);
        form.append('time_limit', 5);
        form.append('memory_limit', 262144);
        await axios.post(compileUrl, form, { headers: form.getHeaders() })
        .then(response => compile_response = response)
        .catch(err => console.log(err.message));

        res.json({
            compile_status: compile_response.data.compile_status,
            message: 'Code compiled successfully'
        });
    }
});

router.post('/run', async (req, res, next) => {
    if(!req.body) {
        res.status(400).json({
            message: 'Upload Unsuccessful'
        });
    }
    else {
        var run_response;
        const form = new FormData();
        form.append('client_secret', process.env.CLIENT_SECRET);
        form.append('async', 0);
        form.append('source', req.body.data.code);
        form.append('input', req.body.data.input || "");
        form.append('lang', req.body.data.language);
        form.append('time_limit', 5);
        form.append('memory_limit', 262144);
        await axios.post(runUrl, form, { headers: form.getHeaders() })
        .then(response => run_response = response)
        .catch(err => console.log(err.message));

        res.json({
            compile_status: run_response.data.compile_status,
            output: run_response.data.run_status.output,
            output_html: run_response.data.run_status.output_html,
            message: 'Code ran successfully'
        });
    }
});

router.post('', async (req, res, next) => {
    if(!req.body) {
        res.status(400).json({
            message: 'Upload Unsuccessful'
        });
    }
    else {
        res.json({
            compile_status: req.body.data.code,
            code: req.body.data.code,
            input: req.body.data.input || "",
            message: req.body.data.language,
        });
    }
});

module.exports = router;