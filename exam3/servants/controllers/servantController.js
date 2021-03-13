const url = require('url');
const { servantService } = require('../services');

exports.handleGet = (req, res) => {
    const data = servantService.get();

    const result = { data };

    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    res.write(JSON.stringify(result));
    res.end();
};

exports.handlePost = (req, res) => {
    let data = [];

    req.on('data', (chunk) => {
        data.push(chunk);
    });

    req.on('end', () => {
        const parsedData = Buffer.concat(data).toString();
        const dataJson = JSON.parse(parsedData);

        const result = servantService.insert(dataJson);

        if (!result.success) {
            res.writeHead(400, {
                'Content-Type': 'application/json',
            });
            res.write(JSON.stringify(result));
            res.end();

            return;
        }

        res.writeHead(201, {
            'Content-Type': 'application/json',
        });
        res.write(JSON.stringify(result));
        res.end();

        return;
    });
};

exports.handleDelete = (req, res) => {
    const { searchParams } = new url.URL(req.url, `http://${req.headers.host}`);
    const name = searchParams.get('name');

    const result = servantService.delete(name);

    if (!result.success) {
        res.writeHead(400, {
            'Content-Type': 'application/json',
        });
        res.write(JSON.stringify(result));
        res.end();

        return;
    }

    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    res.write(JSON.stringify(result));
    res.end();
};
