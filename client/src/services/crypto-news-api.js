import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoNewsHeaders = {
      'x-bingapis-sdk': 'true',
      'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
      'x-rapidapi-key': 'c8c6216682msh1bd5b9b0afb26f3p184472jsn9b992005cf25'

}

const baseUrl = "https://bing-news-search1.p.rapidapi.com/news"

const createRequest = (url) =>({url, headers: cryptoNewsHeaders})

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery:fetchBaseQuery({ baseUrl }),
    endpoints:(builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count}) => createRequest(`/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const {
    useGetCryptoNewsQuery,
} = cryptoNewsApi