<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateVehicleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'vehicle_type_id' => [
                'required',
                'exists:vehicle_types,id',
            ],

            'site_id' => [
                'required',
                'exists:sites,id',
            ],

            'license_plate' => [
                'required',
                'string',
                'max:20',
                Rule::unique('vehicles', 'license_plate')
                    ->ignore($this->vehicle),
            ],

            'brand' => [
                'required',
                'string',
                'max:50',
            ],

            'model' => [
                'required',
                'string',
                'max:50',
            ],

            'year' => [
                'nullable',
                'integer',
            ],

            'ownership' => [
                'required',
                'in:COMPANY,RENTAL',
            ],

            'status' => [
                'required',
                'in:ACTIVE,INACTIVE,MAINTENANCE',
            ],
        ];
    }
}