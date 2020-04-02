require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');
const Readable = require('stream').Readable;

const BOT_TOKEN = process.env.BOT_TOKEN;

