<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVehicleTypeRequest;
use App\Http\Requests\UpdateVehicleTypeRequest;
use App\Models\VehicleType;
use Illuminate\Http\JsonResponse;

class VehicleTypeController extends Controller
{
    /**
     * Display a listing of vehicle types.
     */
    public function index(): JsonResponse
    {
        $vehicleTypes = VehicleType::latest()->get();

        return response()->json([
            'data' => $vehicleTypes,
        ]);
    }

    /**
     * Store a newly created vehicle type.
     */
    public function store(StoreVehicleTypeRequest $request): JsonResponse
    {
        $vehicleType = VehicleType::create(
            $request->validated()
        );

        return response()->json([
            'message' => 'Vehicle type berhasil dibuat.',
            'data' => $vehicleType,
        ], 201);
    }

    /**
     * Display the specified vehicle type.
     */
    public function show(VehicleType $vehicleType): JsonResponse
    {
        return response()->json([
            'data' => $vehicleType,
        ]);
    }

    /**
     * Update the specified vehicle type.
     */
    public function update(
        UpdateVehicleTypeRequest $request,
        VehicleType $vehicleType
    ): JsonResponse {
        $vehicleType->update(
            $request->validated()
        );

        return response()->json([
            'message' => 'Vehicle type berhasil diperbarui.',
            'data' => $vehicleType,
        ]);
    }

    /**
     * Remove the specified vehicle type.
     */
    public function destroy(VehicleType $vehicleType): JsonResponse
    {
        $vehicleType->delete();

        return response()->json([
            'message' => 'Vehicle type berhasil dihapus.',
        ]);
    }
}