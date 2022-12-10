export {}
declare global {
  namespace Express {
    interface AuthUser {
      id: string | number,
      roles?: string[];
      /**
       * morphed by an another user, mostly an admin
       */
      morphedBy?: AuthUser | undefined;
      [key: string]: any;
    }

    interface AuthToken {
      sub?:string;
      exp: number;
      scope: string[];
      cid: string | undefined;
      user?: AuthUser | undefined;
    }

    interface AuthContext {
      loaded?: boolean;
      user? : AuthUser | undefined;
      token?: AuthToken | undefined;
      context : "token";
    }

    interface Request {
      authContext? : AuthContext | undefined;
    }
  }
}
