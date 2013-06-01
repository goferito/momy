
exports.systemLogBody = "user=goferito&device=laptinux&file=system&log=[2013-02-09 14:22:55] UP\n[2013-02-09 16:25:26] DOWN\n[2013-02-10 23:22:55] UP\n[2013-02-11 04:25:26] DOWN"

exports.systemLogBody = "user=goferito&device=laptinux&file=active&log=[2013-02-09 14:22:55] UP\n[2013-02-09 16:25:26] DOWN\n[2013-02-10 23:22:55] UP\n[2013-02-11 04:25:26] DOWN"

exports.sessions = [
    {
        user: 'goferito',
        device: 'laptinux',
        up: '[2013-02-09 14:22:55]',
        down: '[2013-02-09 16:25:26]',
        ip: '127.0.0.0',
        log: 'system'
    },
    {
        user: 'goferito',
        device: 'laptinux',
        up: '[2013-02-10 23:22:55]',
        down: '[2013-02-11 04:25:26]',
        ip: '127.0.0.0',
        log: 'system'
    },
    {
        user: 'goferito',
        device: 'laptinux',
        up: '[2013-02-09 14:22:55]',
        down: '[2013-02-09 16:25:26]',
        ip: '127.0.0.0',
        log: 'active'
    },
    {
        user: 'goferito',
        device: 'laptinux',
        up: '[2013-02-10 23:22:55]',
        down: '[2013-02-11 04:25:26]',
        ip: '127.0.0.0',
        log: 'active'
    }
]
