import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
const { StackGo, SGHubspot } = require("stackgo-js-sdk");

import UserDao from "@daos/User/UserDao.mock";
import { paramMissingError } from "@shared/constants";

const userDao = new UserDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;
const sg = new StackGo(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
const hb = new SGHubspot(sg, process.env.APP_SLUG);
/**
 * Get Install Link
 *
 * @param req
 * @param res
 * @returns JSON
 */
export async function getInstallLink(req: Request, res: Response) {
  await sg.verifyAndReturnToken();
  const userForeignIdentifier = req.query.userForeignIdentifier;

  if (!userForeignIdentifier) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }

  const authUrlResp = await hb.hubspotAuthLink(userForeignIdentifier);
  return res.status(OK).json({ ...authUrlResp });
}

/**
 * Make Proxy.
 *
 * @param req
 * @param res
 * @returns JSON
 */
export async function hubspotProxy(req: Request, res: Response) {
  await sg.verifyAndReturnToken();

  if (req.body === {} || req.body === undefined) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }

  const hubspotProxyCall = await hb.hubspotCall({
    userForeignIdentifier: req.body.userForeignIdentifier,
    method: req.body.method,
    url: req.body.url,
  });
  return res.status(OK).json({ ...hubspotProxyCall.data });
}
