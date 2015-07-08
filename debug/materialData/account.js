/**
 * 账户的模拟物料数据
 */
define(function (require, exports, module) {
    exports.data = {
        '7': {
            userstat: function() {
                return [1, 2, 3, 4, 6, 7, 11][Math.floor(Math.random() * 7)];
            },
            balance: -437.11235,
            daysconsumable: -1,
            todaypaysum: 61.01234,

            wregion: '1,2,3,4',
            weekbudget: 8888.88,
            wbudget: 777.77,
            // wbudget : '987.65',
            bgttype: 1,
            activetimeout: ['0', '24', '72'][Math.floor(Math.random() * 3)],
            offlinestat: {
                '2011-01-06': [
                    ['9', '12'],
                    ['16', '23']
                ],
                '2011-01-07': [
                    ['9', '12'],
                    ['16', '23']
                ],
                '2011-01-08': [
                    ['9', '12'],
                    ['16', '23']
                ],
                '2011-01-09': [
                    ['9', '12'],
                    ['16', '23']
                ],
                '2011-01-10': [
                    ['9', '12'],
                    ['16', '23']
                ],
                '2011-01-11': [
                    ['9', '12'],
                    ['16', '23']
                ],
                '2011-01-12': [
                    ['9', '12'],
                    ['16', '23']
                ]
            },
            reonlinereason: {
                '2011-01-06': [
                    ['07:24', '21:00', 3],
                    ['21:40', '23:09', 2]
                ],
                '2011-01-07': [
                    ['07:24', '11:00', 3],
                    ['21:00', '22:00', 3]
                ],
                '2011-01-08': [
                    ['02:00', '07:23', 3],
                    ['21:01', '23:59', 1]
                ],
                '2011-01-09': [
                    ['00:10', '09:23', 2],
                    ['12:24', '21:00', 3],
                    ['22:01', '23:01', 2]
                ],
                '2011-01-10': [
                    ['00:10', '09:23', 2],
                    ['12:24', '21:00', 3],
                    ['22:01', '23:01', 2]
                ],
                '2011-01-11': [
                    ['00:10', '07:23', 2],
                    ['08:24', '11:00', 3],
                    ['12:01', '20:00', 2],
                    ['21:00', '22:00', 3]
                ],
                '2011-01-12': [
                    ['00:10', '09:23', 2],
                    ['12:24', '21:00', 3],
                    ['22:01', '23:01', 2]
                ]
            },
            clks: 100,
            shows: 200,
            paysum: 300.123123,
            trans: 0.12345,
            clkrate: 0.41235,
            avgprice: 0.62340,
            qrstat1: 2,
            externalFlowPriceStrategy: 0,
            externalFlowPriceFactor: 0.5,
            advancedipblack: 
                ['90.0.*.*', '90.123.*.*', '90.0.*.*', '90.123.*.*'],
            markermemo: {
                1: '蓝色标记', 
                2: '绿色标记', 
                4: '黄色标记', 
                8: '橙色标记', 
                16: '红色标记'
            }
        },
        '101': {
            userstat: 1,
            balance: 12937.12345,
            daysconsumable: 5,
            todaypaysum: 2144.5234234,
            advancedipblack: ['90.0.*.*', '90.222.*.*'],
            externalFlowPriceStrategy: 0,
            externalFlowPriceFactor: 0.5
        },
        '102': {
            userstat: 3,
            balance: 1832.82340,
            daysconsumable: 182345,
            todaypaysum: 10.22341,
            advancedipblack: ['90.0.*.*', '90.333.*.*'],
            externalFlowPriceStrategy: 0,
            externalFlowPriceFactor: 0.5
        }
    };
});

