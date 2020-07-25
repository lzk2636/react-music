import request from "../utils/http";
// mv地址

export const topSongs = ({ type }) => {
    return request({
      url: '/top/song',
      method: 'get',
      params: {
        type,
      },
    })
  }