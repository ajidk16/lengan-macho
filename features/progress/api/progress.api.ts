import { api } from '@/lib/axios';

export interface BodyLogPayload {
  userId: string;
  date: string;
  weightKg: number;
  armCm: number;
}

export const bodyLogApi = {
  create: (data: BodyLogPayload) => api.post('/body-logs', data),
  list: (userId: string) => api.get<BodyLogPayload[]>(`/body-logs?userId=${userId}`),
};