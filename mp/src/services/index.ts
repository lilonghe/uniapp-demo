import { req } from './request';

export interface ILoginRequest {
    username: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
}

export interface IJob {
    company: string;
    company_name: string;
    create_time: string;
    headcount: number;
    id: string;
    office_address: string;
    remote_type: number;
    salary_max: number;
    salary_min: number;
    stop_time: string;
    title: string;
    user_id: string;
    work_time: string;
}

export interface IGetCurrentUserResponse {
    id: string;
    name: string;
    resume_url: string;
}

export function login(params: ILoginRequest) {
    return req<ILoginResponse>('/login', { method: 'POST', data: params })
}

export function getCurrentUser() {
    return req<IGetCurrentUserResponse>('/user/current');
}

export function getJobs(offset: number, limit: number) {
    return req<IJob[]>('/jobs', { data: { offset, limit } })
}