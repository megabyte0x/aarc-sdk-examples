import * as dotenv from 'dotenv';
dotenv.config();

export const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
export const RPC_URL = process.env.RPC_URL || "";
export const API_KEY = process.env.API_KEY || "";
