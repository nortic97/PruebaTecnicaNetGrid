<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UsuarioController extends Controller
{

    public function index()
    {
        $data = DB::table('usuarios')->paginate(10);

        if ($data->isEmpty()) {

            return response()->json([
                'status' => 'Error',
                'code' => 404,
                'message' => 'Base de datos vacía'
            ]);
        } else {

            return response()->json($data, 200);
        }
    }


    public function store(Request $request)
    {
        //recoger datos

        $jsonData = $request->input('json', null);
        $params = json_decode($jsonData);
        $paramsArray = json_decode($jsonData, true);

        //limpiar datos

        $paramsArray = array_map('trim', $paramsArray);

        //valida datos

        $validate = Validator::make($paramsArray, [
            'usuario' => 'required|unique:usuarios',
            'nombres' => 'required',
            'apellidos' => 'required',
            'tipo_de_identificacion' => 'required',
            'numero_de_identificacion' => 'required|unique:usuarios',
            'fecha_de_nacimiento' => 'required',
            'contrasena' => 'required'
        ]);

        if ($validate->fails()) {

            return $json = response()->json([

                'status' => 'Error',
                'code' => 400,
                'message' => $validate->errors()

            ], 400);
        } else {

            //encriptar contraseñas

            $pwd = hash('sha256', $params->contrasena);

            $usuario = new Usuario();
            $usuario->usuario = $paramsArray['usuario'];
            $usuario->nombres = $paramsArray['nombres'];
            $usuario->apellidos = $paramsArray['apellidos'];
            $usuario->tipo_de_identificacion = $paramsArray['tipo_de_identificacion'];
            $usuario->numero_de_identificacion = $paramsArray['numero_de_identificacion'];
            $usuario->fecha_de_nacimiento = $paramsArray['fecha_de_nacimiento'];
            $usuario->contrasena = $pwd;

            $usuario->save();

            return $json = response()->json([

                'status' => 'success',
                'code' => 200,
                'message' => $usuario

            ], 200);
        }
    }


    public function show($id)
    {
        $data = Usuario::find($id);

        if ($data == null) {

            return response()->json([
                'status' => 'Error',
                'code' => 404,
                'message' => 'el dato no existe',
                'search' => $id
            ]);
        } else {

            return response()->json($data, 200);
        }
    }

    public function update(Request $request, $id)
    {
        $json = $request->input('json',null);
        $params = json_decode($json);
        $paramsArray = json_decode($json, true);

    }


    public function destroy($id)
    {
        //
    }

    public function login(Request $request)
    {

        $jwtAuth = new \JwtAuth();

        $json = $request->input('json', null);

        $params = json_decode($json);

        $paramsArray = json_decode($json, true);

        $validate = Validator::make($paramsArray, [
            'usuario' => 'required',
            'contrasena' => 'required'
        ]);

        if ($validate->fails()) {

            return $json = response()->json([

                'status' => 'Error',
                'code' => 400,
                'message' => $validate->errors()

            ], 400);
        } else {

            $pwd = hash('SHA256', $params->contrasena);

            $login = $jwtAuth->Login($params->usuario, $pwd);

            if (!empty($params->getToken)) {

                $login = $jwtAuth->Login($params->usuario, $pwd, true);

            }

        }

        return $json = response()->json($login, 200);
    }
}
