<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ApiMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {

        $token = $request->header('Autorization');
        $jwt = new \JwtAuth();
        $checkToken = $jwt->CheckToken($token);

        if ($checkToken) {

            return $next($request);

        } else {

            return response()->json([
                'code' => 400,
                'status' =>  'Error',
                'message' => 'Debe Iniciar sesión'
            ], 400);
        }
    }
}
