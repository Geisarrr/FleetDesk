<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [

            'region_id' => [
                'sometimes',
                'exists:regions,id',
            ],

            'site_id' => [
                'sometimes',
                'exists:sites,id',
            ],

            'vehicle_id' => [
                'sometimes',
                'exists:vehicles,id',
            ],

            'driver_id' => [
                'sometimes',
                'exists:drivers,id',
            ],

            'booking_date' => [
                'sometimes',
                'date',
            ],

            'start_time' => [
                'sometimes',
                'date_format:H:i',
            ],

            'end_time' => [
                'sometimes',
                'date_format:H:i',
                'after:start_time',
            ],

            'destination' => [
                'sometimes',
                'string',
                'max:255',
            ],

            'purpose' => [
                'sometimes',
                'string',
            ],

            'notes' => [
                'nullable',
                'string',
            ],

        ];
    }
}