


// services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'UserApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  tagTypes: ['User', 'Product', 'Customers', 'Transactions', 'Geography'],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `general/user/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    getProducts: builder.query({
      query: () => "client/products",
      providesTags: (result, error) => [{ type: 'Product' }],
    }),
    getCustomers: builder.query({
      query: () => "client/customers",
      providesTags: (result, error) => [{ type: 'Customers' }],
    }),
    getTransactions: builder.query({
      query: ({page, pageSize, sort, search}) =>({
        url: "client/transactions",
        method :"GET",
        params: {page, pageSize, sort, search}
      }),
      providesTags: (result, error) => [{ type: 'Transactions' }],
    }),
    getGeography: builder.query({
      query: () =>({
        url: "client/geography",
        method :"GET",
      }),
      providesTags: (result, error) => [{ type: 'Geography' }],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
} = api;

export const apiReducer = api.reducer;