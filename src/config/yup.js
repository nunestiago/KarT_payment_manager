const yup = require('yup');
const { setLocale } = require('yup');
const { pt } = require('yup-locales');
require('yup-phone');
setLocale(pt);

module.exports = yup;
