<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDriverRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'site_id' => [
                'required',
                'exists:sites,id',
            ],

            'employee_id' => [
                'required',
                'string',
                'max:50',
                'unique:drivers,employee_id',
            ],

            'name' => [
                'required',
                'string',
                'max:100',
            ],

            'phone' => [
                'nullable',
                'string',
                'max:30',
            ],

            'license_number' => [
                'required',
                'string',
                'max:50',
                'unique:drivers,license_number',
            ],

            'license_expiry' => [
                'required',
                'date',
            ],

            'status' => [
                'required',
                'in:ACTIVE,INACTIVE',
            ],
        ];
    }
}