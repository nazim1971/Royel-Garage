"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bike_route_1 = require("./app/modules/bike.route");
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//Application Routes
app.use('/', bike_route_1.bikeRoutes);
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Royel Grarage Server on Fire 🔥🔥🔥'
    });
});
exports.default = app;