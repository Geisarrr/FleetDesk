<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'region_id' => [
                'required',
                'exists:regions,id',
            ],

            'site_id' => [
                'required',
                'exists:sites,id',
            ],

            'vehicle_id' => [
                'required',
                'exists:vehicles,id',
            ],

            'driver_id' => [
                'required',
                'exists:drivers,id',
            ],

            'booking_date' => [
                'required',
                'date',
            ],

            'start_time' => [
                'required',
                'date_format:H:i',
            ],

            'end_time' => [
                'required',
                'date_format:H:i',
                'after:start_time',
            ],

            'destination' => [
                'required',
                'string',
                'max:255',
            ],

            'purpose' => [
                'required',
                'string',
            ],

            'notes' => [
                'nullable',
                'string',
            ],

        ];
    }
}