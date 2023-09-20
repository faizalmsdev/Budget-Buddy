export const useGetUserInfo = () => {
    const authInfo = JSON.parse(localStorage.getItem("auth")) || {}; // Initialize with an empty object if not found

    const { name = "", profilePhoto = "", userID = "", isAuth = false } = authInfo;

    return { name, profilePhoto, userID, isAuth };
}
