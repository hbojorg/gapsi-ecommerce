import api from './api';
import type { WelcomeInfo } from '../types/welcome';

export const getWelcome = async (): Promise<WelcomeInfo> => {
  const response = await api.get<WelcomeInfo>('/welcome');
  return response.data;
};
