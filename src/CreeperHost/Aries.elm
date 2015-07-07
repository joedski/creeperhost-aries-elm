module Aries (Response(..), Error(..), send) where

import Native.CreeperHost.Aries

{-
For now, this is just a very thin wrapper around calling (new Aries( key, secret )).exec( section, command, params )
-}

type alias Parameters = List (String, String)

type alias ResponseBase =
    { status : String
    }

type Response a
    = LogResponse (LogData a)
    | GeneralResponse (GeneralData a)

type alias LogData a =
    { a
        | log : String
        , count : Int
    }

type alias GeneralData a =
    a

type Error
    = Timeout
    | StatusError Int
    | APIError String

send : String -> String -> String -> String -> Parameters -> Task Error (Response ResponseBase)
send =
    Native.CreeperHost.Aries.send

