<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\Region;
use App\Models\Site;
use App\Models\VehicleType;
use App\Models\Vehicle;
use App\Models\Driver;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {

        /*
        |--------------------------------------------------------------------------
        | Roles
        |--------------------------------------------------------------------------
        */

        $adminRole = Role::create([
            'name' => 'Admin'
        ]);


        $approverRole = Role::create([
            'name' => 'Approver'
        ]);



        /*
        |--------------------------------------------------------------------------
        | Users
        |--------------------------------------------------------------------------
        */

        User::create([
            'role_id' => $adminRole->id,
            'name' => 'Test Admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('password123'),
            'is_active' => true,
        ]);


        User::create([
            'role_id' => $approverRole->id,
            'name' => 'Test Approver',
            'email' => 'approver@test.com',
            'password' => Hash::make('password123'),
            'is_active' => true,
        ]);



        /*
        |--------------------------------------------------------------------------
        | Region
        |--------------------------------------------------------------------------
        */

        $region = Region::create([
            'name' => 'Region Test',
            'code' => 'REG-TEST',
        ]);



        /*
        |--------------------------------------------------------------------------
        | Site
        |--------------------------------------------------------------------------
        */

        $site = Site::create([
            'region_id' => $region->id,
            'name' => 'Site Test',
            'code' => 'SITE-TEST',
            'address' => 'Alamat Test',
        ]);



        /*
        |--------------------------------------------------------------------------
        | Vehicle Type
        |--------------------------------------------------------------------------
        */

        $vehicleType = VehicleType::create([
            'name' => 'Mobil',
        ]);



        /*
        |--------------------------------------------------------------------------
        | Vehicle
        |--------------------------------------------------------------------------
        */

        Vehicle::create([
            'vehicle_type_id' => $vehicleType->id,
            'site_id' => $site->id,
            'license_plate' => 'B 1234 TEST',
            'brand' => 'Toyota',
            'model' => 'Innova',
            'year' => 2024,
            'ownership' => 'COMPANY',
            'status' => 'ACTIVE',
        ]);



        /*
        |--------------------------------------------------------------------------
        | Driver
        |--------------------------------------------------------------------------
        */

        Driver::create([
            'site_id' => $site->id,
            'employee_id' => 'DRV-001',
            'name' => 'Driver Test',
            'phone' => '081234567890',
            'license_number' => 'SIM-TEST-001',
            'license_expiry' => '2027-12-31',
            'status' => 'ACTIVE',
        ]);

    }
}