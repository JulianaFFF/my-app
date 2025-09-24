import { fetcher } from "@/shared/services/http";
import { Prize } from "@/modules/prizes/types";

export const createPrize = (data: Omit<Prize, 'id'>): Promise<Prize> => {
  return fetcher<Prize>("/prizes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const associatePrizeToAuthor = (prizeId: number, authorId: number): Promise<void> => {
  return fetcher<void>(`/prizes/${prizeId}/author/${authorId}`, {
    method: "POST",
  });
};

export const fetchOrganizations = (): Promise<any[]> => {
  return fetcher<any[]>("/organizations");
};