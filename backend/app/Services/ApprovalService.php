<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\BookingApproval;
use App\Models\User;

class ApprovalService
{
    public function submit(Booking $booking)
    {
        $booking->update([
            'status' => 'PENDING_LEVEL_1'
        ]);


        BookingApproval::create([
            'booking_id' => $booking->id,
            'approver_id' => $this->getApprover(),
            'level' => 1,
            'decision' => 'Pending',
        ]);


        return $booking->fresh([
            'approvals'
        ]);
    }


    private function getApprover()
    {
        return User::whereHas('role', function ($query) {
            $query->where('name', 'Approver');
        })
        ->firstOrFail()
        ->id;
    }
}