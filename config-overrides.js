const { override, useBabelRc } = require("customize-cra");

// khi chayj project 
//cấu hình thư viện webpack
module.exports = override(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBabelRc()
);