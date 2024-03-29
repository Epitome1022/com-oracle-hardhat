const fs = require('fs');
const rsAPI = require('redstone-api');
const main = require('../data/main');

module.exports = {
    getToken: async(req, res)=>{
        try {
            const baseUrl = `${req.protocol}://${req.get('host')}`;
            const { token } = req.query;
            let tokenPrice = await rsAPI.getPrice(token);
            const tokenHistory = await rsAPI.getHistoricalPrice(token, {
                startDate: new Date('2024-03-25T00:00:00'),
                endDate: new Date(),
                interval: 24 * 3600 * 1000,
            });

            let path = '';
            if (fs.existsSync(`public/imgs/symbols/png/${tokenPrice.symbol}.png`)) {
                path = `png/${tokenPrice.symbol}.png`;
            } else if (fs.existsSync(`public/imgs/symbols/svg/${tokenPrice.symbol}.svg`)) {
                path = `svg/${tokenPrice.symbol}.svg`;
            } else if (fs.existsSync(`public/imgs/symbols/jpg/${tokenPrice.symbol}.jpeg`)) {
                path = `jpg/${tokenPrice.symbol}.jpeg`;
            } else if (fs.existsSync(`public/imgs/symbols/jpg/${tokenPrice.symbol}.jpg`)) {
                path = `jpg/${tokenPrice.symbol}.jpg`;
            }

            let uri = `${baseUrl}/imgs/symbols/${path}`;
            if (path == ''){
                uri = 'empty';
            }
            
            tokenPrice = {
                ...tokenPrice,
                logoURI: uri
            }
            res.status(200).send({tokenPrice, tokenHistory});
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getTokens: async(req, res)=> {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        try {
            const {offset, limit, search} = req.query;
            console.log(search)

            const tokenNames = main.filterTokens(parseInt(offset), parseInt(limit), search);
            const tokensObject = await rsAPI.getPrice(tokenNames);
            let result = Object.keys(tokensObject).map(token=>{
                let path = '';
                if (fs.existsSync(`public/imgs/symbols/png/${token}.png`)) {
                    path = `png/${token}.png`;
                } else if (fs.existsSync(`public/imgs/symbols/svg/${token}.svg`)) {
                    path = `svg/${token}.svg`;
                } else if (fs.existsSync(`public/imgs/symbols/jpg/${token}.jpeg`)) {
                    path = `jpg/${token}.jpeg`;
                } else if (fs.existsSync(`public/imgs/symbols/jpg/${token}.jpg`)) {
                    path = `jpg/${token}.jpg`;
                }

                let uri = `${baseUrl}/imgs/symbols/${path}`;
                if (path == ''){
                    uri = 'empty';
                }
                
                return {
                    ...tokensObject[token],
                    logoURI: uri
                }
            })

            res.status(200).send(result);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}