const baseUrl = 'https://mock.apifox.cn/m1/650713-0-default';

interface IReqOptions {
    method?: string;
    data?: any;
}

export function req<T>(url: string, options?: IReqOptions) {
    return new Promise<T>((resolve) => {
        const token = uni.getStorageSync('token');
        uni.request({
            url: baseUrl + url,
            data: options?.data,
            header: {
                'Authorization': token
            },
            success: (res) => {
                resolve(res.data as T);
            },
            fail: () => {
                uni.showToast({ title: 'Request fail' })
                resolve({} as T);
            }
        })
    })
}