import { Request, Response } from "express";

export type TCourse = {
  id: number;
  title: string;
  students: number;
};

export type TRequestWithBody<TBody> = Request<{}, {}, TBody>;

export type TRequestWithQuery<TQuery> = Request<{}, {}, {}, TQuery>;

export type TRequestWithParams<TParams> = Request<TParams>;

export type TRequestWithParamsAndBody<TParams, TBody> = Request<
  TParams,
  {},
  TBody
>;
