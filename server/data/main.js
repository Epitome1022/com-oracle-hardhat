const mainTokensObject = require('./main.json');

module.exports = {
    filterTokens: (offset, limit, search)=>{
        let tokenNames = Object.keys(mainTokensObject.tokens);
        if (search != '' || search != undefined || search != null) {
            tokenNames = tokenNames.filter(token=> {
                return token.indexOf(search) != -1
            }, search);
        }
        let startIdx = offset, endIdx = startIdx + limit;
        tokenNames = [...tokenNames.slice(startIdx, endIdx)].map(name=>name);
        return tokenNames
    }
}

const offset = 48, limit = 24;
let tokenNames = Object.keys(mainTokensObject.tokens);
let startIdx = offset, endIdx = startIdx + limit;
tokenNames = [...tokenNames.slice(startIdx, endIdx)].map(name=>name);