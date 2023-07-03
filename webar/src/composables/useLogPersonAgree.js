import { setLogPersonAgree } from "@/apis";

const useLogPersonAgree =  () => {
    const putLogPersonAgree = async (params) => {
        console.log("putLogPersonAgree", params)
        try {
            const res = await setLogPersonAgree(params);
            if (res.resultCode === 200) {
                console.log("put log : " + JSON.stringify(params));
            }
        } catch (e) {
            console.log(e.resultMessage);
        }
    };

    return {
        putLogPersonAgree,
    };

};
export default useLogPersonAgree;