<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VehicleTypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\VehicleController;

Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth:sanctum');

Route::get('/me', function (Request $request) {
    return $request->user()->load('role');
})->middleware('auth:sanctum');

Route::apiResource('vehicle-types', VehicleTypeController::class)
    ->middleware(['auth:sanctum', 'role:Admin']);

Route::apiResource('vehicles', VehicleController::class)
    ->middleware(['auth:sanctum', 'role:Admin']);