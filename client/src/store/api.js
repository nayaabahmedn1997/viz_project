


// services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'UserApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  tagTypes: ['User', 'Product', 'Customers', 'Transactions', 
    'Geography', 'Sales', 'Admins', 'Performance',"'Dashboard"],
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
    getSales: builder.query({
      query: () =>({
        url: "sales/sales",
        method :"GET",
      }),
      providesTags: (result, error) => [{ type: 'Sales' }],
    }),
    getAdmins: builder.query({
      query: () =>({
        url: "management/admins",
        method :"GET",
      }),
      providesTags: (result, error) => [{ type: 'Admins' }],
    }),
    getUserPerformance: builder.query({
      query: (id) =>({
        url: `management/performance/${id}`,
        method :"GET",
      }),
      providesTags: (result, error) => [{ type: 'Performance' }],
    }),
    getDashboard: builder.query({
      query: (id) =>({
        url: `general/dashboard`,
        method :"GET",
      }),
      providesTags: (result, error) => [{ type: 'Dashboard' }],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;

export const apiReducer = api.reducer;