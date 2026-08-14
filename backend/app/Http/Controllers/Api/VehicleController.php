<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use App\Models\Vehicle;
use Illuminate\Http\JsonResponse;

class VehicleController extends Controller
{
    /**
     * Display a listing of vehicles.
     */
    public function index(): JsonResponse
    {
        $vehicles = Vehicle::with([
            'vehicleType',
            'site.region',
        ])
        ->latest()
        ->get();

        return response()->json([
            'data' => $vehicles,
        ]);
    }


    /**
     * Store a newly created vehicle.
     */
    public function store(StoreVehicleRequest $request): JsonResponse
    {
        $vehicle = Vehicle::create(
            $request->validated()
        );

        return response()->json([
            'message' => 'Vehicle berhasil dibuat.',
            'data' => $vehicle->load([
                'vehicleType',
                'site.region',
            ]),
        ], 201);
    }


    /**
     * Display the specified vehicle.
     */
    public function show(Vehicle $vehicle): JsonResponse
    {
        return response()->json([
            'data' => $vehicle->load([
                'vehicleType',
                'site.region',
            ]),
        ]);
    }


    /**
     * Update the specified vehicle.
     */
    public function update(
        UpdateVehicleRequest $request,
        Vehicle $vehicle
    ): JsonResponse {
        $vehicle->update(
            $request->validated()
        );

        return response()->json([
            'message' => 'Vehicle berhasil diperbarui.',
            'data' => $vehicle->load([
                'vehicleType',
                'site.region',
            ]),
        ]);
    }


    /**
     * Remove the specified vehicle.
     */
    public function destroy(Vehicle $vehicle): JsonResponse
    {
        $vehicle->update([
            'status' => 'INACTIVE',
        ]);

        return response()->json([
            'message' => 'Vehicle berhasil dinonaktifkan.',
        ]);
    }
}