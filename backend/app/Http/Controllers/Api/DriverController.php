<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDriverRequest;
use App\Http\Requests\UpdateDriverRequest;
use App\Models\Driver;
use Illuminate\Http\JsonResponse;

class DriverController extends Controller
{
    /**
     * Display a listing of drivers.
     */
    public function index(): JsonResponse
    {
        $drivers = Driver::with([
            'site.region',
        ])
        ->latest()
        ->get();

        return response()->json([
            'data' => $drivers,
        ]);
    }


    /**
     * Store a newly created driver.
     */
    public function store(StoreDriverRequest $request): JsonResponse
    {
        $driver = Driver::create(
            $request->validated()
        );

        return response()->json([
            'message' => 'Driver berhasil dibuat.',
            'data' => $driver->load([
                'site.region',
            ]),
        ], 201);
    }


    /**
     * Display the specified driver.
     */
    public function show(Driver $driver): JsonResponse
    {
        return response()->json([
            'data' => $driver->load([
                'site.region',
            ]),
        ]);
    }


    /**
     * Update the specified driver.
     */
    public function update(
        UpdateDriverRequest $request,
        Driver $driver
    ): JsonResponse {
        $driver->update(
            $request->validated()
        );

        return response()->json([
            'message' => 'Driver berhasil diperbarui.',
            'data' => $driver->load([
                'site.region',
            ]),
        ]);
    }


    /**
     * Remove the specified driver.
     */
    public function destroy(Driver $driver): JsonResponse
    {
        $driver->update([
            'status' => 'INACTIVE',
        ]);

        return response()->json([
            'message' => 'Driver berhasil dinonaktifkan.',
        ]);
    }
}