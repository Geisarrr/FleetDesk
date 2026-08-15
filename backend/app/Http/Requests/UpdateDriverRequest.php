<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDriverRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [

            'site_id' => [
                'sometimes',
                'exists:sites,id',
            ],


            'employee_id' => [
                'sometimes',
                'string',
                'max:50',
                Rule::unique('drivers', 'employee_id')
                    ->ignore($this->driver->id),
            ],


            'name' => [
                'sometimes',
                'string',
                'max:100',
            ],


            'phone' => [
                'nullable',
                'string',
                'max:30',
            ],


            'license_number' => [
                'sometimes',
                'string',
                'max:50',
                Rule::unique('drivers', 'license_number')
                    ->ignore($this->driver->id),
            ],


            'license_expiry' => [
                'sometimes',
                'date',
            ],


            'status' => [
                'sometimes',
                'in:ACTIVE,INACTIVE',
            ],

        ];
    }
}