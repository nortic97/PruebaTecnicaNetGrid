<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;
    
    protected $table = 'usuarios';
    public $timestamps = true;
    
    protected $fillable = [
        'id',
        'usuario',
        'nombres',
        'apellidos',
        'tipo_de_identificacion',
        'numero_de_identificacion',
        'fecha_de_nacimiento',
        'contrasena'
    ];
    
}
