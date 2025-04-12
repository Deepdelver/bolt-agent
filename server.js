const express = require('express');
    const cors = require('cors');
    const nodeFetch = require('node-fetch');
    require('dotenv').config();

    const app = express();
    const port = process.env.PORT || 3000;

    app.use(cors());
    app.use(express.json());

    app.get('/api/status', async (req, res) => {
      try {
        const statusData = await require('python-sdk').get_server_status();
        res.json(statusData);
      } catch (error) {
        console.error('Error fetching server status:', error);
        res.status(500).json({ error: 'Failed to fetch server status' });
      }
    });

    app.get('/api/devices', async (req, res) => {
      try {
        const devicesData = await require('python-sdk').get_devices();
        res.json(devicesData);
      } catch (error) {
        console.error('Error fetching devices:', error);
        res.status(500).json({ error: 'Failed to fetch devices' });
      }
    });

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
