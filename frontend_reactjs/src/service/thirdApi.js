import * as provinceOpen from '~/utils/thirdRequest';


export const getProvince = async () => {
    try {
        const res = await provinceOpen.get(`/p`);
        return res
    } catch (err) {
        console.error(err);
    }
};


export const searchDistrictOnCode = async (code, depth = 2) => {
    try {
        const res = await provinceOpen.get(`/p/${code}?depth=${depth}`);
        return res
    } catch (err) {
        console.error(err);
    }
};

export const searchWardOnCode = async (code, depth = 2) => {
    try {
        const res = await provinceOpen.get(`/d/${code}?depth=${depth}`);
        return res
    } catch (err) {
        console.error(err);
    }
};

// const searchDistrictOnTyping = async () => {
//     try {
//         const res = await provinceOpen.getParams(`/district`, {
//             params: {
//                 name: debouncedDistrictSearch,
//             },
//         });
//         return res.data
//     } catch (err) {
//         console.error(err);
//     }
// };

// const searchWardOnTyping = async () => {
//     try {
//         const res = await provinceOpen.get(`/ward`, {
//             params: {
//                 name: debouncedWardSearch,
//             },
//         });
//         return res.data
//     } catch (err) {
//         console.error(err);
//     }
// };