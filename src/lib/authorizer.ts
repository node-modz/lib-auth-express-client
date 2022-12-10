import Logger from '@node-modz/lib-logger';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {Request, Response, NextFunction} from "express";

const logger = Logger(module);

export type Config = {
    url: string,
    headers?: object,
}

const Authorizer = (config:Config)=> {
        return (request:Request, response:Response, next:NextFunction)=>{
            if (request.headers.authorization) {
                //log(request.correlationId).info(`Token Authorization successflly`);
                const token:string = request.headers.authorization.split("Bearer ")[1];
                axios({
                    method: 'post',
                    url: config.url,
                    headers: config.headers || {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: {
                        token,
                    }
                }).then((response)=> {
                    request.authContext = {
                        context: "token",
                        loaded: true,
                        token: decodeToken(token),
                        user: response?.data?.data
                    }

                    next()
                }).catch((error)=> {next(error.response)});

            } else {
                logger.info(`Missing Authorization token`);
                next({ code: 401, name: "unauthorized", message: "no auth header" });
            }
        }
    }

const decodeToken= (token:string)=>{
    return (({ sub, exp, scope, cid }) => ({ sub, exp, scope, cid  }))(jwtDecode(token)) ;
}

export default Authorizer;
