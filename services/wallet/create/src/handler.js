'use strict';

import ChainKit from 'squeezer-chainkit';
import fs from 'fs';
import event from 'squeezer-event-node';

const vars = JSON.parse(fs.readFileSync('.vars.json', 'utf8'));

export function handler(...args) {
  const { accessKey, chainkit } = vars;
  const { environment } = chainkit;

  const chainKit = new ChainKit({
    accessKey,
    environment
  });

  event(vars, (req, res) => {
    const { type, secret } = req.body;

    chainKit.createWallet({ type, secret }, (err, response) => {
      if (err) res.json(400, err);

      res.json(200, response);
    });
  }, ...args);
}
