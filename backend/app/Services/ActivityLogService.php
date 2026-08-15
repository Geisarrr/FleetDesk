<?php

namespace App\Services;

use App\Models\ActivityLog;
use Illuminate\Support\Facades\Auth;

class ActivityLogService
{

    public function log(
        string $action,
        string $entityType,
        int $entityId,
        string $description,
        array $metadata = []
    ): ActivityLog
    {

        return ActivityLog::create([

            'user_id' => Auth::id(),

            'action' => $action,

            'entity_type' => $entityType,

            'entity_id' => $entityId,

            'description' => $description,

            'metadata' => $metadata,

        ]);

    }

}