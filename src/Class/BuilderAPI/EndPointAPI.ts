import { Request, Response } from "express";
import { EndPointAPIContext } from "./EndPointAPIContext";

export type EndPointAPI = {
    service: string;
    endpoint: string;

    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

    callback(
        ctx: EndPointAPIContext
    ): Promise<void> | void;

    descripiton ?: string
};