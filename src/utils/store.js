// store.js
import { configureStore } from '@reduxjs/toolkit';
import { categorySlice, moneyPotSlice, scheduledActionSlice, transactionSlice, userSlice, sessionSlice, selectItemReducer, pastThirtyDaysSlice, notificationSlice, chartDataSlice }  from './slices'

export const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
    moneyPot: moneyPotSlice.reducer,
    scheduledAction: scheduledActionSlice.reducer,
    transaction: transactionSlice.reducer,
    session: sessionSlice.reducer,
    user: userSlice.reducer,
    selectItem: selectItemReducer,
    notification: notificationSlice.reducer,
    chartData: chartDataSlice.reducer,
    pastThirtyDays: pastThirtyDaysSlice.reducer,
  },
});
