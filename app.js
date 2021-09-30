const express = require('express');
const cors = require('cors');
require('dotenv').config();

const Server = require('./models/server');

const server = new Server(express, process.env.PORT, cors);

server.listen();