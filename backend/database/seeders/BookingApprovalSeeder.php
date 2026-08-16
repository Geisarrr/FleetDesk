<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BookingApproval;
use App\Models\Booking;
use App\Models\User;

class BookingApprovalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $approver = User::where('role_id',2)->first();

        $bookings = Booking::where('status','DRAFT')
            ->get();


        foreach($bookings as $booking){


            BookingApproval::create([

                'booking_id'=>$booking->id,

                'approver_id'=>$approver->id,

                'level'=>1,

                'decision'=>'Pending'

            ]);


        }

    }
}