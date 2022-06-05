<?php

namespace App\Helpers;

use App\Models\Usuario;
use DomainException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use UnexpectedValueException;


class JwtAuth
{

    public $key;

    public function __construct()
    {
        $this->key = 'ThomasNG151213*';
    }

    /**
     * Función para iniciar sesión
     *
     * @param usuario
     * @param contrasena
     * @param getToken
     *
     */
    public function Login($usuario, $contrasena, $getToken = null)
    {


        // Buscar usuario

        $usuario = Usuario::where([
            'usuario' => $usuario,
            'contrasena' => $contrasena
        ])->first();

        //Comprobar que sea correcto

        $login = false;

        if (is_object($usuario)) {

            $login = true;
        }

        //Generar token de usuario

        if ($login) {

            $tokenArray = array(
                'sub' => $usuario->id,
                'usuario' => $usuario->usuario,
                'nombres' => $usuario->nombres,
                'apellidos' => $usuario->apellidos,
                'iat' => time(),
                'exp' => time() + (7 * 24 * 60 * 60)
            );

            $jwt = JWT::encode($tokenArray, $this->key, 'HS256');
            $decode = JWT::decode($jwt, new Key($this->key, 'HS256'));

            //Devolver datos codificados

            if(is_null($getToken)){

                $data =  $jwt;

            }else{

                $data = $decode;

            }


        } else {

            $data = array(
                'status' => 'Error',
                'code' => 400,
                'message' => 'Login Incorrecto'
            );
        }

        return $data;
    }

    public function CheckToken($jwt , $getIdentity = false){

        $auth = false;

        try{

            $jwt = str_replace('"', '',$jwt);
            $decoded = JWT::decode($jwt, new Key($this->key, 'HS256'));

        } catch (UnexpectedValueException $e) {

            $auth = false;

        } catch (DomainException $e) {

            $auth = false;

        }

        if (!empty($decoded) && is_object($decoded) && isset($decoded->sub)) {

            $auth = true;

        }else{

            $auth = false;

        }

        if($getIdentity){

            return $decoded;

        }

        return $auth;

    }

}
