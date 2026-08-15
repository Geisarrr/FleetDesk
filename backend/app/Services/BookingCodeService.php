<?php

namespace App\Services;

use App\Models\Booking;

class BookingCodeService
{
    public function generate(): string
    {
        $lastId = Booking::max('id') ?? 0;

        return 'BOOK-' . str_pad(
            $lastId + 1,
            6,
            '0',
            STR_PAD_LEFT
        );
    }
}