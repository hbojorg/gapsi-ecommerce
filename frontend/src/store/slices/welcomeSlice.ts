import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { WelcomeInfo } from '../../types/welcome';
import * as welcomeService from '../../services/welcomeService';

interface WelcomeState {
  data: WelcomeInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: WelcomeState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchWelcome = createAsyncThunk<WelcomeInfo, void, { rejectValue: string }>(
  'welcome/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await welcomeService.getWelcome();
    } catch {
      return rejectWithValue('Error al cargar informacion de bienvenida');
    }
  }
);

const welcomeSlice = createSlice({
  name: 'welcome',
  initialState,
  reducers: {
    clearWelcomeError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWelcome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWelcome.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWelcome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido';
      });
  },
});

export const { clearWelcomeError } = welcomeSlice.actions;

export default welcomeSlice.reducer;
