export const AdminMenus = {
    Dashboard: 'DashboardMenu',
    Research: 'ResearchMenu',
    Blog: 'BlogMenu',
    Redirects: 'RedirectsMenu',
    SurveyClient: 'SurveyClientMenu',
    SurveyAdmin: 'SurveyAdminMenu',
}

export const SurveyOperations = {
    SurveyAdminApprove: 'SurveyAdminApprove',
    SurveyAdminReject: 'SurveyAdminReject',
    SurveyAdminDelete: 'SurveyAdminDelete',
    SurveyClientApprove: 'SurveyClientApprove',
    SurveyClientReject: 'SurveyClientReject',
    SurveyClientDelete: 'SurveyClientDelete'
}

export const SurveyStatus = {
    Draft: { Id: 1, Name: 'Draft', DisplayName: 'Draft', IsClient: false, IsAdmin: true },
    Edit: { Id: 2, Name: 'Edit', DisplayName: 'Edit', IsClient: false, IsAdmin: false },
    Submit: { Id: 3, Name: 'Submit', DisplayName: 'Submit', IsClient: false, IsAdmin: true },
    AdminApprove: { Id: 4, Name: 'AdminApprove', DisplayName: 'Approve', IsClient: false, IsAdmin: false },
    AdminReject: { Id: 5, Name: 'AdminReject', DisplayName: 'Reject', IsClient: false, IsAdmin: true },
    Delete: { Id: 6, Name: 'Delete', DisplayName: 'Delete', IsClient: false, IsAdmin: false },
    ClientDraft: { Id: 7, Name: 'ClientDraft', DisplayName: 'Draft', IsClient: true, IsAdmin: false },
    ClientApprove: { Id: 8, Name: 'ClientApprove', DisplayName: 'Approve', IsClient: true, IsAdmin: false },
    ClientReject: { Id: 9, Name: 'ClientReject', DisplayName: 'Reject', IsClient: true, IsAdmin: false }
}

export function IsAdmin(name) {
    if (!name) {
        return false;
    }

    if (name === 'superadmin' || name === 'admin') {
        return true;
    }

    return false;
}