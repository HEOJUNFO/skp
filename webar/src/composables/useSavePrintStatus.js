import { setSavePrintStatus } from "@/apis";

const useSavePrintStatus =  () => {
    const putSavePrintStatus = async (params) => {
        try {
            const res = await setSavePrintStatus(params);
            if (res.resultCode === 200) {
                console.log("put log : " + JSON.stringify(params));
            }
        } catch (e) {
            console.log(e.resultMessage);
        }
    };

    return {
        putSavePrintStatus
    };

};
export default useSavePrintStatus;