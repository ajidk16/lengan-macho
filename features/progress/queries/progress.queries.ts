import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { bodyLogApi } from '../api/progress.api';

export const useBodyLogs = (userId: string) =>
  useQuery({
    queryKey: ['body-logs', userId],
    queryFn: () => bodyLogApi.list(userId).then((r) => r.data),
    enabled: !!userId,
  });

export const useCreateBodyLog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: bodyLogApi.create,
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ['body-logs', vars.userId] }),
  });
};