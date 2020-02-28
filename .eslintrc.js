module.exports = {
    "env": {
        "browser": true,
        "es6": true
     },

     "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
     },
     "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
     },
     "rules": {
        "indent": ["error", 3],
        "semi": ["error", "always"],
        "curly": ["error", "all"],
        "brace-style": ["error", "1tbs"]
     }
};
