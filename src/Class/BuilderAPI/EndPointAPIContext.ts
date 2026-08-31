import { Request, Response } from "express";

export class EndPointAPIContext {
    constructor(
        public readonly req: Request,
        public readonly res: Response
    ) {}

    public success(data?: unknown) {
        this.res.json({
            success: true,
            data
        });
    }

    public error(
        message: string,
        status = 400
    ) {
        this.res.status(status).json({
            success: false,
            error: message
        });
    }

    public get query() {
        return this.req.query;
    }

    public get params() {
        return this.req.params;
    }

    public get body() {
        return this.req.body;
    }
}