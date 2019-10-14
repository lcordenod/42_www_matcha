import axios from "axios";

export default {
  user: {
    getUserFromUsername: username =>
      axios.get(`/users/profile/${username}`).then(res => res.data),
    getUserFromId: user_id =>
      axios.get(`/users/profile/id/${user_id}`).then(res => res.data),
    updateUserField: (id, field, data) =>
      axios
        .post(`/users/update/${id}/custom/${field}`, { data: data })
        .then(res => res.data),
    updateUserData: (id, data) =>
      axios.post(`/users/update/${id}`, { data: data }).then(res => res.data),
    createUserTag: (user_id, tag_id) =>
      axios
        .post(`/users/create/${user_id}/tag`, { tag_id: tag_id })
        .then(res => res.data),
    deleteUserTag: (user_id, tag_id) =>
      axios
        .post(`/users/delete/${user_id}/tag`, { tag_id: tag_id })
        .then(res => res.data),
    updateUserPicture: (user_id, data) =>
      axios
        .post(`/users/update/${user_id}/picture`, { data: data })
        .then(res => res.data),
    deleteUserPicture: (user_id, pic_index) =>
      axios
        .post(`/users/delete/${user_id}/picture`, { pic_index: pic_index })
        .then(res => res.data),
    deleteUser: (user_id, headers) =>
      axios
        .post(`/users/delete/${user_id}`, { headers: headers })
        .then(res => res.data),
    checkUserLikedByAndReverse: (user_id, username) =>
      axios
        .get(`/users/profile/${user_id}/liked_by/${username}`)
        .then(res => res.data),
    checkUserIsReported: (user_id, target_id) =>
      axios
        .get(`/users/isreported/${user_id}/${target_id}`)
        .then(res => res.data),
    checkUserIsBlocked: (user_id, target_id) =>
      axios
        .get(`/users/isblocked/${user_id}/${target_id}`)
        .then(res => res.data),
    createUserLike: (user_id, by_id) =>
      axios
        .post(`/users/create/${user_id}/liked_by/${by_id}`)
        .then(res => res.data),
    deleteUserLike: (user_id, by_id) =>
      axios
        .post(`/users/delete/${user_id}/liked_by/${by_id}`)
        .then(res => res.data),
    updateUserProfilePicture: (user_id, pic_index, pic_url) =>
      axios
        .post(`/users/update/${user_id}/profile_picture`, {
          pic_index: pic_index,
          pic_url: pic_url
        })
        .then(res => res.data),
    verifyPasswordWithId: (id, password) =>
      axios
        .post(`/users/verify/${id}/password`, { password: password })
        .then(res => res.data),
    updatePasswordWithId: (id, password) =>
      axios
        .post(`/users/update/${id}/password`, { password: password })
        .then(res => res.data),
    getUserRoomId: async (user_id, target_id) =>
      await axios
        .get(`/users/get-room-id/${user_id}/${target_id}`)
        .then(res => res.data),
    getUserProfilesVisited: async user_id =>
      await axios
        .get(`/users/profiles-visited/${user_id}`)
        .then(res => res.data),
    getUserProfilesLiked: async user_id =>
      await axios.get(`/users/profiles-liked/${user_id}`).then(res => res.data),
    getUserProfilesBlocked: async user_id =>
      await axios
        .get(`/users/profiles-blocked/${user_id}`)
        .then(res => res.data),
    getUserListProfileDataFromId: async id =>
      await axios.get(`/users/profile/${id}/list-profile`).then(res => res.data)
  }
};
