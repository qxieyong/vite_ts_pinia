import { axiosGet } from "@/utils/axios";

interface AnyObject {
	[key: string]: any;
}

const getHome = (data: AnyObject) => axiosGet("/getList", data);

export { getHome };
