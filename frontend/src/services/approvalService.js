import api from "../api/axios";


export async function getPendingApprovals(){

    const response = await api.get("/approvals");

    return response.data.data;

}



export async function approveBooking(approvalId){

    const response = await api.post(
        `/booking-approvals/${approvalId}/approve`
    );

    return response.data;

}



export async function rejectBooking(approvalId,note){

    const response = await api.post(
        `/booking-approvals/${approvalId}/reject`,
        {
            note
        }
    );

    return response.data;

}



export async function getApprovalStats(){

    const response = await api.get(
        "/approval-stats"
    );


    console.log(
        "APPROVAL STATS:",
        response.data
    );


    return response.data;

}