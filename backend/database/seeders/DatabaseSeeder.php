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
use App\Models\Booking;
use App\Models\BookingApproval;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;


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
            'name'=>'Admin'
        ]);


        $approverRole = Role::create([
            'name'=>'Approver'
        ]);




        /*
        |--------------------------------------------------------------------------
        | Users
        |--------------------------------------------------------------------------
        */


        $admin = User::create([

            'role_id'=>$adminRole->id,

            'name'=>'Test Admin',

            'email'=>'admin@test.com',

            'password'=>Hash::make('password123'),

            'is_active'=>true,

        ]);




        $approver = User::create([

            'role_id'=>$approverRole->id,

            'name'=>'Test Approver',

            'email'=>'approver@test.com',

            'password'=>Hash::make('password123'),

            'is_active'=>true,

        ]);





        /*
        |--------------------------------------------------------------------------
        | Region
        |--------------------------------------------------------------------------
        */


        $region = Region::create([

            'name'=>'Region Test',

            'code'=>'REG-TEST',

        ]);





        /*
        |--------------------------------------------------------------------------
        | Site
        |--------------------------------------------------------------------------
        */


        $site = Site::create([

            'region_id'=>$region->id,

            'name'=>'Site Test',

            'code'=>'SITE-TEST',

            'address'=>'Alamat Test',

        ]);





        /*
        |--------------------------------------------------------------------------
        | Vehicle Type
        |--------------------------------------------------------------------------
        */


        $vehicleType = VehicleType::create([

            'name'=>'Mobil',

        ]);






        /*
        |--------------------------------------------------------------------------
        | Vehicle
        |--------------------------------------------------------------------------
        */


        $vehicle = Vehicle::create([

            'vehicle_type_id'=>$vehicleType->id,

            'site_id'=>$site->id,

            'license_plate'=>'B 1234 TEST',

            'brand'=>'Toyota',

            'model'=>'Innova',

            'year'=>2024,

            'ownership'=>'COMPANY',

            'status'=>'ACTIVE',

        ]);






        /*
        |--------------------------------------------------------------------------
        | Driver
        |--------------------------------------------------------------------------
        */


        $driver = Driver::create([

            'site_id'=>$site->id,

            'employee_id'=>'DRV-001',

            'name'=>'Driver Test',

            'phone'=>'081234567890',

            'license_number'=>'SIM-TEST-001',

            'license_expiry'=>'2027-12-31',

            'status'=>'ACTIVE',

        ]);







        /*
        |--------------------------------------------------------------------------
        | BOOKINGS DUMMY
        |--------------------------------------------------------------------------
        */



        /*
        | Pending Level 1
        */

        $booking1 = Booking::create([

            'booking_code'=>'BOOK-000001',

            'requester_id'=>$admin->id,

            'region_id'=>$region->id,

            'site_id'=>$site->id,

            'vehicle_id'=>$vehicle->id,

            'driver_id'=>$driver->id,

            'booking_date'=>'2026-08-20',

            'start_time'=>'08:00:00',

            'end_time'=>'17:00:00',

            'destination'=>'Jakarta',

            'purpose'=>'Client Meeting',

            'notes'=>'Waiting approval',

            'status'=>'DRAFT',

        ]);



        BookingApproval::create([

            'booking_id'=>$booking1->id,

            'approver_id'=>$approver->id,

            'level'=>1,

            'decision'=>'Pending',

        ]);








        /*
        | Pending Level 2
        */

        $booking2 = Booking::create([

            'booking_code'=>'BOOK-000002',

            'requester_id'=>$admin->id,

            'region_id'=>$region->id,

            'site_id'=>$site->id,

            'vehicle_id'=>$vehicle->id,

            'driver_id'=>$driver->id,

            'booking_date'=>'2026-08-21',

            'start_time'=>'08:00:00',

            'end_time'=>'17:00:00',

            'destination'=>'Bekasi',

            'purpose'=>'Audit Visit',

            'notes'=>'Level 2 waiting',

            'status'=>'PENDING_LEVEL_2',

        ]);



        BookingApproval::create([

            'booking_id'=>$booking2->id,

            'approver_id'=>$approver->id,

            'level'=>1,

            'decision'=>'Approved',

            'decided_at'=>Carbon::now(),

        ]);



        BookingApproval::create([

            'booking_id'=>$booking2->id,

            'approver_id'=>$approver->id,

            'level'=>2,

            'decision'=>'Pending',

        ]);









        /*
        | Approved
        */

        $booking3 = Booking::create([

            'booking_code'=>'BOOK-000003',

            'requester_id'=>$admin->id,

            'region_id'=>$region->id,

            'site_id'=>$site->id,

            'vehicle_id'=>$vehicle->id,

            'driver_id'=>$driver->id,

            'booking_date'=>'2026-08-22',

            'start_time'=>'09:00:00',

            'end_time'=>'15:00:00',

            'destination'=>'Tangerang',

            'purpose'=>'Operational Visit',

            'notes'=>'Approved',

            'status'=>'APPROVED',

        ]);



        BookingApproval::create([

            'booking_id'=>$booking3->id,

            'approver_id'=>$approver->id,

            'level'=>1,

            'decision'=>'Approved',

            'decided_at'=>Carbon::now(),

        ]);



        BookingApproval::create([

            'booking_id'=>$booking3->id,

            'approver_id'=>$approver->id,

            'level'=>2,

            'decision'=>'Approved',

            'decided_at'=>Carbon::now(),

        ]);









        /*
        | Rejected
        */

        $booking4 = Booking::create([

            'booking_code'=>'BOOK-000004',

            'requester_id'=>$admin->id,

            'region_id'=>$region->id,

            'site_id'=>$site->id,

            'vehicle_id'=>$vehicle->id,

            'driver_id'=>$driver->id,

            'booking_date'=>'2026-08-23',

            'start_time'=>'10:00:00',

            'end_time'=>'14:00:00',

            'destination'=>'Depok',

            'purpose'=>'Internal Meeting',

            'notes'=>'Rejected request',

            'status'=>'CANCELLED',

        ]);



        BookingApproval::create([

            'booking_id'=>$booking4->id,

            'approver_id'=>$approver->id,

            'level'=>1,

            'decision'=>'Rejected',

            'note'=>'Vehicle unavailable',

            'decided_at'=>Carbon::now(),

        ]);



    }
}