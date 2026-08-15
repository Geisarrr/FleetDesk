<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VehicleTypeController;
use App\Http\Controllers\Api\VehicleController;
use App\Http\Controllers\Api\DriverController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\BookingWorkflowController;
use App\Http\Controllers\Api\BookingApprovalController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/

Route::post('/login', [AuthController::class, 'login']);



/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {



    /*
    |--------------------------------------------------------------------------
    | USER
    |--------------------------------------------------------------------------
    */

    Route::post('/logout', [AuthController::class, 'logout']);


    Route::get('/me', function (Request $request) {

        return $request->user()->load('role');

    });



    /*
    |--------------------------------------------------------------------------
    | MASTER DATA ADMIN
    |--------------------------------------------------------------------------
    */


    Route::apiResource('vehicle-types', VehicleTypeController::class)
        ->middleware('role:Admin');


    Route::apiResource('vehicles', VehicleController::class)
        ->middleware('role:Admin');


    Route::apiResource('drivers', DriverController::class)
        ->middleware('role:Admin');



    /*
    |--------------------------------------------------------------------------
    | BOOKINGS
    |--------------------------------------------------------------------------
    */


    Route::apiResource('bookings', BookingController::class);



    /*
    |--------------------------------------------------------------------------
    | BOOKING WORKFLOW
    |--------------------------------------------------------------------------
    */


    Route::post(
        '/bookings/{booking}/submit',
        [BookingWorkflowController::class,'submit']
    );



    /*
    |--------------------------------------------------------------------------
    | APPROVAL
    |--------------------------------------------------------------------------
    */


    Route::post(
        '/booking-approvals/{approval}/approve',
        [BookingApprovalController::class,'approve']
    );


});